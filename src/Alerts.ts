import { Context, Data, Effect, Layer, Option, Schema } from "effect"
import { ApiClient } from "./ApiClient.js"
import { GrafanaConfig } from "./Config.js"
import { roleForType } from "./Datasources.js"
import { parseInstant, resolveRange } from "./TimeRange.js"

// Grafana-managed alert rules, read through Grafana's Prometheus-compatible rules API (which
// Viewers can read, and which carries each rule's stored queries) and its state-history API.

const Labels = Schema.Record(Schema.String, Schema.String)

const RuleInstance = Schema.Struct({
  labels: Schema.optionalKey(Labels),
  annotations: Schema.optionalKey(Labels),
  state: Schema.optionalKey(Schema.String),
  activeAt: Schema.optionalKey(Schema.String),
  value: Schema.optionalKey(Schema.String),
})

const Rule = Schema.Struct({
  uid: Schema.optionalKey(Schema.String),
  name: Schema.String,
  state: Schema.optionalKey(Schema.String),
  health: Schema.optionalKey(Schema.String),
  isPaused: Schema.optionalKey(Schema.Boolean),
  type: Schema.optionalKey(Schema.String),
  query: Schema.optionalKey(Schema.String),
  labels: Schema.optionalKey(Schema.NullOr(Labels)),
  annotations: Schema.optionalKey(Schema.NullOr(Labels)),
  lastEvaluation: Schema.optionalKey(Schema.String),
  lastError: Schema.optionalKey(Schema.String),
  folderUid: Schema.optionalKey(Schema.String),
  queriedDatasourceUIDs: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.String))),
  alerts: Schema.optionalKey(Schema.NullOr(Schema.Array(RuleInstance))),
})

export const RulesResponse = Schema.Struct({
  data: Schema.Struct({
    groups: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.Struct({
      name: Schema.String,
      file: Schema.optionalKey(Schema.String),
      folderUid: Schema.optionalKey(Schema.String),
      interval: Schema.optionalKey(Schema.Number),
      rules: Schema.optionalKey(Schema.NullOr(Schema.Array(Rule))),
    })))),
  }),
})
export type RulesResponse = typeof RulesResponse.Type

// One rule's full definition from Grafana's ruler API.
export const RulerRuleResponse = Schema.Struct({
  for: Schema.optionalKey(Schema.String),
  grafana_alert: Schema.Struct({
    uid: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    condition: Schema.optionalKey(Schema.String),
    data: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.Unknown))),
    no_data_state: Schema.optionalKey(Schema.String),
    exec_err_state: Schema.optionalKey(Schema.String),
  }),
})

// A data frame as Grafana serializes it over HTTP: column-oriented values plus a schema.
const Frame = Schema.Struct({
  schema: Schema.optionalKey(Schema.Struct({
    refId: Schema.optionalKey(Schema.String),
    name: Schema.optionalKey(Schema.String),
    fields: Schema.optionalKey(Schema.Array(Schema.Struct({
      name: Schema.optionalKey(Schema.String),
      type: Schema.optionalKey(Schema.String),
      labels: Schema.optionalKey(Schema.NullOr(Labels)),
    }))),
  })),
  data: Schema.optionalKey(Schema.Struct({ values: Schema.optionalKey(Schema.Array(Schema.Array(Schema.Unknown))) })),
})
export type Frame = typeof Frame.Type

export const DsQueryResponse = Schema.Struct({
  results: Schema.optionalKey(Schema.Record(Schema.String, Schema.Struct({
    status: Schema.optionalKey(Schema.Number),
    error: Schema.optionalKey(Schema.NullOr(Schema.String)),
    frames: Schema.optionalKey(Schema.NullOr(Schema.Array(Frame))),
  }))),
})
export type DsQueryResponse = typeof DsQueryResponse.Type

export class RuleNotFound extends Data.TaggedError("RuleNotFound")<{ readonly message: string }> {}
export class UnsupportedRule extends Data.TaggedError("UnsupportedRule")<{ readonly message: string }> {}

export interface RuleQuery {
  readonly refId: string
  readonly datasourceUid?: string | undefined
  readonly datasourceType?: string | undefined
  readonly queryType?: string | undefined
  readonly relativeTimeRange?: { readonly from?: number | undefined; readonly to?: number | undefined } | undefined
  // The human-readable part of the model: PromQL/LogQL/TraceQL, SQL, or an expression.
  readonly expression?: string | undefined
  readonly model: Record<string, unknown>
}

export interface Instance {
  readonly state?: string | undefined
  readonly activeAt?: string | undefined
  readonly value?: string | undefined
  readonly labels: Readonly<Record<string, string>>
}

