// 自定义消息 loading 类型
export interface LoadingText {
  loadingIcon: string
  value: string
}

export interface LoadingBody {
  bodyType: "loadingBody"
  text: LoadingText
}

export interface LoadingCustomMessage {
  body: LoadingBody
}

// 自定义消息 warning 类型
export interface WarningText {
  provider: string
  value: string
}

export interface WarningBody {
  bodyType: "alertBody"
  text: WarningText
}

export interface WarningCustomMessage {
  body: WarningBody
}

// 自定义消息体联合类型（判别联合类型）
export type CustomMessageBody = LoadingBody | WarningBody

// 完整自定义消息联合类型
export type CustomMessage = LoadingCustomMessage | WarningCustomMessage

// 根据 bodyType 提取对应的 text 类型（自动支持所有 bodyType）
export type ExtractTextType<T extends CustomMessageBody> = T extends { text: infer Text } ? Text : never

// 泛型自定义消息基础类型
export interface CustomMessageBasse<T extends CustomMessageBody = CustomMessageBody> {
  data: {
    body: T
  }
  versions: string
  display: number
  onlyID: string
  listMessage: string
}

// 特定类型的别名，提供更好的类型推断
export type WarningCustomMessageBasse = CustomMessageBasse<WarningBody>
export type LoadingCustomMessageBasse = CustomMessageBasse<LoadingBody>
