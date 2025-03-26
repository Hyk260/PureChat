import { defineStore } from 'pinia';
import { getUnreadMsg } from "@/api/im-sdk-api/index";
import { SetupStoreId } from '../../plugins/index';
import { EMOJI_RECENTLY } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { checkTextNotEmpty } from "@/utils/chat/index";
import { MULTIPLE_CHOICE_MAX } from "@/constants/index";
import store from '@/store/index';

export const useChatStore = defineStore(SetupStoreId.Chat, {
  state: () => ({
    currentMessageList: [], // 当前会话消息列表
    searchConversationList: [], // 过滤后的会话列表
    totalUnreadMsg: 0, // 未读消息总数
    needScrollDown: -1, // 是否向下滚动 true ? 0 : -1
    showCheckbox: false, //是否显示多选框
    noMore: false, // 加载更多  false ? 显示loading : 没有更多
    isChatBoxVisible: false, // 聊天框是否显示
    isMentionModalVisible: false, // @成员弹窗
    isFullscreenInputActive: false, // 是否全屏输入框
    isChatSessionListCollapsed: false, // 聊天会话列表是否折叠
    replyMsgData: null, // 回复消息数据
    msgEdit: null, // 消息编辑
    recently: new Set(), // 最近使用表情包
    chatDraftMap: new Map(), // 会话草稿
    forwardData: new Map(), // 多选数据
    revokeMsgMap: new Map(), // 撤回消息重新编辑
  }),
  getters: {
    hasMsgList() {
      return this.currentMessageList?.length > 0;
    },
    isFwdDataMaxed () {
      return this.forwardData.size >= MULTIPLE_CHOICE_MAX;
    }
  },
  actions: {
    clearCurrentMessage() {
      this.isChatBoxVisible = false;
    },
    clearHistory() {
      this.showCheckbox = false;
      this.isChatBoxVisible = false;
      this.replyMsgData = null;
      this.chatDraftMap = new Map()
    },
    toggleMentionModal(flag) {
      if (store.state.conversation.currentConversation?.type === "GROUP") {
        this.isMentionModalVisible = flag;
      } else {
        this.isMentionModalVisible = false;
      }
    },
    setForwardData({ type, payload }) {
      switch (type) {
        case "set":
          this.forwardData.set(payload.ID, payload);
          break;
        case "del":
          this.forwardData.delete(payload.ID);
          break;
        case "clear":
          this.forwardData.clear();
          break;
      }
    },
    updateRevokeMsg({ data, type }) {
      if (type === "set") {
        this.revokeMsgMap.set(data.ID, data.payload);
      } else {
        this.revokeMsgMap.delete(data.ID);
      }
    },
    updateChatDraft(data) {
      if (!data) return;
      const { ID, payload } = data;
      if (checkTextNotEmpty(payload)) {
        this.chatDraftMap.set(ID, payload);
      } else {
        this.chatDraftMap.delete(ID);
      }
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