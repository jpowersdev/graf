import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { GrafanaConfig } from "./Config.js"
import * as Flags from "./Flags.js"
import * as Output from "./Output.js"
import { printRows, type RowCell } from "./Rows.js"
import * as TraceQL from "./TraceQL.js"
import { joinInstant, type MetricsResponse, type Row, seriesLabels, subtree, Traces } from "./Traces.js"

const filterFlags = {
  service: Flag.String("service").pipe(
    Flag.optional,
    Flag.withDescription("Service name (resource.service.name)"),
  ),
  operation: Flag.String("operation").pipe(
    Flag.optional,
    Flag.withDescription("Span name, e.g. \"POST /checkout\""),
  ),
  error: Flag.Boolean("error").pipe(Flag.withDefault(false), 
    Flag.withDescription("Only spans with status = error"),
  ),
  minDuration: Flag.String("min-duration").pipe(
    Flag.optional,
    Flag.withDescription("Only spans at least this long, e.g. 500ms, 2s"),
  ),
  maxDuration: Flag.String("max-duration").pipe(
    Flag.optional,
    Flag.withDescription("Only spans at most this long"),
  ),
  attr: Flag.String("attr").pipe(
    Flag.atMost(20),
    Flag.withDescription("Attribute condition, repeatable: span.http.status_code>=500, resource.deployment.environment=prod, key=~regex"),
  ),
  filter: Flag.String("filter").pipe(
    Flag.optional,
    Flag.withDescription("Raw TraceQL condition ANDed into the span selector"),
  ),
  query: Flag.String("query").pipe(
    Flag.optional,
    Flag.withDescription("A complete TraceQL query (a span selector like '{ ... }' for errors/latency/operations)"),
  ),
}

type FilterFlags = {
  readonly service: Option.Option<string>
  readonly operation: Option.Option<string>
  readonly error: boolean
  readonly minDuration: Option.Option<string>
  readonly maxDuration: Option.Option<string>
  readonly attr: ReadonlyArray<string>
  readonly filter: Option.Option<string>
  readonly query: Option.Option<string>
}

const filterInput = (input: FilterFlags): TraceQL.SpanFilterInput => ({
  service: Option.getOrUndefined(input.service),
  operation: Option.getOrUndefined(input.operation),
  error: input.error,
  minDuration: Option.getOrUndefined(input.minDuration),
  maxDuration: Option.getOrUndefined(input.maxDuration),
  attrs: input.attr,
  filter: Option.getOrUndefined(input.filter),
  query: Option.getOrUndefined(input.query),
})

const printQuery = (query: string) => Console.error(`# traceql: ${query}`)

const round = (value: number | undefined, digits = 2): number | undefined =>
  value === undefined ? undefined : Math.round(value * 10 ** digits) / 10 ** digits

const cell = (value: unknown): RowCell =>
  value === undefined || value === null ? undefined : typeof value === "object" ? JSON.stringify(value) : value as RowCell

const printTable = (columns: ReadonlyArray<string>, rows: ReadonlyArray<Readonly<Record<string, unknown>>>, output: string) =>
  printRows(columns, rows.map((row) => columns.map((column) => cell(row[column]))), output, rows)

// Metric commands add conditions to the span selector, so a raw --query must be one.
const spanSelector = (input: TraceQL.SpanFilterInput) =>
  Effect.gen(function* () {
    const query = yield* TraceQL.buildSpanQuery(input)
    if (!/^\{.*\}$/s.test(query.trim())) {
      return yield* new TraceQL.InvalidTraceQuery({ message: `--query must be a span selector like '{ span.foo = "bar" }' here; got ${query}` })
    }
    return query
  })

