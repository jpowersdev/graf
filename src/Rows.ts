import { Console, Effect } from "effect"
import * as Output from "./Output.js"

export type RowCell = string | number | boolean | undefined

const cellText = (value: RowCell): string =>
  value === undefined ? "" : String(value)

export const renderRows = (
  columns: ReadonlyArray<string>,
  rows: ReadonlyArray<ReadonlyArray<RowCell>>,
  output: Output.OutputFormat,
  raw: unknown,
): string => {
  switch (output) {
    case "json":
      return JSON.stringify(raw, null, 2)
    case "values":
      return rows.map((row) => row.map(cellText).join(" ")).join("\n")
    case "tsv":
      return [columns, ...rows].map((row) => row.map(cellText).join("\t")).join("\n")
    case "ndjson":
      return rows.map((row) => JSON.stringify(Object.fromEntries(columns.map((column, index) => [column, row[index] ?? ""]))))
        .join("\n")
    case "table": {
      const widths = columns.map((column, index) => {
        let max = column.length
        for (const row of rows) {
          const length = cellText(row[index]).length
          if (length > max) max = length
        }
        return max
      })
      const renderRow = (row: ReadonlyArray<RowCell>) =>
        columns.map((_, index) => cellText(row[index]).padEnd(widths[index] ?? 0)).join(" ").trimEnd()
      return [columns.map((column, index) => column.padEnd(widths[index] ?? 0)).join(" ").trimEnd(), ...rows.map(renderRow)]
        .filter((line) => line.length > 0)
        .join("\n")
    }
  }
}

export const printRows = (
  columns: ReadonlyArray<string>,
  rows: ReadonlyArray<ReadonlyArray<RowCell>>,
  output: string,
  raw: unknown,
): Effect.Effect<void, Output.InvalidOutputFormat> =>
  Effect.gen(function* () {
    const format = yield* Output.parseOutputFormat(output)
    yield* Console.log(renderRows(columns, rows, format, raw))
  })
