import { Data, Effect } from "effect"
import { normalizeTraceId } from "./TraceQL.js"

// LogQL builders for the Loki logs adapter. Flags describe *what* to find; this module
// decides how to say it in LogQL, so a different logs backend only needs its own builder.

export class InvalidLogQuery extends Data.TaggedError("InvalidLogQuery")<{
  readonly message: string
}> {}

// Loki's OTLP ingestion maps resource `service.name` to this stream label.
export const serviceLabel = "service_name"
// Loki derives this from the OTel severity number (or the line); values are lowercase.
export const levelLabel = "detected_level"
// The OTel severity text as the app emitted it; casing and spelling vary by logger.
export const severityTextLabel = "severity_text"

// Level spellings seen in real logs besides case variants: "warning" for WARN.
const levelAliases: Record<string, ReadonlyArray<string>> = {
  warn: ["warn", "warning"],
  warning: ["warn", "warning"],
}

// A severity number wrongly defaulted upstream leaves detected_level at "info" while
// severity_text says "ERROR", so match either one, case-insensitively.
export const levelFilter = (levels: ReadonlyArray<string>): string => {
  const spellings = [...new Set(levels.flatMap((level) => levelAliases[level] ?? [level]))]
  const pattern = quote(`(?i)^(${spellings.map(escapeRegex).join("|")})$`)
  return `| ${levelLabel}=~${pattern} or ${severityTextLabel}=~${pattern}`
}

export interface LabelMatcher {
  readonly name: string
  readonly op: "=" | "!=" | "=~" | "!~"
  readonly value: string
}

export interface LogFilterInput {
  readonly service?: string | undefined
  readonly labels?: ReadonlyArray<string> | undefined
  readonly contains?: ReadonlyArray<string> | undefined
  readonly levels?: ReadonlyArray<string> | undefined
  readonly traceId?: string | undefined
  // Raw LogQL pipeline stages appended as-is, e.g. `| json | status >= 500`.
  readonly filter?: string | undefined
  // A complete LogQL log query; excludes every other filter flag.
  readonly query?: string | undefined
}

export const quote = (value: string): string => JSON.stringify(value)

const labelName = /^[A-Za-z_][A-Za-z0-9_]*$/

export const parseLabelMatcher = (input: string): Effect.Effect<LabelMatcher, InvalidLogQuery> => {
  const match = /^\s*([^=!~\s]+)\s*(=~|!~|!=|=)\s*(.*)$/.exec(input)
  if (match === null || !labelName.test(match[1]!)) {
    return Effect.fail(
      new InvalidLogQuery({ message: `Expected --label like name=value, name!=value, name=~regex or name!~regex; got ${input}` }),
    )
  }
  return Effect.succeed({ name: match[1]!, op: match[2] as LabelMatcher["op"], value: match[3]! })
}

const renderMatcher = (matcher: LabelMatcher): string => `${matcher.name}${matcher.op}${quote(matcher.value)}`

const splitList = (values: ReadonlyArray<string> | undefined): ReadonlyArray<string> =>
  (values ?? []).flatMap((value) => value.split(",")).map((value) => value.trim()).filter((value) => value.length > 0)

const escapeRegex = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

export const buildLogQuery = (input: LogFilterInput): Effect.Effect<string, InvalidLogQuery> =>
  Effect.gen(function* () {
    if (input.query !== undefined) {
      const conflicting = [
        input.service !== undefined && "--service",
        (input.labels ?? []).length > 0 && "--label",
        (input.contains ?? []).length > 0 && "--contains",
        (input.levels ?? []).length > 0 && "--level",
        input.traceId !== undefined && "--trace-id",
        input.filter !== undefined && "--filter",
      ].filter((flag): flag is string => flag !== false)
      if (conflicting.length > 0) {
        return yield* new InvalidLogQuery({
          message: `--query is a complete LogQL query; drop ${conflicting.join(", ")} or fold them into the query`,
        })
      }
      return input.query
    }

    const matchers = [
      ...(input.service === undefined ? [] : [{ name: serviceLabel, op: "=" as const, value: input.service }]),
      ...(yield* Effect.forEach(input.labels ?? [], parseLabelMatcher)),
    ]
    if (matchers.length === 0) {
      return yield* new InvalidLogQuery({
        message: "Logs need a stream selector: pass --service or --label (or a full --query). "
          + "Discover services with `graf logs values service_name`.",
      })
    }

    const stages: Array<string> = []
    for (const text of input.contains ?? []) stages.push(`|= ${quote(text)}`)
    if (input.traceId !== undefined) stages.push(`| trace_id=${quote(normalizeTraceId(input.traceId))}`)
    const levels = splitList(input.levels).map((level) => level.toLowerCase())
    if (levels.length > 0) stages.push(levelFilter(levels))
    if (input.filter !== undefined && input.filter.trim().length > 0) {
      const filter = input.filter.trim()
      stages.push(/^(\||!=|!~|\|=|\|~)/.test(filter) ? filter : `| ${filter}`)
    }

    return [`{${matchers.map(renderMatcher).join(", ")}}`, ...stages].join(" ")
  })

