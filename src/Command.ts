import { Command } from "effect/unstable/cli"
import { command as configCommand } from "./ConfigCommand.js"
import { command as datasourcesCommand } from "./DatasourcesCommand.js"
import { command as logsCommand } from "./LogsCommand.js"
import { command as metricsCommand } from "./MetricsCommand.js"

export const command = Command.make("graf").pipe(
  Command.withDescription("Query observability data through Grafana from the command line"),
  Command.withSubcommands([
    configCommand,
    datasourcesCommand,
    logsCommand,
    metricsCommand,
  ]),
)
