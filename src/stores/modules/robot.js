import { defineStore } from 'pinia'
import { localStg } from "@/utils/storage"
import { StoreKey } from "@/ai/constant"
import { SetupStoreId } from '../plugins/index';

export const useRobotStore = defineStore(SetupStoreId.Robot, {
  state: () => ({
    model: null,
    botTools: localStg.get(StoreKey.Tool) || null,
    promptConfig: "",
  }),
  actions: {
    setRobotModel(value) {
      this.model = value
    },
    setPromptConfig(value) {
      this.promptConfig = value
    },
    setBotTools(value) {
      this.botTools = value
    }
  }
})