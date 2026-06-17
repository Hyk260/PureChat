/** 响应动画速度预设 */
export type ResponseAnimationSpeed = "disabled" | "agile" | "elegant"

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
  /** 响应动画速度：关闭 / 敏捷 / 优雅 */
  responseAnimation: ResponseAnimationSpeed
}
