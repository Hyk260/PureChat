import { cloneDeep } from "lodash-es"
import { defineStore } from "pinia"

import { modelValue } from "@/ai/constant"
import { ModelProvider } from "@/ai/types"
import { getModelType, useAccessStore } from "@/ai/utils"
import WebSearchService from "@/service/WebSearchService"
import { SetupStoreId } from "@/stores/enum"

import { useChatStore } from "../chat"
import { useWebSearchStore } from "../websearch"

import type { BotToolsFlag, Model, RobotState } from "./types"
import type { ModelProviderKey } from "@/ai/types"
import type { Prompt } from "@/types/llm"

export const useRobotStore = defineStore(SetupStoreId.Robot, {
  state: (): RobotState => ({
    model: null,
    promptConfig: null,
    modelConfig: null,
    modelProvider: ModelProvider.OpenAI,
    defaultProvider: ModelProvider.OpenAI,
    isShowBotTools: false,
    promptStore: {
      // [ModelProvider.OpenAI]: [],
    },
    modelStore: {
      // [ModelProvider.OpenAI]: {},
    },
    accessStore: {
      // [ModelProvider.OpenAI]: {},
    },
  }),
  getters: {
    isVision(): boolean {
      if (useChatStore().isAssistant) {
        return Boolean(this.model?.vision)
      } else {
        return false
      }
    },
    isWebSearchModel(): boolean {
      if (useChatStore().isAssistant) {
        return Boolean(this.model?.webSearch)
      } else {
        return false
      }
    },
    enableWebSearch(): boolean {
      const isWebSearchEnabled = WebSearchService.isWebSearchEnabled()
      const list = useWebSearchStore().checkProviders
      return this.isWebSearchModel && isWebSearchEnabled && list.includes(this.modelProvider)
    },
    currentProviderPrompt(): Prompt | null {
      return this.promptStore[this.modelProvider]?.[0] || null
    },
    isOllama(): boolean {
      return [ModelProvider.Ollama].includes(this.modelProvider as ModelProvider)
    },
    isShowPromptTitle(): boolean {
      return Boolean(this.promptConfig?.meta?.title && useChatStore().isAssistant)
    },
    getPromptTitle(): string {
      if (!this.isShowPromptTitle) return ""
      const prompt = this.promptConfig?.meta
      if (!prompt) return ""
      const avatar = prompt.avatar || ""
      const title = prompt.title || ""
      if (!avatar && !title) return ""
      return `${avatar} ${title}`
    },
    botMessageCount(): number {
      return this.modelConfig?.historyMessageCount || 1
    },
  },
  actions: {
    setAccessStore(data: any, provider: string) {
      this.accessStore[provider] = data
    },
    setModelStore(data: any, provider: string) {
      this.modelStore[provider] = data
    },
    setPromptStore(data: Prompt[], provider: string) {
      this.promptStore[provider] = data
    },
    updateModelConfig() {
      const provider = getModelType(useChatStore().toAccount)
      if (!provider) {
        console.log("provider is null")
        return
      }
      this.modelProvider = provider
      const model = useAccessStore(provider)?.model
      const providerData = modelValue[provider as ModelProvider]
      if (!providerData?.Model?.options?.chatModels) {
        console.log("provider data not found")
        return
      }
      const data = cloneDeep(
        this.modelStore?.[provider]?.Model?.options?.chatModels || providerData.Model.options.chatModels
      )
      const checkModel = data.find((item) => item.id === model)
      this.setModelConfig(provider)
      this.setPromptConfig(this.promptStore[provider]?.[0] || null)
      if (checkModel) {
        this.setModel(checkModel as Model)
      }
    },
    setDefaultProvider(data: ModelProviderKey) {
      this.defaultProvider = data
    },
    updataBotToolsFlag(data: BotToolsFlag) {
      this.isShowBotTools = Boolean(data?.functionCall)
    },
    setModelConfig(provider: ModelProviderKey) {
      this.modelConfig = useAccessStore(provider)
    },
    setModel(value: Model | null) {
      this.model = value
    },
    setPromptConfig(value: Prompt | null) {
      this.promptConfig = value
    },
  },
  persist: true,
})
