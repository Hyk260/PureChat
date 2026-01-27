// import { generate } from "random-words"
import { createNanoId } from "./uuid"

const prefixes = {
  files: "file",
  documents: "docs",
  messages: "msg",
  sessions: "ssn",
  topics: "tpc",
  user: "user",
  agent: "agt",
} as const

export const idGenerator = (namespace: keyof typeof prefixes, size = 12) => {
  const hash = createNanoId(size)
  const prefix = prefixes[namespace]

  if (!prefix) throw new Error(`Invalid namespace: ${namespace}, please check your code.`)

  return `${prefix}_${hash()}`
}

// generate('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 16); //=> "4f90d13a42"
// export const randomSlug = (count = 2) => (generate(count) as string[]).join("-")

export const inboxSessionId = (userId: string) => `ssn_inbox_${userId}`
