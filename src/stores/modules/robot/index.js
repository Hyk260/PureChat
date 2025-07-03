import { defineStore } from "pinia";
import { ModelProvider, modelValue } from "@/ai/constant";
import { SetupStoreId } from '@/stores/plugins/index';
import { useChatStore } from "../chat/index";
import { useWebSearchStore } from "../websearch/index";
import { cloneDeep } from "lodash-es";
import { getModelType, useAccessStore } from "@/ai/utils";
import WebSearchService from "@/service/webSearchService";

export const useRobotStore = defineStore(SetupStoreId.Robot, {
  state: () => ({
    model: null,
    promptConfig: null,
    modelConfig: null,
    modelProvider: "",
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
    isFunctionCall() {
      return false
      if (useChatStore().isAssistant) {
        return this.model?.functionCall;
      } else {
        return false;
      }
    },
    isVision() {
      if (useChatStore().isAssistant) {
        return this.model?.vision;
      } else {
        return false;
      }
    },
    isWebSearchModel() {
      if (useChatStore().isAssistant) {
        return this.model?.webSearch;
      } else {
        return false;
      }
    },
    enableWebSearch() {
      const isWebSearchEnabled = WebSearchService.isWebSearchEnabled();
      const list = useWebSearchStore().checkProviders;
      return this.isWebSearchModel && isWebSearchEnabled && list.includes(this.modelProvider);
    },
    currentProviderPrompt() {
      return this.promptStore[this.modelProvider]?.[0] || null;
    },
    isOllama() {
      return [ModelProvider.Ollama].includes(this.modelProvider);
    },
    isShowPromptTitle() {
      return this.promptConfig?.meta?.title && useChatStore().isAssistant;
    },
    getPromptTitle() {
      if (!this.isShowPromptTitle) return "";
      const prompt = this.promptConfig.meta || {};
      const avatar = prompt.avatar || "";
      const title = prompt.title || "";
      if (!avatar && !title) return "";
      return `${avatar} ${title}`;
    },
    getBotMessageCount() {
      return this.modelConfig?.historyMessageCount || 1;
    }
  },
  actions: {
    setAccessStore(data, provider) {
      this.accessStore[provider] = data;
    },
    setModelStore(data, provider) {
      this.modelStore[provider] = data;
    },
    setPromptStore(data, provider) {
      this.promptStore[provider] = data;
    },
    updateModelConfig() {
      const provider = getModelType(useChatStore().toAccount);
      if (!provider) {
        console.log("provider is null");
        return;
      }
      this.modelProvider = provider;
      const model = useAccessStore(provider)?.model;
      const data = cloneDeep(modelValue[provider].Model.options.chatModels);
      const checkModel = data.find((item) => item.id === model);
      this.setModelConfig(provider);
      this.setPromptConfig(this.promptStore[provider]?.[0] || null)
      this.setModel(checkModel);
    },
    setDefaultProvider(data) {
      this.defaultProvider = data
    },
    updataBotToolsFlag(data) {
      this.isShowBotTools = data?.functionCall || false;
    },
    setModelConfig(provider) {
      this.modelConfig = useAccessStore(provider);
    },
    setModel(value) {
      this.model = value;
    },
    setPromptConfig(value) {
      this.promptConfig = value;
    },
  },
  persist: true,
});
