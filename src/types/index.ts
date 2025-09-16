// import type { SlateDescendant } from "@wangeditor/editor"
import { IDomEditor } from "@wangeditor/editor"

export type DraftData = Array<{
  type: string
  children: Array<{
    text: string
    [key: string]: unknown
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
