import { Context, Data, Effect, Layer, Schema } from "effect"
import { ApiClient } from "./ApiClient.js"
import { Datasources } from "./Datasources.js"
import * as LogQL from "./LogQL.js"
import { autoStepSeconds, QueryData, type QueryResponse } from "./Metrics.js"
import { parseDurationSeconds, parseInstant, resolveRange } from "./TimeRange.js"

// Adapter for the logs role over Loki's HTTP API, through Grafana's datasource proxy.

const StreamsData = Schema.Struct({
  resultType: Schema.Literal("streams"),
  result: Schema.Array(Schema.Struct({
    stream: Schema.Record(Schema.String, Schema.String),
    // [unix nanoseconds, line] (a third element carries metadata when categorized labels are on)
    values: Schema.Array(Schema.Array(Schema.Unknown)),
  })),
})

export const LokiResponse = Schema.Struct({
  status: Schema.String,
  data: Schema.Union([StreamsData, QueryData]),
  warnings: Schema.optionalKey(Schema.Array(Schema.String)),
})
export type LokiResponse = typeof LokiResponse.Type

export class UnexpectedLokiResult extends Data.TaggedError("UnexpectedLokiResult")<{ readonly message: string }> {}

export interface LogEntry {
  // Unix nanoseconds as a string, exactly as Loki returned it.
  readonly timestamp: string
  readonly time: string
  readonly labels: Readonly<Record<string, string>>
  readonly line: string
}

export interface LogsResult {
  readonly query: string
  readonly entries: ReadonlyArray<LogEntry>
  readonly limit: number
  readonly warnings: ReadonlyArray<string>
}

export interface LogsSearchInput extends LogQL.LogFilterInput {
  readonly from: string
  readonly to?: string | undefined
  readonly limit: number
}

export interface LogsContextInput extends LogQL.LogFilterInput {
  readonly at: string
  readonly before: number
  readonly after: number
  // How far from the anchor to look on each side.
  readonly window: string
}

export interface LogsAggregateInput extends LogQL.LogFilterInput {
  readonly aggregation: string
  readonly aggregateOn?: string | undefined
  readonly parser?: string | undefined
  readonly groupBy?: ReadonlyArray<string> | undefined
  readonly timeSeries: boolean
  readonly step?: string | undefined
  readonly from: string
  readonly to?: string | undefined
}

export interface LogsAggregateResult {
  readonly query: string
  readonly response: QueryResponse
  readonly autoStepSeconds?: number | undefined
}

const nanos = (ms: number): string => `${BigInt(Math.trunc(ms)) * 1_000_000n}`

export const nanosToIso = (value: string): string => {
  const ns = BigInt(value)
  const iso = new Date(Number(ns / 1_000_000n)).toISOString()
  // Keep sub-millisecond precision: log lines within the same millisecond stay ordered.
  const sub = (ns % 1_000_000n).toString().padStart(6, "0")
  return sub === "000000" ? iso : iso.replace("Z", `${sub}Z`)
}

// Loki groups lines by stream; flatten into one timeline, newest first unless asked otherwise.
export const entriesOf = (response: LokiResponse, order: "desc" | "asc" = "desc"): ReadonlyArray<LogEntry> => {
  if (response.data.resultType !== "streams") return []
  const entries = response.data.result.flatMap((stream) =>
    stream.values.flatMap((value): ReadonlyArray<LogEntry> => {
      const [timestamp, line] = value
      if (typeof timestamp !== "string" || typeof line !== "string") return []
      return [{ timestamp, time: nanosToIso(timestamp), labels: stream.stream, line }]
    })
  )
  const sign = order === "desc" ? -1 : 1
  return entries.sort((a, b) => {
    const diff = BigInt(a.timestamp) - BigInt(b.timestamp)
    return diff === 0n ? 0 : diff > 0n ? sign : -sign
  })
}

const asMetricResponse = (query: string, response: LokiResponse): Effect.Effect<QueryResponse, UnexpectedLokiResult> =>
  response.data.resultType === "streams"
    ? Effect.fail(new UnexpectedLokiResult({ message: `Expected a metric result for ${query}, got log streams` }))
    : Effect.succeed({ status: response.status, data: response.data, warnings: response.warnings })

export const DetectedFieldsResponse = Schema.Struct({
  fields: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.Struct({
    label: Schema.String,
    type: Schema.optionalKey(Schema.String),
    cardinality: Schema.optionalKey(Schema.Number),
    parsers: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.String))),
  })))),
})

// A field Loki found in lines (via a parser) or in structured metadata (no parser).
export interface DetectedField {
  readonly name: string
  readonly type?: string | undefined
  readonly cardinality?: number | undefined
  readonly parsers: ReadonlyArray<string>
}

const StringList = Schema.Struct({ data: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.String))) })

