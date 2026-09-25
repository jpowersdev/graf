import { Effect } from "effect"
import { Command } from "effect/unstable/cli"
import { Datasources, roleForType } from "./Datasources.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"

const list = Command.make(
  "list",
  { output: Output.outputFlag },
  (input) =>
    Effect.gen(function* () {
      const datasources = yield* Datasources
      const all = yield* datasources.list
      const rows = all.map((ds) => ({
        uid: ds.uid,
        type: ds.type,
        name: ds.name,
        role: roleForType(ds.type),
        default: ds.isDefault === true,
      }))
      yield* printRows(
        ["uid", "type", "name", "role", "default"],
        rows.map((row) => [row.uid, row.type, row.name, row.role, row.default ? "yes" : undefined]),
        input.output,
        rows,
      )
    }).pipe(Effect.provide(Datasources.Live)),
).pipe(Command.withDescription("List Grafana datasources and the signal role graf would use each for"))

export const command = Command.make("datasources").pipe(
  Command.withDescription("Inspect Grafana datasources"),
  Command.withSubcommands([list]),
)
