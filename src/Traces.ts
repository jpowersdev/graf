import { Context, Effect, Layer, Schema } from "effect"
import { ApiClient } from "./ApiClient.js"
import { Datasources } from "./Datasources.js"
import { autoStepSeconds } from "./Metrics.js"
import { parseDurationSeconds, resolveRange } from "./TimeRange.js"
import * as TraceQL from "./TraceQL.js"

// Adapter for the traces role over Tempo's HTTP API, through Grafana's datasource proxy.

const AnyValue = Schema.Struct({
  stringValue: Schema.optionalKey(Schema.String),
  intValue: Schema.optionalKey(Schema.Union([Schema.String, Schema.Number])),
  doubleValue: Schema.optionalKey(Schema.Number),
  boolValue: Schema.optionalKey(Schema.Boolean),
})
const KeyValue = Schema.Struct({ key: Schema.String, value: Schema.optionalKey(AnyValue) })
type KeyValue = typeof KeyValue.Type

const SearchSpan = Schema.Struct({
  spanID: Schema.String,
  name: Schema.optionalKey(Schema.NullOr(Schema.String)),
  startTimeUnixNano: Schema.String,
  durationNanos: Schema.String,
  attributes: Schema.optionalKey(Schema.Array(KeyValue)),
})

const SpanSet = Schema.Struct({
  spans: Schema.optionalKey(Schema.Array(SearchSpan)),
  matched: Schema.optionalKey(Schema.Number),
})

export const SearchResponse = Schema.Struct({
  traces: Schema.optionalKey(Schema.Array(Schema.Struct({
    traceID: Schema.String,
    rootServiceName: Schema.optionalKey(Schema.String),
    rootTraceName: Schema.optionalKey(Schema.String),
    startTimeUnixNano: Schema.String,
    durationMs: Schema.optionalKey(Schema.Number),
    spanSets: Schema.optionalKey(Schema.Array(SpanSet)),
    spanSet: Schema.optionalKey(SpanSet),
  }))),
  metrics: Schema.optionalKey(Schema.Struct({
    completedJobs: Schema.optionalKey(Schema.Number),
    totalJobs: Schema.optionalKey(Schema.Number),
  })),
})
export type SearchResponse = typeof SearchResponse.Type

const OtlpSpan = Schema.Struct({
  traceId: Schema.optionalKey(Schema.String),
  spanId: Schema.String,
  parentSpanId: Schema.optionalKey(Schema.NullOr(Schema.String)),
  name: Schema.String,
  kind: Schema.optionalKey(Schema.String),
  startTimeUnixNano: Schema.String,
  endTimeUnixNano: Schema.String,
  attributes: Schema.optionalKey(Schema.Array(KeyValue)),
  status: Schema.optionalKey(Schema.Struct({
    code: Schema.optionalKey(Schema.String),
    message: Schema.optionalKey(Schema.String),
  })),
  events: Schema.optionalKey(Schema.Array(Schema.Struct({
    name: Schema.optionalKey(Schema.String),
    timeUnixNano: Schema.optionalKey(Schema.String),
    attributes: Schema.optionalKey(Schema.Array(KeyValue)),
  }))),
})

export const TraceResponse = Schema.Struct({
  trace: Schema.optionalKey(Schema.Struct({
    resourceSpans: Schema.optionalKey(Schema.Array(Schema.Struct({
      resource: Schema.optionalKey(Schema.Struct({ attributes: Schema.optionalKey(Schema.Array(KeyValue)) })),
      scopeSpans: Schema.optionalKey(Schema.Array(Schema.Struct({ spans: Schema.optionalKey(Schema.Array(OtlpSpan)) }))),
    }))),
  })),
})
export type TraceResponse = typeof TraceResponse.Type

const MetricsSeries = Schema.Struct({
  labels: Schema.optionalKey(Schema.Array(KeyValue)),
  value: Schema.optionalKey(Schema.Number),
  samples: Schema.optionalKey(Schema.Array(Schema.Struct({
    timestampMs: Schema.Union([Schema.String, Schema.Number]),
    value: Schema.Number,
  }))),
})
export const MetricsResponse = Schema.Struct({
  series: Schema.optionalKey(Schema.NullOr(Schema.Array(MetricsSeries))),
})
export type MetricsResponse = typeof MetricsResponse.Type

export type AttributeValue = string | number | boolean | undefined

export const attributeValue = (value: typeof AnyValue.Type | undefined): AttributeValue => {
  if (value === undefined) return undefined
  if (value.stringValue !== undefined) return value.stringValue
  if (value.intValue !== undefined) return Number(value.intValue)
  if (value.doubleValue !== undefined) return value.doubleValue
  return value.boolValue
}

