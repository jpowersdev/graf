import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import {
  DsQueryResponse,
  epochToIso,
  evaluationBody,
  flattenRules,
  historyTransitions,
  parseRuleData,
  parseRuleQueries,
  RulesResponse,
  sortRules,
  summarizeFrames,
  topContributors,
} from "../src/Alerts.ts"

const rules = Schema.decodeUnknownSync(RulesResponse)({
  data: {
    groups: [{
      name: "web",
      file: "Errors",
      interval: 60,
      rules: [
        { uid: "b", name: "Quiet", state: "inactive", health: "ok", query: "up == 0", queriedDatasourceUIDs: ["mimir"], labels: null },
        {
          uid: "a",
          name: "Errors",
          state: "firing",
          health: "ok",
          query: JSON.stringify([{ refId: "A", datasourceUid: "loki", relativeTimeRange: { from: 600, to: 0 }, model: { expr: "sum(rate({service_name=\"api\"}[5m]))" } }]),
          labels: { severity: "warning" },
          alerts: [{ labels: { service: "api" }, state: "Alerting", activeAt: "2026-01-01T00:00:00Z", value: "3e+00" }],
        },
        { name: "No uid (skipped)" },
      ],
    }],
  },
})

it("flattenRules reads both query forms and sorts firing first", () => {
  const flat = sortRules(flattenRules(rules, "https://grafana.example.com/"))
  expect(flat.map((rule) => rule.uid)).toEqual(["a", "b"])
  expect(flat[0]).toMatchObject({
    folder: "Errors",
    group: "web",
    intervalSeconds: 60,
    labels: { severity: "warning" },
    url: "https://grafana.example.com/alerting/grafana/a/view",
    instances: [{ state: "Alerting", labels: { service: "api" } }],
  })
  expect(flat[0]!.queries[0]).toMatchObject({ refId: "A", datasourceUid: "loki", relativeTimeRange: { from: 600, to: 0 }, expression: "sum(rate({service_name=\"api\"}[5m]))" })
  expect(flat[1]!.queries).toEqual([{ refId: "A", datasourceUid: "mimir", expression: "up == 0", model: {} }])
  expect(parseRuleQueries("[not json", [])).toEqual([{ refId: "A", datasourceUid: undefined, expression: "[not json", model: {} }])
})

it("parseRuleData describes expressions", () => {
  expect(parseRuleData([{ refId: "C", datasourceUid: "__expr__", model: { type: "threshold", expression: "A" } }])[0]).toMatchObject({
    refId: "C",
    datasourceType: "__expr__",
    expression: "threshold: A",
  })
})

it("epochToIso normalizes seconds, ms, µs and ns", () => {
  const iso = "2026-01-01T00:00:00.000Z"
  for (const value of [1767225600, 1767225600000, 1767225600000000, 1767225600000000000]) expect(epochToIso(value)).toBe(iso)
})

it("historyTransitions reads the state-history frame, newest first, without duplicates", () => {
  const transitions = historyTransitions({
    schema: { fields: [{ name: "time" }, { name: "text" }, { name: "prev" }, { name: "next" }, { name: "data" }] },
    data: {
      values: [
        [1767225600000000, 1767225660000000, 1767225600000000],
        ["Errors {service=api} - A=3.000000, B=1.000000", "Errors {service=web, note=a=b c}", "Errors {service=api} - A=3.000000, B=1.000000"],
        ["Normal", "Alerting", "Normal"],
        ["Alerting", "Normal (MissingSeries)", "Alerting"],
        ['{"values":{"A":3,"B":1}}', "not json", '{"values":{"A":3,"B":1}}'],
      ],
    },
  })
  expect(transitions).toEqual([
    { time: "2026-01-01T00:01:00.000Z", from: "Alerting", to: "Normal (MissingSeries)", labels: { service: "web", note: "a=b c" }, values: undefined },
    { time: "2026-01-01T00:00:00.000Z", from: "Normal", to: "Alerting", labels: { service: "api" }, values: { A: 3, B: 1 } },
  ])
})