const search = Command.make(
  "search",
  {
    ...filterFlags,
    spans: Flag.Boolean("spans").pipe(Flag.withDefault(false), 
      Flag.withDescription("One row per matching span (with service, name, status) instead of per trace"),
    ),
    orderBy: Flag.String("order-by").pipe(
      Flag.optional,
      Flag.withDescription("duration | start: sort the traces Tempo returned (it does not sort server-side)"),
    ),
    spansPerTrace: Flag.Int("spans-per-trace").pipe(
      Flag.withDefault(3),
      Flag.withDescription("Matching spans returned per trace"),
    ),
    from: Flags.from,
    to: Flags.to,
    limit: Flag.Int("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum number of traces (default: GRAFANA_DEFAULT_LIMIT or 100)"),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const traces = yield* Traces
      const result = yield* traces.search({
        ...filterInput(input),
        spans: input.spans,
        spansPerTrace: input.spansPerTrace,
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        limit: Option.getOrUndefined(input.limit) ?? config.defaultLimit,
      })
      yield* printQuery(result.query)
      const format = yield* Output.parseOutputFormat(input.output)
      const orderBy = Option.getOrUndefined(input.orderBy)
      if (orderBy !== undefined && orderBy !== "duration" && orderBy !== "start") {
        return yield* new TraceQL.InvalidTraceQuery({ message: `--order-by must be duration or start; got ${orderBy}` })
      }
      const sortRows = <A extends { readonly start: string; readonly durationMs?: number | undefined }>(rows: ReadonlyArray<A>) =>
        orderBy === undefined ? rows : [...rows].sort((a, b) =>
          orderBy === "duration" ? (b.durationMs ?? 0) - (a.durationMs ?? 0) : b.start.localeCompare(a.start)
        )
      if (input.spans) {
        yield* printTable(
          ["traceId", "spanId", "start", "service", "name", "durationMs", "status", "statusMessage"],
          sortRows(result.spans).map((span) => ({ ...span, durationMs: round(span.durationMs) })),
          format,
        )
      } else {
        yield* printTable(
          ["traceId", "start", "rootService", "rootName", "durationMs", "matchedSpans"],
          sortRows(result.traces).map((trace) => ({ ...trace })),
          format,
        )
      }
      if (orderBy === "duration" && result.traces.length > 0) {
        yield* Console.error(`# sorted within the ${result.traces.length} traces Tempo returned, not across all matches; add --min-duration to find slow ones`)
      }
      if (result.traces.length === 0) yield* Console.error("# 0 traces")
      else if (result.partial) {
        yield* Console.error(`# ${result.traces.length} traces; Tempo search is not exhaustive (raise --limit or narrow --from/--to)`)
      }
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Find traces (or, with --spans, spans) matching filters or a TraceQL query"))

const get = Command.make(
  "get",
  {
    traceId: Argument.String("trace-id").pipe(Argument.withDescription("Trace ID (hex; leading zeros optional)")),
    span: Flag.String("span").pipe(
      Flag.optional,
      Flag.withDescription("Only this span and its descendants, plus the span's attributes and events"),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const traces = yield* Traces
      const waterfall = yield* traces.get(input.traceId)
      const spanId = Option.getOrUndefined(input.span)
      const spans = spanId === undefined ? waterfall.spans : subtree(waterfall.spans, spanId)
      if (spanId !== undefined && spans.length === 0) {
        return yield* new TraceQL.InvalidTraceQuery({ message: `Span ${spanId} is not in trace ${waterfall.traceId}` })
      }
      const focus = spanId === undefined ? undefined : spans[0]
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") {
        yield* Console.log(JSON.stringify({ ...waterfall, spans }, null, 2))
        return
      }
      yield* Console.error(
        `# trace ${waterfall.traceId}: ${waterfall.spans.length} spans, ${round(waterfall.durationMs)}ms, services: ${waterfall.services.join(", ")}`,
      )
      const baseDepth = focus?.depth ?? 0
      yield* printTable(
        ["offsetMs", "durationMs", "service", "name", "kind", "status", "statusMessage", "spanId"],
        spans.map((span) => ({
          ...span,
          offsetMs: round(span.offsetMs),
          durationMs: round(span.durationMs),
          name: format === "table" ? `${"  ".repeat(span.depth - baseDepth)}${span.name}` : span.name,
          status: span.status === "unset" ? undefined : span.status,
        })),
        format,
      )
      if (focus !== undefined) {
        yield* Console.error(`\nattributes of ${focus.name} (${focus.spanId}):`)
        yield* printRows(
          ["key", "value"],
          Object.entries(focus.attributes).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => [key, value]),
          format,
          focus.attributes,
        )
        if (focus.events.length > 0) {
          yield* Console.error(`\nevents (${focus.events.length}):`)
          yield* printRows(
            ["offsetMs", "name", "attributes"],
            focus.events.map((event) => [round(event.offsetMs), event.name, JSON.stringify(event.attributes)]),
            format,
            focus.events,
          )
        }
      }
      if (waterfall.spans.length === 0) yield* Console.error("# trace not found or empty")
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Show a trace as a span waterfall (--span to focus on one span)"))

const groupByFlag = Flag.String("group-by").pipe(
  Flag.atMost(5),
  Flag.withDescription("Attribute(s) to group by, repeatable or comma-separated (default: resource.service.name)"),
)

const limitFlag = Flag.Int("limit").pipe(
  Flag.optional,
  Flag.withDescription("Keep only the top N groups"),
)

const groupsOf = (groupBy: ReadonlyArray<string>) => {
  const list = TraceQL.splitList(groupBy)
  return list.length === 0 ? [TraceQL.serviceAttribute] : list.map(TraceQL.attributeName)
}

const top = (rows: ReadonlyArray<Row>, key: string, limit: number | undefined): ReadonlyArray<Row> => {
  const sorted = [...rows].sort((a, b) => Number(b[key] ?? -Infinity) - Number(a[key] ?? -Infinity))
  return limit === undefined ? sorted : sorted.slice(0, limit)
}

const errors = Command.make(
  "errors",
  { ...filterFlags, groupBy: groupByFlag, limit: limitFlag, from: Flags.from, to: Flags.to, output: Output.outputFlag },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const traces = yield* Traces
      const selector = yield* spanSelector({ ...filterInput(input), error: false })
      const groupBy = groupsOf(input.groupBy)
      const by = TraceQL.groupByClause(groupBy)
      const range = { from: Option.getOrUndefined(input.from) ?? config.defaultFrom, to: Option.getOrUndefined(input.to) }
      const totalQuery = `${selector} | count_over_time()${by}`
      const errorQuery = `${TraceQL.andCondition(selector, "status = error")} | count_over_time()${by}`
      yield* printQuery(errorQuery)
      const [total, errored] = yield* Effect.all([traces.instant(totalQuery, range), traces.instant(errorQuery, range)], {
        concurrency: 2,
      })
      const rows = joinInstant(groupBy, [{ name: "errors", response: errored }, { name: "spans", response: total }])
        .filter((row) => Number(row["errors"] ?? 0) > 0)
        .map((row) => ({
          ...row,
          errorRate: row["spans"] === undefined ? undefined : `${round((100 * Number(row["errors"])) / Number(row["spans"]))}%`,
        }))
      yield* printTable([...groupBy, "errors", "spans", "errorRate"], top(rows, "errors", Option.getOrUndefined(input.limit)), input.output)
      if (rows.length === 0) yield* Console.error("# 0 groups with errors")
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Error span counts and error rate per group (default: per service)"))

const quantileColumn = (quantile: number): string => `p${Math.round(quantile * 1000) / 10}Ms`

const latency = Command.make(
  "latency",
  {
    ...filterFlags,
    quantiles: Flag.String("quantiles").pipe(
      Flag.withDefault("p50,p95,p99"),
      Flag.withDescription("Quantiles to compute, e.g. p50,p99 or 0.9"),
    ),
    groupBy: groupByFlag,
    limit: limitFlag,
    timeSeries: Flag.Boolean("time-series").pipe(Flag.withDefault(false), Flag.withDescription("Values per --step instead of over the whole window")),
    step: Flag.String("step").pipe(Flag.optional, Flag.withDescription("Bucket size with --time-series (default: ~300 buckets)")),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const traces = yield* Traces
      const selector = yield* spanSelector(filterInput(input))
      const quantiles = yield* TraceQL.parseQuantiles(input.quantiles)
      const groupBy = groupsOf(input.groupBy)
      const query = `${selector} | quantile_over_time(duration, ${quantiles.join(", ")})${TraceQL.groupByClause(groupBy)}`
      yield* printQuery(query)
      const range = { from: Option.getOrUndefined(input.from) ?? config.defaultFrom, to: Option.getOrUndefined(input.to) }

      if (input.timeSeries) {
        const result = yield* traces.range(query, { ...range, step: Option.getOrUndefined(input.step) })
        if (result.autoStepSeconds !== undefined) yield* Console.error(`# step ${result.autoStepSeconds}s (auto; set --step to override)`)
        yield* printTable(["timestamp", ...groupBy, "quantile", "valueMs"], timeSeriesRows(result.response, groupBy), input.output)
        return
      }
      // Tempo reports duration quantiles in seconds.
      const response = yield* traces.instant(query, range)
      const columns = quantiles.map((quantile) => ({ name: quantileColumn(quantile), response: toMillis(response), quantile }))
      const rows = joinInstant(groupBy, columns)
      yield* printTable(
        [...groupBy, ...columns.map((column) => column.name)],
        top(rows, columns[columns.length - 1]!.name, Option.getOrUndefined(input.limit)),
        input.output,
      )
      if (rows.length === 0) yield* Console.error("# 0 groups")
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Span duration quantiles per group (default: per service), in milliseconds"))

const toMillis = (response: MetricsResponse): MetricsResponse => ({
  series: (response.series ?? []).map((series) => ({
    ...series,
    value: series.value === undefined ? undefined : round(series.value * 1_000, 3),
    samples: series.samples?.map((sample) => ({ ...sample, value: round(sample.value * 1_000, 3)! })),
  })),
})

const timeSeriesRows = (response: MetricsResponse, groupBy: ReadonlyArray<string>): ReadonlyArray<Row> =>
  (toMillis(response).series ?? []).flatMap((series) => {
    const labels = seriesLabels(series)
    return (series.samples ?? []).map((sample) => ({
      timestamp: new Date(Number(sample.timestampMs)).toISOString(),
      ...Object.fromEntries(groupBy.map((key) => [key, labels[key]])),
      quantile: labels["p"],
      valueMs: sample.value,
    }))
  })

const operations = Command.make(
  "operations",
  {
    service: Flag.String("service").pipe(Flag.withDescription("Service name (resource.service.name)")),
    kind: Flag.String("kind").pipe(
      Flag.optional,
      Flag.withDescription("Only spans of this kind: server | client | internal | producer | consumer"),
    ),
    orderBy: Flag.String("order-by").pipe(
      Flag.withDefault("p99Ms"),
      Flag.withDescription("Column to sort by (descending): spans | errors | p50Ms | p99Ms"),
    ),
    limit: limitFlag,
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const traces = yield* Traces
      const kind = Option.getOrUndefined(input.kind)
      if (kind !== undefined && !/^(server|client|internal|producer|consumer)$/.test(kind)) {
        return yield* new TraceQL.InvalidTraceQuery({ message: `Unknown --kind ${kind}` })
      }
      const selector = yield* TraceQL.buildSpanQuery({
        service: input.service,
        ...(kind === undefined ? {} : { filter: `kind = ${kind}` }),
      })
      const range = { from: Option.getOrUndefined(input.from) ?? config.defaultFrom, to: Option.getOrUndefined(input.to) }
      const queries = {
        spans: `${selector} | count_over_time() by (name)`,
        errors: `${TraceQL.andCondition(selector, "status = error")} | count_over_time() by (name)`,
        latency: `${selector} | quantile_over_time(duration, 0.5, 0.99) by (name)`,
      }
      yield* printQuery(queries.latency)
      const [spans, errored, latencies] = yield* Effect.all(
        [traces.instant(queries.spans, range), traces.instant(queries.errors, range), traces.instant(queries.latency, range)],
        { concurrency: 3 },
      )
      const rows = joinInstant(["name"], [
        { name: "spans", response: spans },
        { name: "errors", response: errored },
        { name: "p50Ms", response: toMillis(latencies), quantile: 0.5 },
        { name: "p99Ms", response: toMillis(latencies), quantile: 0.99 },
      ]).map((row) => ({
        ...row,
        errors: row["errors"] ?? 0,
        errorRate: row["spans"] === undefined ? undefined : `${round((100 * Number(row["errors"] ?? 0)) / Number(row["spans"]))}%`,
      }))
      yield* printTable(
        ["name", "spans", "errors", "errorRate", "p50Ms", "p99Ms"],
        top(rows, input.orderBy, Option.getOrUndefined(input.limit)),
        input.output,
      )
      if (rows.length === 0) yield* Console.error(`# no spans for service ${input.service}; check the name with \`graf traces values resource.service.name\``)
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Per-operation span count, errors and latency for one service"))

const values = Command.make(
  "values",
  {
    attribute: Argument.String("attribute").pipe(
      Argument.withDescription("Scoped attribute or intrinsic, e.g. resource.service.name, span.http.route, name"),
    ),
    query: Flag.String("query").pipe(
      Flag.optional,
      Flag.withDescription("Only values from spans matching this TraceQL span selector"),
    ),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const traces = yield* Traces
      const found = yield* traces.attributeValues(input.attribute, {
        from: Option.getOrUndefined(input.from) ?? "1 day",
        to: Option.getOrUndefined(input.to),
        query: Option.getOrUndefined(input.query),
      })
      yield* printRows([input.attribute], found.map((value) => [value]), input.output, found)
      if (found.length === 0) yield* Console.error("# 0 values")
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("List values of a span/resource attribute (e.g. all services with traces)"))

const aggregate = Command.make(
  "aggregate",
  {
    ...filterFlags,
    aggregation: Flag.String("aggregation").pipe(
      Flag.withDefault("count"),
      Flag.withDescription(`${TraceQL.traceAggregations.join(" | ")}`),
    ),
    aggregateOn: Flag.String("aggregate-on").pipe(
      Flag.optional,
      Flag.withDescription("Numeric attribute for avg/sum/min/max/pNN (default: span duration, shown in ms)"),
    ),
    groupBy: Flag.String("group-by").pipe(
      Flag.atMost(5),
      Flag.withDescription("Attribute(s) to group by, repeatable or comma-separated (default: no grouping)"),
    ),
    order: Flag.String("order").pipe(Flag.withDefault("desc"), Flag.withDescription("asc | desc, by value")),
    limit: limitFlag,
    timeSeries: Flag.Boolean("time-series").pipe(Flag.withDefault(false), Flag.withDescription("Values per --step instead of over the whole window")),
    step: Flag.String("step").pipe(Flag.optional, Flag.withDescription("Bucket size with --time-series (default: ~300 buckets)")),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const traces = yield* Traces
      if (input.order !== "asc" && input.order !== "desc") {
        return yield* new TraceQL.InvalidTraceQuery({ message: `--order must be asc or desc; got ${input.order}` })
      }
      const selector = yield* spanSelector(filterInput(input))
      const groupBy = TraceQL.splitList(input.groupBy).map(TraceQL.attributeName)
      const built = yield* TraceQL.buildTraceMetricsQuery({
        selector,
        aggregation: input.aggregation,
        aggregateOn: Option.getOrUndefined(input.aggregateOn),
        groupBy,
      })
      yield* printQuery(built.query)
      const valueColumn = built.unit === undefined ? "value" : `value${built.unit[0]!.toUpperCase()}${built.unit.slice(1)}`
      const scaled = (value: number | undefined) => value === undefined ? undefined : round(value * built.scale, 3)
      const range = { from: Option.getOrUndefined(input.from) ?? config.defaultFrom, to: Option.getOrUndefined(input.to) }

      if (input.timeSeries) {
        const result = yield* traces.range(built.query, { ...range, step: Option.getOrUndefined(input.step) })
        if (result.autoStepSeconds !== undefined) yield* Console.error(`# step ${result.autoStepSeconds}s (auto; set --step to override)`)
        const rows = (result.response.series ?? []).flatMap((series) => {
          const labels = seriesLabels(series)
          return (series.samples ?? []).map((sample) => ({
            timestamp: new Date(Number(sample.timestampMs)).toISOString(),
            ...Object.fromEntries(groupBy.map((key) => [key, labels[key]])),
            [valueColumn]: scaled(sample.value),
          }))
        })
        yield* printTable(["timestamp", ...groupBy, valueColumn], rows, input.output)
        if (rows.length === 0) yield* Console.error("# 0 series")
        return
      }
      const response = yield* traces.instant(built.query, range)
      const rows = (response.series ?? []).map((series) => {
        const labels = seriesLabels(series)
        return { ...Object.fromEntries(groupBy.map((key) => [key, labels[key]])), [valueColumn]: scaled(series.value) }
      })
      const sorted = [...rows].sort((a, b) =>
        (input.order === "asc" ? 1 : -1) * (Number(a[valueColumn] ?? 0) - Number(b[valueColumn] ?? 0))
      )
      const limited = Option.match(input.limit, { onNone: () => sorted, onSome: (n) => sorted.slice(0, n) })
      yield* printTable([...groupBy, valueColumn], limited, input.output)
      if (rows.length === 0) yield* Console.error("# 0 groups")
      else if (limited.length < rows.length) yield* Console.error(`# ${limited.length} of ${rows.length} groups`)
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Aggregate spans: count, rate, or avg/sum/min/max/pNN of duration or an attribute, per group"))

export const command = Command.make("traces").pipe(
  Command.withDescription("Query traces (TraceQL) from the traces datasource"),
  Command.withSubcommands([search, get, aggregate, errors, latency, operations, values]),
)
