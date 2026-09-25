import { expect, it } from "@effect/vitest"
import { renderAgentContext } from "../src/AgentCommand.ts"
import { condenseNames, metricPrefixes, namePattern } from "../src/Discovery.ts"

it("namePattern masks numbers and commit-like hex tokens", () => {
  expect(namePattern("cluster-postgres-pr-16773")).toBe("cluster-postgres-pr-*")
  expect(namePattern("cluster-postgres-pr-ci-0c556e2")).toBe("cluster-postgres-pr-ci-*")
  expect(namePattern("production-api-server")).toBe("production-api-server")
  expect(namePattern("cafe-web")).toBe("cafe-web")
})

it("condenseNames folds recurring patterns into families", () => {
  const { families, singles } = condenseNames([
    "cluster-postgres-pr-16773",
    "cluster-postgres-pr-16851",
    "cluster-postgres-pr-16854",
    "worker-1",
    "worker-2",
    "production-api-server",
    "buildkite-ci",
  ])
  expect(families).toEqual([{ pattern: "cluster-postgres-pr-*", count: 3, examples: ["cluster-postgres-pr-16773", "cluster-postgres-pr-16851"] }])
  expect(singles).toEqual(["buildkite-ci", "production-api-server", "worker-1", "worker-2"])
})

it("metricPrefixes groups by namespace, largest first", () => {
  expect(metricPrefixes(["traces_spanmetrics_calls_total", "traces_service_graph_request_total", "up", "http_requests_total"]))
    .toEqual([
      { pattern: "traces_", count: 2, examples: ["traces_spanmetrics_calls_total", "traces_service_graph_request_total"] },
      { pattern: "http_", count: 1, examples: ["http_requests_total"] },
      { pattern: "up", count: 1, examples: ["up"] },
    ])
})

it("renderAgentContext degrades per section", () => {
  const text = renderAgentContext({
    url: "https://grafana.example.com",
    generatedAt: "2026-01-01T00:00:00.000Z",
    window: "1 day",
    datasources: [["metrics", { ok: true, value: { uid: "mimir", type: "prometheus" } }], ["profiles", { ok: false, error: "No profiles datasource found" }]],
    logServices: { ok: true, value: ["api", "web"] },
    traceServices: { ok: false, error: "403: Permission denied" },
    logLabels: { ok: true, value: ["service_name", "k8s_namespace_name"] },
    traceAttributes: { ok: true, value: [{ scope: "resource", name: "resource.service.name" }, { scope: "span", name: "span.http.route" }] },
    metricNames: { ok: true, value: ["up"] },
    profileServices: { ok: true, value: ["api"] },
    profileTypes: { ok: false, error: "No profiles datasource found" },
    alerts: {
      ok: true,
      value: [
        { uid: "r1", name: "API errors", state: "firing", health: "ok", severity: "critical", firing: 3 },
        { uid: "r2", name: "Quiet", state: "inactive", health: "nodata", firing: 0 },
      ],
    },
    dashboards: { ok: true, value: [{ uid: "d1", title: "API", folder: "Prod", tags: ["api"] }, { uid: "d2", title: "Web", tags: ["api", "web"] }] },
  }, false)
  expect(text).toContain("- metrics: `mimir` (prometheus)")
  expect(text).toContain("- profiles: _No profiles datasource found_")
  expect(text).toContain("2 services:\n- `api`, `web`")
  expect(text).toContain("_unavailable: 403: Permission denied_")
  expect(text).toContain("- resource (1): `resource.service.name`\n- span (1): `span.http.route`")
  expect(text).toContain("- `up` × 1: `up`")
  expect(text).toContain("types: _unavailable")
  expect(text).toContain("2 rules: 1 firing, 1 inactive; 1 unhealthy (1 nodata)\n- firing: `r1` API errors [critical] (3 instances)")
  expect(text).toContain("2 dashboards; by folder: General 1, Prod 1")
  expect(text).toContain("tags: `api (2)`, `web (1)`")
})
