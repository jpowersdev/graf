import { expect, it } from "@effect/vitest"
import { renderRows } from "../src/Rows.ts"

const columns = ["name", "type"]
const rows = [["http.requests", "sum"], ["latency", undefined]] as const
const raw = [{ name: "http.requests", type: "sum" }, { name: "latency" }]

it("renders shared row output formats", () => {
  expect(renderRows(columns, rows, "table", raw)).toBe("name          type\nhttp.requests sum\nlatency")
  expect(renderRows(columns, rows, "tsv", raw)).toBe("name\ttype\nhttp.requests\tsum\nlatency\t")
  expect(renderRows(columns, rows, "values", raw)).toBe("http.requests sum\nlatency ")
  expect(renderRows(columns, rows, "ndjson", raw)).toBe(
    '{"name":"http.requests","type":"sum"}\n{"name":"latency","type":""}',
  )
  expect(renderRows(columns, rows, "json", raw)).toBe(JSON.stringify(raw, null, 2))
})
