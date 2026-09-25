import { expect, it } from "@effect/vitest"
import { UpstreamError } from "../src/ApiClient.ts"
import { formatError, isHelpRequest } from "../src/Errors.ts"

it("formats upstream errors with policy and timeout hints", () => {
  expect(formatError(new UpstreamError({ status: 400, path: "/loki", message: "query blocked by policy" }))).toBe([
    "error: 400 from /loki: query blocked by policy",
    "suggestion: the backend's query policy rejected this query; narrow the selector (e.g. a specific service) instead of matching everything",
  ].join("\n"))
  expect(formatError(new UpstreamError({ status: 504, path: "/q", message: "Gateway Timeout" }))).toContain(
    "suggestion: the query timed out",
  )
})

it("formats generated-client errors from their decoded body", () => {
  const error = { _tag: "GetSignedInUser403", cause: { message: "Permission denied" }, response: { status: 403 } }
  expect(formatError(error)).toBe([
    "error: 403: Permission denied",
    "suggestion: the service account lacks permission here; Viewer can query, but datasource permissions may restrict it",
  ].join("\n"))
})

it("names the missing environment variable", () => {
  const error = { _tag: "ConfigError", message: "SchemaError(Expected string, got undefined\n  at [\"GRAFANA_URL\"])" }
  expect(formatError(error)).toBe("error: GRAFANA_URL is not set (graf needs GRAFANA_URL and GRAFANA_SERVICE_ACCOUNT_TOKEN)")
})

it("recognizes help requests", () => {
  expect(isHelpRequest({ _tag: "ShowHelp" })).toBe(true)
  expect(isHelpRequest(new Error("x"))).toBe(false)
})

it("names a missing environment variable whatever Effect's wording", () => {
  const key = "GRAF_TEST_UNSET_VARIABLE"
  delete process.env[key]
  const error = { _tag: "ConfigError", message: `SchemaError(Expected string\n  at ["${key}"])` }
  expect(formatError(error)).toBe(`error: ${key} is not set (graf needs GRAFANA_URL and GRAFANA_SERVICE_ACCOUNT_TOKEN)`)
})
