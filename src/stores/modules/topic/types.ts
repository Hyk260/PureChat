export interface Topic {
  id: string
  title: string
  createdAt: number // 时间戳（秒）
  isFavorite: boolean
  isDefault?: boolean // 是否为默认话题
  isTemporary?: boolean // 是否为临时话题
}

export interface TopicState {
  // 角色设定 prompt，按会话ID分组
  rolePromptsSession: Record<string, string>
  // 话题列表，按会话ID分组
  topicsSession: Record<string, Topic[]>
  // 当前搜索关键词
  searchKeyword: string
}