export interface RuleDefinition {
  // refId of the query or expression whose result decides firing.
  readonly condition?: string | undefined
  readonly for?: string | undefined
  readonly noDataState?: string | undefined
  readonly execErrState?: string | undefined
}

export interface AlertRule {
  readonly uid: string
  readonly name: string
  readonly state?: string | undefined
  readonly health?: string | undefined
  readonly paused: boolean
  readonly folder?: string | undefined
  readonly group: string
  readonly intervalSeconds?: number | undefined
  readonly lastEvaluation?: string | undefined
  readonly lastError?: string | undefined
  readonly labels: Readonly<Record<string, string>>
  readonly annotations: Readonly<Record<string, string>>
  // Full queries and expressions when the ruler API was readable; otherwise the single
  // expression the rules API summarizes (not enough to evaluate).
  readonly queries: ReadonlyArray<RuleQuery>
  readonly definition?: RuleDefinition | undefined
  readonly instances: ReadonlyArray<Instance>
  readonly url: string
}

const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" ? value as Record<string, unknown> : {}

const str = (value: unknown): string | undefined => typeof value === "string" && value.length > 0 ? value : undefined

export const parseRuleData = (data: ReadonlyArray<unknown>): ReadonlyArray<RuleQuery> =>
  data.map((entry) => {
    const item = record(entry)
    const model = record(item.model)
    const datasource = record(model.datasource)
    const range = record(item.relativeTimeRange)
    const datasourceUid = str(item.datasourceUid) ?? str(datasource.uid)
    return {
      refId: str(item.refId) ?? str(model.refId) ?? "?",
      datasourceUid,
      datasourceType: str(datasource.type) ?? (datasourceUid === "__expr__" ? "__expr__" : undefined),
      queryType: str(item.queryType),
      relativeTimeRange: item.relativeTimeRange === undefined
        ? undefined
        : { from: typeof range.from === "number" ? range.from : undefined, to: typeof range.to === "number" ? range.to : undefined },
      expression: str(model.expr) ?? str(model.query) ?? str(model.rawSql)
        ?? (str(model.type) === undefined ? undefined : `${str(model.type)}: ${str(model.expression) ?? JSON.stringify(model.conditions ?? "")}`),
      model,
    }
  })

// The rules API's `query` is either the JSON query list or, for most rules, just the expression.
export const parseRuleQueries = (query: string | undefined, datasourceUids: ReadonlyArray<string>): ReadonlyArray<RuleQuery> => {
  if (query === undefined || query.length === 0) return []
  if (query.trimStart().startsWith("[")) {
    try {
      const parsed = JSON.parse(query) as unknown
      if (Array.isArray(parsed)) return parseRuleData(parsed)
    } catch {
      // fall through: treat it as an expression
    }
  }
  return [{ refId: "A", datasourceUid: datasourceUids[0], expression: query, model: {} }]
}

export const flattenRules = (response: RulesResponse, grafanaUrl: string): ReadonlyArray<AlertRule> =>
  (response.data.groups ?? []).flatMap((group) =>
    (group.rules ?? []).flatMap((rule) =>
      rule.uid === undefined ? [] : [{
        uid: rule.uid,
        name: rule.name,
        state: rule.state,
        health: rule.health,
        paused: rule.isPaused === true,
        folder: group.file,
        group: group.name,
        intervalSeconds: group.interval,
        lastEvaluation: rule.lastEvaluation,
        lastError: rule.lastError === "" ? undefined : rule.lastError,
        labels: rule.labels ?? {},
        annotations: rule.annotations ?? {},
        queries: parseRuleQueries(rule.query, rule.queriedDatasourceUIDs ?? []),
        instances: (rule.alerts ?? []).map((alert) => ({
          state: alert.state,
          activeAt: alert.activeAt,
          value: alert.value,
          labels: alert.labels ?? {},
        })),
        url: `${grafanaUrl.replace(/\/+$/, "")}/alerting/grafana/${encodeURIComponent(rule.uid)}/view`,
      }]
    )
  )

const stateRank: Record<string, number> = { firing: 0, pending: 1, recovering: 2, nodata: 3, error: 4, inactive: 5, normal: 5 }

export const sortRules = (rules: ReadonlyArray<AlertRule>): ReadonlyArray<AlertRule> =>
  [...rules].sort((a, b) =>
    (stateRank[a.state ?? ""] ?? 9) - (stateRank[b.state ?? ""] ?? 9) || a.name.localeCompare(b.name)
  )

// ---- state history ----

export interface Transition {
  readonly time: string
  readonly from?: string | undefined
  readonly to?: string | undefined
  readonly labels?: string | undefined
  readonly values?: Readonly<Record<string, unknown>> | undefined
}

