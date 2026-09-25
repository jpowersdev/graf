import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import { checkOverride, pickDatasource, roleForType } from "../src/Datasources.ts"

// Mirrors the Vitalize datasource list: one per signal plus unrelated SQL/HTTP sources.
const vitalize = [
  { uid: "clickhouse", type: "grafana-clickhouse-datasource", name: "ClickHouse" },
  { uid: "loki", type: "loki", name: "Loki" },
  { uid: "mimir", type: "prometheus", name: "Mimir", isDefault: true },
  { uid: "postgres-prod", type: "grafana-postgresql-datasource", name: "Postgres Prod" },
  { uid: "pyroscope", type: "grafana-pyroscope-datasource", name: "Pyroscope" },
  { uid: "tempo", type: "tempo", name: "Tempo" },
]

it.effect("pickDatasource finds the single datasource for each role", () =>
  Effect.gen(function* () {
    expect(yield* pickDatasource("metrics", vitalize)).toEqual({ role: "metrics", uid: "mimir", type: "prometheus", name: "Mimir" })
    expect((yield* pickDatasource("logs", vitalize)).uid).toBe("loki")
    expect((yield* pickDatasource("traces", vitalize)).uid).toBe("tempo")
    expect((yield* pickDatasource("profiles", vitalize)).uid).toBe("pyroscope")
  }))

it.effect("pickDatasource prefers Grafana's default among several candidates", () =>
  Effect.gen(function* () {
    const list = [...vitalize, { uid: "prom-2", type: "prometheus", name: "Other" }]
    expect((yield* pickDatasource("metrics", list)).uid).toBe("mimir")
  }))

it.effect("pickDatasource fails with the override variable when it can't choose", () =>
  Effect.gen(function* () {
    const ambiguous = yield* Effect.flip(pickDatasource("logs", [...vitalize, { uid: "loki-2", type: "loki" }]))
    expect(ambiguous.message).toContain("GRAFANA_LOGS_UID")
    const missing = yield* Effect.flip(pickDatasource("logs", vitalize.filter((ds) => ds.type !== "loki")))
    expect(missing.message).toBe("No logs datasource found (looked for types: loki)")
  }))

it.effect("checkOverride rejects a datasource of the wrong type for the role", () =>
  Effect.gen(function* () {
    expect((yield* checkOverride("metrics", vitalize[2]!)).uid).toBe("mimir")
    const error = yield* Effect.flip(checkOverride("logs", vitalize[3]!))
    expect(error.message).toBe(
      "GRAFANA_LOGS_UID points at postgres-prod (grafana-postgresql-datasource), but graf's logs support covers: loki",
    )
  }))

it("roleForType maps only supported types", () => {
  expect(roleForType("tempo")).toBe("traces")
  expect(roleForType("grafana-postgresql-datasource")).toBeUndefined()
  expect(roleForType(undefined)).toBeUndefined()
})
