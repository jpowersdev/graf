#!/usr/bin/env bash
# Install or update graf globally with bun from GitHub (or from this checkout with --local).
# npm can't build a git dependency during a global install, so pack first and install the
# tarball. The tarball is kept at a stable path because bun records where it came from.
set -euo pipefail

SOURCE="git+ssh://git@github.com/jpowersdev/grafana-cli.git"
if [[ "${1:-}" == "--local" ]]; then
  SOURCE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
fi

STORE="${GRAF_INSTALL_DIR:-$HOME/.local/share/graf}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

(cd "$TMP" && npm pack --silent "$SOURCE" >/dev/null)
mkdir -p "$STORE"
mv "$TMP"/jpowersdev-graf-*.tgz "$STORE/graf.tgz"

# Remove first: bun won't reinstall a package from the same tarball path in place.
bun remove -g @jpowersdev/graf >/dev/null 2>&1 || true
bun remove -g @jpowersdev/grafana >/dev/null 2>&1 || true # pre-rename package name
bun add -g "$STORE/graf.tgz" >/dev/null
echo "installed $(command -v graf): $(graf --version)"
