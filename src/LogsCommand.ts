import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { GrafanaConfig } from "./Config.js"
import * as Flags from "./Flags.js"
import { Logs } from "./Logs.js"
import * as LogsOutput from "./LogsOutput.js"
import type { QueryResponse } from "./Metrics.js"
import * as MetricsOutput from "./MetricsOutput.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"

const filterFlags = {
  service: Flag.string("service").pipe(
    Flag.optional,
    Flag.withDescription("Service name (the service_name stream label)"),
  ),
  label: Flag.string("label").pipe(
    Flag.atMost(20),
    Flag.withDescription("Stream label matcher, repeatable: name=value, name!=value, name=~regex, name!~regex"),
  ),
  contains: Flag.string("contains").pipe(
    Flag.atMost(10),
    Flag.withDescription("Case-sensitive substring the line must contain, repeatable"),
  ),
  level: Flag.string("level").pipe(
    Flag.atMost(10),
    Flag.withDescription("Log level(s), repeatable or comma-separated: error, warn, info, debug, ..."),
  ),
  traceId: Flag.string("trace-id").pipe(
    Flag.optional,
    Flag.withDescription("Only lines carrying this trace ID"),
  ),
  filter: Flag.string("filter").pipe(
    Flag.optional,
    Flag.withDescription("Raw LogQL pipeline stages appended to the query, e.g. '| json | status >= 500'"),
  ),
  query: Flag.string("query").pipe(
    Flag.optional,
    Flag.withDescription("A complete LogQL log query, instead of the filter flags"),
  ),
}

type FilterFlags = {
  readonly service: Option.Option<string>
  readonly label: ReadonlyArray<string>
  readonly contains: ReadonlyArray<string>
  readonly level: ReadonlyArray<string>
  readonly traceId: Option.Option<string>
  readonly filter: Option.Option<string>
  readonly query: Option.Option<string>
}

const filterInput = (input: FilterFlags) => ({
  service: Option.getOrUndefined(input.service),
  labels: input.label,
  contains: input.contains,
  levels: input.level,
  traceId: Option.getOrUndefined(input.traceId),
  filter: Option.getOrUndefined(input.filter),
  query: Option.getOrUndefined(input.query),
})

const search = Command.make(
  "search",
  {
    ...filterFlags,
    from: Flags.from,
    to: Flags.to,
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum number of lines (default: GRAFANA_DEFAULT_LIMIT or 100)"),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const logs = yield* Logs
      const result = yield* logs.search({
        ...filterInput(input),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        limit: Option.getOrUndefined(input.limit) ?? config.defaultLimit,
      })
      yield* LogsOutput.print(result, input.output)
    }).pipe(Effect.provide(Logs.Live)),
).pipe(Command.withDescription("Search log lines, newest first"))

const context = Command.make(
  "context",
  {
    at: Flag.string("at").pipe(
      Flag.withDescription("Anchor time: ISO-8601 timestamp or Unix ms (e.g. a `time` from logs search)"),
    ),
    around: Flag.integer("around").pipe(
      Flag.optional,
      Flag.withDescription("Lines on each side of the anchor (default: 10)"),
    ),
    before: Flag.integer("before").pipe(
      Flag.optional,
      Flag.withDescription("Lines up to and including the anchor (overrides --around)"),
    ),
    after: Flag.integer("after").pipe(
      Flag.optional,
      Flag.withDescription("Lines after the anchor (overrides --around)"),
    ),
    window: Flag.string("window").pipe(
      Flag.withDefault("1 hour"),
      Flag.withDescription("How far from the anchor to look on each side"),
    ),
    ...filterFlags,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const logs = yield* Logs
      const around = Option.getOrUndefined(input.around) ?? 10
      const result = yield* logs.context({
        ...filterInput(input),
        at: input.at,
        before: Option.getOrUndefined(input.before) ?? around,
        after: Option.getOrUndefined(input.after) ?? around,
        window: input.window,
      })
      yield* LogsOutput.print(result, input.output)
    }).pipe(Effect.provide(Logs.Live)),
).pipe(Command.withDescription("Show the lines around a moment in time, oldest first"))

