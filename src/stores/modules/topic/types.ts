import { ChatTopic } from "@/types"

export type Topic = ChatTopic

export interface TopicState {
  // 角色设定 prompt，按会话ID分组
  rolePromptsSession: Record<string, string>
  // 话题列表，按会话ID分组
  topicsSession: Record<string, Topic[]>
  // 当前搜索关键词
  searchKeyword: string
  // 话题ID
  topicId: string
  // 默认话题
  defaultTopic: Topic
}
