import { Console, Effect } from "effect"
import type { MetricsQueryResult, QueryData, QueryResponse } from "./Metrics.js"
import * as Output from "./Output.js"
import { renderRows, type RowCell } from "./Rows.js"

export interface Flattened {
  readonly columns: ReadonlyArray<string>
  readonly rows: ReadonlyArray<ReadonlyArray<RowCell>>
}

export interface CollapsedLabel {
  readonly name: string
  readonly value: RowCell
}

const timestamp = (unixSeconds: number): string => new Date(unixSeconds * 1_000).toISOString()

// Prometheus encodes sample values as strings; keep NaN/Inf as-is, numbers as numbers.
const sampleValue = (value: string): RowCell => {
  const number = Number(value)
  return Number.isFinite(number) ? number : value
}

const labelColumns = (series: ReadonlyArray<{ readonly metric: Record<string, string> }>): ReadonlyArray<string> => {
  const names = new Set<string>()
  for (const entry of series) for (const name of Object.keys(entry.metric)) names.add(name)
  // __name__ first, the rest alphabetical, so columns are stable across runs.
  return [...names].sort((a, b) => a === "__name__" ? -1 : b === "__name__" ? 1 : a.localeCompare(b))
}

export const flatten = (data: QueryData): Flattened => {
  switch (data.resultType) {
    case "matrix": {
      const labels = labelColumns(data.result)
      return {
        columns: ["timestamp", "value", ...labels],
        rows: data.result.flatMap((series) =>
          series.values.map(([time, value]) => [
            timestamp(time),
            sampleValue(value),
            ...labels.map((label) => series.metric[label]),
          ])
        ),
      }
    }
    case "vector": {
      const labels = labelColumns(data.result)
      return {
        columns: ["timestamp", "value", ...labels],
        rows: data.result.map((series) => [
          timestamp(series.value[0]),
          sampleValue(series.value[1]),
          ...labels.map((label) => series.metric[label]),
        ]),
      }
    }
    case "scalar":
    case "string":
      return { columns: ["timestamp", "value"], rows: [[timestamp(data.result[0]), sampleValue(data.result[1])]] }
  }
}

// In tables, labels that are identical on every row are noise: pull them into a header block.
export const collapseConstantLabels = (
  flattened: Flattened,
): { readonly flattened: Flattened; readonly collapsed: ReadonlyArray<CollapsedLabel> } => {
  if (flattened.rows.length <= 1) return { flattened, collapsed: [] }

  const collapsed = flattened.columns.flatMap((name, index) => {
    if (name === "timestamp" || name === "value") return []
    const value = flattened.rows[0]?.[index]
    return flattened.rows.every((row) => row[index] === value) ? [{ name, value }] : []
  })
  if (collapsed.length === 0) return { flattened, collapsed }

  const names = new Set(collapsed.map((label) => label.name))
  const kept = flattened.columns.flatMap((column, index) => names.has(column) ? [] : [index])
  return {
    flattened: {
      columns: kept.map((index) => flattened.columns[index]!),
      rows: flattened.rows.map((row) => kept.map((index) => row[index])),
    },
    collapsed,
  }
}

export const render = (response: QueryResponse, format: Output.OutputFormat): string => {
  if (format === "json") return JSON.stringify(response, null, 2)

  const flattened = flatten(response.data)
  if (format !== "table") return renderRows(flattened.columns, flattened.rows, format, response)

  const { flattened: table, collapsed } = collapseConstantLabels(flattened)
  const dataTable = renderRows(table.columns, table.rows, "table", response)
  if (collapsed.length === 0) return dataTable
  const labelsTable = renderRows(["label", "value"], collapsed.map((label) => [label.name, label.value]), "table", collapsed)
  return `${labelsTable}\n\n${dataTable}`
}

export const seriesCount = (data: QueryData): number =>
  data.resultType === "matrix" || data.resultType === "vector" ? data.result.length : 1

export const print = (result: MetricsQueryResult, output: string): Effect.Effect<void, Output.InvalidOutputFormat> =>
  Effect.gen(function* () {
    const format = yield* Output.parseOutputFormat(output)
    const { response } = result
    for (const warning of response.warnings ?? []) yield* Console.error(`warning: ${warning}`)
    for (const info of response.infos ?? []) yield* Console.error(`info: ${info}`)
    if (result.autoStepSeconds !== undefined) yield* Console.error(`# step ${result.autoStepSeconds}s (auto; set --step to override)`)
    yield* Console.log(render(response, format))
    if (format !== "json" && seriesCount(response.data) === 0) yield* Console.error("# 0 series")
  })
