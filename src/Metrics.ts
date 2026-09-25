import { Context, Effect, Layer, Schema } from "effect"
import { ApiClient } from "./ApiClient.js"
import { Datasources } from "./Datasources.js"
import { parseDurationSeconds, resolveRange } from "./TimeRange.js"

// Adapter for the metrics role over the Prometheus HTTP API (Prometheus, Mimir, Thanos, ...),
// reached through Grafana's datasource proxy.

const Warnings = {
  warnings: Schema.optionalKey(Schema.Array(Schema.String)),
  infos: Schema.optionalKey(Schema.Array(Schema.String)),
}

export const StringListResponse = Schema.Struct({
  status: Schema.String,
  data: Schema.Array(Schema.String),
  ...Warnings,
})

export const MetadataResponse = Schema.Struct({
  status: Schema.String,
  data: Schema.Record(
    Schema.String,
    Schema.Array(Schema.Struct({
      type: Schema.optionalKey(Schema.String),
      help: Schema.optionalKey(Schema.String),
      unit: Schema.optionalKey(Schema.String),
    })),
  ),
})

// [unix seconds, value as string]
const Sample = Schema.Tuple([Schema.Number, Schema.String])
const Labels = Schema.Record(Schema.String, Schema.String)

export const QueryData = Schema.Union([
  Schema.Struct({ resultType: Schema.Literal("matrix"), result: Schema.Array(Schema.Struct({ metric: Labels, values: Schema.Array(Sample) })) }),
  Schema.Struct({ resultType: Schema.Literal("vector"), result: Schema.Array(Schema.Struct({ metric: Labels, value: Sample })) }),
  Schema.Struct({ resultType: Schema.Literal("scalar"), result: Sample }),
  Schema.Struct({ resultType: Schema.Literal("string"), result: Sample }),
])
export type QueryData = typeof QueryData.Type

export const QueryResponse = Schema.Struct({
  status: Schema.String,
  data: QueryData,
  ...Warnings,
})
export type QueryResponse = typeof QueryResponse.Type

export interface MetricSummary {
  readonly name: string
  readonly type: string
  readonly unit?: string | undefined
  readonly description?: string | undefined
}

export interface MetricLabel {
  readonly key: string
  readonly valueCount: number
  readonly values: ReadonlyArray<string>
}

export interface MetricDescription extends MetricSummary {
  readonly typeSource: "metadata" | "name"
  readonly labels: ReadonlyArray<MetricLabel>
}

export interface Range {
  readonly from: string
  readonly to?: string | undefined
}

export interface MetricsQueryInput extends Range {
  readonly query: string
  readonly step?: string | undefined
  readonly instant?: boolean | undefined
}

export interface MetricsQueryResult {
  readonly response: QueryResponse
  // Set when graf picked the step because none was given.
  readonly autoStepSeconds?: number | undefined
}

// Some backends (Mimir fed by OTLP, for one) keep no metric metadata, so fall back to
// the Prometheus/OpenMetrics naming conventions.
export const inferMetricType = (name: string): string => {
  if (name.endsWith("_bucket")) return "histogram"
  if (name.endsWith("_total")) return "counter"
  if (name.endsWith("_count") || name.endsWith("_sum")) return "histogram|summary"
  return "unknown"
}

const escapeRegex = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

export const nameSearchMatcher = (search: string): string =>
  `{__name__=~${JSON.stringify(`(?i).*${escapeRegex(search)}.*`)}}`

export const nameMatcher = (name: string): string => `{__name__=${JSON.stringify(name)}}`

// Aim for ~300 points per series (well under Prometheus' 11k cap), never below 15s.
export const autoStepSeconds = (startMs: number, endMs: number): number =>
  Math.max(15, Math.ceil((endMs - startMs) / 1_000 / 300))

const seconds = (ms: number): number => Math.floor(ms / 1_000)