it("topContributors keeps labels that vary across instances", () => {
  const instance = (labels: Record<string, string>) => ({ labels })
  expect(topContributors([
    instance({ alertname: "x", service: "api", fingerprint: "1" }),
    instance({ alertname: "x", service: "api", fingerprint: "2" }),
    instance({ alertname: "x", service: "web", fingerprint: "3" }),
  ])).toEqual([{ label: "service", distinct: 2, values: [{ value: "api", count: 2 }, { value: "web", count: 1 }] }])
})

it("evaluationBody anchors each query's window at the evaluation time", () => {
  const body = evaluationBody(parseRuleData([
    { refId: "A", datasourceUid: "mimir", relativeTimeRange: { from: 600, to: 0 }, model: { expr: "up", instant: true } },
    { refId: "C", datasourceUid: "__expr__", relativeTimeRange: { from: 600, to: 0 }, model: { type: "threshold", expression: "A" } },
  ]).map((query) => query.refId === "A" ? { ...query, datasourceType: "prometheus" } : query), 1_767_225_600_000)
  expect(body).toEqual({
    from: "1767225000000",
    to: "1767225600000",
    queries: [
      { expr: "up", instant: true, refId: "A", datasource: { uid: "mimir", type: "prometheus" }, timeRange: { from: "1767225000000", to: "1767225600000" } },
      { type: "threshold", expression: "A", refId: "C", datasource: { type: "__expr__", uid: "__expr__" } },
    ],
  })
})

it("summarizeFrames extracts numeric series and per-query errors", () => {
  const response = Schema.decodeUnknownSync(DsQueryResponse)({
    results: {
      A: { status: 200, error: null, frames: [{ schema: { fields: [{ name: "Time", type: "time" }, { name: "Value", type: "number", labels: { service: "api" } }] }, data: { values: [[1, 2], [5, 7]] } }] },
      B: { status: 400, error: "parse error", frames: null },
    },
  })
  expect(summarizeFrames(response)).toEqual({
    series: [{ refId: "A", labels: { service: "api" }, points: 2, first: 5, last: 7, min: 5, max: 7 }],
    errors: [{ refId: "B", error: "parse error" }],
  })
})

it("replayTicks steps back from the end and widens long windows", async () => {
  const { replayTicks } = await import("../src/Alerts.ts")
  expect(replayTicks(0, 180_000, 60)).toEqual({ ticks: [0, 60_000, 120_000, 180_000], stepSeconds: 60, widened: false })
  const wide = replayTicks(0, 86_400_000, 60)
  expect(wide.stepSeconds).toBe(720)
  expect(wide.widened).toBe(true)
  expect(wide.ticks.length).toBeLessThanOrEqual(120)
})

it("replaySummary counts firing ticks per condition series", async () => {
  const { replaySummary } = await import("../src/Alerts.ts")
  const s = (refId: string, pod: string, last: number) => ({ refId, labels: { pod }, points: 1, first: last, last, min: last, max: last })
  const summary = replaySummary([
    { at: 1767225600000, series: [s("A", "a", 3), s("C", "a", 0), s("C", "b", 0)] },
    { at: 1767225660000, series: [s("C", "a", 1), s("C", "b", 0)] },
    { at: 1767225720000, series: [s("C", "a", 1), s("C", "b", 0)] },
  ], "C")
  expect(summary).toEqual([
    { labels: { pod: "a" }, ticks: 3, firingTicks: 2, firstFiring: "2026-01-01T00:01:00.000Z", lastFiring: "2026-01-01T00:02:00.000Z", lastValue: 1 },
    { labels: { pod: "b" }, ticks: 3, firingTicks: 0, firstFiring: undefined, lastFiring: undefined, lastValue: 0 },
  ])
})
