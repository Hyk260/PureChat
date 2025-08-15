import type {
  RobotState,
  Model,
  Prompt,
  BotToolsFlag
} from "./types";
import { ModelProvider, ModelProviderKey } from "@/ai/types/type";
import { defineStore } from "pinia";
import { modelValue } from "@/ai/constant";
import { SetupStoreId } from '@/stores/enum';
import { useChatStore } from "../chat/index";
import { useWebSearchStore } from "../websearch/index";
import { cloneDeep } from "lodash-es";
import { getModelType, useAccessStore } from "@/ai/utils";
import WebSearchService from "@/service/WebSearchService";

export const useRobotStore = defineStore(SetupStoreId.Robot, {
  state: (): RobotState => ({
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
    isVision(): boolean {
      if (useChatStore().isAssistant) {
        return Boolean(this.model?.vision);
      } else {
        return false;
      }
    },
    isWebSearchModel(): boolean {
      if (useChatStore().isAssistant) {
        return Boolean(this.model?.webSearch);
      } else {
        return false;
      }
    },
    enableWebSearch(): boolean {
      const isWebSearchEnabled = WebSearchService.isWebSearchEnabled();
      const list = useWebSearchStore().checkProviders;
      return this.isWebSearchModel && isWebSearchEnabled && list.includes(this.modelProvider);
    },
    currentProviderPrompt(): Prompt | null {
      return this.promptStore[this.modelProvider]?.[0] || null;
    },
    isOllama(): boolean {
      return [ModelProvider.Ollama].includes(this.modelProvider as ModelProvider);
    },
    isShowPromptTitle(): boolean {
      return Boolean(this.promptConfig?.meta?.title && useChatStore().isAssistant);
    },
    getPromptTitle(): string {
      if (!this.isShowPromptTitle) return "";
      const prompt = this.promptConfig?.meta;
      if (!prompt) return "";
      const avatar = prompt.avatar || "";
      const title = prompt.title || "";
      if (!avatar && !title) return "";
      return `${avatar} ${title}`;
    },
    getBotMessageCount(): number {
      return this.modelConfig?.historyMessageCount || 1;
    }
  },
  actions: {
    setAccessStore(data: any, provider: string): void {
      this.accessStore[provider] = data;
    },
    setModelStore(data: any, provider: string): void {
      this.modelStore[provider] = data;
    },
    setPromptStore(data: Prompt[], provider: string): void {
      this.promptStore[provider] = data;
    },
    updateModelConfig(): void {
      const provider = getModelType(useChatStore().toAccount);
      if (!provider) {
        console.log("provider is null");
        return;
      }
      this.modelProvider = provider;
      const model = useAccessStore(provider)?.model;
      const providerData = modelValue[provider as ModelProvider];
      if (!providerData?.Model?.options?.chatModels) {
        console.log("provider data not found");
        return;
      }
      const data = cloneDeep(providerData.Model.options.chatModels);
      const checkModel = data.find((item) => item.id === model);
      this.setModelConfig(provider);
      this.setPromptConfig(this.promptStore[provider]?.[0] || null)
      if (checkModel) {
        this.setModel(checkModel as Model);
      }
    },
    setDefaultProvider(data: ModelProviderKey): void {
      this.defaultProvider = data
    },
    updataBotToolsFlag(data: BotToolsFlag): void {
      this.isShowBotTools = Boolean(data?.functionCall);
    },
    setModelConfig(provider: ModelProviderKey): void {
      this.modelConfig = useAccessStore(provider as ModelProvider);
    },
    setModel(value: Model | null): void {
      this.model = value;
    },
    setPromptConfig(value: Prompt | null): void {
      this.promptConfig = value;
    },
  },
  persist: true,
});