const aggregateFlags = {
  aggregation: Flag.string("aggregation").pipe(
    Flag.withDefault("count"),
    Flag.withDescription("count | rate | bytes | sum | avg | min | max | p50 | p75 | p90 | p95 | p99"),
  ),
  aggregateOn: Flag.string("aggregate-on").pipe(
    Flag.optional,
    Flag.withDescription("Numeric field for sum/avg/min/max/pNN: a label, structured metadata, or a parsed field"),
  ),
  parser: Flag.string("parser").pipe(
    Flag.optional,
    Flag.withDescription("Parse lines first so --aggregate-on/--group-by can use their fields: json | logfmt"),
  ),
  groupBy: Flag.string("group-by").pipe(
    Flag.atMost(10),
    Flag.withDescription("Label(s) to group by, repeatable or comma-separated, e.g. detected_level"),
  ),
}

const printAggregate = (
  result: { readonly query: string; readonly response: QueryResponse; readonly autoStepSeconds?: number | undefined },
  output: string,
  limit?: number,
) =>
  Effect.gen(function* () {
    yield* LogsOutput.printQuery(result.query)
    yield* MetricsOutput.print(
      { response: LogsOutput.topGroups(result.response, limit), autoStepSeconds: result.autoStepSeconds },
      output,
    )
  })

const aggregate = Command.make(
  "aggregate",
  {
    ...aggregateFlags,
    ...filterFlags,
    timeSeries: Flag.boolean("time-series").pipe(
      Flag.withDescription("Return values per --step instead of one value per group over the whole window"),
    ),
    step: Flag.string("step").pipe(
      Flag.optional,
      Flag.withDescription("Bucket size with --time-series, e.g. \"5 minutes\" (default: ~300 buckets)"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Keep only the largest N groups (scalar mode)"),
    ),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const logs = yield* Logs
      const result = yield* logs.aggregate({
        ...filterInput(input),
        aggregation: input.aggregation,
        aggregateOn: Option.getOrUndefined(input.aggregateOn),
        parser: Option.getOrUndefined(input.parser),
        groupBy: input.groupBy,
        timeSeries: input.timeSeries,
        step: Option.getOrUndefined(input.step),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
      })
      yield* printAggregate(result, input.output, Option.getOrUndefined(input.limit))
    }).pipe(Effect.provide(Logs.Live)),
).pipe(Command.withDescription("Aggregate logs into one value per group, or a time series with --time-series"))

const timeseries = Command.make(
  "timeseries",
  {
    ...aggregateFlags,
    ...filterFlags,
    step: Flag.string("step").pipe(
      Flag.optional,
      Flag.withDescription("Bucket size, e.g. \"5 minutes\" (default: ~300 buckets)"),
    ),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const logs = yield* Logs
      const result = yield* logs.aggregate({
        ...filterInput(input),
        aggregation: input.aggregation,
        aggregateOn: Option.getOrUndefined(input.aggregateOn),
        parser: Option.getOrUndefined(input.parser),
        groupBy: input.groupBy,
        timeSeries: true,
        step: Option.getOrUndefined(input.step),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
      })
      yield* printAggregate(result, input.output)
    }).pipe(Effect.provide(Logs.Live)),
).pipe(Command.withDescription("Log counts (or another --aggregation) over time; same as aggregate --time-series"))

const values = Command.make(
  "values",
  {
    label: Argument.string("label").pipe(
      Argument.withDescription("Stream label, e.g. service_name, k8s_namespace_name, deployment_environment"),
    ),
    selector: Flag.string("selector").pipe(
      Flag.optional,
      Flag.withDescription("Only streams matching this LogQL selector, e.g. '{deployment_environment=\"prod\"}'"),
    ),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const logs = yield* Logs
      const found = yield* logs.labelValues(input.label, {
        from: Option.getOrUndefined(input.from) ?? "1 day",
        to: Option.getOrUndefined(input.to),
        selector: Option.getOrUndefined(input.selector),
      })
      yield* printRows([input.label], found.map((value) => [value]), input.output, found)
      if (found.length === 0) yield* Console.error("# 0 values")
    }).pipe(Effect.provide(Logs.Live)),
).pipe(Command.withDescription("List the values of a stream label (e.g. all services with logs)"))

export const command = Command.make("logs").pipe(
  Command.withDescription("Query logs (LogQL) from the logs datasource"),
  Command.withSubcommands([search, context, aggregate, timeseries, values]),
)