export const summarize = (
  names: ReadonlyArray<string>,
  metadata: typeof MetadataResponse.Type["data"],
): ReadonlyArray<MetricSummary> =>
  names.map((name) => {
    const meta = metadata[name]?.[0]
    return {
      name,
      type: meta?.type ?? inferMetricType(name),
      unit: meta?.unit === "" ? undefined : meta?.unit,
      description: meta?.help === "" ? undefined : meta?.help,
    }
  })

export class Metrics extends Context.Service<Metrics, {
  readonly list: (input: Range & { readonly search?: string | undefined; readonly limit?: number | undefined }) => Effect.Effect<ReadonlyArray<MetricSummary>, unknown>
  readonly describe: (name: string, input: Range) => Effect.Effect<MetricDescription, unknown>
  readonly query: (input: MetricsQueryInput) => Effect.Effect<MetricsQueryResult, unknown>
}>()(
  "Metrics",
  {
    make: Effect.gen(function* () {
      const client = yield* ApiClient
      const datasources = yield* Datasources
      const proxy = Effect.map(datasources.resolve("metrics"), (ds) => `/api/datasources/proxy/uid/${encodeURIComponent(ds.uid)}`)

      // Metadata is best-effort: an empty or failing endpoint only loses type/unit/help.
      const metadataFor = (base: string, metric?: string) =>
        client.getJson(MetadataResponse, `${base}/api/v1/metadata`, [["metric", metric], ["limit_per_metric", 1]]).pipe(
          Effect.map((response) => response.data),
          Effect.orElseSucceed((): typeof MetadataResponse.Type["data"] => ({})),
        )

      return {
        list: (input) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(input.from, input.to)
            const [names, metadata] = yield* Effect.all([
              client.getJson(StringListResponse, `${base}/api/v1/label/__name__/values`, [
                ["match[]", input.search === undefined ? undefined : nameSearchMatcher(input.search)],
                ["start", seconds(start)],
                ["end", seconds(end)],
              ]),
              metadataFor(base),
            ], { concurrency: "unbounded" })
            const limited = input.limit === undefined ? names.data : names.data.slice(0, input.limit)
            return summarize(limited, metadata)
          }),

        describe: (name, input) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(input.from, input.to)
            const range = [["match[]", nameMatcher(name)], ["start", seconds(start)], ["end", seconds(end)]] as const
            const [labelNames, metadata] = yield* Effect.all([
              client.getJson(StringListResponse, `${base}/api/v1/labels`, range),
              metadataFor(base, name),
            ], { concurrency: "unbounded" })
            const labels = yield* Effect.forEach(
              labelNames.data.filter((label) => label !== "__name__"),
              (key) =>
                client.getJson(StringListResponse, `${base}/api/v1/label/${encodeURIComponent(key)}/values`, range).pipe(
                  Effect.map((values): MetricLabel => ({ key, valueCount: values.data.length, values: values.data })),
                ),
              { concurrency: 8 },
            )
            const [summary] = summarize([name], metadata)
            return {
              ...summary!,
              typeSource: metadata[name] === undefined ? "name" : "metadata",
              labels,
            } satisfies MetricDescription
          }),

        query: (input) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(input.from, input.to)
            if (input.instant === true) {
              const response = yield* client.getJson(QueryResponse, `${base}/api/v1/query`, [
                ["query", input.query],
                ["time", end / 1_000],
              ])
              return { response }
            }
            const step = input.step === undefined ? undefined : yield* parseDurationSeconds(input.step)
            const autoStep = step === undefined ? autoStepSeconds(start, end) : undefined
            const response = yield* client.getJson(QueryResponse, `${base}/api/v1/query_range`, [
              ["query", input.query],
              ["start", start / 1_000],
              ["end", end / 1_000],
              ["step", step ?? autoStep],
            ])
            return { response, autoStepSeconds: autoStep }
          }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(Datasources.Live),
    Layer.provide(ApiClient.Live),
  )
}