export const attributeMap = (attributes: ReadonlyArray<KeyValue> | undefined): Record<string, AttributeValue> =>
  Object.fromEntries((attributes ?? []).map((kv) => [kv.key, attributeValue(kv.value)]))

const nanosToMs = (nanos: string): number => Number(BigInt(nanos) / 1_000n) / 1_000
const nanosToIso = (nanos: string): string => new Date(Number(BigInt(nanos) / 1_000_000n)).toISOString()

// ---- search ----

export interface TraceSummary {
  readonly traceId: string
  readonly start: string
  readonly rootService?: string | undefined
  readonly rootName?: string | undefined
  readonly durationMs?: number | undefined
  readonly matchedSpans: number
}

export interface SpanSummary {
  readonly traceId: string
  readonly spanId: string
  readonly start: string
  readonly service?: AttributeValue
  readonly name?: string | undefined
  readonly durationMs: number
  readonly status?: AttributeValue
  readonly statusMessage?: AttributeValue
}

export interface TracesSearchResult {
  readonly query: string
  readonly traces: ReadonlyArray<TraceSummary>
  readonly spans: ReadonlyArray<SpanSummary>
  readonly limit: number
  // Tempo search stops once it has `limit` traces; it is not an exhaustive scan.
  readonly partial: boolean
}

const spanSetsOf = (trace: NonNullable<SearchResponse["traces"]>[number]) =>
  trace.spanSets ?? (trace.spanSet === undefined ? [] : [trace.spanSet])

export const summarizeSearch = (query: string, response: SearchResponse, limit: number): TracesSearchResult => {
  const traces = response.traces ?? []
  return {
    query,
    limit,
    partial: traces.length >= limit
      || (response.metrics?.completedJobs !== undefined && response.metrics.totalJobs !== undefined
        && response.metrics.completedJobs < response.metrics.totalJobs),
    traces: traces.map((trace) => ({
      traceId: TraceQL.normalizeTraceId(trace.traceID),
      start: nanosToIso(trace.startTimeUnixNano),
      rootService: trace.rootServiceName,
      rootName: trace.rootTraceName,
      durationMs: trace.durationMs,
      matchedSpans: spanSetsOf(trace).reduce((sum, set) => sum + (set.matched ?? set.spans?.length ?? 0), 0),
    })),
    spans: traces.flatMap((trace) =>
      spanSetsOf(trace).flatMap((set) =>
        (set.spans ?? []).map((span) => {
          const attributes = attributeMap(span.attributes)
          return {
            traceId: TraceQL.normalizeTraceId(trace.traceID),
            spanId: span.spanID,
            start: nanosToIso(span.startTimeUnixNano),
            service: attributes["service.name"],
            name: span.name ?? undefined,
            durationMs: nanosToMs(span.durationNanos),
            status: attributes["status"],
            statusMessage: attributes["statusMessage"],
          }
        })
      )
    ),
  }
}

// ---- trace waterfall ----

export interface WaterfallSpan {
  readonly spanId: string
  readonly parentSpanId?: string | undefined
  readonly depth: number
  readonly service?: AttributeValue
  readonly name: string
  readonly kind?: string | undefined
  readonly offsetMs: number
  readonly durationMs: number
  readonly status?: string | undefined
  readonly statusMessage?: string | undefined
  readonly attributes: Record<string, AttributeValue>
  readonly events: ReadonlyArray<{ readonly name?: string | undefined; readonly offsetMs?: number | undefined; readonly attributes: Record<string, AttributeValue> }>
}

export interface Waterfall {
  readonly traceId: string
  readonly start?: string | undefined
  readonly durationMs: number
  readonly services: ReadonlyArray<string>
  readonly spans: ReadonlyArray<WaterfallSpan>
}

const shortEnum = (value: string | undefined, prefix: string): string | undefined =>
  value === undefined ? undefined : value.startsWith(prefix) ? value.slice(prefix.length).toLowerCase() : value.toLowerCase()

