import { Flag } from "effect/unstable/cli"

export const from = Flag.String("from").pipe(
  Flag.optional,
  Flag.withDescription("Start time: a duration back from now like \"1 hour\", \"now\", an ISO timestamp, or Unix ms"),
)

export const to = Flag.String("to").pipe(
  Flag.optional,
  Flag.withDescription("End time (default now): a duration back from now, \"now\", an ISO timestamp, or Unix ms"),
)
