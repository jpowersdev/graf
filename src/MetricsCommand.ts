import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { GrafanaConfig } from "./Config.js"
import * as Flags from "./Flags.js"
import { Metrics } from "./Metrics.js"
import * as MetricsOutput from "./MetricsOutput.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"

const list = Command.make(
  "list",
  {
    search: Flag.string("search").pipe(
      Flag.optional,
      Flag.withDescription("Case-insensitive substring of the metric name"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum number of metrics to return"),
    ),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const metrics = yield* Metrics
      const summaries = yield* metrics.list({
        search: Option.getOrUndefined(input.search),
        limit: Option.getOrUndefined(input.limit),
        from: Option.getOrUndefined(input.from) ?? "1 day",
        to: Option.getOrUndefined(input.to),
      })
      yield* printRows(
        ["name", "type", "unit", "description"],
        summaries.map((metric) => [metric.name, metric.type, metric.unit, metric.description]),
        input.output,
        summaries,
      )
    }).pipe(Effect.provide(Metrics.Live)),
).pipe(Command.withDescription("List metric names (type from metadata, else inferred from the name)"))

const previewValues = (values: ReadonlyArray<string>, limit = 5): string =>
  `${values.slice(0, limit).join(", ")}${values.length > limit ? ", …" : ""}`

const describe = Command.make(
  "describe",
  {
    name: Argument.string("name").pipe(
      Argument.withDescription("Metric name, exactly as `metrics list` prints it"),
    ),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const metrics = yield* Metrics
      const description = yield* metrics.describe(input.name, {
        from: Option.getOrUndefined(input.from) ?? "1 day",
        to: Option.getOrUndefined(input.to),
      })
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") {
        yield* Console.log(JSON.stringify(description, null, 2))
        return
      }

      const details = [
        description.typeSource === "name" ? `${description.type} (inferred from name)` : description.type,
        description.unit === undefined ? undefined : `unit=${description.unit}`,
      ].filter((value): value is string => value !== undefined)
      yield* Console.error(`${description.name} (${details.join(", ")})`)
      if (description.description !== undefined) yield* Console.error(description.description)
      yield* Console.error(`labels (${description.labels.length} keys):`)
      yield* printRows(
        ["key", "valueCount", "values"],
        description.labels.map((label) => [label.key, label.valueCount, previewValues(label.values)]),
        format,
        description.labels,
      )
    }).pipe(Effect.provide(Metrics.Live)),
).pipe(Command.withDescription("Describe a metric: type, unit, and its labels with sample values"))

const query = Command.make(
  "query",
  {
    query: Argument.string("query").pipe(
      Argument.withDescription(
        "PromQL expression, e.g. 'sum by (service) (rate(traces_spanmetrics_calls_total[5m]))'. "
          + "Find metric names with `metrics list --search` and labels with `metrics describe`.",
      ),
    ),
    from: Flags.from,
    to: Flags.to,
    step: Flag.string("step").pipe(
      Flag.optional,
      Flag.withDescription("Range-query resolution, e.g. \"1 minute\" (default: ~300 points over the range)"),
    ),
    instant: Flag.boolean("instant").pipe(
      Flag.withDescription("Evaluate once at --to (default now) instead of over a range"),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const metrics = yield* Metrics
      const result = yield* metrics.query({
        query: input.query,
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        step: Option.getOrUndefined(input.step),
        instant: input.instant,
      })
      yield* MetricsOutput.print(result, input.output)
    }).pipe(Effect.provide(Metrics.Live)),
).pipe(Command.withDescription("Run a PromQL query over a time range (or --instant)"))

export const command = Command.make("metrics").pipe(
  Command.withDescription("Query metrics (PromQL) from the metrics datasource"),
  Command.withSubcommands([list, describe, query]),
)
