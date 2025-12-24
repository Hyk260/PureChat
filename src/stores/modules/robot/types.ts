import type { LLMParams, Provider } from "@/ai/types"

import { Prompt } from "@/types/llm"

export interface Model {
  id: string
  displayName: string
  description?: string
  tokens?: number
  vision?: boolean
  webSearch?: boolean
  functionCall?: boolean
  reasoning?: boolean
  maxOutput?: number
  icon?: string
  [key: string]: any
}

export interface ModelConfigItem {
  ID: string
  Title: string
  SubTitle: string
  defaultValue: string
  options?: {
    id: string
    name?: string
    icon?: string
    chatModels?: Model[]
  }
  collapse?: string[]
  apiKey?: string
  doubt?: string
  apiHost?: string
  Placeholder?: string
  step?: number
  min?: number
  max?: number
}

export type ModelDataType = Record<string, ModelConfigItem>

// 提示词元数据类型
export interface PromptMeta {
  tags: string[]
  avatar: string
  title: string
  recQuestion?: string[]
  [key: string]: any
}

// 访问存储类型
export interface AccessStore {
  [provider: string]: any
}

// 模型存储类型
export interface ModelStore {
  [provider: string]: ModelDataType
}

// 提示词存储类型
export interface PromptStore {
  [provider: string]: Prompt[]
}

export interface RobotState {
  model: Model | null
  promptConfig: Prompt | null
  modelConfig: LLMParams | null
  modelProvider: Provider
  defaultProvider: Provider
  isShowBotTools: boolean
  promptStore: PromptStore
  modelStore: ModelStore
  accessStore: AccessStore
}

export interface RobotGetters {
  isVision: boolean
  isWebSearchModel: boolean
  enableWebSearch: boolean
  currentProviderPrompt: Prompt | null
  isOllama: boolean
  isShowPromptTitle: boolean
  getPromptTitle: string
  botMessageCount: number
}

export interface RobotActions {
  setAccessStore(data: any, provider: string): void
  setModelStore(data: any, provider: string): void
  setPromptStore(data: Prompt[], provider: string): void
  updateModelConfig(): void
  setDefaultProvider(data: string): void
  updataBotToolsFlag(data: BotToolsFlag): void
  setModelConfig(provider: string): void
  setModel(value: Model | null): void
  setPromptConfig(value: Prompt | null): void
}

export interface RobotStore extends RobotState, RobotGetters, RobotActions {}

export interface BotToolsFlag {
  functionCall?: boolean
  [key: string]: any
}
