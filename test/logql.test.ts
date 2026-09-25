import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import { buildLogQuery, buildMetricQuery, parseLabelMatcher } from "../src/LogQL.ts"

it.effect("buildLogQuery composes selector and pipeline from flags", () =>
  Effect.gen(function* () {
    expect(yield* buildLogQuery({ service: "api" })).toBe(`{service_name="api"}`)
    expect(
      yield* buildLogQuery({
        service: "api",
        labels: ["deployment_environment=prod", "k8s_namespace_name=~web-.*"],
        contains: ["timeout", "say \"hi\""],
        levels: ["error,WARN"],
        traceId: "abc123",
        filter: "json | status >= 500",
      }),
    ).toBe(
      `{service_name="api", deployment_environment="prod", k8s_namespace_name=~"web-.*"} |= "timeout" |= "say \\"hi\\"" `
        + `| trace_id="00000000000000000000000000abc123" `
        + `| detected_level=~"error|warn" | json | status >= 500`,
    )
    expect(yield* buildLogQuery({ service: "api", levels: ["info"], filter: "|= \"x\"" })).toBe(
      `{service_name="api"} | detected_level="info" |= "x"`,
    )
  }))

it.effect("buildLogQuery requires a selector and keeps --query exclusive", () =>
  Effect.gen(function* () {
    expect((yield* Effect.flip(buildLogQuery({ contains: ["x"] }))).message).toContain("--service or --label")
    expect(yield* buildLogQuery({ query: `{app="x"} |= "y"` })).toBe(`{app="x"} |= "y"`)
    expect((yield* Effect.flip(buildLogQuery({ query: "{a=\"b\"}", service: "api", levels: ["error"] }))).message)
      .toBe("--query is a complete LogQL query; drop --service, --level or fold them into the query")
  }))

it.effect("parseLabelMatcher accepts the four LogQL operators", () =>
  Effect.gen(function* () {
    expect(yield* parseLabelMatcher("env!=dev")).toEqual({ name: "env", op: "!=", value: "dev" })
    expect(yield* parseLabelMatcher("pod!~api-.*")).toEqual({ name: "pod", op: "!~", value: "api-.*" })
    expect(yield* parseLabelMatcher("url=a=b")).toEqual({ name: "url", op: "=", value: "a=b" })
    expect((yield* Effect.flip(parseLabelMatcher("service.name=api")))._tag).toBe("InvalidLogQuery")
  }))

it.effect("buildMetricQuery wraps counts and unwraps numeric fields", () =>
  Effect.gen(function* () {
    const logQuery = `{service_name="api"}`
    expect(yield* buildMetricQuery({ logQuery, aggregation: "count", groupBy: ["detected_level"], rangeSeconds: 3600 })).toBe(
      `sum by (detected_level) (count_over_time({service_name="api"} [3600s]))`,
    )
    expect(yield* buildMetricQuery({ logQuery, aggregation: "rate", rangeSeconds: 60 })).toBe(
      `sum (rate({service_name="api"} [60s]))`,
    )
    expect(
      yield* buildMetricQuery({ logQuery, aggregation: "p99", aggregateOn: "duration_ms", parser: "json", rangeSeconds: 300 }),
    ).toBe(`quantile_over_time(0.99, {service_name="api"} | json | unwrap duration_ms | __error__="" [300s]) by ()`)
    expect(
      yield* buildMetricQuery({ logQuery, aggregation: "avg", aggregateOn: "bytes", groupBy: ["a,b"], rangeSeconds: 60 }),
    ).toBe(`avg_over_time({service_name="api"} | unwrap bytes | __error__="" [60s]) by (a, b)`)
  }))

it.effect("buildMetricQuery validates its inputs", () =>
  Effect.gen(function* () {
    const base = { logQuery: `{a="b"}`, rangeSeconds: 60 }
    expect((yield* Effect.flip(buildMetricQuery({ ...base, aggregation: "median" }))).message).toContain("Unknown --aggregation")
    expect((yield* Effect.flip(buildMetricQuery({ ...base, aggregation: "p95" }))).message).toBe(
      "--aggregation p95 needs --aggregate-on <field>",
    )
    expect((yield* Effect.flip(buildMetricQuery({ ...base, aggregation: "count", aggregateOn: "x" }))).message).toContain(
      "does not apply",
    )
    expect((yield* Effect.flip(buildMetricQuery({ ...base, aggregation: "count", parser: "regexp" }))).message).toContain(
      "--parser",
    )
  }))
