import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import { DsQueryResponse } from "../src/Alerts.ts"
import { flattenFrames, queryDatasources } from "../src/QueryCommand.ts"

it("queryDatasources reads every datasource reference form", () => {
  expect(queryDatasources({
    queries: [
      { refId: "A", datasource: { uid: "mimir", type: "prometheus" } },
      { refId: "B", datasource: "loki" },
      { refId: "C", datasourceUid: "__expr__" },
      {},
    ],
  })).toEqual([
    { refId: "A", uid: "mimir", type: "prometheus" },
    { refId: "B", uid: "loki", type: undefined },
    { refId: "C", uid: "__expr__", type: undefined },
    { refId: "?", uid: undefined, type: undefined },
  ])
})

it("flattenFrames lines series up by timestamp", () => {
  const frame = (service: string, values: ReadonlyArray<number>) => ({
    schema: { fields: [{ name: "Time", type: "time" }, { name: "Value", type: "number", labels: { service } }] },
    data: { values: [[1767225600000, 1767225660000], values] },
  })
  const response = Schema.decodeUnknownSync(DsQueryResponse)({
    results: { A: { frames: [frame("api", [1, 2]), frame("web", [3, 4])] }, B: { frames: [{ schema: { fields: [{ name: "n", type: "number" }] }, data: { values: [[7]] } }] } },
  })
  expect(flattenFrames(response)).toEqual({
    columns: ["refId", "Time", "Value{service=api}", "Value{service=web}", "n"],
    rows: [
      ["A", "2026-01-01T00:00:00.000Z", 1, 3, undefined],
      ["A", "2026-01-01T00:01:00.000Z", 2, 4, undefined],
      ["B", undefined, undefined, undefined, 7],
    ],
  })
})
