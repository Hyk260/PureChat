export interface AppState {
  lang: "en" | "zh-CN"
  timeline: boolean
  /**
   *  Markdown 渲染输入消息
   */
  markdownRender: boolean
  /**
   *  Markdown 渲染助手消息
   */
  markdownAssistantRender: boolean
  contentXScrollable: boolean
}
