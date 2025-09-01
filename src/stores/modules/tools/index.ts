import { defineStore } from "pinia"

import { SetupStoreId } from "@/stores/enum"

export const useToolsStore = defineStore(SetupStoreId.Tools, {
  state: () => ({
    tools: {},
  }),
  actions: {
    setTools(data: Record<string, any>) {
      this.tools = data
    },
  },
  persist: true,
})
