// Work around effect/unstable/cli truncating `--flag=a=b` at the second `=`.
// Only the broken case (value contains `=`) is rewritten to the equivalent space form.
export const normalizeArgv = (args: ReadonlyArray<string>): ReadonlyArray<string> => {
  const normalized: Array<string> = []
  let parseOptions = true

  for (const token of args) {
    if (token === "--") {
      parseOptions = false
      normalized.push(token)
      continue
    }

    const match = parseOptions ? /^(--[^=]+)=(.*)$/.exec(token) : null
    if (match !== null && match[2].includes("=")) {
      normalized.push(match[1], match[2])
    } else {
      normalized.push(token)
    }
  }

  return normalized
}
