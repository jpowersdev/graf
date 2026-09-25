import { Console, Effect } from "effect"
import type { LogEntry, LogsResult } from "./Logs.js"
import { levelLabel, serviceLabel, severityTextLabel } from "./LogQL.js"
import type { QueryResponse } from "./Metrics.js"
import * as Output from "./Output.js"
import { renderRows } from "./Rows.js"

// Tables and TSV need one physical line per entry.
const singleLine = (line: string): string => line.replace(/\r?\n/g, "\\n").replace(/\t/g, "\\t")

export const render = (entries: ReadonlyArray<LogEntry>, format: Output.OutputFormat): string => {
  switch (format) {
    case "json":
      return JSON.stringify(entries, null, 2)
    case "ndjson":
      return entries.map((entry) => JSON.stringify(entry)).join("\n")
    case "values":
      return entries.map((entry) => singleLine(entry.line)).join("\n")
    case "table":
    case "tsv":
      return renderRows(
        ["time", "service", "level", "line"],
        entries.map((entry) => [
          entry.time,
          entry.labels[serviceLabel],
          (entry.labels[severityTextLabel] ?? entry.labels[levelLabel])?.toLowerCase(),
          singleLine(entry.line),
        ]),
        format,
        entries,
      )
  }
}

export const printQuery = (query: string): Effect.Effect<void> => Console.error(`# logql: ${query}`)

export const print = (result: LogsResult, output: string): Effect.Effect<void, Output.InvalidOutputFormat> =>
  Effect.gen(function* () {
    const format = yield* Output.parseOutputFormat(output)
    yield* printQuery(result.query)
    for (const warning of result.warnings) yield* Console.error(`warning: ${warning}`)
    yield* Console.log(render(result.entries, format))
    if (result.entries.length === 0) yield* Console.error("# 0 lines")
    else if (result.entries.length >= result.limit) {
      yield* Console.error(`# ${result.entries.length} lines (limit reached; narrow --from/--to or raise --limit)`)
    }
  })

// Scalar aggregations read best largest-first; --limit keeps the top groups.
export const topGroups = (response: QueryResponse, limit: number | undefined): QueryResponse => {
  if (response.data.resultType !== "vector") return response
  const sorted = [...response.data.result].sort((a, b) => Number(b.value[1]) - Number(a.value[1]))
  return { ...response, data: { ...response.data, result: limit === undefined ? sorted : sorted.slice(0, limit) } }
}
