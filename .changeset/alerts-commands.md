---
"@jpowersdev/graf": minor
---

Add `alerts list | get | history | triage | evaluate` for Grafana-managed alert rules. `evaluate` replays a rule's own queries and expressions through `/api/ds/query`, only for rules over metrics, logs and traces datasources.
