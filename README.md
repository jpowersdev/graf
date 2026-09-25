# graf

A command-line client for querying observability data through [Grafana](https://grafana.com) — metrics, logs, traces, profiles and alerts.

graf talks only to Grafana's API. It picks a datasource for each signal (metrics, logs, traces, profiles) by type, and reaches each backend through Grafana's datasource proxy, so the backend behind a signal can change without changing how you use graf. It is read-only.

## Install

```bash
npm i -g @jpowersdev/grafana    # installs the `graf` binary
```

## Configure

```bash
export GRAFANA_URL=https://<your-grafana>
export GRAFANA_SERVICE_ACCOUNT_TOKEN=glsa_...

graf config doctor
```

Create a service account with the **Viewer** role under **Administration → Users and access → Service accounts**, then add a token. The variable names match [mcp-grafana](https://github.com/grafana/mcp-grafana), so one token serves both.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `GRAFANA_URL` | yes | — | Base URL of your Grafana |
| `GRAFANA_SERVICE_ACCOUNT_TOKEN` | yes | — | Service-account token (sent as a bearer token) |
| `GRAFANA_ORG_ID` | no | token's org | Organization to query |
| `GRAFANA_METRICS_UID` | no | discovered | Metrics datasource UID (Prometheus-compatible) |
| `GRAFANA_LOGS_UID` / `GRAFANA_TRACES_UID` / `GRAFANA_PROFILES_UID` | no | discovered | Datasource UIDs for the other signals |
| `GRAFANA_DEFAULT_FROM` | no | `1 hour` | Default `--from` window |
| `GRAFANA_DEFAULT_LIMIT` | no | `100` | Default row limit |

A signal's datasource is discovered when exactly one datasource of a supported type exists (or one of several is Grafana's default); otherwise set its `*_UID` variable.

## Usage

```bash
graf datasources list --output table

# discover
graf services list --search api --output table
graf fields --signal logs --service <service> --output table
graf fields --signal traces --scope span --search http
graf values --signal traces resource.deployment.environment

graf metrics list --search spanmetrics --output table
graf metrics describe traces_spanmetrics_calls_total --output table
graf metrics query 'sum by (service_name) (rate(traces_spanmetrics_calls_total[5m]))' --from "3 hours" --output table
graf metrics query 'count(up)' --instant

graf logs values service_name
graf logs search --service <service> --level error --contains timeout --from "30 minutes" --output table
graf logs search --service <service> --trace-id <trace-id>
graf logs context --service <service> --at <time-from-search> --around 20 --output table
graf logs aggregate --service <service> --group-by detected_level
graf logs timeseries --service <service> --level error --step "5 minutes" --output table
graf logs aggregate --service <service> --parser json --aggregation p99 --aggregate-on duration_ms --time-series

graf traces values resource.service.name
graf traces search --service <service> --operation "POST /checkout" --error --min-duration 500ms --output table
graf traces search --service <service> --error --spans --output table     # one row per matching span
graf traces get <trace-id> --output table                                 # span waterfall
graf traces errors --from "1 hour" --output table                          # error counts and rate per service
graf traces latency --service <service> --group-by name --output table     # p50/p95/p99 per operation
graf traces operations --service <service> --kind server --output table    # count, errors, p50, p99 per operation

# profiles
graf profiles values service_name
graf profiles top --service <service> --type cpu --from "30 minutes" --output table
graf profiles top --service <service> --type alloc_space --order-by total --output table

# alerts (Grafana-managed rules)
graf alerts list --state firing --output table
graf alerts get <rule-uid> --output table
graf alerts history <rule-uid> --from "1 day" --output table
graf alerts triage <rule-uid> --output table      # definition, firing instances, what differs, recent history
graf alerts evaluate <rule-uid> --output table    # run the rule's own queries and expressions now
```

- **`--from` / `--to`** take a duration back from now (`"30 minutes"`, `"2 days"`), `now`, an ISO-8601 timestamp, or Unix milliseconds. `--to` defaults to now.
- **`--output`** is one of `json` (default), `table`, `tsv`, `ndjson`, `values`. Warnings and notes (such as an auto-chosen `--step`) go to **stderr**, so stdout stays parseable.
- Queries use the backend's own language (PromQL for metrics, LogQL for logs, TraceQL for traces). Trace commands build TraceQL from `--service`, `--operation`, `--error`, `--min-duration`, `--attr` and `--filter`, and print it as `# traceql: ...`. Log commands build LogQL from `--service`, `--label`, `--contains`, `--level`, `--trace-id` and `--filter` (raw pipeline stages), and print it to stderr as `# logql: ...`; `--query` takes a complete LogQL query instead.
- Logs always need a stream selector (`--service` or `--label`): many Loki setups reject queries that match every stream.

`alerts evaluate` only replays rules whose queries use metrics, logs or traces datasources (plus Grafana expressions); rules over SQL or other sources are refused rather than queried.

## For coding agents

- **`graf agent instructions`** prints a version-stamped usage guide (commands, query languages, time syntax, triage recipes). Re-dump it after upgrades: `graf agent instructions > AGENTS-graf.md`.
- **`graf agent context`** prints a live Markdown overview of the target Grafana: datasource per signal, services with logs and traces, log stream labels, trace attributes by scope, and metric names by prefix. Add `--full` for exhaustive lists.

## Development

```bash
npm install
npm run generate   # regenerate src/Generated.ts from Grafana's OpenAPI spec (pinned version, read-only operations)
npm run validate   # generated-client check, build, tests
```
