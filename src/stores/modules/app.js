import { defineStore } from 'pinia';
import { ElMessage } from "element-plus";

export const useAppStore = defineStore("app-store", {
  state: () => ({
    message: null
  }),
  actions: {
    showMessage(options) {
      if (this.message) {
        this.message.close()
      }
      this.message = ElMessage({
        message: options.message,
        type: options.type || "success",
        duration: options.duration || 2000,
        offset: 30
      })
    },
  }
});