export interface messageHandle {
  text?: string
  thinking?: string
  reasoning?: {
    content?: string
    reasoningType?: "thinking" | "done"
    duration?: number
  }
  done?: boolean
}

export interface RobotBoxEventData {
  apiKeyFocus?: boolean
  promptFocus?: boolean
}

export type KnowledgeItemType = "file" | "url"

export interface KnowledgeReference {
  id: number
  content: string
  sourceUrl: string
  type: KnowledgeItemType
  metadata?: Record<string, any>
}

export interface DisplayCacheItem {
  _displayName: string
  _displayTime: string
  _displayMessage: string
  _isActive: boolean
  _showUnreadCount: boolean
  _isMention: boolean
  _hasDraft: boolean
  _showDontNotify: boolean
}
