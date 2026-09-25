import { Data, Duration, Effect, Option } from "effect"

// TraceQL builders for the Tempo traces adapter.

export class InvalidTraceQuery extends Data.TaggedError("InvalidTraceQuery")<{
  readonly message: string
}> {}

export const serviceAttribute = "resource.service.name"

export interface SpanFilterInput {
  readonly service?: string | undefined
  // Span name, e.g. "POST /checkout".
  readonly operation?: string | undefined
  readonly error?: boolean | undefined
  readonly minDuration?: string | undefined
  readonly maxDuration?: string | undefined
  // Attribute conditions, repeatable: key=value, key!=value, key>=500, key=~regex, ...
  readonly attrs?: ReadonlyArray<string> | undefined
  // A raw TraceQL condition ANDed inside the span selector, e.g. `span.http.status_code >= 500`.
  readonly filter?: string | undefined
  // A complete TraceQL query; excludes every other filter flag.
  readonly query?: string | undefined
}

export const quote = (value: string): string => JSON.stringify(value)

// TraceQL durations are Go-style (`500ms`, `1.5s`, `2m`); also accept "500 millis" style.
export const traceqlDuration = (input: string): Effect.Effect<string, InvalidTraceQuery> => {
  const trimmed = input.trim()
  if (/^\d+(\.\d+)?(ns|us|µs|ms|s|m|h)$/.test(trimmed)) return Effect.succeed(trimmed)
  const duration = Duration.fromInput(trimmed as Duration.Input)
  if (Option.isSome(duration)) return Effect.succeed(`${Duration.toMillis(duration.value)}ms`)
  return Effect.fail(new InvalidTraceQuery({ message: `Expected a duration like 500ms, 2s or "1 minute"; got ${input}` }))
}

// Scoped (`span.`, `resource.`, `event.`, ...) and intrinsic names pass through; bare keys become
// unscoped attributes (`.key`), which match either span or resource attributes.
export const attributeName = (key: string): string => {
  if (/^(span|resource|event|link|instrumentation|trace)[.:][\w.:-]+$/.test(key)) return key
  if (/^(name|status|statusMessage|kind|duration|rootName|rootServiceName|traceDuration)$/.test(key)) return key
  if (/^\.?[\w.]+$/.test(key)) return key.startsWith(".") ? key : `.${key}`
  return `.${quote(key)}`
}

// Enum intrinsics compare against bare keywords; everything else against typed literals.
const enumKeywords: Record<string, RegExp> = {
  kind: /^(unspecified|internal|server|client|producer|consumer)$/,
  status: /^(error|ok|unset)$/,
}

const literal = (key: string, value: string): string => {
  if (enumKeywords[key]?.test(value) === true) return value
  if (/^-?\d+(\.\d+)?$/.test(value) || value === "true" || value === "false" || value === "nil") return value
  return quote(value)
}

export const parseAttrCondition = (input: string): Effect.Effect<string, InvalidTraceQuery> => {
  const match = /^\s*([^=!<>~\s]+)\s*(=~|!~|!=|>=|<=|=|>|<)\s*(.*)$/.exec(input)
  if (match === null) {
    return Effect.fail(new InvalidTraceQuery({ message: `Expected --attr like key=value, key!=value, key>=500 or key=~regex; got ${input}` }))
  }
  const [, key, op, value] = match
  const name = attributeName(key!)
  return Effect.succeed(`${name} ${op} ${op === "=~" || op === "!~" ? quote(value!) : literal(name, value!)}`)
}

export const buildSpanConditions = (input: SpanFilterInput): Effect.Effect<ReadonlyArray<string>, InvalidTraceQuery> =>
  Effect.gen(function* () {
    const conditions: Array<string> = []
    if (input.service !== undefined) conditions.push(`${serviceAttribute} = ${quote(input.service)}`)
    if (input.operation !== undefined) conditions.push(`name = ${quote(input.operation)}`)
    if (input.error === true) conditions.push("status = error")
    if (input.minDuration !== undefined) conditions.push(`duration >= ${yield* traceqlDuration(input.minDuration)}`)
    if (input.maxDuration !== undefined) conditions.push(`duration <= ${yield* traceqlDuration(input.maxDuration)}`)
    for (const attr of input.attrs ?? []) conditions.push(yield* parseAttrCondition(attr))
    if (input.filter !== undefined && input.filter.trim().length > 0) conditions.push(`(${input.filter.trim()})`)
    return conditions
  })

