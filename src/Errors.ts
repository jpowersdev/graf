const record = (value: unknown): Record<string, unknown> | undefined =>
  value !== null && typeof value === "object" ? value as Record<string, unknown> : undefined

const string = (value: unknown): string | undefined => typeof value === "string" && value.length > 0 ? value : undefined

export const verboseErrorsEnabled = (args: ReadonlyArray<string>): boolean => {
  const verboseLevels = new Set(["all", "trace", "debug"])
  for (let index = 0; index < args.length; index++) {
    const argument = args[index] ?? ""
    if (argument.startsWith("--log-level=")) {
      return verboseLevels.has(argument.slice("--log-level=".length))
    }
    if (argument === "--log-level") {
      return verboseLevels.has(args[index + 1] ?? "")
    }
  }
  return false
}

// The CLI framework signals "help was shown" (a bare parent command, or --help) by
// failing with a ShowHelp value. That is not an error — the help text is already printed —
// so callers should skip the usual "error: ..." line for it.
export const isHelpRequest = (cause: unknown): boolean => record(cause)?._tag === "ShowHelp"

interface Described {
  readonly message: string
  readonly status?: number | undefined
}

const describe = (cause: unknown): Described => {
  const outer = record(cause)
  switch (outer?._tag) {
    // graf's own client for datasource-proxy calls.
    case "UpstreamError":
      return {
        message: `${String(outer.status)} from ${String(outer.path)}: ${String(outer.message)}`,
        status: outer.status as number,
      }
    case "ConfigError": {
      const text = String(outer.message)
      const key = /at \["([A-Z0-9_]+)"\]/.exec(text)?.[1]
      return {
        message: key !== undefined && /got undefined/.test(text)
          ? `${key} is not set (graf needs GRAFANA_URL and GRAFANA_SERVICE_ACCOUNT_TOKEN)`
          : `invalid configuration: ${text}`,
      }
    }
    case "HttpClientError": {
      const reason = record(outer.reason)
      const status = record(reason?.response)?.status
      if (typeof status === "number") {
        return { message: `${status}: ${string(reason?.description) ?? "unexpected response"}`, status }
      }
      return { message: `could not reach Grafana: ${string(reason?.message) ?? string(outer.message) ?? "request failed"}` }
    }
  }
  // Errors from the generated Grafana client carry the decoded error body as `cause`.
  const response = record(outer?.response)
  if (typeof response?.status === "number") {
    const body = record(outer?.cause)
    return {
      message: `${response.status}: ${string(body?.message) ?? string(outer?._tag) ?? "request failed"}`,
      status: response.status,
    }
  }
  if (cause instanceof Error) return { message: cause.message }
  return { message: string(outer?.message) ?? String(cause) }
}

export const suggestions = (described: Described): ReadonlyArray<string> => {
  const hints: Array<string> = []
  if (described.status === 401) {
    hints.push("Grafana rejected the token; check GRAFANA_SERVICE_ACCOUNT_TOKEN (and GRAFANA_ORG_ID if you use several orgs)")
  }
  if (described.status === 403) {
    hints.push("the service account lacks permission here; Viewer can query, but datasource permissions may restrict it")
  }
  if (/blocked by policy/i.test(described.message)) {
    hints.push("the backend's query policy rejected this query; narrow the selector (e.g. a specific service) instead of matching everything")
  }
  if (described.status === 502 || described.status === 504 || /timeout|deadline exceeded/i.test(described.message)) {
    hints.push("the query timed out; try a narrower time window with --from / --to")
  }
  return hints
}

export const formatError = (cause: unknown): string => {
  const described = describe(cause)
  return [`error: ${described.message}`, ...suggestions(described).map((hint) => `suggestion: ${hint}`)].join("\n")
}