export class Logs extends Context.Service<Logs, {
  readonly search: (input: LogsSearchInput) => Effect.Effect<LogsResult, unknown>
  readonly context: (input: LogsContextInput) => Effect.Effect<LogsResult, unknown>
  readonly aggregate: (input: LogsAggregateInput) => Effect.Effect<LogsAggregateResult, unknown>
  readonly labelValues: (label: string, input: { readonly from: string; readonly to?: string | undefined; readonly selector?: string | undefined }) => Effect.Effect<ReadonlyArray<string>, unknown>
  readonly labels: (input: { readonly from: string; readonly to?: string | undefined; readonly selector?: string | undefined }) => Effect.Effect<ReadonlyArray<string>, unknown>
  readonly detectedFields: (query: string, input: { readonly from: string; readonly to?: string | undefined }) => Effect.Effect<ReadonlyArray<DetectedField>, unknown>
}>()(
  "Logs",
  {
    make: Effect.gen(function* () {
      const client = yield* ApiClient
      const datasources = yield* Datasources
      const proxy = Effect.map(datasources.resolve("logs"), (ds) => `/api/datasources/proxy/uid/${encodeURIComponent(ds.uid)}/loki/api/v1`)

      const queryRange = (params: ReadonlyArray<readonly [string, string | number | undefined]>) =>
        Effect.flatMap(proxy, (base) => client.getJson(LokiResponse, `${base}/query_range`, params))

      return {
        search: (input) =>
          Effect.gen(function* () {
            const query = yield* LogQL.buildLogQuery(input)
            const { start, end } = yield* resolveRange(input.from, input.to)
            const response = yield* queryRange([
              ["query", query],
              ["start", nanos(start)],
              ["end", nanos(end)],
              ["limit", input.limit],
              ["direction", "backward"],
            ])
            return { query, entries: entriesOf(response), limit: input.limit, warnings: response.warnings ?? [] }
          }),

        context: (input) =>
          Effect.gen(function* () {
            const query = yield* LogQL.buildLogQuery(input)
            const at = yield* parseInstant(input.at)
            const windowMs = (yield* parseDurationSeconds(input.window)) * 1_000
            // Loki's range is [start, end): the anchor millisecond belongs to the "before" side.
            const [before, after] = yield* Effect.all([
              queryRange([
                ["query", query],
                ["start", nanos(at - windowMs)],
                ["end", nanos(at + 1)],
                ["limit", input.before],
                ["direction", "backward"],
              ]),
              queryRange([
                ["query", query],
                ["start", nanos(at + 1)],
                ["end", nanos(at + windowMs)],
                ["limit", input.after],
                ["direction", "forward"],
              ]),
            ], { concurrency: 2 })
            return {
              query,
              entries: [...entriesOf(before, "asc"), ...entriesOf(after, "asc")],
              limit: input.before + input.after,
              warnings: [...(before.warnings ?? []), ...(after.warnings ?? [])],
            }
          }),

        aggregate: (input) =>
          Effect.gen(function* () {
            const logQuery = yield* LogQL.buildLogQuery(input)
            const { start, end } = yield* resolveRange(input.from, input.to)
            const base = yield* proxy
            if (!input.timeSeries) {
              if (input.step !== undefined) {
                return yield* new LogQL.InvalidLogQuery({ message: "--step only applies with --time-series" })
              }
              // One value per group over the whole window, evaluated at its end.
              const query = yield* LogQL.buildMetricQuery({ ...input, logQuery, rangeSeconds: (end - start) / 1_000 })
              const response = yield* client.getJson(LokiResponse, `${base}/query`, [["query", query], ["time", nanos(end)]])
              return { query, response: yield* asMetricResponse(query, response) }
            }
            const step = input.step === undefined ? undefined : yield* parseDurationSeconds(input.step)
            const autoStep = step === undefined ? autoStepSeconds(start, end) : undefined
            const query = yield* LogQL.buildMetricQuery({ ...input, logQuery, rangeSeconds: step ?? autoStep! })
            const response = yield* queryRange([
              ["query", query],
              ["start", nanos(start)],
              ["end", nanos(end)],
              ["step", `${step ?? autoStep}s`],
            ])
            return { query, response: yield* asMetricResponse(query, response), autoStepSeconds: autoStep }
          }),

        labelValues: (label, input) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(input.from, input.to)
            const response = yield* client.getJson(
              StringList,
              `${base}/label/${encodeURIComponent(label)}/values`,
              [["start", nanos(start)], ["end", nanos(end)], ["query", input.selector]],
            )
            const values = response.data ?? []
            // Structured metadata (e.g. detected_level, trace_id) isn't an indexed label, so the
            // label API knows nothing about it; group a count by it instead.
            if (values.length > 0 || input.selector === undefined || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(label)) return values
            const query = `sum by (${label}) (count_over_time(${input.selector} [${LogQL.logqlDuration((end - start) / 1_000)}]))`
            const grouped = yield* client.getJson(LokiResponse, `${base}/query`, [["query", query], ["time", nanos(end)]])
            if (grouped.data.resultType !== "vector") return []
            return [...new Set(grouped.data.result.flatMap((series) => {
              const value = series.metric[label]
              return value === undefined || value === "" ? [] : [value]
            }))].sort()
          }),

        labels: (input) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(input.from, input.to)
            const response = yield* client.getJson(StringList, `${base}/labels`, [
              ["start", nanos(start)],
              ["end", nanos(end)],
              ["query", input.selector],
            ])
            return response.data ?? []
          }),

        detectedFields: (query, input) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(input.from, input.to)
            const response = yield* client.getJson(DetectedFieldsResponse, `${base}/detected_fields`, [
              ["query", query],
              ["start", nanos(start)],
              ["end", nanos(end)],
            ])
            return (response.fields ?? []).map((field) => ({
              name: field.label,
              type: field.type,
              cardinality: field.cardinality,
              parsers: field.parsers ?? [],
            }))
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
