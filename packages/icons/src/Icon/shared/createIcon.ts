import type { Component } from "vue"

/**
 * 将 Mono/Text/Combine/Avatar 四个子组件与颜色/标题常量组合为一个复合图标对象，
 * 统一替代各 Icon 目录下重复的 CompoundedIcon 构建逻辑。
 */
export function createIcon(
  Mono: Component,
  Text: Component,
  Combine: Component,
  Avatar: Component,
  colors: Record<string, string>,
  title: string
): Component {
  const icon = Mono as Component & Record<string, unknown>
  icon.Text = Text
  icon.Combine = Combine
  icon.Avatar = Avatar
  icon.title = title
  Object.assign(icon, colors)
  return icon
}
