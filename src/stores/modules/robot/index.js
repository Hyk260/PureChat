import { defineStore } from "pinia";
import { localStg } from "@/utils/storage";
import { StoreKey, ModelProvider, modelValue } from "@/ai/constant";
import { SetupStoreId } from "../../plugins/index";
import { useChatStore } from "../chat/index";
import { useWebSearchStore } from "../websearch/index";
import { cloneDeep } from "lodash-es";
import { getModelType, useAccessStore } from "@/ai/utils";
import WebSearchService from "@/ai/webSearchService";

export const useRobotStore = defineStore(SetupStoreId.Robot, {
  state: () => ({
    model: null,
    botTools: localStg.get(StoreKey.Tool) || null,
    promptConfig: null,
    modelConfig: null,
    modelProvider: "",
    defaultProvider: ModelProvider.OpenAI,
    isShowBotTools: false,
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
  },
  actions: {
    updateModelConfig() {
      const provider = getModelType(useChatStore().toAccount);
      if (!provider) {
        console.log("provider is null");
        return;
      }
      this.modelProvider = provider;
      const prompt = localStg.get(StoreKey.Prompt);
      const model = useAccessStore(provider)?.model;
      const data = cloneDeep(modelValue[provider].Model.options.chatModels);
      const checkModel = data.find((item) => item.id === model);
      this.modelConfig = useAccessStore(provider);
      this.setPromptConfig(prompt?.[provider] || null);
      this.setRobotModel(checkModel);
    },
    setDefaultProvider(data) {
      this.defaultProvider = data
    },
    updataBotToolsFlag(data) {
      this.isShowBotTools = data?.functionCall || false;
    },
    setRobotModel(value) {
      this.model = value;
    },
    setPromptConfig(value) {
      this.promptConfig = value;
    },
    setBotTools(value) {
      this.botTools = value;
    },
  },
  persist: true,
});
