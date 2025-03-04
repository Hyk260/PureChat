import router from "@/router";
import { ROBOT_COLLECT } from "@/ai/constant";
import { chatService } from "@/ai/index";
import {
  deleteConversation,
  getConversationProfile,
  getMessageList,
  sendMessage,
  setMessageRead,
  setMessageRemindType,
} from "@/api/im-sdk-api/index";
import { EMOJI_RECENTLY, HISTORY_MESSAGE_COUNT } from "@/constants/index";
import {
  addTimeDivider,
  checkTextNotEmpty,
  getBaseTime,
  transformData,
  getChatListCache,
} from "@/utils/chat/index";
import { useGroupStore } from "@/stores/modules/group";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { timProxy } from "@/utils/IM/index";
import { createAiPromptMsg, getModelType } from "@/ai/utils";
import { nextTick } from "vue";
import { MessageModel } from "@/database/models/message";
import { SessionModel } from "@/database/models/session";

import emitter from "@/utils/mitt-bus";

const conversation = {
  state: {
    messageEdit: null, // 消息编辑
    sessionDraftMap: new Map(), //会话草稿
    isChatBoxVisible: false, //是否显示输入框
    showCheckbox: false, //是否显示多选框
    isShowModal: false, // @好友弹框
    noMore: false, // 加载更多  false ? 显示loading : 没有更多
    networkStatus: true, // 网络状态
    needScrollDown: -1, // 是否向下滚动 true ? 0 : -1
    forwardData: new Map(), // 多选数据
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], // 会话列表数据
    filterConversationList: [],
    currentReplyMsg: null, // 回复数据
    activeTab: "whole", // 全部 未读 提及我
    outside: "chat", // 侧边栏初始状态
    arrowRight: false, // 聊天会话列表折叠 true ？'折叠' : '不折叠'
    fullScreen: false, // 全屏输入框是否启用
    revokeMsgMap: new Map(), // 撤回消息重新编辑
    recently: new Set(),
    postponeUnread: new Set(),
  },
  mutations: {
    updateMessages(state, payload) {
      console.log("[chat] 更新消息 updateMessages:", payload);
      const { convId, message } = payload;
      if (!convId || !message) {
        console.warn("convId 或 message 不存在");
        return;
      }
      let oldMessageList = state.historyMessageList.get(convId);
      // 确保 oldMessageList 存在
      if (!oldMessageList) {
        console.warn("oldMessageList 不存在");
        return;
      }
      MessageModel.update(message.ID, message);
      const newMessageList = oldMessageList.map((item) => {
        return item.ID === message.ID ? payload.message : item;
      });
      const latest = !newMessageList.some((item) => item.ID === message.ID);
      // 新消息
      if (latest) {
        let baseTime = getBaseTime(newMessageList);
        let timeDividerResult = addTimeDivider([message], baseTime).reverse();
        newMessageList.unshift(...timeDividerResult);
      }
      // 当前会有列表有值
      if (state.currentConversation.conversationID === convId) {
        state.currentMessageList = newMessageList;
        state.needScrollDown = 0;
      }
      // 更新历史消息
      state.historyMessageList.set(convId, newMessageList);
    },
    loadMoreMessages(state, payload) {
      console.log("[chat] 加载更多消息 loadMoreMessages:", payload);
      const { convId, messages, msgId = "" } = payload;
      // 历史消息
      const history = state.historyMessageList.get(convId) || [];
      if (history.map((t) => t?.ID).includes(msgId)) {
        console.warn("重复加载", msgId);
        state.noMore = true;
        return;
      }
      console.log("历史消息 history:", history);
      const baseTime = getBaseTime(history, "last");
      const timeDividerResult = addTimeDivider(messages, baseTime, "last");
      const newHistory = history.concat(timeDividerResult);
      state.currentMessageList = newHistory;
      state.historyMessageList.set(convId, newHistory);
    },
    // 从当前消息列表中删除某条消息
    deleteMessage(state, payload) {
      console.log("[chat] 删除消息 deleteMessage:", payload);
      const { convId, messageIdArray = [] } = payload || {};
      const history = state.historyMessageList.get(convId);
      if (!history) {
        console.error("[chat] 删除消息失败，历史消息不存在");
        return;
      }
      const newHistory = history.filter(
        (t) => !t.isTimeDivider && !t.isDeleted && !messageIdArray.includes(t.ID)
      );
      const newHistoryList = addTimeDivider(newHistory.reverse()).reverse();
      state.currentMessageList = newHistoryList;
      state.historyMessageList.set(convId, newHistoryList);
    },
    updateHistoryMessageCache(state, payload) {
      console.log("[chat] 更新历史消息缓存 updateHistoryMessageCache:", payload);
      const { convId, message } = payload;
      let history = state.historyMessageList.get(convId);
      if (!history) return;
      let baseTime = getBaseTime(history);
      let timeDivider = addTimeDivider(message, baseTime).reverse();
      history.unshift(...timeDivider);
      state.historyMessageList.set(convId, history);
      if (state.currentConversation.conversationID === convId) {
        state.currentMessageList = history;
        emitter.emit("updataScroll");
      }
    },
    addMessage(state, payload) {
      console.log("[chat] 添加消息 addMessage:", payload);
      const { convId, isDone, message } = payload || {};
      if (state.currentConversation) {
        state.currentMessageList = message;
      } else {
        state.currentMessageList = [];
      }
      state.historyMessageList.set(convId, message);
      const isMore = state.currentMessageList?.length < HISTORY_MESSAGE_COUNT;
      // 是否已经拉完所有消息 '没有更多' : '显示loading'
      console.log("isDone:", isMore || isDone ? "没有更多" : "显示loading");
      state.noMore = isMore || isDone;
    },
    addAiPresetPromptWords(state, payload) {
      const { convId, message } = createAiPromptMsg();
      const history = state.historyMessageList.get(convId);
      if (state.currentConversation && state.currentMessageList) {
        const data = cloneDeep(history);
        if (data) state.currentMessageList = [message, ...data];
      }
      emitter.emit("updataScroll");
    },
    clearHistory(state) {
      Object.assign(state, {
        sessionDraftMap: new Map(),
        historyMessageList: new Map(),
        currentConversation: null,
        currentMessageList: [],
        conversationList: [],
        activeTab: "whole",
        isChatBoxVisible: false,
        showCheckbox: false,
        currentReplyMsg: null,
      });
      console.log("[chat] 清除历史记录 clearHistory:", state);
    },
    // 切换 更新会话
    updateSelectedConversation(state, payload) {
      const { conversationID: convId } = payload;
      const oldConvId = state.currentConversation?.conversationID;
      if (convId == oldConvId) return;
      state.currentConversation = payload;
      // 系统消息关闭聊天框
      state.isChatBoxVisible = convId !== "@TIM#SYSTEM";
      state.showCheckbox = false;
      if (payload) {
        const history = state.historyMessageList.get(convId);
        state.currentMessageList = cloneDeep(history) ?? [];
      } else {
        state.currentMessageList = [];
      }
      // 当前会话少于历史条数关闭loading
      const isMore = state.currentMessageList?.length < HISTORY_MESSAGE_COUNT;
      state.noMore = isMore;
    },
    // 设置网络状态
    setNetworkStatus(state, action) {
      state.networkStatus = action;
    },
    // 设置提及弹框显示隐藏
    toggleMentionModal(state, action) {
      if (state.currentConversation?.type === "GROUP") {
        state.isShowModal = action;
      } else {
        state.isShowModal = false;
      }
    },
    //  切换列表 全部 未读 提及我
    toggleList(state, action) {
      state.activeTab = action;
    },
    // 设置多选数据
    setForwardData(state, action) {
      const { type, payload } = action;
      const { ID } = payload || {};
      switch (type) {
        case "set":
          state.forwardData.set(ID, payload);
          break;
        case "del":
          state.forwardData.delete(ID);
          break;
        case "clear":
          state.forwardData.clear();
          break;
      }
    },
    // 设置多选框状态
    setCheckboxState(state, flag) {
      state.showCheckbox = flag;
    },
    // 设置聊天框状态
    toggleChatBox(state, flag) {
      state.isChatBoxVisible = flag;
    },
    // 切换侧边栏
    taggleOueSide(state, item) {
      state.outside = item.id;
      router.push(item.path);
    },
    // 回复消息
    setReplyMsg(state, payload) {
      state.currentReplyMsg = payload;
    },
    setMessageEdit(state, payload) {
      state.messageEdit = payload;
    },
    setConversationValue(state, { key, value }) {
      state[key] = value;
    },
    // 设置会话草稿
    setSessionDraft(state, action) {
      if (!action) return;
      const { ID, payload } = action;
      if (!checkTextNotEmpty(payload)) {
        state.sessionDraftMap.delete(ID);
      } else {
        state.sessionDraftMap.set(ID, payload);
      }
    },
    // 设置撤回消息重新编辑
    setRevokeMsg(state, action) {
      const { data, type } = action;
      const { ID, payload } = data || {};
      if (type === "set") {
        state.revokeMsgMap.set(ID, payload);
      } else {
        state.revokeMsgMap.delete(ID);
      }
    },
    // 设置最近使用表情包
    setRecently(state, action) {
      const { data, type } = action;
      switch (type) {
        case "add":
          // 添加数据到 recently 集合
          state.recently.add(data);
          if (state.recently.size > 12) {
            const iterator = state.recently.values();
            const oldestElement = iterator.next().value;
            state.recently.delete(oldestElement);
          }
          localStg.set(EMOJI_RECENTLY, [...state.recently]);
          break;
        case "revert":
          // 从本地存储恢复最近的数据
          const recently = localStg.get(EMOJI_RECENTLY);
          if (recently) state.recently = new Set([...recently]);
          break;
        case "clean":
          state.recently.clear();
          break;
      }
    },
    // 清除当前消息记录
    clearCurrentMessage(state) {
      state.currentConversation = null;
      state.currentMessageList = [];
      state.isChatBoxVisible = false;
    },
  },
  actions: {
    // 获取消息列表
    async updateMessageList({ state, getters, commit, dispatch }, action) {
      const { conversationID: convId } = action;
      const status = getters.toAccount && !getters.hasMsgList;
      // 当前会话有值
      if (timProxy.isSDKReady && status) {
        const { messageList, isCompleted } = await getMessageList({ convId });
        commit("addMessage", {
          convId,
          isDone: isCompleted,
          message: addTimeDivider(messageList).reverse(), // 添加时间
        });
        emitter.emit("updataScroll");
      } else {
        console.log(state.historyMessageList, "获取缓存");
      }
      // 消息已读上报
      dispatch("hasReadMessage", { convId, message: action });
    },
    async updateRobotMessageList({ state, commit }, action) {
      const { convId } = action;
      const { messageList } = await getMessageList({ convId });
      if (!messageList.length) {
        console.warn("暂无消息");
        return;
      }
      const message = addTimeDivider(messageList).reverse();
      state.historyMessageList.set(convId, cloneDeep(message));
      commit("updateMessages", {
        convId: message?.[0].conversationID,
        message: cloneDeep(message[0]),
      });
      emitter.emit("updataScroll", "robot");
    },
    // 新增会话列表
    async addConversation({ commit, dispatch }, action) {
      const { convId } = action;
      const { conversation: data } = await getConversationProfile({ convId });
      // 切换会话
      commit("updateSelectedConversation", data);
      // 获取会话列表
      dispatch("updateMessageList", data);
      // group
      if (data?.type === "GROUP") {
        useGroupStore().handleGroupProfile(data);
        useGroupStore().handleGroupMemberList({ groupID: data.groupProfile.groupID });
      }
      emitter.emit("updataScroll");
    },
    // 删除会话
    async deleteSession({ commit }, action) {
      const { convId } = action;
      if (!convId) {
        console.error("convId is required");
        return;
      }
      const { code } = await deleteConversation({ convId });
      if (code !== 0) return;
      commit("clearCurrentMessage");
    },
    // 消息免打扰
    async setMessageReminderType({ state }, action) {
      const { type, toAccount, remindType } = action;
      if (type === "@TIM#SYSTEM") return;
      await setMessageRemindType({ userID: toAccount, remindType, type });
    },
    // 消息已读
    hasReadMessage({ state }, payload) {
      if (__LOCAL_MODE__) return;
      const {
        convId,
        message: { unreadCount },
      } = payload || {};
      if (unreadCount === 0) return;
      // tab 不为全部不进行消息已读
      if (state.activeTab !== "whole" && state.currentConversation.conversationID === convId) {
        state.postponeUnread.add(convId);
        return;
      }
      console.log("[chat] 消息已读 hasReadMessage:", payload);
      setMessageRead(convId);
    },
    // 会话消息发送
    async sendSessionMessage({ state, commit, dispatch }, action) {
      const { payload } = action;
      const { convId, message, last = true } = payload;
      // 消息上屏 预加载
      commit("updateMessages", { convId, message });
      emitter.emit("updataScroll");
      // 发送消息
      const { code, message: result } = await sendMessage(message);
      if (code === 0) {
        dispatch("sendMsgSuccessCallback", { convId, message: result, last });
      } else {
        console.log("发送失败", code, result);
      }
    },
    // 消息发送成功回调
    async sendMsgSuccessCallback({ state, commit }, action) {
      console.log("消息发送成功 sendMsgSuccessCallback", action);
      const { convId, message, last } = action;
      commit("updateMessages", { convId, message });
      emitter.emit("updataScroll");

      if (!ROBOT_COLLECT.includes(message?.to)) return;
      if (last) {
        setTimeout(async () => {
          await chatService({
            chat: message,
            provider: getModelType(message.to),
            messages: state.currentMessageList ?? [message],
          });
        }, 50);
      }
    },
  },
  getters: {
    hasMsgList(state) {
      return state.currentMessageList?.length > 0;
    },
    toAccount(state) {
      const { currentConversation: conve } = state;
      if (!conve || !conve.conversationID) return "";
      const { type, conversationID: ID } = conve;
      switch (type) {
        case "C2C":
          return ID.replace("C2C", "");
        case "GROUP":
          return ID.replace("GROUP", "");
        default:
          return ID;
      }
    },
    tabList(state) {
      switch (state.activeTab) {
        case "unread":
          return state.conversationList.filter((t) => t.unreadCount > 0);
        case "mention":
          return state.conversationList.filter(
            (t) => t.groupAtInfoList.length > 0 && t.unreadCount > 0
          );
        case "groupChat":
          return state.conversationList.filter((t) => t.type === "GROUP");
        default:
          return state.conversationList;
      }
    },
    currentType(state) {
      if (!state.currentConversation || !state.currentConversation.type) {
        return "";
      }
      return state.currentConversation.type;
    },
    totalUnreadCount(state) {
      const result = state.conversationList.reduce((count, conversation) => {
        // 当前会话不计算总未读
        if (state.currentConversation.conversationID === conversation.conversationID) {
          return count;
        }
        return count + conversation.unreadCount;
      }, 0);
      return result;
    },
    // 用于当前会话的图片预览
    imgUrlList(state) {
      if (!state.currentMessageList) return [];
      const filteredMessages = state.currentMessageList.filter(
        (item) => item.type === "TIMImageElem" && !item.isRevoked && !item.isDeleted
      );
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
      const reversedUrls = filteredMessages.reduceRight((urls, message) => {
        const url = message.payload.imageInfoArray[0].url;
        urls.push(url);
        return urls;
      }, []);
      return reversedUrls;
    },
    // 是否群会话
    isGroupChat(state) {
      if (!state.currentConversation || !state.currentConversation.type) return false;
      return state.currentConversation.type === "GROUP";
    },
  },
};

if (__LOCAL_MODE__) {
  getChatListCache().then((res) => {
    if (res.at(0)) conversation.state.conversationList = res;
  });
}

export default conversation;
