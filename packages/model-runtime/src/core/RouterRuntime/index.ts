import { RuntimeAI } from "../BaseAI"

export interface RuntimeItem {
  id: string
  models?: string[] | (() => Promise<string[]>)
  runtime: RuntimeAI
}
