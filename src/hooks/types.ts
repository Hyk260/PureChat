import { ChatSchemaType } from "@/types/"

export interface MediaFile {
  /**
   * description: Base64 字符串
   */
  link: string
  /**
   * description: 文件名 "linkifyUrls.ts"
   */
  fileName: string
  path?: string
}

export interface ImageFile {
  src: string
  fileName: string
}

export interface MessageConfig {
  to: string
  type: ChatSchemaType
  custom?: Record<string, any>
}

export interface TextContent {
  text?: string
  aitStr?: string
  atUserList?: string[]
}

export interface MessagePayload extends MessageConfig, TextContent {
  files?: MediaFile[]
  video?: MediaFile[]
  images?: ImageFile[]
  isHave?: boolean
}
