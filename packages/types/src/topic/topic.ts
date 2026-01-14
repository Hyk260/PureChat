import { BaseDataModel } from "../meta"

export type TimeGroupId = "today" | "yesterday" | "week" | "month" | `${number}-${string}` | `${number}`

export enum TopicDisplayMode {
  ByTime = "byTime",
  Flat = "flat",
}

export interface ChatTopic extends BaseDataModel {
  favorite?: boolean
  historySummary?: string
  sessionId?: string
  title: string
}

export type ChatTopicMap = Record<string, ChatTopic>

export interface GroupedTopic {
  children: ChatTopic[]
  id: string
  title?: string
}
