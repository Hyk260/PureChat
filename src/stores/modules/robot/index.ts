import { cloneDeep, isEmpty } from "lodash-es"
import { defineStore } from "pinia"

import { aiModelsConfig, aiModelsValue, LLMParams, ModelProvider, Provider } from "model-bank"
import { SetupStoreId } from "@/stores/enum"
import WebSearchService from "@/service/WebSearchService"

import { useChatStore } from "../chat"
import { useWebSearchStore } from "../websearch"

import type { Model, RobotAccessConfig, RobotState } from "./types"
import type { Prompt } from "@pure/types"

export const useRobotStore = defineStore(SetupStoreId.Robot, {
  state: (): RobotState => ({
    model: null,
    promptConfig: null,
    modelConfig: null,
    modelProvider: ModelProvider.OpenAI,
    defaultProvider: ModelProvider.OpenAI,
    promptStore: {},
    accessStore: {},
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
      return this.modelConfig?.historyCount || 1
    },
  },
  actions: {
    setAccessStore(data: RobotAccessConfig, provider: Provider) {
      this.accessStore[provider] = data
    },
    setPromptStore(data: Prompt[], provider: string) {
      this.promptStore[provider] = data
    },
    updateModelConfig() {
      const provider = useChatStore().currentSessionProvider
      if (!provider) {
        console.log("provider is null")
        return
      }
      this.modelProvider = provider
      const model = this.getAccessStore(provider)?.model
      const providerData = aiModelsValue[provider]
      if (!providerData?.Model?.options?.chatModels) {
        console.log("provider data not found")
        return
      }
      const data = cloneDeep(
        (this.accessStore[provider] as RobotAccessConfig)?.chatModels || providerData.Model.options.chatModels
      )
      const checkModel = data.find((item) => item.id === model)
      this.setModelConfig(provider)
      this.setPromptConfig(this.promptStore[provider]?.[0] || null)
      if (checkModel) {
        this.setModel(checkModel as Model)
      }
    },
    setDefaultProvider(data: Provider) {
      this.defaultProvider = data
    },
    setModelConfig(provider: Provider) {
      this.modelConfig = this.getAccessStore(provider)
    },
    setModel(value: Model | null) {
      this.model = value
    },
    setPromptConfig(value: Prompt | null) {
      this.promptConfig = value
    },
    getAccessStore(provider: Provider = ModelProvider.OpenAI): LLMParams {
      const access = this.accessStore?.[provider] || ""

      return isEmpty(access) ? aiModelsConfig[provider] : (access as LLMParams)
    },
  },
  persist: true,
})
