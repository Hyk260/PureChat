export interface MediaFile {
  link: string
  fileName: string
  path?: string
}

export interface ImageFile {
  src: string
  fileName: string
}

export interface MessageConfig {
  to: string
  type: string
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
