import { defineStore } from "pinia"
import { SetupStoreId } from "@/stores/enum"

export interface PortalState {
  showPortal: boolean
}

export const usePortalStore = defineStore(SetupStoreId.Portal, {
  state: (): PortalState => ({
    showPortal: false,
  }),
  getters: {},
  actions: {
    togglePortal() {
      this.showPortal = !this.showPortal
    },
  },
  persist: true,
})
