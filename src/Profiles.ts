import { Context, Data, Effect, Layer, Schema } from "effect"
import { ApiClient } from "./ApiClient.js"
import { Datasources } from "./Datasources.js"
import { resolveRange } from "./TimeRange.js"

// Adapter for the profiles role over the Grafana Pyroscope datasource: metadata through the
// plugin's resource endpoints, profiles through /api/ds/query (a flamegraph data frame).

export class InvalidProfileQuery extends Data.TaggedError("InvalidProfileQuery")<{ readonly message: string }> {}

export const ProfileTypesResponse = Schema.Array(Schema.Struct({
  id: Schema.String,
  label: Schema.optionalKey(Schema.String),
}))
export type ProfileType = typeof ProfileTypesResponse.Type[number]

const StringArray = Schema.Array(Schema.String)

const ProfileQueryResponse = Schema.Struct({
  results: Schema.optionalKey(Schema.Record(Schema.String, Schema.Struct({
    error: Schema.optionalKey(Schema.NullOr(Schema.String)),
    frames: Schema.optionalKey(Schema.NullOr(Schema.Array(Schema.Unknown))),
  }))),
})

export const serviceLabel = "service_name"

export interface FunctionCost {
  readonly function: string
  readonly self: number
  readonly total: number
}

export interface TopFunctions {
  readonly profileType: string
  readonly unit?: string | undefined
  // Value of the root node: everything sampled in the window.
  readonly grandTotal: number
  readonly functions: ReadonlyArray<FunctionCost>
}

const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" ? value as Record<string, unknown> : {}

// A profile type id is `name:sample_type:sample_unit:period_type:period_unit`. Accept the full id,
// its name (`process_cpu`), or its sample type (`cpu`, `alloc_space`).
export const resolveProfileType = (
  input: string,
  types: ReadonlyArray<ProfileType>,
): Effect.Effect<string, InvalidProfileQuery> => {
  const exact = types.find((type) => type.id === input)
  if (exact !== undefined) return Effect.succeed(exact.id)
  const bySample = types.filter((type) => type.id.split(":")[1] === input)
  const byName = types.filter((type) => type.id.split(":")[0] === input)
  const matches = bySample.length > 0 ? bySample : byName
  if (matches.length === 1) return Effect.succeed(matches[0]!.id)
  return Effect.fail(new InvalidProfileQuery({
    message: `${matches.length === 0 ? "Unknown" : "Ambiguous"} profile type ${JSON.stringify(input)}; available: ${
      (matches.length === 0 ? types : matches).map((type) => type.id).join(", ")
    }`,
  }))
}

// The flamegraph frame is a nested set in depth-first order: each row has a depth (`level`),
// inclusive `value`, `self`, and a `label` index into an enum of function names.
export const topFunctions = (frame: unknown, profileType: string): TopFunctions => {
  const fields = (record(record(frame).schema).fields ?? []) as ReadonlyArray<unknown>
  const values = (record(record(frame).data).values ?? []) as ReadonlyArray<ReadonlyArray<unknown>>
  const index = (name: string) => fields.findIndex((field) => record(field).name === name)
  const column = (name: string) => values[index(name)] ?? []
  const levels = column("level")
  const totals = column("value")
  const selves = column("self")
  const labels = column("label")
  const labelField = record(fields[index("label")])
  const names = (record(record(record(labelField.config).type).enum).text ?? []) as ReadonlyArray<string>
  const unit = record(record(fields[index("value")]).config).unit

  const self = new Map<string, number>()
  const total = new Map<string, number>()
  const stack: Array<string> = []
  for (let row = 0; row < levels.length; row++) {
    const level = Number(levels[row])
    const label = labels[row]
    const name = typeof label === "number" ? names[label] ?? String(label) : String(label)
    stack.length = level
    if (level > 0) {
      self.set(name, (self.get(name) ?? 0) + Number(selves[row] ?? 0))
      // A recursive function counts once toward its total.
      if (!stack.includes(name)) total.set(name, (total.get(name) ?? 0) + Number(totals[row] ?? 0))
    }
    stack.push(name)
  }

  return {
    profileType,
    unit: typeof unit === "string" ? unit : undefined,
    grandTotal: Number(totals[0] ?? 0),
    functions: [...total.keys()].map((name) => ({ function: name, self: self.get(name) ?? 0, total: total.get(name) ?? 0 })),
  }
}

export class Profiles extends Context.Service<Profiles, {
  readonly types: Effect.Effect<ReadonlyArray<ProfileType>, unknown>
  readonly labels: (input: { readonly from: string; readonly to?: string | undefined }) => Effect.Effect<ReadonlyArray<string>, unknown>
  readonly labelValues: (label: string, input: { readonly from: string; readonly to?: string | undefined }) => Effect.Effect<ReadonlyArray<string>, unknown>
  readonly top: (input: {
    readonly profileType: string
    readonly selector: string
    readonly from: string
    readonly to?: string | undefined
    readonly maxNodes: number
  }) => Effect.Effect<TopFunctions, unknown>
}>()(
  "Profiles",
  {
    make: Effect.gen(function* () {
      const client = yield* ApiClient
      const datasources = yield* Datasources
      const datasource = datasources.resolve("profiles")
      const resources = Effect.map(datasource, (ds) => `/api/datasources/uid/${encodeURIComponent(ds.uid)}/resources`)

      const window = (input: { readonly from: string; readonly to?: string | undefined }) =>
        Effect.map(resolveRange(input.from, input.to), ({ start, end }) => [["query", "{}"], ["start", start], ["end", end]] as const)

      return {
        types: Effect.flatMap(resources, (base) => client.getJson(ProfileTypesResponse, `${base}/profileTypes`)),

        labels: (input) =>
          Effect.gen(function* () {
            const base = yield* resources
            return (yield* client.getJson(StringArray, `${base}/labelNames`, yield* window(input))).filter((name) => !name.startsWith("__"))
          }),

        labelValues: (label, input) =>
          Effect.gen(function* () {
            const base = yield* resources
            return yield* client.getJson(StringArray, `${base}/labelValues`, [["label", label], ...(yield* window(input))])
          }),

        top: (input) =>
          Effect.gen(function* () {
            const ds = yield* datasource
            const { start, end } = yield* resolveRange(input.from, input.to)
            const response = yield* client.postJson(ProfileQueryResponse, "/api/ds/query", {
              from: String(start),
              to: String(end),
              queries: [{
                refId: "A",
                datasource: { uid: ds.uid, type: ds.type },
                queryType: "profile",
                profileTypeId: input.profileType,
                labelSelector: input.selector,
                groupBy: [],
                maxNodes: input.maxNodes,
              }],
            })
            const result = response.results?.["A"]
            if (typeof result?.error === "string" && result.error.length > 0) {
              return yield* new InvalidProfileQuery({ message: result.error })
            }
            const frame = (result?.frames ?? []).find((candidate) =>
              record(record(record(candidate).schema).meta).preferredVisualisationType === "flamegraph"
            )
            return topFunctions(frame, input.profileType)
          }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(Datasources.Live),
    Layer.provide(ApiClient.Live),
  )
}