// Frame time columns arrive as epoch s/ms/µs/ns depending on the source; normalize by magnitude.
export const epochToIso = (value: number): string => {
  const ms = value > 1e17 ? value / 1e6 : value > 1e14 ? value / 1e3 : value > 1e11 ? value : value * 1e3
  return new Date(ms).toISOString()
}

export const historyTransitions = (frame: Frame): ReadonlyArray<Transition> => {
  const fields = frame.schema?.fields ?? []
  const columns = frame.data?.values ?? []
  const column = (name: string) => columns[fields.findIndex((field) => field.name === name)] ?? []
  const times = column("time")
  const text = column("text")
  const prev = column("prev")
  const next = column("next")
  const data = column("data")
  return times.map((time, index) => {
    let values: Record<string, unknown> | undefined
    const raw = data[index]
    if (typeof raw === "string") {
      try {
        values = record(record(JSON.parse(raw)).values)
      } catch {
        values = undefined
      }
    }
    // `text` is "<rule name> {label=value, ...}"; keep the label part.
    const labels = typeof text[index] === "string" ? /\{(.*)\}\s*$/.exec(text[index] as string)?.[1] : undefined
    return {
      time: epochToIso(Number(time)),
      from: str(prev[index]),
      to: str(next[index]),
      labels,
      values,
    }
  }).sort((a, b) => b.time.localeCompare(a.time))
}

// ---- triage helpers ----

// Labels whose values differ across firing instances are what distinguishes them
// (e.g. which service or error); constant labels are rule metadata.
export const topContributors = (instances: ReadonlyArray<Instance>, limit = 5) => {
  if (instances.length === 0) return []
  const keys = new Set(instances.flatMap((instance) => Object.keys(instance.labels)))
  return [...keys].flatMap((key) => {
    const counts = new Map<string, number>()
    for (const instance of instances) {
      const value = instance.labels[key]
      if (value !== undefined) counts.set(value, (counts.get(value) ?? 0) + 1)
    }
    if (counts.size <= 1 || key === "fingerprint") return []
    return [{
      label: key,
      values: [...counts].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([value, count]) => ({ value, count })),
      distinct: counts.size,
    }]
  }).sort((a, b) => a.distinct - b.distinct)
}

// ---- evaluation ----

export interface SeriesResult {
  readonly refId: string
  readonly labels: Readonly<Record<string, string>>
  readonly points: number
  readonly first?: number | undefined
  readonly last?: number | undefined
  readonly min?: number | undefined
  readonly max?: number | undefined
}

export const summarizeFrames = (response: DsQueryResponse): {
  readonly series: ReadonlyArray<SeriesResult>
  readonly errors: ReadonlyArray<{ readonly refId: string; readonly error: string }>
} => {
  const series: Array<SeriesResult> = []
  const errors: Array<{ readonly refId: string; readonly error: string }> = []
  for (const [refId, result] of Object.entries(response.results ?? {})) {
    if (typeof result.error === "string" && result.error.length > 0) errors.push({ refId, error: result.error })
    for (const frame of result.frames ?? []) {
      const fields = frame.schema?.fields ?? []
      const values = frame.data?.values ?? []
      fields.forEach((field, index) => {
        if (field.type !== "number") return
        const numbers = (values[index] ?? []).filter((value): value is number => typeof value === "number")
        series.push({
          refId,
          labels: field.labels ?? {},
          points: numbers.length,
          first: numbers[0],
          last: numbers[numbers.length - 1],
          min: numbers.length === 0 ? undefined : Math.min(...numbers),
          max: numbers.length === 0 ? undefined : Math.max(...numbers),
        })
      })
    }
  }
  return { series, errors }
}

export const evaluationBody = (queries: ReadonlyArray<RuleQuery>, atMs: number) => {
  // Each query keeps its own relative window, anchored at the evaluation time; the request
  // range spans the widest one.
  const widest = Math.max(600, ...queries.map((query) => query.relativeTimeRange?.from ?? 0))
  return {
    from: String(atMs - widest * 1_000),
    to: String(atMs),
    queries: queries.map((query) => ({
      ...query.model,
      refId: query.refId,
      datasource: query.datasourceType === "__expr__" || query.datasourceUid === "__expr__"
        ? { type: "__expr__", uid: "__expr__" }
        : { uid: query.datasourceUid, ...(query.datasourceType === undefined ? {} : { type: query.datasourceType }) },
      ...(query.relativeTimeRange?.from === undefined || query.datasourceUid === "__expr__"
        ? {}
        : { timeRange: { from: String(atMs - query.relativeTimeRange.from * 1_000), to: String(atMs - (query.relativeTimeRange.to ?? 0) * 1_000) } }),
    })),
  }
}

