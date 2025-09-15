// import type { SlateDescendant } from "@wangeditor/editor"
export * from "@/database/schemas/message"

export type DraftData = Array<{
  type: string
  children: Array<{
    text: string
    [key: string]: unknown
  }>
}>
