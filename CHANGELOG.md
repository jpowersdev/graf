# @jpowersdev/graf

## 0.1.0

Initial release of `graf`, a read-only command-line client for querying observability data through Grafana:

- `config doctor` and `datasources list`, with one datasource discovered per signal (metrics, logs, traces, profiles).
- Discovery: `services list`, `fields` and `values` across logs, traces and metrics.
- `metrics list | describe | query` for Prometheus-compatible datasources.
- `logs search | context | aggregate | timeseries | values` for Loki, with LogQL built from flags or passed raw. `logs search --trace-id` finds the trace's services and time window in Tempo.
- `traces search | get | errors | latency | operations | values | aggregate` for Tempo, using TraceQL search and TraceQL metrics.
- `profiles types | labels | values | top` for Pyroscope.
- `alerts list | get | history | triage | evaluate` for Grafana-managed alert rules; `evaluate` replays a rule's queries over a window.
- `dashboards search | get`, listing each panel's queries with the signal to run them with.
- `query run --file` for raw `/api/ds/query` bodies.
- `agent instructions` and `agent context` for coding agents.
