import { Console, Data, Effect } from "effect"
import { Command, Flag } from "effect/unstable/cli"
import { DsQueryResponse, epochToIso, type Frame } from "./Alerts.js"
import { ApiClient } from "./ApiClient.js"
import { roleForType } from "./Datasources.js"
import * as Json from "./Json.js"
import * as Output from "./Output.js"
import { printRows, type RowCell } from "./Rows.js"

class InvalidQueryBody extends Data.TaggedError("InvalidQueryBody")<{ readonly message: string }> {}

const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {}

export interface QueryDatasource {
  readonly refId: string
  readonly uid?: string | undefined
  readonly type?: string | undefined
}

// A query's datasource is `{uid, type}`, a bare uid string, or a top-level `datasourceUid`.
export const queryDatasources = (body: unknown): ReadonlyArray<QueryDatasource> => {
  const queries = record(body).queries
  return (Array.isArray(queries) ? queries : []).map((entry) => {
    const query = record(entry)
    const ds = query.datasource
    return {
      refId: typeof query.refId === "string" ? query.refId : "?",
      uid: typeof ds === "string" ? ds : typeof record(ds).uid === "string" ? record(ds).uid as string
        : typeof query.datasourceUid === "string" ? query.datasourceUid : undefined,
      type: typeof record(ds).type === "string" ? record(ds).type as string : undefined,
    }
  })
}

const isExpression = (ds: QueryDatasource): boolean => ds.uid === "__expr__" || ds.type === "__expr__"

// One row per timestamp (or per data point for frames without time); each value field becomes a
// column named after the field and its labels.
export const flattenFrames = (response: typeof DsQueryResponse.Type): {
  readonly columns: ReadonlyArray<string>
  readonly rows: ReadonlyArray<ReadonlyArray<RowCell>>
} => {
  const columns = ["refId"]
  const rows: Array<Record<string, RowCell>> = []
  // Rows with the same refId and timestamp are merged, so each series is a column.
  const byTime = new Map<string, Record<string, RowCell>>()
  for (const [refId, result] of Object.entries(response.results ?? {})) {
    for (const frame of (result.frames ?? []) as ReadonlyArray<Frame>) {
      const fields = frame.schema?.fields ?? []
      const values = frame.data?.values ?? []
      const names = fields.map((field) => {
        const labels = Object.entries(field.labels ?? {}).map(([k, v]) => `${k}=${v}`).join(", ")
        return labels.length === 0 ? field.name ?? "value" : `${field.name ?? "value"}{${labels}}`
      })
      for (const name of names) if (!columns.includes(name)) columns.push(name)
      const timeIndex = fields.findIndex((field) => field.type === "time")
      const length = Math.max(0, ...values.map((column) => column.length))
      for (let index = 0; index < length; index++) {
        const cells: Record<string, RowCell> = {}
        fields.forEach((field, column) => {
          const value = values[column]?.[index]
          cells[names[column]!] = field.type === "time" && typeof value === "number"
            ? epochToIso(value)
            : value === null || value === undefined ? undefined : typeof value === "object" ? JSON.stringify(value) : value as RowCell
        })
        const key = timeIndex < 0 ? undefined : `${refId}\u0000${String(cells[names[timeIndex]!])}`
        const existing = key === undefined ? undefined : byTime.get(key)
        if (existing !== undefined) {
          Object.assign(existing, cells)
        } else {
          const row = { refId, ...cells }
          rows.push(row)
          if (key !== undefined) byTime.set(key, row)
        }
      }
    }
  }
  return { columns, rows: rows.map((row) => columns.map((column) => row[column])) }
}

const run = Command.make(
  "run",
  {
    file: Flag.String("file").pipe(Flag.withDescription("JSON body for Grafana's /api/ds/query: { from, to, queries: [...] }")),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const client = yield* ApiClient
      const body = yield* Json.readFile(input.file)
      const datasources = queryDatasources(body)
      if (datasources.length === 0) return yield* new InvalidQueryBody({ message: `${input.file} has no queries` })

      // Same boundary as the rest of graf: signal datasources and Grafana expressions only.
      const typed = yield* Effect.forEach(datasources, (ds) =>
        ds.type !== undefined || ds.uid === undefined || isExpression(ds)
          ? Effect.succeed(ds)
          : client.api.getDataSourceByUID(ds.uid, undefined).pipe(
            Effect.map((found) => ({ ...ds, type: found.type })),
            Effect.orElseSucceed(() => ds),
          ))
      const refused = typed.filter((ds) => !isExpression(ds) && roleForType(ds.type) === undefined)
      if (refused.length > 0) {
        return yield* new InvalidQueryBody({
          message: `graf only queries metrics, logs, traces and profiles datasources; refusing ${
            refused.map((ds) => `${ds.refId} → ${ds.uid ?? "?"} (${ds.type ?? "unknown type"})`).join(", ")
          }`,
        })
      }

      const response = yield* client.postJson(DsQueryResponse, "/api/ds/query", body)
      for (const [refId, result] of Object.entries(response.results ?? {})) {
        if (typeof result.error === "string" && result.error.length > 0) yield* Console.error(`warning: ${refId}: ${result.error}`)
      }
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") return yield* Console.log(JSON.stringify(response, null, 2))
      const flat = flattenFrames(response)
      yield* printRows(flat.columns, flat.rows, format, response)
      if (flat.rows.length === 0) yield* Console.error("# 0 rows")
    }).pipe(Effect.provide(ApiClient.Live)),
).pipe(Command.withDescription("Run a raw Grafana /api/ds/query request body (signal datasources and expressions only)"))

export const command = Command.make("query").pipe(
  Command.withDescription("Raw Grafana data queries"),
  Command.withSubcommands([run]),
)
