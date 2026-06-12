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

// 编辑器相关类型从 @pure/editor re-export（向后兼容）
export type { MentionInfo, MentionElement, AttachmentElement, MentionConfig } from "@pure/editor"

export interface ImageElement {
  type: "image"
  fileName: string
  id: string
  src: string
  class: string
  children: [{ text: string }]
}

export interface EmojiElement extends ImageElement {
  alt: string
  class: "EmoticonPack"
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