export class Alerts extends Context.Service<Alerts, {
  readonly list: (input: { readonly state?: string | undefined }) => Effect.Effect<ReadonlyArray<AlertRule>, unknown>
  readonly get: (uid: string) => Effect.Effect<AlertRule, unknown>
  readonly history: (uid: string, input: { readonly from: string; readonly to?: string | undefined }) => Effect.Effect<ReadonlyArray<Transition>, unknown>
  readonly evaluate: (rule: AlertRule, input: { readonly at: string }) => Effect.Effect<ReturnType<typeof summarizeFrames> & { readonly at: string }, unknown>
}>()(
  "Alerts",
  {
    make: Effect.gen(function* () {
      const client = yield* ApiClient
      const config = yield* GrafanaConfig
      const rulesPath = "/api/prometheus/grafana/api/v1/rules"

      // Definition from the ruler API; Viewers can normally read it, but degrade if not.
      const definition = (uid: string) =>
        client.getJson(RulerRuleResponse, `/api/ruler/grafana/api/v1/rule/${encodeURIComponent(uid)}`).pipe(
          Effect.map((ruler) => ({
            queries: parseRuleData(ruler.grafana_alert.data ?? []),
            definition: {
              condition: ruler.grafana_alert.condition,
              for: ruler.for,
              noDataState: ruler.grafana_alert.no_data_state,
              execErrState: ruler.grafana_alert.exec_err_state,
            },
          })),
          Effect.option,
        )

      const get = (uid: string) =>
        Effect.gen(function* () {
          const [response, full] = yield* Effect.all([
            client.getJson(RulesResponse, rulesPath, [["rule_uid", uid]]),
            definition(uid),
          ], { concurrency: 2 })
          // Older Grafanas ignore rule_uid, so filter here too.
          const rule = flattenRules(response, config.url).find((candidate) => candidate.uid === uid)
          if (rule === undefined) {
            return yield* new RuleNotFound({ message: `No alert rule with UID ${uid}; list them with \`graf alerts list\`` })
          }
          return Option.match(full, { onNone: () => rule, onSome: (extra) => ({ ...rule, ...extra }) })
        })

      // Rule queries often omit their datasource type; look it up by UID.
      const withTypes = (queries: ReadonlyArray<RuleQuery>) =>
        Effect.forEach(queries, (query) =>
          query.datasourceType !== undefined || query.datasourceUid === undefined
            ? Effect.succeed(query)
            : client.api.getDataSourceByUID(query.datasourceUid, undefined).pipe(
              Effect.map((ds) => ({ ...query, datasourceType: ds.type })),
              Effect.orElseSucceed(() => query),
            ), { concurrency: 4 })

      return {
        list: (input) =>
          client.getJson(RulesResponse, rulesPath, [["state", input.state]]).pipe(
            Effect.map((response) => sortRules(flattenRules(response, config.url))),
          ),

        get,

        history: (uid, input) =>
          Effect.gen(function* () {
            const { start, end } = yield* resolveRange(input.from, input.to)
            const frame = yield* client.getJson(Frame, "/api/v1/rules/history", [
              ["ruleUID", uid],
              ["from", Math.floor(start / 1_000)],
              ["to", Math.ceil(end / 1_000)],
            ])
            return historyTransitions(frame)
          }),

        evaluate: (rule, input) =>
          Effect.gen(function* () {
            if (rule.definition === undefined) {
              return yield* new UnsupportedRule({
                message: `Couldn't read rule ${rule.uid}'s full definition (ruler API), so it can't be replayed`,
              })
            }
            const queries = yield* withTypes(rule.queries)
            const unsupported = queries.filter((query) =>
              query.datasourceUid !== "__expr__" && query.datasourceType !== "__expr__"
              && (query.datasourceType === undefined || roleForType(query.datasourceType) === undefined)
            )
            if (unsupported.length > 0 || queries.length === 0) {
              return yield* new UnsupportedRule({
                message: queries.length === 0
                  ? `Rule ${rule.uid} has no stored queries to evaluate`
                  : `graf only replays rules over metrics, logs and traces datasources; this rule queries ${
                    unsupported.map((query) => `${query.refId} → ${query.datasourceUid ?? "?"} (${query.datasourceType ?? "unknown type"})`).join(", ")
                  }. See the queries with \`graf alerts get ${rule.uid}\`.`,
              })
            }
            const at = yield* parseInstant(input.at)
            const response = yield* client.postJson(DsQueryResponse, "/api/ds/query", evaluationBody(queries, at))
            return { at: new Date(at).toISOString(), ...summarizeFrames(response) }
          }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
