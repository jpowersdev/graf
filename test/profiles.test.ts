import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import { resolveProfileType, topFunctions } from "../src/Profiles.ts"

const types = [
  { id: "process_cpu:cpu:nanoseconds:cpu:nanoseconds", label: "CPU" },
  { id: "process_cpu:samples:count::", label: "Samples" },
  { id: "wall:wall:nanoseconds:cpu:nanoseconds", label: "Wall" },
]

it.effect("resolveProfileType accepts ids, sample types and unambiguous names", () =>
  Effect.gen(function* () {
    expect(yield* resolveProfileType("cpu", types)).toBe("process_cpu:cpu:nanoseconds:cpu:nanoseconds")
    expect(yield* resolveProfileType("wall", types)).toBe("wall:wall:nanoseconds:cpu:nanoseconds")
    expect(yield* resolveProfileType("process_cpu:samples:count::", types)).toBe("process_cpu:samples:count::")
    expect((yield* Effect.flip(resolveProfileType("process_cpu", types))).message).toContain("Ambiguous")
    expect((yield* Effect.flip(resolveProfileType("alloc", types))).message).toContain("Unknown")
  }))

it("topFunctions sums self time and counts recursion once toward total", () => {
  // total(100) → main(100, self 10) → work(60, self 20) → work(40, self 40)
  //                                 → io(30, self 30)
  const frame = {
    schema: {
      fields: [
        { name: "level", type: "number" },
        { name: "value", type: "number", config: { unit: "ns" } },
        { name: "self", type: "number" },
        { name: "label", type: "enum", config: { type: { enum: { text: ["total", "main", "work", "io"] } } } },
      ],
    },
    data: { values: [[0, 1, 2, 3, 2], [100, 100, 60, 40, 30], [0, 10, 20, 40, 30], [0, 1, 2, 2, 3]] },
  }
  const result = topFunctions(frame, "cpu")
  expect(result.unit).toBe("ns")
  expect(result.grandTotal).toBe(100)
  expect(result.functions).toEqual([
    { function: "main", self: 10, total: 100 },
    { function: "work", self: 60, total: 60 },
    { function: "io", self: 30, total: 30 },
  ])
})

it("topFunctions tolerates a missing frame", () => {
  expect(topFunctions(undefined, "cpu")).toEqual({ profileType: "cpu", unit: undefined, grandTotal: 0, functions: [] })
})
