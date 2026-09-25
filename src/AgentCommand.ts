import { Console, Effect, Layer, Option } from "effect"
import { Command, Flag } from "effect/unstable/cli"
import * as fs from "node:fs"
import { agentInstructions } from "./AgentDocs.js"
import { Alerts } from "./Alerts.js"
import { ApiClient } from "./ApiClient.js"
import { GrafanaConfig } from "./Config.js"
import { Datasources, roles } from "./Datasources.js"
import { attempt, condenseNames, metricPrefixes, type Outcome } from "./Discovery.js"
import { discoveryLive } from "./DiscoveryCommand.js"
import { Logs } from "./Logs.js"
import { serviceLabel } from "./LogQL.js"
import { Metrics } from "./Metrics.js"
import { Profiles, serviceLabel as profileServiceLabel } from "./Profiles.js"
import { serviceAttribute } from "./TraceQL.js"
import { Traces } from "./Traces.js"

const readVersion = Effect.sync(() => {
  try {
    const pkg = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")) as { readonly version?: string }
    return pkg.version
  } catch {
    return undefined
  }
})

const instructions = Command.make(
  "instructions",
  {},
  () =>
    Effect.gen(function* () {
      yield* Console.log(agentInstructions(yield* readVersion))
    }),
).pipe(Command.withDescription("Print the static agent usage guide (re-dump after each upgrade)"))

export interface AgentContextData {
  readonly url: string
  readonly generatedAt: string
  readonly window: string
  readonly datasources: ReadonlyArray<readonly [string, Outcome<{ readonly uid: string; readonly type: string }>]>
  readonly logServices: Outcome<ReadonlyArray<string>>
  readonly traceServices: Outcome<ReadonlyArray<string>>
  readonly logLabels: Outcome<ReadonlyArray<string>>
  readonly traceAttributes: Outcome<ReadonlyArray<{ readonly scope: string; readonly name: string }>>
  readonly metricNames: Outcome<ReadonlyArray<string>>
  readonly profileServices: Outcome<ReadonlyArray<string>>
  readonly profileTypes: Outcome<ReadonlyArray<string>>
  readonly alerts: Outcome<ReadonlyArray<AlertSummary>>
  readonly dashboards: Outcome<ReadonlyArray<DashboardSummary>>
}

export interface AlertSummary {
  readonly uid: string
  readonly name: string
  readonly state?: string | undefined
  readonly health?: string | undefined
  readonly severity?: string | undefined
  readonly firing: number
}

export interface DashboardSummary {
  readonly uid?: string | undefined
  readonly title?: string | undefined
  readonly folder?: string | undefined
  readonly tags: ReadonlyArray<string>
}

const countBy = <A>(items: ReadonlyArray<A>, key: (item: A) => string): ReadonlyArray<readonly [string, number]> => {
  const counts = new Map<string, number>()
  for (const item of items) counts.set(key(item), (counts.get(key(item)) ?? 0) + 1)
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

const inline = (values: ReadonlyArray<string>, max: number): string =>
  values.length <= max ? values.map((value) => `\`${value}\``).join(", ")
    : `${values.slice(0, max).map((value) => `\`${value}\``).join(", ")}, … (+${values.length - max} more)`

const section = <A>(outcome: Outcome<A>, render: (value: A) => ReadonlyArray<string>): ReadonlyArray<string> =>
  outcome.ok ? render(outcome.value) : [`_unavailable: ${outcome.error}_`]

const renderServices = (names: ReadonlyArray<string>, full: boolean): ReadonlyArray<string> => {
  if (full) return [names.map((name) => `\`${name}\``).join(", ")]
  const { families, singles } = condenseNames(names)
  return [
    ...families.map((family) => `- \`${family.pattern}\` × ${family.count} (e.g. ${inline(family.examples, 2)})`),
    ...(singles.length === 0 ? [] : [`- ${inline(singles, 60)}`]),
  ]
}

