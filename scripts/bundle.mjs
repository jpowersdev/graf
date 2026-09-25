// Bundle the CLI into one ESM file so installs don't resolve Effect (a prerelease whose
// packages depend on each other through caret ranges) at install time: what we test ships.
import { build } from "esbuild"
import { rmSync } from "node:fs"

rmSync(new URL("../dist", import.meta.url), { recursive: true, force: true })

await build({
  entryPoints: ["src/main.ts"],
  outfile: "dist/main.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  legalComments: "none",
  // Some bundled dependencies still call require(); give ESM output one.
  banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
  logLevel: "warning",
})
