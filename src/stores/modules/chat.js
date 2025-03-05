import { defineStore } from 'pinia';
import {
  getUnreadMsg,
} from "@/api/im-sdk-api/index";
import { SetupStoreId } from '../plugins/index';

export const useChatStore = defineStore(SetupStoreId.Chat, {
  state: () => ({
    totalUnreadMsg: 0, // 未读消息总数
  }),
  getters: {

  },
  actions: {
    // 更新未读消息总数
    async updateTotalUnreadMsg() {
      this.totalUnreadMsg = await getUnreadMsg();
    },
  },
});