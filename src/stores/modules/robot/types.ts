import type { LLMParams, ModelProviderKey } from "@/ai/types"

// 模型类型 - 基于实际的模型数据结构
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
  defaultValue?: string
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

// 提示词类型
export interface Prompt {
  id: string
  meta: PromptMeta
  lang: string
  prompt: Array<{
    role: string
    content: string
  }>
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

// 机器人存储状态类型
export interface RobotState {
  model: Model | null
  promptConfig: Prompt | null
  modelConfig: LLMParams | null
  modelProvider: ModelProviderKey
  defaultProvider: ModelProviderKey
  isShowBotTools: boolean
  promptStore: PromptStore
  modelStore: ModelStore
  accessStore: AccessStore
}

// 机器人存储 Getters 类型
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

// 机器人存储 Actions 类型
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

// 机器人存储完整类型
export interface RobotStore extends RobotState, RobotGetters, RobotActions {}

// 工具标志数据类型
export interface BotToolsFlag {
  functionCall?: boolean
  [key: string]: any
}
