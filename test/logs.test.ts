import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import { entriesOf, LokiResponse, nanosToIso } from "../src/Logs.ts"
import { render, topGroups } from "../src/LogsOutput.ts"

const decode = Schema.decodeUnknownSync(LokiResponse)

const streams = decode({
  status: "success",
  data: {
    resultType: "streams",
    result: [
      { stream: { service_name: "api", detected_level: "error" }, values: [["1767225600000000001", "boom\nstack"]] },
      {
        stream: { service_name: "api", detected_level: "info" },
        values: [["1767225601000000000", "ok"], ["1767225599000000000", "earlier", { structuredMetadata: {} }]],
      },
    ],
    stats: { summary: {} },
  },
})

it("nanosToIso keeps sub-millisecond precision only when present", () => {
  expect(nanosToIso("1767225600000000000")).toBe("2026-01-01T00:00:00.000Z")
  expect(nanosToIso("1767225600000000001")).toBe("2026-01-01T00:00:00.000000001Z")
})

it("entriesOf merges streams into one timeline", () => {
  expect(entriesOf(streams).map((entry) => entry.line)).toEqual(["ok", "boom\nstack", "earlier"])
  expect(entriesOf(streams, "asc").map((entry) => entry.line)).toEqual(["earlier", "boom\nstack", "ok"])
})

it("renders one physical line per entry in tables", () => {
  expect(render(entriesOf(streams), "table")).toBe([
    "time                           service level line",
    "2026-01-01T00:00:01.000Z       api     info  ok",
    "2026-01-01T00:00:00.000000001Z api     error boom\\nstack",
    "2025-12-31T23:59:59.000Z       api     info  earlier",
  ].join("\n"))
  expect(render(entriesOf(streams), "values")).toBe("ok\nboom\\nstack\nearlier")
})

it("topGroups sorts vector results largest-first and applies the limit", () => {
  const response = {
    status: "success",
    data: {
      resultType: "vector" as const,
      result: [
        { metric: { level: "info" }, value: [1, "5"] as const },
        { metric: { level: "error" }, value: [1, "9"] as const },
        { metric: { level: "warn" }, value: [1, "7"] as const },
      ],
    },
  }
  const top = topGroups(response, 2)
  expect(top.data.resultType === "vector" && top.data.result.map((series) => series.metric.level)).toEqual(["error", "warn"])
})

it("traceScope turns a trace into a service selector and a padded window", async () => {
  const { traceScope } = await import("../src/LogsCommand.ts")
  expect(traceScope({ start: "2026-01-01T00:00:00.000Z", durationMs: 1_500, services: ["api", "web.v2"] })).toEqual({
    label: "service_name=~api|web\\.v2",
    from: "2025-12-31T23:59:00.000Z",
    to: "2026-01-01T00:01:01.500Z",
  })
  expect(traceScope({ start: "2026-01-01T00:00:00.000Z", durationMs: 0, services: ["api"] })?.label).toBe("service_name=api")
  expect(traceScope({ durationMs: 0, services: [] })).toBeUndefined()
})

it("topGroups sorts ascending or by a label", () => {
  const response = {
    status: "success",
    data: {
      resultType: "vector" as const,
      result: [
        { metric: { level: "info" }, value: [1, "5"] as const },
        { metric: { level: "error" }, value: [1, "9"] as const },
      ],
    },
  }
  const levels = (r: ReturnType<typeof topGroups>) => r.data.resultType === "vector" ? r.data.result.map((s) => s.metric.level) : []
  expect(levels(topGroups(response, undefined, "asc"))).toEqual(["info", "error"])
  expect(levels(topGroups(response, undefined, "asc", "level"))).toEqual(["error", "info"])
})
