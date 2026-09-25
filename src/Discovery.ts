import { Cause, Effect, Result } from "effect"
import { formatError } from "./Errors.js"

// Pure helpers that condense large inventories (hundreds of services, thousands of metrics)
// into something an agent can read in one pass.

export interface Family {
  readonly pattern: string
  readonly count: number
  readonly examples: ReadonlyArray<string>
}

// Tokens that vary per instance of the same thing: numbers, commit SHAs, UUID/hex fragments.
const variableToken = (token: string): boolean =>
  /^\d+$/.test(token) || (/^[0-9a-f]{7,}$/i.test(token) && /\d/.test(token))

export const namePattern = (name: string): string =>
  name.split(/([-_.:/])/).map((token) => variableToken(token) ? "*" : token).join("")

// Names sharing a pattern with at least `minMembers` members collapse into one family;
// everything else stays as a singleton.
export const condenseNames = (names: ReadonlyArray<string>, minMembers = 3): {
  readonly families: ReadonlyArray<Family>
  readonly singles: ReadonlyArray<string>
} => {
  const groups = new Map<string, Array<string>>()
  for (const name of names) {
    const pattern = namePattern(name)
    const members = groups.get(pattern) ?? []
    members.push(name)
    groups.set(pattern, members)
  }
  const families: Array<Family> = []
  const singles: Array<string> = []
  for (const [pattern, members] of groups) {
    if (pattern.includes("*") && members.length >= minMembers) {
      families.push({ pattern, count: members.length, examples: members.slice(0, 2) })
    } else {
      singles.push(...members)
    }
  }
  return {
    families: families.sort((a, b) => b.count - a.count || a.pattern.localeCompare(b.pattern)),
    singles: singles.sort(),
  }
}

// Group metric names by their first `_`-separated segment (the conventional namespace).
export const metricPrefixes = (names: ReadonlyArray<string>): ReadonlyArray<Family> => {
  const groups = new Map<string, Array<string>>()
  for (const name of names) {
    const prefix = name.includes("_") ? `${name.split("_")[0]}_` : name
    const members = groups.get(prefix) ?? []
    members.push(name)
    groups.set(prefix, members)
  }
  return [...groups].map(([pattern, members]) => ({ pattern, count: members.length, examples: members.slice(0, 3) }))
    .sort((a, b) => b.count - a.count || a.pattern.localeCompare(b.pattern))
}

export type Outcome<A> = { readonly ok: true; readonly value: A } | { readonly ok: false; readonly error: string }

// Discovery spans several backends; one being absent or failing shouldn't sink the rest.
export const attempt = <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<Outcome<A>, never, R> =>
  effect.pipe(
    Effect.result,
    Effect.map((result) =>
      Result.isSuccess(result)
        ? { ok: true as const, value: result.success }
        : { ok: false as const, error: formatError(result.failure).replace(/^error: /, "").split("\n")[0]! }
    ),
    Effect.catchCause((cause) => Effect.succeed({ ok: false as const, error: String(Cause.squash(cause)) })),
  )
