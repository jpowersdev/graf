import { Context, Data, Effect, Layer, Option } from "effect"
import { ApiClient } from "./ApiClient.js"
import { DatasourceOverrides } from "./Config.js"

// graf addresses datasources by the signal they serve, not by backend, so a backend
// swap (e.g. Loki -> VictoriaLogs) only needs a new adapter for that role.
export type Role = "metrics" | "logs" | "traces" | "profiles"

export const roles: ReadonlyArray<Role> = ["metrics", "logs", "traces", "profiles"]

// Datasource types graf has an adapter for, per role.
export const supportedTypes: Record<Role, ReadonlyArray<string>> = {
  metrics: ["prometheus"],
  logs: ["loki"],
  traces: ["tempo"],
  profiles: ["grafana-pyroscope-datasource"],
}

export const overrideEnv: Record<Role, string> = {
  metrics: "GRAFANA_METRICS_UID",
  logs: "GRAFANA_LOGS_UID",
  traces: "GRAFANA_TRACES_UID",
  profiles: "GRAFANA_PROFILES_UID",
}

export interface ResolvedDatasource {
  readonly role: Role
  readonly uid: string
  readonly type: string
  readonly name: string
}

export interface DatasourceSummary {
  readonly uid?: string | undefined
  readonly type?: string | undefined
  readonly name?: string | undefined
  readonly isDefault?: boolean | undefined
}

export class DatasourceResolutionError extends Data.TaggedError("DatasourceResolutionError")<{
  readonly role: Role
  readonly message: string
}> {}

const statusOf = (cause: unknown): number | undefined => {
  const response = (cause as { readonly response?: { readonly status?: unknown } } | undefined)?.response
  return typeof response?.status === "number" ? response.status : undefined
}

export const roleForType = (type: string | undefined): Role | undefined =>
  roles.find((role) => type !== undefined && supportedTypes[role].includes(type))

const describe = (datasource: DatasourceSummary): string =>
  `${datasource.uid ?? "?"} (${datasource.type ?? "unknown type"})`

const toResolved = (role: Role, datasource: DatasourceSummary): ResolvedDatasource => ({
  role,
  uid: datasource.uid ?? "",
  type: datasource.type ?? "",
  name: datasource.name ?? datasource.uid ?? "",
})

export const checkOverride = (
  role: Role,
  datasource: DatasourceSummary,
): Effect.Effect<ResolvedDatasource, DatasourceResolutionError> =>
  datasource.type !== undefined && supportedTypes[role].includes(datasource.type)
    ? Effect.succeed(toResolved(role, datasource))
    : Effect.fail(
      new DatasourceResolutionError({
        role,
        message: `${overrideEnv[role]} points at ${describe(datasource)}, but graf's ${role} support covers: ${
          supportedTypes[role].join(", ")
        }`,
      }),
    )

// Pick the one datasource of a supported type; with several, prefer Grafana's default.
export const pickDatasource = (
  role: Role,
  datasources: ReadonlyArray<DatasourceSummary>,
): Effect.Effect<ResolvedDatasource, DatasourceResolutionError> => {
  const candidates = datasources.filter((datasource) =>
    datasource.uid !== undefined && datasource.type !== undefined && supportedTypes[role].includes(datasource.type)
  )
  if (candidates.length === 1) return Effect.succeed(toResolved(role, candidates[0]!))

  const defaults = candidates.filter((datasource) => datasource.isDefault === true)
  if (defaults.length === 1) return Effect.succeed(toResolved(role, defaults[0]!))

  return Effect.fail(
    new DatasourceResolutionError({
      role,
      message: candidates.length === 0
        ? `No ${role} datasource found (looked for types: ${supportedTypes[role].join(", ")})`
        : `Several ${role} datasources found (${candidates.map(describe).join(", ")}); set ${
          overrideEnv[role]
        } to choose one`,
    }),
  )
}

export class Datasources extends Context.Service<Datasources, {
  readonly list: Effect.Effect<ReadonlyArray<DatasourceSummary>, unknown>
  readonly resolve: (role: Role) => Effect.Effect<ResolvedDatasource, unknown>
}>()(
  "Datasources",
  {
    make: Effect.gen(function* () {
      const { api } = yield* ApiClient
      const overrides = yield* DatasourceOverrides

      const list = yield* Effect.cached(api.getDataSources(undefined))

      const resolve = (role: Role) =>
        Option.match(overrides[role], {
          onSome: (uid) =>
            api.getDataSourceByUID(uid, undefined).pipe(
              Effect.flatMap((datasource) => checkOverride(role, datasource)),
            ),
          onNone: () =>
            list.pipe(
              Effect.mapError((cause) =>
                statusOf(cause) === 403
                  ? new DatasourceResolutionError({
                    role,
                    message: `This token can't list datasources (403); set ${overrideEnv[role]} to the ${role} datasource UID`,
                  })
                  : cause
              ),
              Effect.flatMap((datasources) => pickDatasource(role, datasources)),
            ),
        })

      return { list, resolve }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
