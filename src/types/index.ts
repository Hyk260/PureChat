// import type { SlateDescendant } from "@wangeditor/editor"

export type DraftData = Array<{
  type: string
  children: Array<{
    text: string
    [key: string]: unknown
  }>
}>
