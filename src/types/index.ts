// import type { SlateDescendant } from "@wangeditor/editor"
export * from "@/database/schemas/group"
export * from "@/database/schemas/message"
export * from "@/database/schemas/session"
export * from "@/database/schemas/user"
import type { IDomEditor } from "@wangeditor/editor"

export type DraftData = Array<{
  type: string
  children: Array<{
    [key: string]: string | undefined
    text: string
    type?: string
    alt?: string
    value?: string
    class?: string
  }>
}>

export interface AIResponse {
  message: string
  think?: string
  done?: boolean
}

export interface MentionInfo {
  id: string
  [key: string]: any
}

export interface MentionElement {
  type: "mention"
  value: string
  info: MentionInfo
  children: [{ text: string }]
}

export interface AttachmentElement {
  type: "attachment"
  link: string
  fileName: string
  fileSize?: string
  children: [{ text: string }]
}

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

export interface MentionConfig {
  showModal?: (editor: IDomEditor) => void
  hideModal?: (editor: IDomEditor) => void
  pinyinSearch?: boolean
}

export interface RobotBoxEventData {
  apiKeyFocus?: boolean
  promptFocus?: boolean
}

export interface Model {
  id: string
  provider: string
  name: string
  group: string
  owned_by?: string
  description?: string
  /**
   * @deprecated
   */
  supported_text_delta?: boolean
}

export type KnowledgeItemType = "file" | "url"

export interface KnowledgeReference {
  id: number
  content: string
  sourceUrl: string
  type: KnowledgeItemType
  metadata?: Record<string, any>
}
