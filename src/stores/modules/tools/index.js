import { defineStore } from 'pinia'
import { SetupStoreId } from '@/stores/plugins/index';

export const useToolsStore = defineStore(SetupStoreId.Tools, {
  state: () => ({
    tools: {}
  }),
  actions: {
    setTools(data) {
      this.tools = data
    }
  },
  persist: true,
}) 