// Depth-first order under each root, siblings by start time; orphans (parent not in the
// trace, e.g. still ingesting) are treated as roots.
export const buildWaterfall = (traceId: string, response: TraceResponse): Waterfall => {
  const flat = (response.trace?.resourceSpans ?? []).flatMap((resourceSpans) => {
    const resource = attributeMap(resourceSpans.resource?.attributes)
    return (resourceSpans.scopeSpans ?? []).flatMap((scope) => (scope.spans ?? []).map((span) => ({ span, resource })))
  })
  if (flat.length === 0) return { traceId, durationMs: 0, services: [], spans: [] }

  const start = flat.reduce((min, { span }) => {
    const value = BigInt(span.startTimeUnixNano)
    return value < min ? value : min
  }, BigInt(flat[0]!.span.startTimeUnixNano))
  const end = flat.reduce((max, { span }) => {
    const value = BigInt(span.endTimeUnixNano)
    return value > max ? value : max
  }, 0n)

  const ids = new Set(flat.map(({ span }) => TraceQL.base64ToHex(span.spanId)))
  const children = new Map<string | undefined, Array<typeof flat[number]>>()
  for (const entry of flat) {
    const parent = TraceQL.base64ToHex(entry.span.parentSpanId)
    const key = parent !== undefined && ids.has(parent) ? parent : undefined
    const list = children.get(key) ?? []
    list.push(entry)
    children.set(key, list)
  }
  for (const list of children.values()) {
    list.sort((a, b) => {
      const diff = BigInt(a.span.startTimeUnixNano) - BigInt(b.span.startTimeUnixNano)
      return diff === 0n ? 0 : diff > 0n ? 1 : -1
    })
  }

  const offsetMs = (nanos: string): number => Number((BigInt(nanos) - start) / 1_000n) / 1_000
  const spans: Array<WaterfallSpan> = []
  const visit = (parent: string | undefined, depth: number) => {
    for (const { span, resource } of children.get(parent) ?? []) {
      const spanId = TraceQL.base64ToHex(span.spanId)!
      spans.push({
        spanId,
        parentSpanId: TraceQL.base64ToHex(span.parentSpanId),
        depth,
        service: resource["service.name"],
        name: span.name,
        kind: shortEnum(span.kind, "SPAN_KIND_"),
        offsetMs: offsetMs(span.startTimeUnixNano),
        durationMs: Number((BigInt(span.endTimeUnixNano) - BigInt(span.startTimeUnixNano)) / 1_000n) / 1_000,
        status: shortEnum(span.status?.code, "STATUS_CODE_"),
        statusMessage: span.status?.message,
        attributes: attributeMap(span.attributes),
        events: (span.events ?? []).map((event) => ({
          name: event.name,
          offsetMs: event.timeUnixNano === undefined ? undefined : offsetMs(event.timeUnixNano),
          attributes: attributeMap(event.attributes),
        })),
      })
      visit(spanId, depth + 1)
    }
  }
  visit(undefined, 0)

  return {
    traceId,
    start: new Date(Number(start / 1_000_000n)).toISOString(),
    durationMs: Number((end - start) / 1_000n) / 1_000,
    services: [...new Set(spans.flatMap((span) => span.service === undefined ? [] : [String(span.service)]))],
    spans,
  }
}

// ---- TraceQL metrics ----

export type Row = Record<string, AttributeValue>

export const seriesLabels = (series: typeof MetricsSeries.Type): Record<string, AttributeValue> =>
  attributeMap(series.labels)

const groupKey = (labels: Record<string, AttributeValue>, groupBy: ReadonlyArray<string>): string =>
  JSON.stringify(groupBy.map((key) => labels[key]))

// Join instant results from several TraceQL metric queries into one row per group.
export const joinInstant = (
  groupBy: ReadonlyArray<string>,
  columns: ReadonlyArray<{ readonly name: string; readonly response: MetricsResponse; readonly quantile?: number }>,
): ReadonlyArray<Row> => {
  const rows = new Map<string, Row>()
  for (const column of columns) {
    for (const series of column.response.series ?? []) {
      const labels = seriesLabels(series)
      if (column.quantile !== undefined && labels["p"] !== column.quantile) continue
      const key = groupKey(labels, groupBy)
      const row = rows.get(key) ?? Object.fromEntries(groupBy.map((name) => [name, labels[name]]))
      row[column.name] = series.value
      rows.set(key, row)
    }
  }
  return [...rows.values()]
}

export interface TracesMetricsInput extends TraceQL.SpanFilterInput {
  readonly groupBy: ReadonlyArray<string>
  readonly from: string
  readonly to?: string | undefined
}

export interface TimeSeriesResult {
  readonly query: string
  readonly response: MetricsResponse
  readonly autoStepSeconds?: number | undefined
}

export const TagValuesResponse = Schema.Struct({
  tagValues: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.Struct({
    type: Schema.optionalKey(Schema.String),
    value: Schema.optionalKey(Schema.String),
  })))),
})

