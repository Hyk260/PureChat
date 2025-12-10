import { z } from "zod"

import type { DB_File } from "../schemas/files"
import type { DB_Message } from "../schemas/message"
import type { DB_Session } from "../schemas/session"
import type { DB_User } from "../schemas/user"
import type { DB_Topic } from "../schemas/topic"
import type Dexie from "dexie"

export type DBModel<T> = T & {
  id: string
  createdAt: number
  updatedAt: number
}

export const DBBaseFieldsSchema = z.object({
  id: z.string(),
  createdAt: z.number().or(z.string()),
  updatedAt: z.number().or(z.string()),
})

export interface DBSchemaMap {
  files: DB_File
  messages: DB_Message
  sessions: DB_Session
  topics: DB_Topic
  users: DB_User
}

export type BrowserDBSchema = {
  [t in keyof DBSchemaMap]: {
    model: DBSchemaMap[t]
    table: Dexie.Table<DBModel<DBSchemaMap[t]>, string>
  }
}

export type BrowserDBTable<T extends keyof DBSchemaMap> = BrowserDBSchema[T]["table"]
