// import type { SlateDescendant } from "@wangeditor/editor"

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
