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
import { HISTORY_MESSAGE_COUNT } from "@/constants/index";
import {
  addTimeDivider,
  getBaseTime,
  getChatListCache,
} from "@/utils/chat/index";
import { useGroupStore, useChatStore } from "@/stores/index";
import { cloneDeep } from "lodash-es";
import { timProxy } from "@/utils/IM/index";
import { createAiPromptMsg, getModelType } from "@/ai/utils";
import { MessageModel } from "@/database/models/message";
import emitter from "@/utils/mitt-bus";

const conversation = {
  state: {
    showCheckbox: false, //是否显示多选框
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], // 会话列表数据
    filterConversationList: [],
    activeTab: "whole", // 全部 未读 提及我
    // postponeUnread: new Set(),
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
      __LOCAL_MODE__ && MessageModel.update(message.ID, message);
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
        // state.needScrollDown = 0;
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
        useChatStore().$patch({ noMore: true })
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
      useChatStore().$patch({ noMore: isMore || isDone })
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
        historyMessageList: new Map(),
        currentConversation: null,
        currentMessageList: [],
        conversationList: [],
        activeTab: "whole",
        showCheckbox: false,
      });
      console.log("[chat] 清除历史记录 clearHistory:", state);
    },
    // 切换 更新会话
    updateSelectedConversation(state, payload) {
      const { conversationID: convId } = payload;
      const oldConvId = state.currentConversation?.conversationID;
      if (convId == oldConvId) return;
      state.currentConversation = payload;
      state.showCheckbox = false;
      if (payload) {
        const history = state.historyMessageList.get(convId);
        state.currentMessageList = cloneDeep(history) ?? [];
      } else {
        state.currentMessageList = [];
      }
      // 当前会话少于历史条数关闭loading
      const isMore = state.currentMessageList?.length < HISTORY_MESSAGE_COUNT;
      // 系统消息关闭聊天框
      useChatStore().$patch({
        noMore: isMore,
        isChatBoxVisible: convId !== "@TIM#SYSTEM"
      })
    },
    //  切换列表 全部 未读 提及我
    toggleList(state, action) {
      state.activeTab = action;
    },
    // 设置多选框状态
    setCheckboxState(state, flag) {
      state.showCheckbox = flag;
    },
    setConversationValue(state, { key, value }) {
      state[key] = value;
    },
    // 清除当前消息记录
    clearCurrentMessage(state) {
      state.currentConversation = null;
      state.currentMessageList = [];
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
      // if (state.activeTab !== "whole" && state.currentConversation.conversationID === convId) {
      //   state.postponeUnread.add(convId);
      //   return;
      // }
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
