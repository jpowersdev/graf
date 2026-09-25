import { Command } from "effect/unstable/cli"
import { command as agentCommand } from "./AgentCommand.js"
import { command as alertsCommand } from "./AlertsCommand.js"
import { command as configCommand } from "./ConfigCommand.js"
import { command as datasourcesCommand } from "./DatasourcesCommand.js"
import { fieldsCommand, servicesCommand, valuesCommand } from "./DiscoveryCommand.js"
import { command as logsCommand } from "./LogsCommand.js"
import { command as metricsCommand } from "./MetricsCommand.js"
import { command as profilesCommand } from "./ProfilesCommand.js"
import { command as tracesCommand } from "./TracesCommand.js"

export const command = Command.make("graf").pipe(
  Command.withDescription("Query observability data through Grafana from the command line"),
  Command.withSubcommands([
    agentCommand,
    alertsCommand,
    configCommand,
    datasourcesCommand,
    servicesCommand,
    fieldsCommand,
    valuesCommand,
    logsCommand,
    metricsCommand,
    profilesCommand,
    tracesCommand,
  ]),
)