export const TagsResponse = Schema.Struct({
  scopes: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.Struct({
    name: Schema.String,
    tags: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.String))),
  })))),
})

export class Traces extends Context.Service<Traces, {
  readonly search: (input: TraceQL.SpanFilterInput & { readonly from: string; readonly to?: string | undefined; readonly limit: number; readonly spansPerTrace: number; readonly spans: boolean }) => Effect.Effect<TracesSearchResult, unknown>
  readonly get: (traceId: string) => Effect.Effect<Waterfall, unknown>
  readonly instant: (query: string, range: { readonly from: string; readonly to?: string | undefined }) => Effect.Effect<MetricsResponse, unknown>
  readonly range: (query: string, range: { readonly from: string; readonly to?: string | undefined; readonly step?: string | undefined }) => Effect.Effect<TimeSeriesResult, unknown>
  readonly attributeNames: (scope: string | undefined, range: { readonly from: string; readonly to?: string | undefined }) => Effect.Effect<ReadonlyArray<{ readonly scope: string; readonly name: string }>, unknown>
  readonly attributeValues: (attribute: string, range: { readonly from: string; readonly to?: string | undefined; readonly query?: string | undefined }) => Effect.Effect<ReadonlyArray<string>, unknown>
}>()(
  "Traces",
  {
    make: Effect.gen(function* () {
      const client = yield* ApiClient
      const datasources = yield* Datasources
      const proxy = Effect.map(datasources.resolve("traces"), (ds) => `/api/datasources/proxy/uid/${encodeURIComponent(ds.uid)}/api`)
      const seconds = (ms: number) => Math.floor(ms / 1_000)

      return {
        search: (input) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const built = yield* TraceQL.buildSpanQuery(input)
            const query = input.spans ? TraceQL.withSpanDetails(built) : built
            const { start, end } = yield* resolveRange(input.from, input.to)
            const response = yield* client.getJson(SearchResponse, `${base}/search`, [
              ["q", query],
              ["limit", input.limit],
              ["spss", input.spansPerTrace],
              ["start", seconds(start)],
              ["end", Math.ceil(end / 1_000)],
            ])
            return summarizeSearch(query, response, input.limit)
          }),

        get: (traceId) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const id = TraceQL.normalizeTraceId(traceId)
            const response = yield* client.getJson(TraceResponse, `${base}/v2/traces/${encodeURIComponent(id)}`)
            return buildWaterfall(id, response)
          }),

        instant: (query, range) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(range.from, range.to)
            return yield* client.getJson(MetricsResponse, `${base}/metrics/query`, [
              ["q", query],
              ["start", seconds(start)],
              ["end", Math.ceil(end / 1_000)],
            ])
          }),

        range: (query, range) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(range.from, range.to)
            const step = range.step === undefined ? undefined : yield* parseDurationSeconds(range.step)
            const autoStep = step === undefined ? autoStepSeconds(start, end) : undefined
            const response = yield* client.getJson(MetricsResponse, `${base}/metrics/query_range`, [
              ["q", query],
              ["start", seconds(start)],
              ["end", Math.ceil(end / 1_000)],
              ["step", `${step ?? autoStep}s`],
            ])
            return { query, response, autoStepSeconds: autoStep }
          }),

        attributeNames: (scope, range) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(range.from, range.to)
            const response = yield* client.getJson(TagsResponse, `${base}/v2/search/tags`, [
              ["scope", scope],
              ["start", seconds(start)],
              ["end", Math.ceil(end / 1_000)],
            ])
            return (response.scopes ?? []).flatMap((entry) =>
              (entry.tags ?? []).map((tag) => ({
                scope: entry.name,
                // Intrinsics (name, status, duration, ...) are used unscoped in TraceQL.
                name: entry.name === "intrinsic" ? tag : `${entry.name}.${tag}`,
              }))
            ).sort((a, b) => a.name.localeCompare(b.name))
          }),

        attributeValues: (attribute, range) =>
          Effect.gen(function* () {
            const base = yield* proxy
            const { start, end } = yield* resolveRange(range.from, range.to)
            const response = yield* client.getJson(
              TagValuesResponse,
              `${base}/v2/search/tag/${encodeURIComponent(TraceQL.attributeName(attribute))}/values`,
              [["q", range.query], ["start", seconds(start)], ["end", Math.ceil(end / 1_000)]],
            )
            return (response.tagValues ?? []).flatMap((entry) => entry.value === undefined ? [] : [entry.value]).sort()
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
