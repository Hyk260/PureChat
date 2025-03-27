import { defineStore } from 'pinia';
import { getUnreadMsg, deleteConversation, sendMessage, getMessageList, setMessageRead, getConversationProfile } from "@/api/im-sdk-api/index";
import { SetupStoreId } from '../../plugins/index';
import { EMOJI_RECENTLY } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { MULTIPLE_CHOICE_MAX } from "@/constants/index";
import { ROBOT_COLLECT } from "@/ai/constant";
import { chatService } from "@/ai/index";
import { timProxy } from "@/utils/IM/index";
import { createAiPromptMsg, getModelType } from "@/ai/utils";
import {
  addTimeDivider,
  checkTextNotEmpty,
  getBaseTime,
  getChatListCache,
} from "@/utils/chat/index";
import { useGroupStore } from "../group/index";
import emitter from "@/utils/mitt-bus";
import store from '@/store/index';

export const useChatStore = defineStore(SetupStoreId.Chat, {
  state: () => ({
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], // 会话列表数据
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
    currentTab: 'whole', // 选中的标签（全部、未读、提及我）
  }),
  getters: {
    isWhole() {
      return this.currentTab === 'whole';
    },
    hasMsgList() {
      return this.currentMessageList?.length > 0;
    },
    isFwdDataMaxed() {
      return this.forwardData.size >= MULTIPLE_CHOICE_MAX;
    },
    currentType() {
      return this.currentConversation?.type || "";
    },
    imgUrlList() {
      if (!this.currentMessageList) return [];
      const filteredMessages = this.currentMessageList.filter(
        (item) => item.type === "TIMImageElem" && !item.isRevoked && !item.isDeleted
      );
      const reversedUrls = filteredMessages.reduceRight((urls, data) => {
        const url = data.payload.imageInfoArray[0].url;
        urls.push(url);
        return urls;
      }, []);
      return reversedUrls;
    },
    toAccount() {
      const ID = this.currentConversation?.conversationID;
      if (!ID) return "";
      return ID.replace(/^(C2C|GROUP)/, "");
    },
    isGroupChat() {
      if (!this.currentConversation) return false;
      return this.currentConversation.type === "GROUP";
    },
    totalUnreadCount() {
      const result = this.conversationList.reduce((count, data) => {
        if (this.currentConversation.conversationID === data.conversationID) {
          return count;
        }
        return count + data.unreadCount;
      }, 0);
      return result;
    },
  },
  actions: {
    async sendSessionMessage(data) {
      const { message, last = true } = data;
      const convId = message.conversationID || "";
      if (!convId) {
        console.error("convId is required");
        return;
      }
      // 消息上屏 预加载
      store.commit("updateMessages", { convId, message });
      emitter.emit("updataScroll");
      // 发送消息
      const { code, message: result } = await sendMessage(message);
      if (code === 0) {
        this.sendMsgSuccessCallback({ convId, message: result, last });
      } else {
        console.log("发送失败", code, result);
      }
    },
    async sendMsgSuccessCallback(data) {
      console.log("消息发送成功 sendMsgSuccessCallback", data);
      const { convId, message, last } = data;
      store.commit("updateMessages", { convId, message });
      emitter.emit("updataScroll");
      if (!ROBOT_COLLECT.includes(message?.to)) return;
      if (last) {
        setTimeout(async () => {
          await chatService({
            chat: message,
            provider: getModelType(message.to),
            messages: store.state.conversation?.currentMessageList ?? [message],
          });
        }, 50);
      }
    },
    async updateMessageList(data) {
      const { conversationID: convId } = data;
      // 当前会话有值
      if (!timProxy.isSDKReady) return
      const { messageList, isCompleted } = await getMessageList({ convId });
      store.commit("addMessage", {
        convId,
        isDone: isCompleted,
        message: addTimeDivider(messageList).reverse(), // 添加时间
      });
      emitter.emit("updataScroll");
      // 消息已读上报
      setMessageRead(data);
    },
    async addConversation(action) {
      const { convId } = action;
      const { conversation: data } = await getConversationProfile({ convId });
      store.commit("updateSelectedConversation", data);
      this.updateMessageList(data)
      if (data?.type === "GROUP") {
        useGroupStore().handleGroupProfile(data);
        useGroupStore().handleGroupMemberList({ groupID: data.groupProfile.groupID });
      }
      emitter.emit("updataScroll");
    },
    clearCurrentMessage() {
      this.isChatBoxVisible = false;
      this.currentConversation = null;
      this.currentMessageList = [];
    },
    clearHistory() {
      this.showCheckbox = false;
      this.isChatBoxVisible = false;
      this.replyMsgData = null;
      this.chatDraftMap = new Map()
      this.currentTab = "whole"
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
    async updateTotalUnreadMsg() {
      this.totalUnreadMsg = await getUnreadMsg();
    },
    async deleteSession(data) {
      const { convId } = data;
      if (!convId) {
        console.error("convId is required");
        return;
      }
      const { code } = await deleteConversation({ convId });
      if (code === 0) {
        store.commit("clearCurrentMessage");
        this.clearCurrentMessage()
      }
    },
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