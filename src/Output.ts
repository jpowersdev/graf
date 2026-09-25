import { Data, Effect } from "effect"
import { Flag } from "effect/unstable/cli"

export type OutputFormat = "json" | "table" | "tsv" | "ndjson" | "values"

export class InvalidOutputFormat extends Data.TaggedError("InvalidOutputFormat")<{
  readonly input: string
  readonly message: string
}> {}

export const outputFlag = Flag.String("output").pipe(
  Flag.withDescription("Output format: json | table | tsv | ndjson | values"),
  Flag.withDefault("json"),
)

const formats = ["json", "table", "tsv", "ndjson", "values"] as const

export const parseOutputFormat = (input: string): Effect.Effect<OutputFormat, InvalidOutputFormat> =>
  formats.includes(input as OutputFormat)
    ? Effect.succeed(input as OutputFormat)
    : Effect.fail(new InvalidOutputFormat({
      input,
      message: `Unknown output format ${JSON.stringify(input)}; expected one of: ${formats.join(", ")}`,
    }))
