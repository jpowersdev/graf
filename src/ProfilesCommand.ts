import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { GrafanaConfig } from "./Config.js"
import * as Flags from "./Flags.js"
import { parseLabelMatcher } from "./LogQL.js"
import * as Output from "./Output.js"
import { InvalidProfileQuery, Profiles, resolveProfileType, serviceLabel } from "./Profiles.js"
import { printRows } from "./Rows.js"

const window = (input: { readonly from: Option.Option<string>; readonly to: Option.Option<string> }, defaultFrom: string) => ({
  from: Option.getOrUndefined(input.from) ?? defaultFrom,
  to: Option.getOrUndefined(input.to),
})

const types = Command.make(
  "types",
  { output: Output.outputFlag },
  (input) =>
    Effect.gen(function* () {
      const found = yield* (yield* Profiles).types
      yield* printRows(["id", "label"], found.map((type) => [type.id, type.label]), input.output, found)
    }).pipe(Effect.provide(Profiles.Live)),
).pipe(Command.withDescription("Profile types available (cpu, wall, memory, ...)"))

const labels = Command.make(
  "labels",
  { from: Flags.from, to: Flags.to, output: Output.outputFlag },
  (input) =>
    Effect.gen(function* () {
      const found = yield* (yield* Profiles).labels(window(input, "1 day"))
      yield* printRows(["label"], found.map((label) => [label]), input.output, found)
    }).pipe(Effect.provide(Profiles.Live)),
).pipe(Command.withDescription("Labels on profiles (use with --label on profiles top)"))

const values = Command.make(
  "values",
  {
    label: Argument.string("label").pipe(Argument.withDescription("Profile label, e.g. service_name")),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const found = yield* (yield* Profiles).labelValues(input.label, window(input, "1 day"))
      yield* printRows([input.label], found.map((value) => [value]), input.output, found)
      if (found.length === 0) yield* Console.error("# 0 values")
    }).pipe(Effect.provide(Profiles.Live)),
).pipe(Command.withDescription("Values of a profile label (e.g. services with profiles)"))

const buildSelector = (input: { readonly service?: string | undefined; readonly labels: ReadonlyArray<string>; readonly selector?: string | undefined }) =>
  Effect.gen(function* () {
    if (input.selector !== undefined) {
      if (input.service !== undefined || input.labels.length > 0) {
        return yield* new InvalidProfileQuery({ message: "--selector is a complete label selector; drop --service/--label or fold them in" })
      }
      return input.selector
    }
    const matchers = [
      ...(input.service === undefined ? [] : [`${serviceLabel}=${JSON.stringify(input.service)}`]),
      ...(yield* Effect.forEach(input.labels, parseLabelMatcher)).map((m) => `${m.name}${m.op}${JSON.stringify(m.value)}`),
    ]
    return `{${matchers.join(", ")}}`
  })

const percent = (part: number, whole: number): string | undefined => whole > 0 ? `${Math.round((1000 * part) / whole) / 10}%` : undefined

const top = Command.make(
  "top",
  {
    type: Flag.string("type").pipe(
      Flag.withDefault("cpu"),
      Flag.withDescription("Profile type: a full id from `profiles types`, or its sample type (cpu, alloc_space, ...) or name"),
    ),
    service: Flag.string("service").pipe(Flag.optional, Flag.withDescription("Service name (the service_name label)")),
    label: Flag.string("label").pipe(Flag.atMost(10), Flag.withDescription("Label matcher, repeatable: name=value, name!=value, name=~regex")),
    selector: Flag.string("selector").pipe(Flag.optional, Flag.withDescription("A complete label selector, e.g. '{service_name=\"api\"}'")),
    orderBy: Flag.string("order-by").pipe(Flag.withDefault("self"), Flag.withDescription("self (time in the function itself) | total (including callees)")),
    limit: Flag.integer("limit").pipe(Flag.withDefault(20), Flag.withDescription("Functions to show")),
    maxNodes: Flag.integer("max-nodes").pipe(Flag.withDefault(8192), Flag.withDescription("Flamegraph nodes to fetch; more is more exact")),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const profiles = yield* Profiles
      if (input.orderBy !== "self" && input.orderBy !== "total") {
        return yield* new InvalidProfileQuery({ message: `--order-by must be self or total; got ${input.orderBy}` })
      }
      const profileType = yield* resolveProfileType(input.type, yield* profiles.types)
      const selector = yield* buildSelector({
        service: Option.getOrUndefined(input.service),
        labels: input.label,
        selector: Option.getOrUndefined(input.selector),
      })
      yield* Console.error(`# profile ${profileType} ${selector}`)
      const result = yield* profiles.top({ profileType, selector, ...window(input, config.defaultFrom), maxNodes: input.maxNodes })
      const key = input.orderBy
      const sorted = [...result.functions].sort((a, b) => b[key] - a[key]).slice(0, input.limit)
      // Nanosecond profiles read better in milliseconds.
      const scale = result.unit === "ns" ? 1e-6 : 1
      const unit = result.unit === "ns" ? "ms" : result.unit ?? ""
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") return yield* Console.log(JSON.stringify({ ...result, functions: sorted }, null, 2))
      yield* Console.error(`# total ${Math.round(result.grandTotal * scale)}${unit}; values in ${unit || "samples"}`)
      yield* printRows(
        ["function", "self", "self%", "total", "total%"],
        sorted.map((fn) => [
          fn.function,
          Math.round(fn.self * scale * 100) / 100,
          percent(fn.self, result.grandTotal),
          Math.round(fn.total * scale * 100) / 100,
          percent(fn.total, result.grandTotal),
        ]),
        format,
        sorted,
      )
      if (result.functions.length === 0) yield* Console.error("# no samples (check --service with `graf profiles values service_name`)")
    }).pipe(Effect.provide(Profiles.Live)),
).pipe(Command.withDescription("Hottest functions in a profile, by self or total time/allocation"))

export const command = Command.make("profiles").pipe(
  Command.withDescription("Query continuous profiles from the profiles datasource"),
  Command.withSubcommands([types, labels, values, top]),
)
