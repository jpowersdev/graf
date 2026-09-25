import { expect, it } from "@effect/vitest"
import { ConfigProvider, Effect, Layer, Schema } from "effect"
import * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse"
import { ApiClient, upstreamMessage } from "../src/ApiClient.ts"

interface Seen {
  readonly url: string
  readonly authorization: string | undefined
  readonly orgId: string | undefined
}

const mockLayer = (env: Record<string, string>, reply: (url: URL) => Response) => {
  const seen: Array<Seen> = []
  const client = HttpClient.make((request, url) => {
    seen.push({ url: url.toString(), authorization: request.headers.authorization, orgId: request.headers["x-grafana-org-id"] })
    return Effect.succeed(HttpClientResponse.fromWeb(request, reply(url)))
  })
  const layer = Layer.effect(ApiClient, ApiClient.make).pipe(
    Layer.provide(Layer.succeed(HttpClient.HttpClient, client)),
    Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(env))),
  )
  return { seen, layer }
}

const env = { GRAFANA_URL: "https://grafana.example.com/", GRAFANA_SERVICE_ACCOUNT_TOKEN: "glsa_test" }
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } })

it.effect("generated client calls are rooted at <url>/api with a bearer token", () => {
  const { seen, layer } = mockLayer(env, () => json({ version: "13.1.2" }))
  return Effect.gen(function* () {
    const { api } = yield* ApiClient
    const health = yield* api.getHealth(undefined)
    expect(health.version).toBe("13.1.2")
    expect(seen).toEqual([{ url: "https://grafana.example.com/api/health", authorization: "Bearer glsa_test", orgId: undefined }])
  }).pipe(Effect.provide(layer))
})

it.effect("getJson calls paths under the Grafana URL, encodes params, and sends the org header", () => {
  const { seen, layer } = mockLayer({ ...env, GRAFANA_ORG_ID: "2" }, () => json({ status: "success", data: [] }))
  return Effect.gen(function* () {
    const { getJson } = yield* ApiClient
    yield* getJson(Schema.Unknown, "/api/datasources/proxy/uid/mimir/api/v1/labels", [
      ["match[]", "{__name__=\"up\"}"],
      ["start", 1],
      ["skipped", undefined],
    ])
    expect(seen).toEqual([{
      url: "https://grafana.example.com/api/datasources/proxy/uid/mimir/api/v1/labels?match%5B%5D=%7B__name__%3D%22up%22%7D&start=1",
      authorization: "Bearer glsa_test",
      orgId: "2",
    }])
  }).pipe(Effect.provide(layer))
})

it.effect("getJson turns non-2xx responses into UpstreamError with the backend's message", () => {
  const { layer } = mockLayer(env, () => new Response("query blocked by policy", { status: 400 }))
  return Effect.gen(function* () {
    const { getJson } = yield* ApiClient
    const error = yield* Effect.flip(getJson(Schema.Unknown, "/api/datasources/proxy/uid/loki/loki/api/v1/query_range"))
    expect(error).toMatchObject({
      _tag: "UpstreamError",
      status: 400,
      path: "/api/datasources/proxy/uid/loki/loki/api/v1/query_range",
      message: "query blocked by policy",
    })
  }).pipe(Effect.provide(layer))
})

it("upstreamMessage prefers Prometheus `error`, then Grafana `message`, then raw text", () => {
  expect(upstreamMessage(JSON.stringify({ status: "error", errorType: "bad_data", error: "parse error" }))).toBe("parse error")
  expect(upstreamMessage(JSON.stringify({ message: "Permission denied" }))).toBe("Permission denied")
  expect(upstreamMessage("  plain text \n")).toBe("plain text")
  expect(upstreamMessage("")).toBe("(empty response body)")
})
