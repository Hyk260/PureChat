import { defineStore } from "pinia";
import {
  getUnreadMsg,
  clearHistoryMessage,
  deleteConversation,
  sendMessage,
  getMessageList,
  setMessageRead,
  deleteMessage,
  getConversationProfile,
  createTextMessage
} from "@/service/im-sdk-api/index";
import { getModelId } from "@/ai/utils";
import { getCloudCustomData } from "@/utils/chat/index";
import { generateReferencePrompt } from "@/config/prompts";
import { SetupStoreId } from '@/stores/plugins/index';
import { EMOJI_RECENTLY } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { MULTIPLE_CHOICE_MAX } from "@/constants/index";
import { ROBOT_COLLECT } from "@/ai/constant";
import { chatService } from "@/ai/index";
import { timProxy } from "@/utils/IM/index";
import { MessageModel } from "@/database/models/message";
import { HISTORY_MESSAGE_COUNT } from "@/constants/index";
import { cloneDeep } from "lodash-es";
import { getModelType, getAiAvatarUrl } from "@/ai/utils";
import {
  addTimeDivider,
  checkTextNotEmpty,
  getBaseTime,
  isRobot,
  scrollToMessage,
} from "@/utils/chat/index";
import { useGroupStore } from "../group/index";
import { useRobotStore } from "../robot/index";
import { useUserStore } from "../user/index";
import emitter from "@/utils/mitt-bus";