export const buildSpanQuery = (input: SpanFilterInput): Effect.Effect<string, InvalidTraceQuery> =>
  Effect.gen(function* () {
    if (input.query !== undefined) {
      const conflicting = [
        input.service !== undefined && "--service",
        input.operation !== undefined && "--operation",
        input.error === true && "--error",
        input.minDuration !== undefined && "--min-duration",
        input.maxDuration !== undefined && "--max-duration",
        (input.attrs ?? []).length > 0 && "--attr",
        input.filter !== undefined && "--filter",
      ].filter((flag): flag is string => flag !== false)
      if (conflicting.length > 0) {
        return yield* new InvalidTraceQuery({
          message: `--query is a complete TraceQL query; drop ${conflicting.join(", ")} or fold them into the query`,
        })
      }
      return input.query
    }
    const conditions = yield* buildSpanConditions(input)
    return conditions.length === 0 ? "{ }" : `{ ${conditions.join(" && ")} }`
  })

// Search results only carry span names and attributes that the query selects.
export const withSpanDetails = (query: string): string =>
  /\|\s*select\s*\(/.test(query) ? query : `${query} | select(name, ${serviceAttribute}, status, statusMessage)`

export const groupByClause = (groupBy: ReadonlyArray<string>): string =>
  groupBy.length === 0 ? "" : ` by (${groupBy.map(attributeName).join(", ")})`

export const splitList = (values: ReadonlyArray<string> | undefined): ReadonlyArray<string> =>
  (values ?? []).flatMap((value) => value.split(",")).map((value) => value.trim()).filter((value) => value.length > 0)

// Add a condition to a query built from flags. Raw --query metrics are left to the user.
export const andCondition = (query: string, condition: string): string => {
  const match = /^\{\s*(.*?)\s*\}$/.exec(query.trim())
  if (match === null) return query
  return match[1]!.length === 0 ? `{ ${condition} }` : `{ ${match[1]} && ${condition} }`
}

export const parseQuantiles = (input: string): Effect.Effect<ReadonlyArray<number>, InvalidTraceQuery> => {
  const values = splitList([input]).map((value) => {
    const normalized = value.toLowerCase().replace(/^p/, "")
    const number = Number(normalized)
    // Accept p99, 99 or 0.99.
    return number > 1 ? number / 100 : number
  })
  if (values.length === 0 || values.some((value) => !(value > 0 && value < 1))) {
    return Effect.fail(new InvalidTraceQuery({ message: `Expected quantiles like p50,p95,p99 or 0.5,0.99; got ${input}` }))
  }
  return Effect.succeed(values)
}

// Tempo search returns trace IDs without leading zeros; OTel (and Loki's trace_id) uses 32 hex chars.
export const normalizeTraceId = (id: string): string => {
  const hex = id.trim().toLowerCase()
  return /^[0-9a-f]{1,32}$/.test(hex) ? hex.padStart(32, "0") : hex
}

// Tempo's v2 trace JSON (protojson) encodes span and trace IDs as base64.
export const base64ToHex = (value: string | undefined | null): string | undefined => {
  if (value === undefined || value === null || value.length === 0) return undefined
  if (/^[0-9a-f]+$/i.test(value) && (value.length === 16 || value.length === 32)) return value.toLowerCase()
  return Buffer.from(value, "base64").toString("hex")
}

export const traceAggregations = ["count", "rate", "avg", "sum", "min", "max", "p50", "p75", "p90", "p95", "p99"] as const

export interface TraceMetricsQuery {
  readonly query: string
  // Tempo reports durations in seconds; callers multiply by this to show milliseconds.
  readonly scale: number
  readonly unit?: string | undefined
}

export const buildTraceMetricsQuery = (input: {
  readonly selector: string
  readonly aggregation: string
  readonly aggregateOn?: string | undefined
  readonly groupBy: ReadonlyArray<string>
}): Effect.Effect<TraceMetricsQuery, InvalidTraceQuery> =>
  Effect.gen(function* () {
    const aggregation = input.aggregation.toLowerCase()
    if (!(traceAggregations as ReadonlyArray<string>).includes(aggregation)) {
      return yield* new InvalidTraceQuery({
        message: `Unknown --aggregation ${quote(input.aggregation)}; expected one of: ${traceAggregations.join(", ")}`,
      })
    }
    const by = groupByClause(input.groupBy)
    if (aggregation === "count" || aggregation === "rate") {
      if (input.aggregateOn !== undefined) {
        return yield* new InvalidTraceQuery({ message: `--aggregate-on does not apply to --aggregation ${aggregation}` })
      }
      return { query: `${input.selector} | ${aggregation === "count" ? "count_over_time" : "rate"}()${by}`, scale: 1 }
    }
    const field = input.aggregateOn === undefined ? "duration" : attributeName(input.aggregateOn)
    const isDuration = field === "duration"
    const fn = aggregation.startsWith("p")
      ? `quantile_over_time(${field}, ${Number(aggregation.slice(1)) / 100})`
      : `${aggregation}_over_time(${field})`
    return { query: `${input.selector} | ${fn}${by}`, scale: isDuration ? 1_000 : 1, unit: isDuration ? "ms" : undefined }
  })
