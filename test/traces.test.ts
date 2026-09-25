import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import { buildWaterfall, joinInstant, MetricsResponse, SearchResponse, summarizeSearch, TraceResponse } from "../src/Traces.ts"

const b64 = (hex: string) => Buffer.from(hex, "hex").toString("base64")

it("buildWaterfall orders spans depth-first with offsets from the trace start", () => {
  const span = (id: string, parent: string | null, name: string, start: number, end: number, extra: object = {}) => ({
    spanId: b64(id),
    parentSpanId: parent === null ? null : b64(parent),
    name,
    kind: "SPAN_KIND_SERVER",
    startTimeUnixNano: String(1_767_225_600_000_000_000n + BigInt(start) * 1_000_000n),
    endTimeUnixNano: String(1_767_225_600_000_000_000n + BigInt(end) * 1_000_000n),
    ...extra,
  })
  const response = Schema.decodeUnknownSync(TraceResponse)({
    trace: {
      resourceSpans: [
        {
          resource: { attributes: [{ key: "service.name", value: { stringValue: "api" } }] },
          scopeSpans: [{
            spans: [
              span("0000000000000002", "0000000000000001", "db", 30, 40),
              span("0000000000000001", null, "GET /x", 0, 100),
              span("0000000000000003", "0000000000000001", "cache", 10, 20, {
                status: { code: "STATUS_CODE_ERROR", message: "miss" },
                attributes: [{ key: "hits", value: { intValue: "3" } }],
              }),
            ],
          }],
        },
        {
          resource: { attributes: [{ key: "service.name", value: { stringValue: "worker" } }] },
          scopeSpans: [{ spans: [span("0000000000000004", "00000000000000ff", "orphan", 50, 60)] }],
        },
      ],
    },
  })
  const waterfall = buildWaterfall("abc", response)
  expect(waterfall.durationMs).toBe(100)
  expect(waterfall.services).toEqual(["api", "worker"])
  expect(waterfall.spans.map((s) => [s.name, s.depth, s.offsetMs, s.durationMs, s.service])).toEqual([
    ["GET /x", 0, 0, 100, "api"],
    ["cache", 1, 10, 10, "api"],
    ["db", 1, 30, 10, "api"],
    ["orphan", 0, 50, 10, "worker"],
  ])
  expect(waterfall.spans[1]).toMatchObject({ status: "error", statusMessage: "miss", kind: "server", attributes: { hits: 3 } })
})

it("summarizeSearch pads trace IDs and flags partial results", () => {
  const response = Schema.decodeUnknownSync(SearchResponse)({
    traces: [{
      traceID: "26f5902be55974e5955901e4c3e60",
      rootServiceName: "api",
      rootTraceName: "GET /x",
      startTimeUnixNano: "1767225600000000000",
      durationMs: 12,
      spanSet: {
        matched: 2,
        spans: [{
          spanID: "b86cab61f7c0f92e",
          name: "db",
          startTimeUnixNano: "1767225600001000000",
          durationNanos: "1302582",
          attributes: [
            { key: "service.name", value: { stringValue: "api" } },
            { key: "status", value: { stringValue: "error" } },
          ],
        }],
      },
    }],
    metrics: { completedJobs: 1, totalJobs: 3 },
  })
  const result = summarizeSearch("{ }", response, 20)
  expect(result.partial).toBe(true)
  expect(result.traces[0]).toEqual({
    traceId: "00026f5902be55974e5955901e4c3e60",
    start: "2026-01-01T00:00:00.000Z",
    rootService: "api",
    rootName: "GET /x",
    durationMs: 12,
    matchedSpans: 2,
  })
  expect(result.spans[0]).toMatchObject({ spanId: "b86cab61f7c0f92e", service: "api", name: "db", durationMs: 1.302, status: "error" })
})

it("joinInstant lines up several metric queries by group, picking quantiles by `p`", () => {
  const decode = Schema.decodeUnknownSync(MetricsResponse)
  const label = (key: string, value: object) => ({ key, value })
  const counts = decode({ series: [{ labels: [label("name", { stringValue: "GET /x" })], value: 10 }] })
  const quantiles = decode({
    series: [
      { labels: [label("name", { stringValue: "GET /x" }), label("p", { doubleValue: 0.5 })], value: 1 },
      { labels: [label("name", { stringValue: "GET /x" }), label("p", { doubleValue: 0.99 })], value: 9 },
      { labels: [label("name", { stringValue: "GET /y" }), label("p", { doubleValue: 0.99 })], value: 4 },
    ],
  })
  expect(joinInstant(["name"], [
    { name: "spans", response: counts },
    { name: "p50", response: quantiles, quantile: 0.5 },
    { name: "p99", response: quantiles, quantile: 0.99 },
  ])).toEqual([
    { name: "GET /x", spans: 10, p50: 1, p99: 9 },
    { name: "GET /y", p99: 4 },
  ])
})