export const useChatStore = defineStore(SetupStoreId.Chat, {
  state: () => ({
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], // 会话列表数据
    searchConversationList: [], // 搜索后的会话列表
    filterConversationList: [], // 过滤后的会话列表
    totalUnreadMsg: 0, // 未读消息总数
    scrollTopID: "", // 滚动到的消息ID
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
    sendingMap: new Map(),
  }),
  getters: {
    isSending() {
      if (this.isAssistant) {
        return this.sendingMap.has(this.toAccount);
      } else {
        return false
      }
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
    getNonBotList() {
      return this.conversationList.filter((t) => !isRobot(t.conversationID));
    },
    getNonBotC2CList() {
      return this.conversationList.filter((t) => t.type === "C2C" && !isRobot(t.conversationID));
    },
    currentSessionProvider() {
      return getModelType(this.toAccount);
    },
    isAssistant() {
      return /@RBT#/.test(this.toAccount);
    },
    isMore() {
      return this.currentMessageList?.length < HISTORY_MESSAGE_COUNT;
    },
    imgUrlList() {
      if (!this.currentMessageList.length) return [];
      const filteredMessages = this.currentMessageList.filter(
        (item) => item.type === "TIMImageElem" && !item.isRevoked && !item.isDeleted
      );
      const reversedUrls = filteredMessages.reduce((urls, data) => {
        const url = data.payload.imageInfoArray[0].url;
        urls.push(url);
        return urls;
      }, []);
      return reversedUrls;
    },
    currentSessionId() {
      return this.currentConversation?.conversationID || "";
    },
    toAccount() {
      const ID = this.currentConversation?.conversationID || "";
      return ID?.replace(/^(C2C|GROUP)/, "");
    },
    isGroupChat() {
      if (!this.currentConversation) return false;
      return this.currentType === "GROUP";
    },
    getSortedForwardData() {
      const chatData = Object.values(Object.fromEntries(this.forwardData));
      return chatData.sort((a, b) => a.clientTime - b.clientTime);
    },
    totalUnreadCount() {
      if (!this.currentConversation) return 0;
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
    updateSendingState(sessionId, type) {
      // set delete
      if (!this.isAssistant) return
      if (type === "delete") {
        this.sendingMap.delete(sessionId);
      } else {
        this.sendingMap.set(sessionId, true);
      }
    },
    async createAiPromptMsg() {
      let to = useUserStore()?.userProfile?.userID;
      let defaultBot = useRobotStore().defaultProvider;
      let from = getModelId(defaultBot);
      const meta = useRobotStore().promptStore[defaultBot]?.[0]?.meta
      const text = `你好，我是 ${meta.avatar} ${meta.title} ${meta.description} 让我们开始对话吧！`;
      const msg = await createTextMessage({ to: from, text, cache: false });
      const promptContent = getCloudCustomData(
        { key: "messagePrompt", payload: { text: "预设提示词" } },
        { recQuestion: meta.recQuestion || [], }
      )
      msg.conversationID = `C2C${from}`;
      msg.avatar = getAiAvatarUrl(from);
      msg.cloudCustomData = promptContent;
      msg.flow = "in";
      msg.to = to;
      msg.from = from;
      msg.nick = "";
      msg.status = "success";
      return { sessionId: `C2C${msg.from}`, message: msg };
    },
    async addAiPresetPromptWords() {
      const { sessionId, message } = await this.createAiPromptMsg();
      const history = this.historyMessageList.get(sessionId);
      if (this.currentConversation && this.currentMessageList) {
        const data = cloneDeep(history);
        if (data) this.currentMessageList = [...data, message];
      }
      emitter.emit("updateScroll");
    },
    updateSelectedConversation(payload) {
      const { conversationID: sessionId } = payload;
      const oldSessionId = this.currentConversation?.conversationID;
      if (sessionId === oldSessionId) return;
      this.currentConversation = payload;
      this.showCheckbox = false;
      if (payload) {
        const history = this.historyMessageList.get(sessionId);
        this.currentMessageList = cloneDeep(history) ?? [];
      } else {
        this.currentMessageList = [];
      }
      this.noMore = this.isMore;
      this.isChatBoxVisible = sessionId !== "@TIM#SYSTEM";
      this.isAssistant && useRobotStore().updateModelConfig();
    },
    addMessage(payload) {
      console.log("[chat] 添加消息 addMessage:", payload);
      const { conversationID, message, isDone } = payload || {};
      if (this.currentConversation) {
        this.currentMessageList = message;
      } else {
        this.currentMessageList = [];
      }
      this.historyMessageList.set(conversationID, message);
      const isMore = this.isMore || isDone;
      console.log("isDone:", isMore ? "没有更多" : "显示loading");
      this.noMore = isMore;
    },
    async deleteMessage(payload) {
      console.log("[chat] 删除消息 deleteMessage:", payload);
      const { sessionId, messageIdArray = [], message = [] } = payload || {};
      const { code } = await deleteMessage(message);
      if (code !== 0) {
        console.error("[chat] 删除消息失败");
        return;
      }
      const history = this.historyMessageList.get(sessionId);
      if (!history) {
        console.error("[chat] 删除消息失败，历史消息不存在");
        return;
      }
      const newHistory = history.filter(
        (t) => !t.isTimeDivider && !t.isDeleted && !messageIdArray.includes(t.ID)
      );
      const newHistoryList = addTimeDivider(newHistory);
      this.currentMessageList = cloneDeep(newHistoryList);
      this.historyMessageList.set(sessionId, newHistoryList);
    },
    loadMoreMessages(payload) {
      console.log("[chat] 加载更多消息 loadMoreMessages:", payload);
      const { sessionId, messages, msgId = "" } = payload;
      // 历史消息
      const history = this.historyMessageList.get(sessionId) || [];
      if (history.map((t) => t?.ID).includes(msgId)) {
        console.warn("重复加载", msgId);
        this.noMore = true;
        return;
      }
      console.log("历史消息 history:", history);
      const baseTime = getBaseTime(history, "last");
      const timeDividerResult = addTimeDivider(messages.reverse(), baseTime, "last");
      const newHistory = [...timeDividerResult, ...history];
      this.currentMessageList = newHistory;
      this.historyMessageList.set(sessionId, newHistory);
    },
    updateMessages(payload) {
      console.log("[chat] 更新消息 updateMessages:", payload);
      const { sessionId, message } = payload;
      if (!sessionId || !message?.ID) {
        console.warn("sessionId 或 ID 不存在");
        return;
      }
      const oldMessageList = this.historyMessageList.get(sessionId);
      if (!oldMessageList) {
        console.warn("oldMessageList 不存在");
        return;
      }
      MessageModel.update(message.ID, message);
      const newMessageList = oldMessageList.map((item) => {
        return item.ID === message.ID ? payload.message : item;
      });
      const latest = !newMessageList.some((item) => item.ID === message.ID);
      if (latest) {
        let baseTime = getBaseTime(newMessageList, "last");
        let timeDividerResult = addTimeDivider([message], baseTime);
        newMessageList.push(...timeDividerResult);
      }
      if (this.currentConversation?.conversationID === sessionId) {
        this.currentMessageList = newMessageList;
      }
      this.historyMessageList.set(sessionId, newMessageList);
    },
    modifiedMessages(message) {
      console.log("[chat] 历史消息更新 modifiedMessages:", message);
      if (!message?.ID) {
        console.warn("ID 不存在");
        return;
      }
      let sessionId = message.conversationID;
      const oldMessageList = this.historyMessageList.get(sessionId);
      if (!oldMessageList) {
        console.warn("oldMessageList 不存在");
        return;
      }
      const newMessageList = oldMessageList.map((item) => {
        return item.ID === message.ID ? message : item;
      });
      if (this.currentConversation?.conversationID === sessionId) {
        this.currentMessageList = newMessageList;
      }
      this.historyMessageList.set(sessionId, newMessageList);
    },
    async sendSessionMessage(data) {
      const { message, last = true } = data;
      const sessionId = message.conversationID || "";
      if (!sessionId) {
        console.error("sessionId is required");
        return;
      }
      // 消息上屏 预加载
      this.updateMessages({ sessionId, message });
      emitter.emit("updateScroll");

      if (useRobotStore().enableWebSearch && useRobotStore().isWebSearchModel) {
        const custom = { key: "webSearch", payload: { text: "" } };
        custom.payload.text = await generateReferencePrompt({ content: message?.payload?.text });
        message.cloudCustomData = getCloudCustomData(custom);
      }
      // 发送消息
      const { code, message: result } = await sendMessage(message);
      if (code === 0) {
        this.sendMsgSuccessCallback({ sessionId, message: result, last });
      } else {
        console.log("发送失败", code, result);
      }
    },
    async sendMsgSuccessCallback(data) {
      console.log("消息发送成功 sendMsgSuccessCallback", data);
      const { sessionId, message, last } = data;
      this.updateMessages({ sessionId, message });
      emitter.emit("updateScroll");
      if (last && ROBOT_COLLECT.includes(message?.to)) {
        setTimeout(async () => {
          await chatService({
            chat: message,
            provider: getModelType(message.to),
            messages: this.currentMessageList ?? [message],
          });
        }, 50);
      }
    },
    async updateMessageList(data) {
      const { conversationID: sessionId } = data;
      if (!timProxy.isSDKReady) return;
      const { messageList, isCompleted } = await getMessageList({ conversationID: sessionId });
      this.addMessage({
        conversationID: sessionId,
        isDone: isCompleted,
        message: addTimeDivider(messageList),
      });
      emitter.emit("updateScroll");
      setMessageRead(data);
    },
    async addConversation(action) {
      const { sessionId } = action;
      const { conversation: data } = await getConversationProfile({ sessionId });
      this.updateSelectedConversation(data);
      this.updateMessageList(data);
      scrollToMessage(`message_${sessionId}`);
      if (data?.type === "GROUP") {
        useGroupStore().handleGroupProfile(data);
        useGroupStore().handleGroupMemberList({ groupID: data.groupProfile.groupID });
      }
      this.isAssistant && useRobotStore().updateModelConfig();
      emitter.emit("updateScroll");
    },
    clearCurrentMessage() {
      this.isChatBoxVisible = false;
      this.currentConversation = null;
      this.currentMessageList = [];
    },
    toggleMentionModal(flag) {
      if (this.isGroupChat) {
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
      const { sessionId } = data;
      if (!sessionId) {
        console.error("sessionId is required");
        return;
      }
      const { code } = await deleteConversation({ sessionId });
      if (code === 0) this.clearCurrentMessage();
    },
    async deleteHistoryMessage(id) {
      let sessionId = id || this.currentSessionId;
      if (!sessionId) {
        console.error("sessionId is required");
        return;
      }
      const { code } = await clearHistoryMessage(sessionId);
      if (code === 0) {
        this.historyMessageList.set(sessionId, []);
        this.clearCurrentMessage();
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
  }
});
