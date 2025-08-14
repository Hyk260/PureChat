import { defineStore } from 'pinia';
import { ElMessage, MessageHandler } from "element-plus";
import { SetupStoreId } from '@/stores/enum';

// 消息选项接口
interface MessageOptions {
  message: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
}

export const useAppStore = defineStore(SetupStoreId.App, {
  state: () => ({
    message: null as MessageHandler | null,
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