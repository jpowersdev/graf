---
"@jpowersdev/grafana": patch
---

`logs --level` also matches `severity_text` case-insensitively (with aliases like warn/warning), so levels still work when an upstream pipeline leaves `detected_level` at info. The level column prefers `severity_text`.
