import { Console, Effect } from "effect"
import * as fs from "node:fs/promises"

export const print = (value: unknown): Effect.Effect<void> =>
  Console.log(JSON.stringify(value, null, 2))

export const readFile = (path: string): Effect.Effect<unknown, Error> =>
  Effect.tryPromise({
    try: async () => {
      let text: string
      try {
        text = await fs.readFile(path, "utf8")
      } catch (cause) {
        const code = (cause as NodeJS.ErrnoException | undefined)?.code
        throw new Error(code === "ENOENT" ? `file not found: ${path}` : `could not read ${path}: ${String(cause)}`)
      }
      try {
        return JSON.parse(text) as unknown
      } catch (cause) {
        const reason = cause instanceof Error ? cause.message : String(cause)
        throw new Error(`could not parse JSON in ${path}: ${reason}`)
      }
    },
    catch: (cause) => cause instanceof Error ? cause : new Error(String(cause)),
  })
