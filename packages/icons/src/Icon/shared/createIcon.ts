import type { Component } from "vue"

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