export const aggregations = [
  "count",
  "rate",
  "bytes",
  "sum",
  "avg",
  "min",
  "max",
  "p50",
  "p75",
  "p90",
  "p95",
  "p99",
] as const
export type Aggregation = typeof aggregations[number]

export interface MetricQueryInput {
  readonly logQuery: string
  readonly aggregation: string
  // Field to unwrap for numeric aggregations: a label, structured metadata, or a parsed field.
  readonly aggregateOn?: string | undefined
  // Parser stage to extract --aggregate-on from the line.
  readonly parser?: string | undefined
  readonly groupBy?: ReadonlyArray<string> | undefined
  readonly rangeSeconds: number
}

const needsField = (aggregation: Aggregation): boolean =>
  aggregation !== "count" && aggregation !== "rate" && aggregation !== "bytes"

export const logqlDuration = (seconds: number): string => `${Math.max(1, Math.round(seconds))}s`

export const buildMetricQuery = (input: MetricQueryInput): Effect.Effect<string, InvalidLogQuery> =>
  Effect.gen(function* () {
    const aggregation = input.aggregation.toLowerCase() as Aggregation
    if (!aggregations.includes(aggregation)) {
      return yield* new InvalidLogQuery({
        message: `Unknown --aggregation ${quote(input.aggregation)}; expected one of: ${aggregations.join(", ")}`,
      })
    }
    if (input.parser !== undefined && !["json", "logfmt"].includes(input.parser)) {
      return yield* new InvalidLogQuery({ message: `Unknown --parser ${quote(input.parser)}; expected json or logfmt` })
    }
    const groupBy = splitList(input.groupBy)
    for (const key of groupBy) {
      if (!labelName.test(key)) return yield* new InvalidLogQuery({ message: `Invalid --group-by key ${quote(key)}` })
    }
    const by = groupBy.length === 0 ? "" : ` by (${groupBy.join(", ")})`
    const range = `[${logqlDuration(input.rangeSeconds)}]`
    const parser = input.parser === undefined ? "" : ` | ${input.parser}`

    if (!needsField(aggregation)) {
      if (input.aggregateOn !== undefined) {
        return yield* new InvalidLogQuery({ message: `--aggregate-on does not apply to --aggregation ${aggregation}` })
      }
      const fn = aggregation === "count" ? "count_over_time" : aggregation === "rate" ? "rate" : "bytes_over_time"
      return `sum${by} (${fn}(${input.logQuery}${parser} ${range}))`
    }

    if (input.aggregateOn === undefined) {
      return yield* new InvalidLogQuery({ message: `--aggregation ${aggregation} needs --aggregate-on <field>` })
    }
    // Unwrapped range aggregations group inline; without `by`, Loki returns one series per stream.
    const unwrapped = `${input.logQuery}${parser} | unwrap ${input.aggregateOn} | __error__="" ${range}`
    const grouping = by === "" ? " by ()" : by
    if (aggregation.startsWith("p")) {
      const quantile = Number(aggregation.slice(1)) / 100
      return `quantile_over_time(${quantile}, ${unwrapped})${grouping}`
    }
    return `${aggregation}_over_time(${unwrapped})${grouping}`
  })
