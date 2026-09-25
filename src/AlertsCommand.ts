import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { type AlertRule, Alerts, topContributors, type Transition } from "./Alerts.js"
import * as Flags from "./Flags.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"

const uidArgument = Argument.String("rule-uid").pipe(Argument.withDescription("Alert rule UID (from `graf alerts list`)"))

const labelText = (labels: Readonly<Record<string, string>>, skip: ReadonlySet<string> = new Set()): string =>
  Object.entries(labels).filter(([key]) => !skip.has(key)).map(([key, value]) => `${key}=${value}`).join(", ")

const list = Command.make(
  "list",
  {
    state: Flag.String("state").pipe(
      Flag.optional,
      Flag.withDescription("Only rules in this state: firing | pending | inactive | nodata | error"),
    ),
    search: Flag.String("search").pipe(Flag.optional, Flag.withDescription("Case-insensitive substring of the rule name or folder")),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const alerts = yield* Alerts
      const state = Option.getOrUndefined(input.state)
      const search = Option.getOrUndefined(input.search)?.toLowerCase()
      const rules = (yield* alerts.list({ state })).filter((rule) =>
        // nodata/error surface as rule health, not state.
        (state === undefined || (state === "nodata" || state === "error" ? rule.health === state : rule.state === state))
        && (search === undefined || `${rule.name} ${rule.folder ?? ""}`.toLowerCase().includes(search))
      )
      const rows = rules.map((rule) => ({
        uid: rule.uid,
        state: rule.paused ? `${rule.state ?? ""} (paused)` : rule.state,
        firing: rule.instances.filter((instance) => /^alerting/i.test(instance.state ?? "")).length,
        name: rule.name,
        folder: rule.folder,
        severity: rule.labels["severity"],
        health: rule.health === "ok" ? undefined : rule.health,
      }))
      yield* printRows(
        ["uid", "state", "firing", "severity", "name", "folder", "health"],
        rows.map((row) => [row.uid, row.state, row.firing || undefined, row.severity, row.name, row.folder, row.health]),
        input.output,
        rules,
      )
      if (rows.length === 0) yield* Console.error("# 0 rules")
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("Alert rules and their state, firing first"))

const printRule = (rule: AlertRule, format: Output.OutputFormat) =>
  Effect.gen(function* () {
    const lines = [
      `${rule.name}  [${rule.state ?? "unknown"}${rule.paused ? ", paused" : ""}]`,
      `uid: ${rule.uid} · folder: ${rule.folder ?? "?"} · group: ${rule.group}${rule.intervalSeconds === undefined ? "" : ` (every ${rule.intervalSeconds}s)`}`,
      ...(rule.definition === undefined ? [] : [
        `condition: ${rule.definition.condition ?? "?"} · for: ${rule.definition.for ?? "0s"} · no data → ${rule.definition.noDataState ?? "?"} · error → ${rule.definition.execErrState ?? "?"}`,
      ]),
      ...(rule.lastError === undefined ? [] : [`last error: ${rule.lastError}`]),
      ...(Object.keys(rule.labels).length === 0 ? [] : [`labels: ${labelText(rule.labels)}`]),
      ...Object.entries(rule.annotations).map(([key, value]) => `${key}: ${value}`),
      rule.url,
      "",
      "queries:",
      ...rule.queries.map((query) =>
        `  ${query.refId} [${query.datasourceUid ?? "?"}${query.relativeTimeRange?.from === undefined ? "" : `, last ${query.relativeTimeRange.from}s`}] ${query.expression ?? ""}`
      ),
      ...(rule.definition === undefined ? ["  (summary only: the full definition wasn't readable)"] : []),
    ]
    yield* Console.error(lines.join("\n"))
    yield* Console.error(`\ninstances (${rule.instances.length}):`)
    const constant = new Set(Object.keys(rule.labels))
    yield* printRows(
      ["state", "since", "value", "labels"],
      rule.instances.map((instance) => [instance.state, instance.activeAt, instance.value, labelText(instance.labels, constant)]),
      format,
      rule.instances,
    )
  })

const get = Command.make(
  "get",
  { uid: uidArgument, output: Output.outputFlag },
  (input) =>
    Effect.gen(function* () {
      const rule = yield* (yield* Alerts).get(input.uid)
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") return yield* Console.log(JSON.stringify(rule, null, 2))
      yield* printRule(rule, format)
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("A rule's definition, queries and current instances"))

// Labels shared by every transition are rule metadata; show only what tells rows apart.
const printHistory = (transitions: ReadonlyArray<Transition>, output: string) => {
  const keys = new Set(transitions.flatMap((t) => Object.keys(t.labels)))
  const constant = new Set(transitions.length <= 1 ? [] : [...keys].filter((key) =>
    transitions.every((t) => t.labels[key] === transitions[0]!.labels[key])
  ))
  return printRows(
    ["time", "from", "to", "labels", "values"],
    transitions.map((t) => [t.time, t.from, t.to, labelText(t.labels, constant) || undefined, t.values === undefined ? undefined : JSON.stringify(t.values)]),
    output,
    transitions,
  )
}

const history = Command.make(
  "history",
  {
    uid: uidArgument,
    state: Flag.String("state").pipe(Flag.optional, Flag.withDescription("Only transitions into this state, e.g. Alerting, Normal")),
    limit: Flag.Int("limit").pipe(Flag.optional, Flag.withDescription("Most recent N transitions")),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const alerts = yield* Alerts
      const state = Option.getOrUndefined(input.state)?.toLowerCase()
      const all = yield* alerts.history(input.uid, { from: Option.getOrUndefined(input.from) ?? "1 day", to: Option.getOrUndefined(input.to) })
      const filtered = all.filter((t) => state === undefined || (t.to ?? "").toLowerCase().startsWith(state))
      yield* printHistory(Option.match(input.limit, { onNone: () => filtered, onSome: (n) => filtered.slice(0, n) }), input.output)
      if (filtered.length === 0) yield* Console.error("# 0 transitions")
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("A rule's state transitions (newest first)"))

const triage = Command.make(
  "triage",
  {
    uid: uidArgument,
    limit: Flag.Int("limit").pipe(Flag.withDefault(10), Flag.withDescription("Recent transitions to show")),
    from: Flags.from,
    to: Flags.to,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const alerts = yield* Alerts
      const range = { from: Option.getOrUndefined(input.from) ?? "1 day", to: Option.getOrUndefined(input.to) }
      const [rule, transitions] = yield* Effect.all([
        alerts.get(input.uid),
        alerts.history(input.uid, range).pipe(Effect.orElseSucceed(() => undefined)),
      ], { concurrency: 2 })
      const firing = rule.instances.filter((instance) => /^alerting/i.test(instance.state ?? ""))
      const contributors = topContributors(firing)
      const summary = transitions === undefined ? undefined : {
        transitions: transitions.length,
        intoAlerting: transitions.filter((t) => /^alerting/i.test(t.to ?? "")).length,
        latest: transitions[0]?.time,
      }
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") {
        return yield* Console.log(JSON.stringify({ rule, firing: firing.length, contributors, history: summary, recent: transitions?.slice(0, input.limit) }, null, 2))
      }
      yield* printRule(rule, format)
      if (contributors.length > 0) {
        yield* Console.error("\nwhat differs across firing instances:")
        yield* printRows(
          ["label", "distinct", "top values"],
          contributors.map((c) => [c.label, c.distinct, c.values.map((v) => `${v.value} (${v.count})`).join(", ")]),
          format,
          contributors,
        )
      }
      if (transitions === undefined) {
        yield* Console.error("\n# state history unavailable")
      } else {
        yield* Console.error(`\nhistory (${range.from}): ${summary!.transitions} transitions, ${summary!.intoAlerting} into Alerting`)
        yield* printHistory(transitions.slice(0, input.limit), format)
      }
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("One read-only briefing: definition, firing instances, what differs between them, recent history"))

const evaluate = Command.make(
  "evaluate",
  {
    uid: uidArgument,
    at: Flag.String("at").pipe(Flag.withDefault("now"), Flag.withDescription("Evaluate once, as of this time (default now)")),
    from: Flag.String("from").pipe(
      Flag.optional,
      Flag.withDescription("Replay instead: evaluate at every tick from here to --to (e.g. \"6 hours\")"),
    ),
    to: Flags.to,
    step: Flag.String("step").pipe(
      Flag.optional,
      Flag.withDescription("Replay tick size (default: the rule's evaluation interval; widened to at most 120 ticks)"),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const alerts = yield* Alerts
      const rule = yield* alerts.get(input.uid)
      const format = yield* Output.parseOutputFormat(input.output)
      const condition = rule.definition?.condition

      if (Option.isSome(input.from)) {
        const replay = yield* alerts.replay(rule, {
          from: input.from.value,
          to: Option.getOrUndefined(input.to),
          step: Option.getOrUndefined(input.step),
        })
        if (format === "json") return yield* Console.log(JSON.stringify({ uid: rule.uid, condition, ...replay }, null, 2))
        yield* Console.error(
          `# ${rule.name}: condition ${condition ?? "?"} evaluated every ${replay.stepSeconds}s${replay.widened ? " (widened to cap the number of evaluations)" : ""}; > 0 means firing`,
        )
        yield* printRows(
          ["labels", "firing", "firstFiring", "lastFiring", "lastValue"],
          replay.series.map((s) => [labelText(s.labels), `${s.firingTicks}/${s.ticks}`, s.firstFiring, s.lastFiring, s.lastValue]),
          format,
          replay.series,
        )
        if (replay.series.length === 0) yield* Console.error("# the condition returned no series in this window")
        if (rule.definition?.for !== undefined && rule.definition.for !== "0s") {
          yield* Console.error(`# the rule also needs the condition to hold for ${rule.definition.for} before it fires`)
        }
        return
      }

      const result = yield* alerts.evaluate(rule, { at: input.at })
      if (format === "json") return yield* Console.log(JSON.stringify({ uid: rule.uid, condition, ...result }, null, 2))
      yield* Console.error(`# ${rule.name} evaluated at ${result.at}; condition ${condition ?? "?"} > 0 means firing`)
      for (const error of result.errors) yield* Console.error(`warning: ${error.refId}: ${error.error}`)
      yield* printRows(
        ["refId", "labels", "last", "min", "max", "points"],
        result.series.map((s) => [
          s.refId === condition ? `${s.refId} (condition)` : s.refId,
          labelText(s.labels),
          s.last,
          s.points > 1 ? s.min : undefined,
          s.points > 1 ? s.max : undefined,
          s.points,
        ]),
        format,
        result.series,
      )
      if (result.series.length === 0) yield* Console.error("# no series returned (the rule would see no data)")
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("Run a rule's own queries and expressions now, or replay them over a window with --from"))

export const command = Command.make("alerts").pipe(
  Command.withDescription("Grafana-managed alert rules (read-only)"),
  Command.withSubcommands([list, get, history, triage, evaluate]),
)
