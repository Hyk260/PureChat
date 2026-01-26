export type DraftChild = Array<{
  [key: string]: string | undefined
  text: string
  type?: string
  alt?: string
  value?: string
  class?: string
}>

export type DraftData = Array<{
  type: string
  children: DraftChild
}>
