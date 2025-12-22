import { z } from "zod"
import { DBModel } from "../types/db"

export const DB_TopicSchema = z.object({
  title: z.string(),
  favorite: z.number().int().default(0),
  sessionId: z.string(),
})

export type TimeGroupId = "today" | "yesterday" | "week" | "month" | `${number}-${string}` | `${number}`

export interface GroupedTopic {
  children: ChatTopic[]
  id: string
  title?: string
}

export type DB_Topic = z.infer<typeof DB_TopicSchema>

export type ChatTopic = DBModel<DB_Topic>
