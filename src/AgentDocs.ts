/**
 * Static, version-stamped usage guide for agents. Rendered by `graf agent instructions`.
 * It ships with the CLI, so re-dump it after every upgrade. Pair it with the live
 * `graf agent context` overview of a specific Grafana.
 */

const BODY = `## What this is

\`graf\` is a read-only CLI that queries observability data **through Grafana**: metrics, logs,
traces, profiles and alert rules. It talks only to Grafana's API and reaches each backend through Grafana's datasource
proxy, so commands are organized by signal, not by backend.

Output goes to **stdout** as JSON by default. **Notes go to stderr**: the query graf built
(\`# logql: ...\`, \`# traceql: ...\`), an auto-chosen step, "0 rows", truncation and warnings. Do not
discard stderr; it usually explains an empty or partial result.

## Setup

- \`GRAFANA_URL\` and \`GRAFANA_SERVICE_ACCOUNT_TOKEN\` (a Viewer service-account token) are required.
- \`GRAFANA_METRICS_UID\`, \`GRAFANA_LOGS_UID\`, \`GRAFANA_TRACES_UID\` pin a datasource per signal; otherwise
  graf picks the one datasource of a supported type (or Grafana's default among several).
- \`GRAFANA_DEFAULT_FROM\` (default \`1 hour\`) and \`GRAFANA_DEFAULT_LIMIT\` (default \`100\`).

Verify with \`graf config doctor\`; it reports the datasource used for each signal and its health.

## Get the lay of the land first

\`\`\`
graf agent context          # services, log labels, trace attributes, metric families
graf agent context --full   # exhaustive lists
\`\`\`

Then drill in with \`graf services list --search\`, \`graf fields --signal logs|traces|metrics\` and
\`graf values --signal <s> <name>\` (e.g. which environments exist).

## Time syntax

Every \`--from\`/\`--to\`/\`--at\` accepts a duration back from now (\`"30 minutes"\`, \`"2 days"\`; the space matters,
\`30m\` is rejected), \`now\`, an ISO-8601 timestamp, or Unix milliseconds. \`--to\` defaults to now. Durations for
\`--step\` use the same spelled-out form; trace duration filters also accept \`500ms\`, \`2s\`.

## Query languages

graf builds the backend's own query language from filter flags and prints what it built. Every command
also accepts the full language with \`--query\` (which excludes the filter flags).

- **Metrics: PromQL.** \`graf metrics query '<promql>'\`. Metric names use underscores
  (\`traces_spanmetrics_calls_total\`); find them with \`metrics list --search\`.
- **Logs: LogQL.** Filter flags: \`--service\` (the \`service_name\` stream label), \`--label name=value\`
  (also \`!=\`, \`=~\`, \`!~\`), \`--contains TEXT\`, \`--level error,warn\` (the \`detected_level\` label),
  \`--trace-id ID\`, and \`--filter\` for raw pipeline stages (\`'| json | status >= 500'\`).
  **Every log query needs a stream selector** (\`--service\` or \`--label\`): Loki may reject queries that match
  every stream with "query blocked by policy".
- **Traces: TraceQL.** Filter flags: \`--service\` (\`resource.service.name\`), \`--operation\` (span \`name\`),
  \`--error\`, \`--min-duration\`/\`--max-duration\`, \`--attr key=value\` (also \`!=\`, \`>=\`, \`=~\`, ...; bare keys become
  unscoped \`.key\`; use \`span.\`/\`resource.\` to scope), and \`--filter\` for a raw condition.

## Output

\`--output\` is \`json\` (default), \`table\`, \`tsv\`, \`ndjson\` or \`values\`. Use \`json\`/\`ndjson\` to parse and
\`table\` to scan (query tables lift labels shared by every row into a header).

## Commands

**Setup and discovery**
- \`graf config doctor\` · \`graf datasources list\`
- \`graf services list [--signal logs|traces] [--search]\` — services seen in logs and/or traces.
- \`graf fields --signal logs|traces|metrics [--service S] [--scope S] [--metric M] [--search]\`
  — log stream labels (plus parsed and structured-metadata fields with \`--service\`), trace attributes by scope,
  or metric labels.
- \`graf values --signal logs|traces|metrics NAME [--search] [--limit]\` — distinct values of a key.

**Logs**
- \`graf logs search [filters] [--limit N]\` — lines, newest first. \`--limit\` caps lines; a note says when it's hit.
- \`graf logs context --at TIME [--around N | --before N --after N] [--window DUR] [filters]\` — lines around a moment.
- \`graf logs aggregate [--aggregation count|rate|bytes|sum|avg|min|max|p50..p99] [--aggregate-on FIELD]
  [--parser json|logfmt] [--group-by LABEL ...] [--limit N] [--time-series --step DUR] [filters]\`
  — one value per group over the window (largest first), or a time series.
- \`graf logs timeseries [--step DUR] [--group-by ...] [filters]\` — counts over time.
- \`graf logs values LABEL [--selector '{...}']\`

**Traces**
- \`graf traces search [filters] [--spans] [--limit N]\` — traces (or matching spans) with IDs. Tempo search is
  not exhaustive; a note says when results may be partial.
- \`graf traces get TRACE_ID\` — the span waterfall (\`--output table\` indents children).
- \`graf traces errors [filters] [--group-by ATTR ...]\` — error spans, total spans and error rate per group.
- \`graf traces latency [filters] [--quantiles p50,p95,p99] [--group-by ATTR ...] [--time-series]\` — in ms.
- \`graf traces operations --service S [--kind server] [--order-by p99Ms|spans|errors]\` — per-operation health.
- \`graf traces values ATTR\`

**Profiles** (continuous profiling)
- \`graf profiles types\` · \`graf profiles labels\` · \`graf profiles values service_name\`
- \`graf profiles top [--service S] [--label k=v] [--type cpu|wall|alloc_space|...] [--order-by self|total] [--limit N]\`
  — hottest functions with self/total share; nanosecond profiles are shown in ms.

**Dashboards** (the team's curated queries)
- \`graf dashboards search [TEXT] [--tag T]\` — find dashboards.
- \`graf dashboards get UID [--search TEXT]\` — variables and each panel's queries with the signal to run them
  with (\`graf metrics query\`, \`graf logs search --query\`, ...). Substitute \`$variables\` yourself.

**Alerts** (Grafana-managed rules; read-only)
- \`graf alerts list [--state firing|pending|inactive|nodata|error] [--search]\` — rules, firing first, with instance counts.
- \`graf alerts get UID\` — definition (condition, \`for\`, no-data/error handling), queries, current instances, link.
- \`graf alerts history UID [--state Alerting] [--limit N]\` — state transitions with the values that caused them.
- \`graf alerts triage UID\` — get + which labels differ across firing instances + recent history, in one read.
- \`graf alerts evaluate UID [--at TIME]\` — run the rule's own queries and expressions; the condition refId > 0
  means firing. Only for rules over metrics/logs/traces datasources.

**Metrics**
- \`graf metrics list [--search TEXT]\` · \`graf metrics describe NAME\` (labels and sample values)
- \`graf metrics query '<promql>' [--step DUR | --instant]\`

## Triage recipes

\`\`\`
# What's firing, and why
graf alerts list --state firing --output table
graf alerts triage <uid> --output table
graf alerts evaluate <uid> --output table

# Which services are erroring, and on what?
graf traces errors --from "1 hour" --output table
graf traces operations --service <svc> --kind server --output table

# Slow endpoints, then a representative slow trace
graf traces latency --service <svc> --group-by name --limit 10 --output table
graf traces search --service <svc> --min-duration 2s --limit 5 --output table
graf traces get <trace-id> --output table

# Logs for that trace, and what else the service logged around it
graf logs search --service <svc> --trace-id <trace-id> --output table
graf logs context --service <svc> --at <time> --around 20 --output table

# Error volume by level, and when it started
graf logs aggregate --service <svc> --group-by detected_level --from "6 hours" --output table
graf logs timeseries --service <svc> --level error --step "5 minutes" --from "6 hours" --output table

# Request rate per service from span metrics
graf metrics query 'sum by (service_name) (rate(traces_spanmetrics_calls_total[5m]))' --output table
\`\`\`
`

export const agentInstructions = (version?: string): string => {
  const heading = version === undefined
    ? "# graf — agent instructions"
    : `# graf — agent instructions (@jpowersdev/grafana v${version})`
  return `${heading}\n\n${BODY}`
}