export const renderAgentContext = (data: AgentContextData, full: boolean): string => {
  const lines: Array<string> = [
    `# graf context: ${data.url}`,
    "",
    `Generated ${data.generatedAt} from the last ${data.window}. Names below can be used directly in graf flags.`,
    "",
    "## Datasources",
    "",
    ...data.datasources.map(([role, outcome]) =>
      outcome.ok ? `- ${role}: \`${outcome.value.uid}\` (${outcome.value.type})` : `- ${role}: _${outcome.error}_`
    ),
    "",
    `## Services with logs (\`--service\` on logs commands; label \`${serviceLabel}\`)`,
    "",
    ...section(data.logServices, (names) => [`${names.length} services:`, ...renderServices(names, full)]),
    "",
    `## Services with traces (\`--service\` on traces commands; \`${serviceAttribute}\`)`,
    "",
    ...section(data.traceServices, (names) => [`${names.length} services:`, ...renderServices(names, full)]),
    "",
    "## Log stream labels (`--label`, `--group-by`)",
    "",
    ...section(data.logLabels, (labels) => [inline(labels, full ? Infinity : 60)]),
    "Fields parsed from lines or stored as structured metadata vary per service: `graf fields --signal logs --service <svc>`.",
    "",
    "## Trace attributes (`--attr`, `--group-by`)",
    "",
    ...section(data.traceAttributes, (attributes) => {
      const scopes = [...new Set(attributes.map((attribute) => attribute.scope))]
      return scopes.map((scope) => {
        const names = attributes.filter((attribute) => attribute.scope === scope).map((attribute) => attribute.name)
        return `- ${scope} (${names.length}): ${inline(names, full ? Infinity : 40)}`
      })
    }),
    "",
    "## Metrics (`graf metrics list --search <prefix>`)",
    "",
    ...section(data.metricNames, (names) =>
      full
        ? [`${names.length} metrics:`, names.map((name) => `\`${name}\``).join(", ")]
        : [
          `${names.length} metrics, by prefix:`,
          ...metricPrefixes(names).slice(0, 40).map((family) =>
            `- \`${family.pattern}\` × ${family.count}: ${inline(family.examples, 3)}`
          ),
        ]),
    "",
    "## Profiles (`graf profiles top --service <svc> --type <type>`)",
    "",
    ...section(data.profileTypes, (types) => [`types: ${inline(types, full ? Infinity : 20)}`]),
    ...section(data.profileServices, (names) => [`${names.length} services:`, ...renderServices(names, full)]),
    "",
    "## Alert rules (`graf alerts triage <uid>`)",
    "",
    ...section(data.alerts, (rules) => {
      const active = rules.filter((rule) => rule.state === "firing" || rule.state === "pending")
      const unhealthy = rules.filter((rule) => rule.health !== undefined && rule.health !== "ok")
      return [
        `${rules.length} rules: ${countBy(rules, (rule) => rule.state ?? "unknown").map(([state, n]) => `${n} ${state}`).join(", ")}`
          + (unhealthy.length === 0 ? "" : `; ${unhealthy.length} unhealthy (${countBy(unhealthy, (rule) => rule.health!).map(([h, n]) => `${n} ${h}`).join(", ")})`),
        ...active.map((rule) =>
          `- ${rule.state}: \`${rule.uid}\` ${rule.name}${rule.severity === undefined ? "" : ` [${rule.severity}]`}${rule.firing > 1 ? ` (${rule.firing} instances)` : ""}`
        ),
      ]
    }),
    "",
    "## Dashboards (`graf dashboards get <uid>` for their panel queries)",
    "",
    ...section(data.dashboards, (dashboards) =>
      full
        ? [`${dashboards.length} dashboards:`, ...dashboards.map((d) => `- \`${d.uid ?? "?"}\` ${d.title ?? ""}${d.folder === undefined ? "" : ` (${d.folder})`}`)]
        : [
          `${dashboards.length} dashboards; by folder: ${countBy(dashboards, (d) => d.folder ?? "General").map(([f, n]) => `${f} ${n}`).join(", ")}`,
          `tags: ${inline(countBy(dashboards.flatMap((d) => d.tags), (tag) => tag).map(([tag, n]) => `${tag} (${n})`), 30)}`,
          "Find one with `graf dashboards search <text>`.",
        ]),
    "",
  ]
  return lines.join("\n")
}

const context = Command.make(
  "context",
  {
    from: Flag.string("from").pipe(
      Flag.optional,
      Flag.withDescription("Discovery window start (default \"1 day\")"),
    ),
    full: Flag.boolean("full").pipe(Flag.withDescription("Exhaustive lists instead of the condensed overview")),
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const datasources = yield* Datasources
      const logs = yield* Logs
      const traces = yield* Traces
      const metrics = yield* Metrics
      const window = Option.getOrUndefined(input.from) ?? "1 day"
      const range = { from: window }
      const profiles = yield* Profiles
      const alerts = yield* Alerts
      const { api } = yield* ApiClient
      const [resolved, logServices, traceServices, logLabels, traceAttributes, metricNames, profileServices, profileTypes, alertRules, dashboards] = yield* Effect.all([
        Effect.forEach(
          roles,
          (role) => attempt(Effect.map(datasources.resolve(role), (ds) => ({ uid: ds.uid, type: ds.type }))).pipe(
            Effect.map((outcome) => [role, outcome] as const),
          ),
          { concurrency: "unbounded" },
        ),
        attempt(logs.labelValues(serviceLabel, range)),
        attempt(traces.attributeValues(serviceAttribute, range)),
        attempt(logs.labels(range)),
        attempt(Effect.map(traces.attributeNames(undefined, range), (all) => all.filter((attribute) => attribute.scope !== "event" && attribute.scope !== "link"))),
        attempt(metrics.labelValues("__name__", range)),
        attempt(profiles.labelValues(profileServiceLabel, range)),
        attempt(Effect.map(profiles.types, (types) => types.map((type) => type.id))),
        attempt(Effect.map(alerts.list({}), (rules) =>
          rules.map((rule): AlertSummary => ({
            uid: rule.uid,
            name: rule.name,
            state: rule.state,
            health: rule.health,
            severity: rule.labels["severity"],
            firing: rule.instances.filter((instance) => /^alerting/i.test(instance.state ?? "")).length,
          })))),
        attempt(Effect.map(api.search({ params: { type: "dash-db", limit: 5000 } }), (hits) =>
          hits.map((hit): DashboardSummary => ({ uid: hit.uid, title: hit.title, folder: hit.folderTitle, tags: hit.tags ?? [] })))),
      ], { concurrency: "unbounded" })
      yield* Console.log(renderAgentContext({
        url: config.url,
        generatedAt: new Date().toISOString(),
        window,
        datasources: resolved,
        logServices,
        traceServices,
        logLabels,
        traceAttributes,
        metricNames,
        profileServices,
        profileTypes,
        alerts: alertRules,
        dashboards,
      }, input.full))
    }).pipe(Effect.provide(Layer.mergeAll(discoveryLive, Datasources.Live, Profiles.Live, Alerts.Live, ApiClient.Live))),
).pipe(Command.withDescription("Markdown overview of this Grafana: services, log labels, trace attributes, metrics, profiles, alerts and dashboards"))

export const command = Command.make("agent").pipe(
  Command.withDescription("Context for coding agents: static instructions plus a live overview"),
  Command.withSubcommands([instructions, context]),
)
