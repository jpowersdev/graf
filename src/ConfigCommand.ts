import { Cause, Data, Effect, Option } from "effect"
import { Command } from "effect/unstable/cli"
import { ApiClient } from "./ApiClient.js"
import { GrafanaConfig } from "./Config.js"
import { Datasources, type Role, roles } from "./Datasources.js"
import { formatError } from "./Errors.js"
import * as Json from "./Json.js"

class DoctorFailed extends Data.TaggedError("DoctorFailed")<{ readonly message: string }> {}

type Check<A> = { readonly ok: true } & A | { readonly ok: false; readonly error: string }

const check = <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<Check<A>, never, R> =>
  effect.pipe(
    Effect.map((value) => ({ ok: true as const, ...value })),
    Effect.catchCause((cause) =>
      Effect.succeed({ ok: false as const, error: formatError(Cause.squash(cause)).replace(/^error: /, "") })
    ),
  )

const doctor = Command.make(
  "doctor",
  {},
  () =>
    Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const { api } = yield* ApiClient
      const datasources = yield* Datasources

      const [grafana, user] = yield* Effect.all([
        check(Effect.map(api.getHealth(undefined), (health) => ({ version: health.version }))),
        check(Effect.map(api.getSignedInUser(undefined), (user) => ({ login: user.login, orgId: user.orgId }))),
      ], { concurrency: "unbounded" })

      const roleChecks = yield* Effect.forEach(roles, (role: Role) =>
        check(Effect.gen(function* () {
          const ds = yield* datasources.resolve(role)
          const health = yield* api.checkDatasourceHealthWithUID(ds.uid, undefined)
          return { uid: ds.uid, type: ds.type, name: ds.name, health: health.message }
        })).pipe(Effect.map((result) => [role, result] as const)), { concurrency: "unbounded" })

      const checks = [grafana, user, ...roleChecks.map(([, result]) => result)]
      const failed = checks.filter((result) => !result.ok).length
      yield* Json.print({
        ok: failed === 0,
        url: config.url,
        token: "configured",
        orgId: Option.getOrUndefined(config.orgId),
        grafana,
        user,
        datasources: Object.fromEntries(roleChecks),
      })
      if (failed > 0) return yield* new DoctorFailed({ message: `${failed} check(s) failed; see output above` })
    }).pipe(Effect.provide([Datasources.Live, ApiClient.Live])),
).pipe(Command.withDescription("Check the token, Grafana, and the datasource graf uses for each signal"))

export const command = Command.make("config").pipe(
  Command.withDescription("Inspect CLI configuration"),
  Command.withSubcommands([doctor]),
)
