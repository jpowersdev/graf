import { Config } from "effect"

// Env names match grafana/mcp-grafana so one set of credentials serves both tools.
export const GrafanaConfig = Config.all({
  url: Config.String("GRAFANA_URL"),
  token: Config.Redacted("GRAFANA_SERVICE_ACCOUNT_TOKEN"),
  orgId: Config.Int("GRAFANA_ORG_ID").pipe(Config.option),
  defaultFrom: Config.String("GRAFANA_DEFAULT_FROM").pipe(
    Config.withDefault("1 hour"),
  ),
  defaultLimit: Config.Int("GRAFANA_DEFAULT_LIMIT").pipe(
    Config.withDefault(100),
  ),
})

// Optional per-role datasource overrides; unset roles are discovered by type.
export const DatasourceOverrides = Config.all({
  metrics: Config.String("GRAFANA_METRICS_UID").pipe(Config.option),
  logs: Config.String("GRAFANA_LOGS_UID").pipe(Config.option),
  traces: Config.String("GRAFANA_TRACES_UID").pipe(Config.option),
  profiles: Config.String("GRAFANA_PROFILES_UID").pipe(Config.option),
})
