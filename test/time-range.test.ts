import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import { parseDurationSeconds, parseInstant, resolveRange } from "../src/TimeRange.ts"

const now = Date.UTC(2026, 0, 1, 0, 0, 0)

it.effect("parseInstant parses durations back from a fixed clock", () =>
  Effect.gen(function* () {
    expect(yield* parseInstant("30 minutes", now)).toBe(now - 30 * 60_000)
    expect(yield* parseInstant("2 days", now)).toBe(now - 2 * 86_400_000)
    expect(yield* parseInstant("-1 hour", now)).toBe(now + 3_600_000)
  }))

it.effect("parseInstant accepts ISO timestamps and Unix milliseconds", () =>
  Effect.gen(function* () {
    expect(yield* parseInstant("2026-01-01T00:00:00.000Z", now)).toBe(1767225600000)
    expect(yield* parseInstant("1767225600000", now)).toBe(1767225600000)
  }))

it.effect("parseInstant accepts the 'now' keyword", () =>
  Effect.gen(function* () {
    expect(yield* parseInstant("now", now)).toBe(now)
    expect(yield* parseInstant("NOW", now)).toBe(now)
    expect(yield* parseInstant("  now  ", now)).toBe(now)
  }))

it.effect("parseInstant rejects compact durations and invalid values", () =>
  Effect.gen(function* () {
    expect((yield* Effect.flip(parseInstant("30m", now)))._tag).toBe("InvalidTimeRange")
    expect((yield* Effect.flip(parseInstant("gibberish", now)))._tag).toBe("InvalidTimeRange")
  }))

it.effect("resolveRange defaults end to now", () =>
  Effect.gen(function* () {
    expect(yield* resolveRange("15 minutes", undefined, now)).toEqual({
      start: now - 15 * 60_000,
      end: now,
    })
  }))

it.effect("resolveRange resolves both bounds", () =>
  Effect.gen(function* () {
    expect(yield* resolveRange("1 hour", "30 minutes", now)).toEqual({
      start: now - 3_600_000,
      end: now - 1_800_000,
    })
  }))

it.effect("parseDurationSeconds converts Duration.Input strings to seconds", () =>
  Effect.gen(function* () {
    expect(yield* parseDurationSeconds("1 minute")).toBe(60)
    expect(yield* parseDurationSeconds("1.5 hours")).toBe(5_400)
  }))
