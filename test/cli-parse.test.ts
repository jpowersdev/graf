import { NodeServices } from "@effect/platform-node"
import { describe, expect, it } from "@effect/vitest"
import { Cause, ConfigProvider, Effect, Layer } from "effect"
import { CliError, Command } from "effect/unstable/cli"
import { command } from "../src/Command.ts"

// Every command's minimal invocation must get past argument parsing. Grafana points at a closed
// port, so a correctly parsed command fails later (unreachable, missing file) — never with a
// CLI parse error such as a flag that is unexpectedly required.
const env = Layer.merge(
  NodeServices.layer,
  ConfigProvider.layer(ConfigProvider.fromUnknown({ GRAFANA_URL: "http://127.0.0.1:9", GRAFANA_SERVICE_ACCOUNT_TOKEN: "test" })),
)

const invocations: ReadonlyArray<ReadonlyArray<string>> = [
  ["config", "doctor"],
  ["datasources", "list"],
  ["services", "list"],
  ["fields", "--signal", "logs"],
  ["values", "--signal", "traces", "resource.service.name"],
  ["metrics", "list"],
  ["metrics", "describe", "up"],
  ["metrics", "query", "up"],
  ["logs", "search", "--service", "api"],
  ["logs", "context", "--service", "api", "--at", "now"],
  ["logs", "aggregate", "--service", "api"],
  ["logs", "timeseries", "--service", "api"],
  ["logs", "values", "service_name"],
  ["traces", "search"],
  ["traces", "get", "abc"],
  ["traces", "aggregate"],
  ["traces", "errors"],
  ["traces", "latency"],
  ["traces", "operations", "--service", "api"],
  ["traces", "values", "name"],
  ["profiles", "types"],
  ["profiles", "labels"],
  ["profiles", "values", "service_name"],
  ["profiles", "top"],
  ["alerts", "list"],
  ["alerts", "get", "uid"],
  ["alerts", "history", "uid"],
  ["alerts", "triage", "uid"],
  ["alerts", "evaluate", "uid"],
  ["dashboards", "search"],
  ["dashboards", "get", "uid"],
  ["query", "run", "--file", "/nonexistent/body.json"],
  ["agent", "context"],
]

describe("CLI parsing", () => {
  for (const args of invocations) {
    it.effect(`graf ${args.join(" ")}`, () =>
      Effect.gen(function* () {
        const exit = yield* Effect.exit(Command.runWith(command, { version: "test", renderErrors: false })(args))
        if (exit._tag === "Failure") {
          const error = Cause.squash(exit.cause)
          expect(CliError.isCliError(error) ? `${error._tag}: ${String((error as { message?: string }).message)}` : "not a parse error")
            .toBe("not a parse error")
        }
      }).pipe(Effect.provide(env)))
  }
})
