import { Console, Data, Effect, Layer, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { attempt } from "./Discovery.js"
import * as Flags from "./Flags.js"
import { Logs } from "./Logs.js"
import { buildLogQuery, serviceLabel } from "./LogQL.js"
import { Metrics, nameMatcher } from "./Metrics.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"
import { serviceAttribute } from "./TraceQL.js"
import { Traces } from "./Traces.js"

export const discoveryLive = Layer.mergeAll(Logs.Live, Traces.Live, Metrics.Live)

class InvalidSignal extends Data.TaggedError("InvalidSignal")<{ readonly message: string }> {}

type Signal = "logs" | "traces" | "metrics"

const signalFlag = Flag.string("signal").pipe(
  Flag.withDescription("logs | traces | metrics"),
)

const parseSignal = (input: string): Effect.Effect<Signal, InvalidSignal> =>
  input === "logs" || input === "traces" || input === "metrics"
    ? Effect.succeed(input)
    : Effect.fail(new InvalidSignal({ message: `Unknown --signal ${input}; expected logs, traces or metrics` }))

const searchFlag = Flag.string("search").pipe(
  Flag.optional,
  Flag.withDescription("Case-insensitive substring filter"),
)

const matches = (search: Option.Option<string>) => (value: string): boolean =>
  Option.match(search, { onNone: () => true, onSome: (text) => value.toLowerCase().includes(text.toLowerCase()) })

const range = (input: { readonly from: Option.Option<string>; readonly to: Option.Option<string> }, defaultFrom = "1 day") => ({
  from: Option.getOrUndefined(input.from) ?? defaultFrom,
  to: Option.getOrUndefined(input.to),
})

const servicesList = Command.make(
  "list",
  {
    signal: Flag.string("signal").pipe(Flag.optional, Flag.withDescription("Only services with logs or traces")),
    search: searchFlag,
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const signal = Option.isSome(input.signal) ? yield* parseSignal(input.signal.value) : undefined
      if (signal === "metrics") {
        return yield* new InvalidSignal({ message: "services list covers logs and traces; for metrics use `graf values --signal metrics <label>`" })
      }
      const logs = yield* Logs
      const traces = yield* Traces
      const window = range(input)
      const [logServices, traceServices] = yield* Effect.all([
        signal === "traces" ? Effect.succeed(undefined) : attempt(logs.labelValues(serviceLabel, window)),
        signal === "logs" ? Effect.succeed(undefined) : attempt(traces.attributeValues(serviceAttribute, window)),
      ], { concurrency: 2 })
      for (const [name, outcome] of [["logs", logServices], ["traces", traceServices]] as const) {
        if (outcome !== undefined && !outcome.ok) yield* Console.error(`warning: ${name}: ${outcome.error}`)
      }
      const inLogs = new Set(logServices?.ok ? logServices.value : [])
      const inTraces = new Set(traceServices?.ok ? traceServices.value : [])
      const rows = [...new Set([...inLogs, ...inTraces])].filter(matches(input.search)).sort().map((service) => ({
        service,
        logs: inLogs.has(service),
        traces: inTraces.has(service),
      }))
      yield* printRows(
        ["service", "logs", "traces"],
        rows.map((row) => [row.service, row.logs ? "yes" : undefined, row.traces ? "yes" : undefined]),
        input.output,
        rows,
      )
      if (rows.length === 0) yield* Console.error("# 0 services")
    }).pipe(Effect.provide(discoveryLive)),
).pipe(Command.withDescription("List services seen in logs (service_name) and traces (resource.service.name)"))

export const servicesCommand = Command.make("services").pipe(
  Command.withDescription("Discover services"),
  Command.withSubcommands([servicesList]),
)

export const fieldsCommand = Command.make(
  "fields",
  {
    signal: signalFlag,
    service: Flag.string("service").pipe(
      Flag.optional,
      Flag.withDescription("logs: also list fields detected in this service's lines; metrics: labels on this metric"),
    ),
    metric: Flag.string("metric").pipe(Flag.optional, Flag.withDescription("metrics: only labels present on this metric")),
    scope: Flag.string("scope").pipe(
      Flag.optional,
      Flag.withDescription("traces: resource | span | event | link | instrumentation | intrinsic"),
    ),
    search: searchFlag,
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const signal = yield* parseSignal(input.signal)
      const window = range(input)
      const keep = matches(input.search)
      switch (signal) {
        case "logs": {
          const logs = yield* Logs
          const service = Option.getOrUndefined(input.service)
          const selector = service === undefined ? undefined : yield* buildLogQuery({ service })
          const labels = (yield* logs.labels({ ...window, selector })).map((name) => ({ name, kind: "stream label" as string, type: undefined as string | undefined, parsers: "" }))
          const detected = selector === undefined ? [] : (yield* logs.detectedFields(selector, window)).map((field) => ({
            name: field.name,
            kind: field.parsers.length === 0 ? "structured metadata" : "parsed",
            type: field.type,
            parsers: field.parsers.join(","),
          }))
          const rows = [...labels, ...detected].filter((row) => keep(row.name))
          yield* printRows(["name", "kind", "type", "parsers"], rows.map((row) => [row.name, row.kind, row.type, row.parsers || undefined]), input.output, rows)
          if (selector === undefined) yield* Console.error("# pass --service to also list fields parsed from lines and structured metadata")
          return
        }
        case "traces": {
          const traces = yield* Traces
          const rows = (yield* traces.attributeNames(Option.getOrUndefined(input.scope), window)).filter((row) => keep(row.name))
          yield* printRows(["name", "scope"], rows.map((row) => [row.name, row.scope]), input.output, rows)
          return
        }
        case "metrics": {
          const metrics = yield* Metrics
          const metric = Option.getOrUndefined(input.metric)
          const names = (yield* metrics.labelNames({ ...window, match: metric === undefined ? undefined : nameMatcher(metric) })).filter(keep)
          yield* printRows(["name"], names.map((name) => [name]), input.output, names)
          return
        }
      }
    }).pipe(Effect.provide(discoveryLive)),
).pipe(Command.withDescription("List queryable keys: log labels/fields, trace attributes, or metric labels"))

export const valuesCommand = Command.make(
  "values",
  {
    signal: signalFlag,
    name: Argument.string("name").pipe(
      Argument.withDescription("Log label, trace attribute (e.g. resource.deployment.environment), or metric label"),
    ),
    search: searchFlag,
    limit: Flag.integer("limit").pipe(Flag.optional, Flag.withDescription("Maximum number of values")),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const signal = yield* parseSignal(input.signal)
      const window = range(input)
      const found = signal === "logs"
        ? yield* (yield* Logs).labelValues(input.name, window)
        : signal === "traces"
        ? yield* (yield* Traces).attributeValues(input.name, window)
        : yield* (yield* Metrics).labelValues(input.name, window)
      const filtered = found.filter(matches(input.search))
      const limited = Option.match(input.limit, { onNone: () => filtered, onSome: (limit) => filtered.slice(0, limit) })
      yield* printRows([input.name], limited.map((value) => [value]), input.output, limited)
      if (limited.length === 0) yield* Console.error(`# 0 values (list keys with \`graf fields --signal ${signal}\`)`)
      else if (limited.length < filtered.length) yield* Console.error(`# ${limited.length} of ${filtered.length} values`)
    }).pipe(Effect.provide(discoveryLive)),
).pipe(Command.withDescription("List the distinct values of a log label, trace attribute, or metric label"))
