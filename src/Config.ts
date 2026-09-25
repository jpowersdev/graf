import { Config } from "effect"

// Env names match grafana/mcp-grafana so one set of credentials serves both tools.
export const GrafanaConfig = Config.all({
  url: Config.string("GRAFANA_URL"),
  token: Config.redacted("GRAFANA_SERVICE_ACCOUNT_TOKEN"),
  orgId: Config.int("GRAFANA_ORG_ID").pipe(Config.option),
  defaultFrom: Config.string("GRAFANA_DEFAULT_FROM").pipe(
    Config.withDefault("1 hour"),
  ),
  defaultLimit: Config.int("GRAFANA_DEFAULT_LIMIT").pipe(
    Config.withDefault(100),
  ),
})

// Optional per-role datasource overrides; unset roles are discovered by type.
export const DatasourceOverrides = Config.all({
  metrics: Config.string("GRAFANA_METRICS_UID").pipe(Config.option),
  logs: Config.string("GRAFANA_LOGS_UID").pipe(Config.option),
  traces: Config.string("GRAFANA_TRACES_UID").pipe(Config.option),
  profiles: Config.string("GRAFANA_PROFILES_UID").pipe(Config.option),
})
