#!/usr/bin/env bash
set -euo pipefail

# Pin the spec to the Grafana version we target; bump alongside the server.
GRAFANA_VERSION="${GRAFANA_OPENAPI_VERSION:-13.1.2}"
SPEC_URL="${GRAFANA_OPENAPI_SPEC_URL:-https://raw.githubusercontent.com/grafana/grafana/v${GRAFANA_VERSION}/public/openapi3.json}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_FILE="$ROOT_DIR/src/Generated.ts"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

curl -fsSL "$SPEC_URL" -o "$TMP_DIR/full.json"
# graf is read-only: keep GET operations plus POST /ds/query (a query, not a mutation).
# Unused component schemas are left in; the generator emits them either way.
jq '.paths |= with_entries(
      .key as $path
      | .value |= with_entries(select(.key == "get" or .key == "parameters" or ($path == "/ds/query" and .key == "post")))
      | select(.value | has("get") or has("post"))
    )' "$TMP_DIR/full.json" > "$TMP_DIR/openapi.json"
npx openapigen \
  --spec "$TMP_DIR/openapi.json" \
  --name Grafana \
  --format httpclient \
  --patch "$ROOT_DIR/patches/grafana-openapi-generator.patch.json" \
  > "$TMP_DIR/Generated.ts"

if [[ "${1:-}" == "--check" ]]; then
  if ! cmp -s "$TMP_DIR/Generated.ts" "$OUT_FILE"; then
    echo "src/Generated.ts is out of date. Run: npm run generate" >&2
    diff -u "$OUT_FILE" "$TMP_DIR/Generated.ts" | head -200 >&2 || true
    exit 1
  fi
  exit 0
fi

mv "$TMP_DIR/Generated.ts" "$OUT_FILE"
