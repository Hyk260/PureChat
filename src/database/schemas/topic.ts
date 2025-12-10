import { z } from "zod"

export const DB_TopicSchema = z.object({
  title: z.string(),
  favorite: z.number().int().default(0),
  sessionId: z.string(),
})

export type DB_Topic = z.infer<typeof DB_TopicSchema>
