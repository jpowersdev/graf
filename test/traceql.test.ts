import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import {
  andCondition,
  attributeName,
  base64ToHex,
  buildSpanQuery,
  normalizeTraceId,
  parseAttrCondition,
  parseQuantiles,
  traceqlDuration,
  withSpanDetails,
} from "../src/TraceQL.ts"

it.effect("buildSpanQuery composes a span selector from flags", () =>
  Effect.gen(function* () {
    expect(yield* buildSpanQuery({})).toBe("{ }")
    expect(
      yield* buildSpanQuery({
        service: "api",
        operation: "POST /checkout",
        error: true,
        minDuration: "500ms",
        maxDuration: "1 minute",
        attrs: ["span.http.status_code>=500", "deployment.environment=prod", "http.route=~/api/.*"],
        filter: "kind = server",
      }),
    ).toBe(
      `{ resource.service.name = "api" && name = "POST /checkout" && status = error && duration >= 500ms && duration <= 60000ms `
        + `&& span.http.status_code >= 500 && .deployment.environment = "prod" && .http.route =~ "/api/.*" && (kind = server) }`,
    )
  }))

it.effect("buildSpanQuery keeps --query exclusive", () =>
  Effect.gen(function* () {
    expect(yield* buildSpanQuery({ query: "{ } | count() > 3" })).toBe("{ } | count() > 3")
    expect((yield* Effect.flip(buildSpanQuery({ query: "{ }", service: "api" }))).message).toContain("drop --service")
  }))

it.effect("attribute conditions pick literal types", () =>
  Effect.gen(function* () {
    expect(yield* parseAttrCondition("span.http.status_code=500")).toBe("span.http.status_code = 500")
    expect(yield* parseAttrCondition("span.cache.hit=true")).toBe("span.cache.hit = true")
    expect(yield* parseAttrCondition("status=error")).toBe("status = error")
    expect(yield* parseAttrCondition("span.user.id!=42abc")).toBe(`span.user.id != "42abc"`)
    expect((yield* Effect.flip(parseAttrCondition("nope")))._tag).toBe("InvalidTraceQuery")
  }))

it("attributeName scopes bare keys and quotes odd ones", () => {
  expect(attributeName("resource.service.name")).toBe("resource.service.name")
  expect(attributeName("name")).toBe("name")
  expect(attributeName("http.route")).toBe(".http.route")
  expect(attributeName("weird key")).toBe(`."weird key"`)
})

it.effect("traceqlDuration accepts Go-style and spelled-out durations", () =>
  Effect.gen(function* () {
    expect(yield* traceqlDuration("1.5s")).toBe("1.5s")
    expect(yield* traceqlDuration("2 seconds")).toBe("2000ms")
    expect((yield* Effect.flip(traceqlDuration("fast")))._tag).toBe("InvalidTraceQuery")
  }))

it("andCondition extends flag-built selectors", () => {
  expect(andCondition("{ }", "status = error")).toBe("{ status = error }")
  expect(andCondition(`{ name = "x" }`, "status = error")).toBe(`{ name = "x" && status = error }`)
})

it("withSpanDetails selects span details once", () => {
  expect(withSpanDetails("{ }")).toBe("{ } | select(name, resource.service.name, status, statusMessage)")
  expect(withSpanDetails("{ } | select(span.foo)")).toBe("{ } | select(span.foo)")
})

it.effect("parseQuantiles accepts p99, 99 and 0.99", () =>
  Effect.gen(function* () {
    expect(yield* parseQuantiles("p50, 95,0.99")).toEqual([0.5, 0.95, 0.99])
    expect((yield* Effect.flip(parseQuantiles("p100")))._tag).toBe("InvalidTraceQuery")
  }))

it("normalizes trace and span IDs", () => {
  expect(normalizeTraceId("26f5902be55974e5955901e4c3e60")).toBe("00026f5902be55974e5955901e4c3e60")
  expect(base64ToHex("CRT6AU2qDcB/s6ntbgrZaA==")).toBe("0914fa014daa0dc07fb3a9ed6e0ad968")
  expect(base64ToHex("/WnbIDsz6+s=")).toBe("fd69db203b33ebeb")
  expect(base64ToHex("fd69db203b33ebeb")).toBe("fd69db203b33ebeb")
  expect(base64ToHex(null)).toBeUndefined()
})

it.effect("buildTraceMetricsQuery maps aggregations to TraceQL metrics", () =>
  Effect.gen(function* () {
    const { buildTraceMetricsQuery } = yield* Effect.promise(() => import("../src/TraceQL.ts"))
    const base = { selector: `{ name = "x" }`, groupBy: [] as ReadonlyArray<string> }
    expect(yield* buildTraceMetricsQuery({ ...base, aggregation: "count", groupBy: ["span.http.route"] })).toEqual({
      query: `{ name = "x" } | count_over_time() by (span.http.route)`,
      scale: 1,
    })
    expect(yield* buildTraceMetricsQuery({ ...base, aggregation: "p99" })).toEqual({
      query: `{ name = "x" } | quantile_over_time(duration, 0.99)`,
      scale: 1000,
      unit: "ms",
    })
    expect(yield* buildTraceMetricsQuery({ ...base, aggregation: "avg", aggregateOn: "span.db.rows" })).toEqual({
      query: `{ name = "x" } | avg_over_time(span.db.rows)`,
      scale: 1,
      unit: undefined,
    })
    expect((yield* Effect.flip(buildTraceMetricsQuery({ ...base, aggregation: "rate", aggregateOn: "duration" }))).message)
      .toContain("does not apply")
    expect((yield* Effect.flip(buildTraceMetricsQuery({ ...base, aggregation: "median" }))).message).toContain("Unknown")
  }))
