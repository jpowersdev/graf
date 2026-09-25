---
"@jpowersdev/grafana": minor
---

`traces get --span` focuses on one span and its descendants with the span's attributes and events; `traces search --order-by duration|start` sorts the traces Tempo returned. Fix `--attr kind=server` (enum intrinsics take bare keywords) and stop leaving `ok`/`error`/`unset` unquoted for ordinary attributes.
