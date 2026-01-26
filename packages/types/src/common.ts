export type DraftData = Array<{
  type: string
  children: Array<{
    [key: string]: string | undefined
    text: string
    type?: string
    alt?: string
    value?: string
    class?: string
  }>
}>
