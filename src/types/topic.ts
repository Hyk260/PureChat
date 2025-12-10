// import { DB_Message } from "@/database/schemas/message"

export interface ChatTopic {
  id: string
  title: string
  favorite: boolean
  sessionId: string
  createdAt: number
  updatedAt: number
}
