import { defineStore } from 'pinia';
import { ElMessage } from "element-plus";
import { SetupStoreId } from '../../plugins/index';

export const useAppStore = defineStore(SetupStoreId.App, {
  state: () => ({
    message: null,
    networkStatus: true, // 网络状态
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
    // 设置网络状态
    setNetworkStatus(flag) {
      this.networkStatus = flag;
    },
  }
});