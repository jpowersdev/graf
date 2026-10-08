# @jpowersdev/graf

## 0.1.0

### Minor Changes

- 501d421: `agent context` also covers profiles (types and services), alert rules (state counts with firing and pending rules listed), and dashboards (by folder and tag).
- 10c69f0: Add `alerts list | get | history | triage | evaluate` for Grafana-managed alert rules. `evaluate` replays a rule's own queries and expressions through `/api/ds/query`, only for rules over metrics, logs and traces datasources.
- d40cb68: `alerts evaluate --from` replays a rule at every evaluation tick over a window and reports, per series, how many ticks fired and when it first and last crossed the threshold.
- 4574426: Add `dashboards search | get`: find dashboards and list each panel's queries with the signal to run them with.
- 22b00f2: Add discovery (`services list`, `fields`, `values`) across logs, traces and metrics, and `agent instructions` / `agent context` for coding agents.
- c37e396: Initial release of `graf`: `config doctor`, `datasources list`, and `metrics list | describe | query` against Grafana's Prometheus-compatible metrics datasource.
- 1321a25: `logs aggregate` adds `count_distinct` and `--order`/`--order-by`. Log label-value listings now note that Loki answers them from its index, which can include values from outside the window.
- fd1eafc: Add `logs search | context | aggregate | timeseries | values` for Loki: LogQL built from `--service`, `--label`, `--contains`, `--level`, `--trace-id` and `--filter`, or a raw `--query`.
- 8e15dee: `logs search --trace-id` without `--service`/`--label` looks the trace up in Tempo and searches its services over its time window.
- 0dddf46: Add `profiles types | labels | values | top` for the Pyroscope datasource: the hottest functions by self or total time.
- e75513c: Add `query run --file` for raw `/api/ds/query` bodies, limited to metrics, logs, traces and profiles datasources plus expressions.
- 37bfb96: Add `traces aggregate`: count, rate, or avg/sum/min/max/pNN of span duration or any numeric attribute, per group, as one value or a time series.
- 93ce13c: Add `traces search | get | errors | latency | operations | values` for Tempo, using TraceQL search and TraceQL metrics. `logs --trace-id` now accepts Tempo's shortened trace IDs.
- 1908be6: `traces get --span` focuses on one span and its descendants with the span's attributes and events; `traces search --order-by duration|start` sorts the traces Tempo returned. Fix `--attr kind=server` (enum intrinsics take bare keywords) and stop leaving `ok`/`error`/`unset` unquoted for ordinary attributes.

### Patch Changes

- 948d5c9: Ship `graf` as a single bundled file with no runtime dependencies, so installs run exactly the Effect version it was built and tested with.
- 4933216: Build on Effect 4.0.0-rc.117 (and vitest 5). Boolean flags keep defaulting to off under the new CLI parser, and a missing GRAFANA_URL/token is still reported by name.
- 115aac5: Fixes from the first live run: accept `authLabels: null` for service accounts, list values of structured-metadata log fields (e.g. `detected_level`), parse and dedupe alert state-history labels, and use span metrics' `service` label in examples.
- 2220941: Pin Effect packages to exact versions. With caret ranges, installs outside the repo resolved to a newer Effect release candidate with breaking API changes and crashed at startup.
- 235d5fb: Rename the package from `@jpowersdev/grafana` to `@jpowersdev/graf` to match the `graf` binary.
