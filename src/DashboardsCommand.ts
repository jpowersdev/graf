import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { ApiClient } from "./ApiClient.js"
import { GrafanaConfig } from "./Config.js"
import { summarizeDashboard } from "./Dashboards.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"

const search = Command.make(
  "search",
  {
    query: Argument.string("query").pipe(Argument.optional, Argument.withDescription("Title substring")),
    tag: Flag.string("tag").pipe(Flag.atMost(10), Flag.withDescription("Only dashboards with this tag, repeatable")),
    limit: Flag.integer("limit").pipe(Flag.withDefault(100), Flag.withDescription("Maximum results")),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const { api } = yield* ApiClient
      const config = yield* GrafanaConfig
      const hits = yield* api.search({
        params: {
          type: "dash-db",
          limit: input.limit,
          ...(Option.isSome(input.query) ? { query: input.query.value } : {}),
          ...(input.tag.length > 0 ? { tag: input.tag } : {}),
        },
      })
      const base = config.url.replace(/\/+$/, "")
      const rows = hits.map((hit) => ({
        uid: hit.uid,
        title: hit.title,
        folder: hit.folderTitle,
        tags: (hit.tags ?? []).join(","),
        url: hit.url === undefined ? undefined : `${base}${hit.url}`,
      }))
      yield* printRows(
        ["uid", "title", "folder", "tags", "url"],
        rows.map((row) => [row.uid, row.title, row.folder, row.tags || undefined, row.url]),
        input.output,
        rows,
      )
      if (rows.length === 0) yield* Console.error("# 0 dashboards")
    }).pipe(Effect.provide(ApiClient.Live)),
).pipe(Command.withDescription("Find dashboards by title or tag"))

const get = Command.make(
  "get",
  {
    uid: Argument.string("uid").pipe(Argument.withDescription("Dashboard UID (from `graf dashboards search`)")),
    search: Flag.string("search").pipe(Flag.optional, Flag.withDescription("Only panels whose title or query contains this text")),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const { api } = yield* ApiClient
      const response = yield* api.getDashboardByUID(input.uid, undefined)
      const summary = summarizeDashboard(response.dashboard)
      const text = Option.getOrUndefined(input.search)?.toLowerCase()
      const panels = summary.panels.filter((panel) =>
        text === undefined
        || panel.title.toLowerCase().includes(text)
        || panel.queries.some((query) => (query.query ?? "").toLowerCase().includes(text))
      )
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") return yield* Console.log(JSON.stringify({ ...summary, panels }, null, 2))

      yield* Console.error(`# ${summary.title ?? input.uid}${summary.tags.length === 0 ? "" : ` [${summary.tags.join(", ")}]`}`)
      if (summary.variables.length > 0) {
        yield* Console.error(`# variables: ${summary.variables.map((v) => `$${v.name}${v.current === undefined ? "" : `=${v.current}`}`).join(" ")}`)
      }
      const rows = panels.flatMap((panel) =>
        (panel.queries.length === 0 ? [{}] : panel.queries).map((query) => [
          panel.row,
          panel.title,
          "refId" in query ? query.refId : undefined,
          "role" in query ? query.role ?? query.datasourceType ?? query.datasource : undefined,
          "query" in query ? query.query?.replace(/\s*\n\s*/g, " ") : undefined,
        ])
      )
      yield* printRows(["row", "panel", "refId", "signal", "query"], rows, format, panels)
    }).pipe(Effect.provide(ApiClient.Live)),
).pipe(Command.withDescription("A dashboard's variables and each panel's queries, ready to reuse with graf"))

export const command = Command.make("dashboards").pipe(
  Command.withDescription("Read dashboards and the queries behind their panels"),
  Command.withSubcommands([search, get]),
)
