import { Data, Duration, Effect, Option } from "effect"

export class InvalidTimeRange extends Data.TaggedError("InvalidTimeRange")<{
  readonly input: string
  readonly message: string
}> {}

export const parseInstant = (input: string, now = Date.now()): Effect.Effect<number, InvalidTimeRange> => {
  if (input.trim().toLowerCase() === "now") {
    return Effect.succeed(now)
  }

  if (/^-?\d{12,}$/.test(input)) {
    const unixMillis = Number(input)
    if (Number.isSafeInteger(unixMillis)) return Effect.succeed(unixMillis)
  }

  const duration = Duration.fromInput(input as Duration.Input)
  if (Option.isSome(duration)) {
    return Effect.succeed(now - Duration.toMillis(duration.value))
  }

  const parsed = Date.parse(input)
  if (!Number.isNaN(parsed)) {
    return Effect.succeed(parsed)
  }

  return Effect.fail(new InvalidTimeRange({
    input,
    message: `Expected "now", a duration like "30 minutes" (interpreted as time ago), or an ISO timestamp; got ${input}`,
  }))
}

export const parseDurationSeconds = (input: string): Effect.Effect<number, InvalidTimeRange> => {
  const duration = Duration.fromInput(input as Duration.Input)
  if (Option.isSome(duration)) {
    const seconds = Duration.toMillis(duration.value) / 1_000
    if (Number.isFinite(seconds)) {
      return Effect.succeed(seconds)
    }
  }

  return Effect.fail(new InvalidTimeRange({
    input,
    message: `Expected a duration like "1 minute"; got ${input}`,
  }))
}

export const resolveRange = (
  from: string,
  to: string | undefined,
  now = Date.now(),
): Effect.Effect<{
  readonly start: number
  readonly end: number
}, InvalidTimeRange> =>
  Effect.gen(function* () {
    const start = yield* parseInstant(from, now)
    const end = to === undefined ? now : yield* parseInstant(to, now)
    return { start, end }
  })

export const rangeFrom = (from: string, now = Date.now()): Effect.Effect<{
  readonly start: number
  readonly end: number
}, InvalidTimeRange> =>
  resolveRange(from, undefined, now)
