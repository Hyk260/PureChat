import { defineStore } from 'pinia';
import {  getUnreadMsg } from "@/api/im-sdk-api/index";
import { SetupStoreId } from '../../plugins/index';
import { EMOJI_RECENTLY } from "@/constants/index";
import { localStg } from "@/utils/storage";

export const useChatStore = defineStore(SetupStoreId.Chat, {
  state: () => ({
    recently: new Set(), // 最近使用表情包
    totalUnreadMsg: 0, // 未读消息总数
    isFullscreenInputActive: false, // 是否全屏输入框
    isChatSessionListCollapsed: false, // 聊天会话列表是否折叠
    replyMsgData: null, // 回复消息数据
  }),
  getters: {

  },
  actions: {
    clearHistory() {
      this.replyMsgData = null;
    },
    // 更新未读消息总数
    async updateTotalUnreadMsg() {
      this.totalUnreadMsg = await getUnreadMsg();
    },
    // 设置最近使用表情包
    setRecently({ data = {}, type }) {
      switch (type) {
        case "add":
          this.recently.add(data);
          if (this.recently.size > 12) {
            const oldestElement = this.recently.values().next().value;
            this.recently.delete(oldestElement);
          }
          localStg.set(EMOJI_RECENTLY, Array.from(this.recently));
          break;
        case "revert":
          const recently = localStg.get(EMOJI_RECENTLY);
          if (recently) this.recently = new Set([...recently]);
          break;
        case "clean":
          this.recently.clear();
          localStg.remove(EMOJI_RECENTLY);
          break;
      }
    },
  },
});