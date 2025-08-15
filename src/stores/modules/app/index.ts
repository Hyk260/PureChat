import type { AppState, MessageOptions } from './type';
import { defineStore } from 'pinia';
import { ElMessage } from "element-plus";
import { SetupStoreId } from '@/stores/enum';

export const useAppStore = defineStore(SetupStoreId.App, {
  state: (): AppState => ({
    message: null,
  }),
  actions: {
    showMessage(options: MessageOptions) {
      if (this.message) {
        this.message.close()
      }
      this.message = ElMessage({
        message: options.message,
        type: options.type || "success",
        duration: options.duration || 2000,
        offset: 30
      } as any)
    }
  }
});