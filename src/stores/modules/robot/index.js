import { defineStore } from "pinia";
import { localStg } from "@/utils/storage";
import { StoreKey, ModelProvider, modelValue } from "@/ai/constant";
import { SetupStoreId } from "../../plugins/index";
import { useChatStore } from "../chat/index.js";
import { cloneDeep } from "lodash-es";
import { getModelType, useAccessStore } from "@/ai/utils";

export const useRobotStore = defineStore(SetupStoreId.Robot, {
  state: () => ({
    model: null,
    botTools: localStg.get(StoreKey.Tool) || null,
    promptConfig: null,
    modelConfig: null,
    modelProvider: "",
    isShowBotTools: false,
  }),
  getters: {
    isFunctionCall() {
      return this.modelConfig?.function_call && useChatStore().isAssistant;
    },
    isVision() {
      return this.modelConfig?.vision && useChatStore().isAssistant;
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
    updateModelConfig(value) {
      const provider = getModelType(useChatStore().toAccount);
      this.modelProvider = provider;
      if (!provider) {
        console.log("provider is null");
        return;
      }
      const prompt = localStg.get(StoreKey.Prompt);
      const model = useAccessStore(provider)?.model;
      const data = cloneDeep(modelValue[provider].Model.options.chatModels);
      const checkModel = data.find((item) => item.id === model);
      this.modelConfig = useAccessStore(provider);
      this.setPromptConfig(prompt?.[provider] || null);
      this.setRobotModel(checkModel);
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
});
