import { expect, it } from "@effect/vitest"
import { normalizeArgv } from "../src/Argv.ts"

it.each([
  {
    name: "an equals sign in the value",
    input: ["--contains=code=FAILED"],
    expected: ["--contains", "code=FAILED"],
  },
  {
    name: "multiple equals signs",
    input: ["--contains=FAILED=zzz"],
    expected: ["--contains", "FAILED=zzz"],
  },
  {
    name: "an equals sign in a filter expression",
    input: ["--filter=log.body contains \"code=x\""],
    expected: ["--filter", "log.body contains \"code=x\""],
  },
])("normalizes $name", ({ input, expected }) => {
  expect(normalizeArgv(input)).toEqual(expected)
})

it.each([
  { name: "a single equals sign", input: ["--contains=simple"] },
  { name: "the space form", input: ["--contains", "code=FAILED"] },
  { name: "a boolean flag", input: ["--over-time"] },
  { name: "a positional containing equals", input: ["positional=arg"] },
  { name: "the option separator", input: ["--"] },
  { name: "arguments after the option separator", input: ["--", "--contains=code=FAILED"] },
])("leaves $name unchanged", ({ input }) => {
  expect(normalizeArgv(input)).toEqual(input)
})
