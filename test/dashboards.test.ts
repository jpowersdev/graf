import { expect, it } from "@effect/vitest"
import { summarizeDashboard } from "../src/Dashboards.ts"

it("summarizeDashboard flattens rows and resolves each query's datasource", () => {
  const summary = summarizeDashboard({
    uid: "d1",
    title: "API",
    tags: ["api"],
    templating: { list: [{ name: "env", type: "custom", query: "prod,uat", current: { value: "prod" } }, { name: "svc", type: "query", query: { query: "label_values(up, job)" }, current: { value: ["a", "b"] } }] },
    panels: [
      { id: 1, type: "timeseries", title: "Requests", datasource: { type: "prometheus", uid: "mimir" }, targets: [{ refId: "A", expr: "sum(rate(x[5m]))" }] },
      { type: "row", title: "Logs" },
      { id: 2, type: "logs", title: "Errors", targets: [{ refId: "A", datasource: { type: "loki", uid: "loki" }, expr: "{service_name=\"api\"}" }] },
      { type: "row", title: "Collapsed", panels: [{ id: 3, type: "table", title: "SQL", datasource: "${ds}", targets: [{ refId: "A", rawSql: "select 1" }] }] },
      { id: 4, type: "text", title: "Notes" },
    ],
  })
  expect(summary.variables).toEqual([
    { name: "env", type: "custom", query: "prod,uat", current: "prod" },
    { name: "svc", type: "query", query: "label_values(up, job)", current: "a,b" },
  ])
  expect(summary.panels).toEqual([
    { id: 1, title: "Requests", type: "timeseries", row: undefined, queries: [{ refId: "A", datasource: "mimir", datasourceType: "prometheus", role: "metrics", query: "sum(rate(x[5m]))" }] },
    { id: 2, title: "Errors", type: "logs", row: "Logs", queries: [{ refId: "A", datasource: "loki", datasourceType: "loki", role: "logs", query: "{service_name=\"api\"}" }] },
    { id: 3, title: "SQL", type: "table", row: "Collapsed", queries: [{ refId: "A", datasource: "${ds}", datasourceType: undefined, role: undefined, query: "select 1" }] },
    { id: 4, title: "Notes", type: "text", row: "Collapsed", queries: [] },
  ])
})
