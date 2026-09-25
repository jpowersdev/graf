import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import { autoStepSeconds, inferMetricType, nameSearchMatcher, QueryResponse, summarize } from "../src/Metrics.ts"
import { collapseConstantLabels, flatten, render } from "../src/MetricsOutput.ts"

const decode = Schema.decodeUnknownSync(QueryResponse)

const matrix = decode({
  status: "success",
  data: {
    resultType: "matrix",
    result: [
      { metric: { service_name: "api", env: "prod" }, values: [[1767225600, "1.5"], [1767225660, "2"]] },
      { metric: { service_name: "worker", env: "prod" }, values: [[1767225600, "NaN"]] },
    ],
  },
  warnings: ["partial data"],
})

it("inferMetricType follows Prometheus naming conventions", () => {
  expect(inferMetricType("traces_spanmetrics_calls_total")).toBe("counter")
  expect(inferMetricType("traces_spanmetrics_latency_bucket")).toBe("histogram")
  expect(inferMetricType("traces_spanmetrics_latency_count")).toBe("histogram|summary")
  expect(inferMetricType("up")).toBe("unknown")
})

it("summarize prefers metadata and falls back to the name", () => {
  expect(summarize(["http_requests_total", "up"], { up: [{ type: "gauge", help: "Target up", unit: "" }] })).toEqual([
    { name: "http_requests_total", type: "counter", unit: undefined, description: undefined },
    { name: "up", type: "gauge", unit: undefined, description: "Target up" },
  ])
})

it("nameSearchMatcher escapes regex characters and matches case-insensitively", () => {
  expect(nameSearchMatcher("http.server")).toBe(String.raw`{__name__=~"(?i).*http\\.server.*"}`)
})

it("autoStepSeconds targets ~300 points with a 15s floor", () => {
  expect(autoStepSeconds(0, 3_600_000)).toBe(15)
  expect(autoStepSeconds(0, 86_400_000)).toBe(288)
})

it("decodes vector and scalar results", () => {
  expect(decode({ status: "success", data: { resultType: "vector", result: [{ metric: {}, value: [1, "3"] }] } }).data.resultType)
    .toBe("vector")
  expect(flatten(decode({ status: "success", data: { resultType: "scalar", result: [1767225600, "42"] } }).data)).toEqual({
    columns: ["timestamp", "value"],
    rows: [["2026-01-01T00:00:00.000Z", 42]],
  })
})

it("flatten turns a matrix into one row per sample with sorted label columns", () => {
  expect(flatten(matrix.data)).toEqual({
    columns: ["timestamp", "value", "env", "service_name"],
    rows: [
      ["2026-01-01T00:00:00.000Z", 1.5, "prod", "api"],
      ["2026-01-01T00:01:00.000Z", 2, "prod", "api"],
      ["2026-01-01T00:00:00.000Z", "NaN", "prod", "worker"],
    ],
  })
})

it("collapseConstantLabels lifts labels shared by every row", () => {
  const { flattened, collapsed } = collapseConstantLabels(flatten(matrix.data))
  expect(collapsed).toEqual([{ name: "env", value: "prod" }])
  expect(flattened.columns).toEqual(["timestamp", "value", "service_name"])
})

it("render prints constant labels above the table", () => {
  expect(render(matrix, "table")).toBe([
    "label value",
    "env   prod",
    "",
    "timestamp                value service_name",
    "2026-01-01T00:00:00.000Z 1.5   api",
    "2026-01-01T00:01:00.000Z 2     api",
    "2026-01-01T00:00:00.000Z NaN   worker",
  ].join("\n"))
  expect(JSON.parse(render(matrix, "json"))).toEqual(matrix)
})
