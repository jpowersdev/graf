import { Context, Data, Effect, Layer, Option, Redacted, Schema } from "effect"
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient"
import * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse"
import { GrafanaConfig } from "./Config.js"
import * as Generated from "./Generated.js"

// A non-2xx response from Grafana or from a backend behind its datasource proxy.
export class UpstreamError extends Data.TaggedError("UpstreamError")<{
  readonly status: number
  readonly path: string
  readonly message: string
}> {}

export type UrlParams = ReadonlyArray<readonly [string, string | number | undefined]>

// Grafana returns `{"message": ...}`, Prometheus-style backends `{"error": ...}`, and
// Loki sometimes plain text (e.g. "query blocked by policy").
export const upstreamMessage = (body: string): string => {
  try {
    const parsed = JSON.parse(body) as unknown
    if (parsed !== null && typeof parsed === "object") {
      const record = parsed as Record<string, unknown>
      for (const key of ["error", "message"]) {
        const value = record[key]
        if (typeof value === "string" && value.length > 0) return value
      }
    }
  } catch {
    // not JSON; fall through to the raw text
  }
  const text = body.trim()
  return text.length > 0 ? text.slice(0, 500) : "(empty response body)"
}

export interface GrafanaClient {
  // Generated client for Grafana's own API (read-only operations, rooted at /api).
  readonly api: Generated.Grafana
  // GET a path relative to the Grafana URL (e.g. a datasource proxy path) and decode it.
  readonly getJson: <S extends Schema.Top>(
    schema: S,
    path: string,
    params?: UrlParams,
  ) => Effect.Effect<S["Type"], UpstreamError | unknown, S["DecodingServices"]>
  // POST a JSON body for endpoints that query rather than mutate (e.g. /api/ds/query).
  readonly postJson: <S extends Schema.Top>(
    schema: S,
    path: string,
    body: unknown,
  ) => Effect.Effect<S["Type"], UpstreamError | unknown, S["DecodingServices"]>
}

export class ApiClient extends Context.Service<ApiClient, GrafanaClient>()(
  "ApiClient",
  {
    make: Effect.gen(function* () {
      const config = yield* GrafanaConfig
      const http = yield* HttpClient.HttpClient
      const baseUrl = config.url.replace(/\/+$/, "")

      // Each client gets its own prefix: stacked `prependUrl` mappings apply inside-out.
      const authed = (prefix: string) =>
        http.pipe(
          HttpClient.mapRequest((request) => {
            const withAuth = request.pipe(
              HttpClientRequest.prependUrl(prefix),
              HttpClientRequest.bearerToken(Redacted.value(config.token)),
              HttpClientRequest.acceptJson,
            )
            return Option.match(config.orgId, {
              onNone: () => withAuth,
              onSome: (orgId) => HttpClientRequest.setHeader(withAuth, "X-Grafana-Org-Id", String(orgId)),
            })
          }),
        )
      const root = authed(baseUrl)

      const decode = <S extends Schema.Top>(schema: S, path: string, response: HttpClientResponse.HttpClientResponse) =>
        Effect.gen(function* () {
          if (response.status < 200 || response.status >= 300) {
            const body = yield* Effect.orElseSucceed(response.text, () => "")
            return yield* new UpstreamError({ status: response.status, path, message: upstreamMessage(body) })
          }
          return yield* HttpClientResponse.schemaBodyJson(schema)(response)
        })

      const getJson: GrafanaClient["getJson"] = (schema, path, params = []) =>
        Effect.gen(function* () {
          let request = HttpClientRequest.get(path)
          for (const [key, value] of params) {
            if (value !== undefined) request = HttpClientRequest.appendUrlParam(request, key, String(value))
          }
          return yield* decode(schema, path, yield* root.execute(request))
        })

      const postJson: GrafanaClient["postJson"] = (schema, path, body) =>
        Effect.gen(function* () {
          const request = HttpClientRequest.bodyJsonUnsafe(HttpClientRequest.post(path), body)
          return yield* decode(schema, path, yield* root.execute(request))
        })

      return {
        api: Generated.make(authed(`${baseUrl}/api`)),
        getJson,
        postJson,
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(FetchHttpClient.layer),
  )
}
