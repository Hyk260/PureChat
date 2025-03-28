// import { HISTORY_MESSAGE_COUNT } from "@/constants/index";
import {
  addTimeDivider,
  getBaseTime,
} from "@/utils/chat/index";
import { useChatStore } from "@/stores/index";
import { cloneDeep } from "lodash-es";
import { createAiPromptMsg } from "@/ai/utils";
import { MessageModel } from "@/database/models/message";
import emitter from "@/utils/mitt-bus";

const conversation = {
  state: {
    currentConversation: null, //跳转窗口的属性
  },
  mutations: {
    updateMessages(state, payload) {
      console.log("[chat] 更新消息 updateMessages:", payload);
      const { convId, message } = payload;
      if (!convId || !message) {
        console.warn("convId 或 message 不存在");
        return;
      }
      const oldMessageList = useChatStore().historyMessageList.get(convId);
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
        useChatStore().$patch({ currentMessageList: newMessageList })
      }
      // 更新历史消息
      useChatStore().historyMessageList.set(convId, newMessageList);
    },
    loadMoreMessages(state, payload) {
      console.log("[chat] 加载更多消息 loadMoreMessages:", payload);
      const { convId, messages, msgId = "" } = payload;
      // 历史消息
      const history = useChatStore().historyMessageList.get(convId) || [];
      if (history.map((t) => t?.ID).includes(msgId)) {
        console.warn("重复加载", msgId);
        useChatStore().$patch({ noMore: true })
        return;
      }
      console.log("历史消息 history:", history);
      const baseTime = getBaseTime(history, "last");
      const timeDividerResult = addTimeDivider(messages, baseTime, "last");
      const newHistory = history.concat(timeDividerResult);
      useChatStore().$patch({ currentMessageList: newHistory })
      useChatStore().historyMessageList.set(convId, newHistory);
    },
    // 从当前消息列表中删除某条消息
    deleteMessage(state, payload) {
      console.log("[chat] 删除消息 deleteMessage:", payload);
      const { convId, messageIdArray = [] } = payload || {};
      const history = useChatStore().historyMessageList.get(convId);
      if (!history) {
        console.error("[chat] 删除消息失败，历史消息不存在");
        return;
      }
      const newHistory = history.filter(
        (t) => !t.isTimeDivider && !t.isDeleted && !messageIdArray.includes(t.ID)
      );
      const newHistoryList = addTimeDivider(newHistory.reverse()).reverse();
      // state.currentMessageList = newHistoryList;
      useChatStore().$patch({ currentMessageList: newHistoryList })
      useChatStore().historyMessageList.set(convId, newHistoryList);
    },
    updateHistoryMessageCache(state, payload) {
      console.log("[chat] 更新历史消息缓存 updateHistoryMessageCache:", payload);
      const { convId, message } = payload;
      const history = useChatStore().historyMessageList.get(convId);
      if (!history) return;
      let baseTime = getBaseTime(history);
      let timeDivider = addTimeDivider(message, baseTime).reverse();
      history.unshift(...timeDivider);
      useChatStore().historyMessageList.set(convId, history);
      if (state.currentConversation.conversationID === convId) {
        useChatStore().$patch({ currentMessageList: history })
        emitter.emit("updataScroll");
      }
    },
    addMessage(state, payload) {
      console.log("[chat] 添加消息 addMessage:", payload);
      const { convId, isDone, message } = payload || {};
      if (state.currentConversation) {
        useChatStore().$patch({ currentMessageList: message })
      } else {
        useChatStore().$patch({ currentMessageList: [] })
      }
      useChatStore().historyMessageList.set(convId, message);
      const isMore = useChatStore().isMore
      // 是否已经拉完所有消息 '没有更多' : '显示loading'
      console.log("isDone:", isMore || isDone ? "没有更多" : "显示loading");
      useChatStore().$patch({ noMore: isMore || isDone })
    },
    addAiPresetPromptWords(state) {
      const { convId, message } = createAiPromptMsg();
      const history = useChatStore().historyMessageList.get(convId);
      if (state.currentConversation && useChatStore().currentMessageList) {
        const data = cloneDeep(history);
        if (data) useChatStore().$patch({ currentMessageList: [message, ...data] })
      }
      emitter.emit("updataScroll");
    },
    clearHistory(state) {
      Object.assign(state, {
        currentConversation: null,
        currentMessageList: [],
      });
      console.log("[chat] 清除历史记录 clearHistory:", state);
    },
    // 切换 更新会话
    updateSelectedConversation(state, payload) {
      const { conversationID: convId } = payload;
      const oldConvId = state.currentConversation?.conversationID;
      if (convId === oldConvId) return;
      state.currentConversation = payload;
      useChatStore().$patch({ showCheckbox: false })
      if (payload) {
        const history = useChatStore().historyMessageList.get(convId);
        useChatStore().$patch({ currentMessageList: cloneDeep(history) ?? [] })
      } else {
        useChatStore().$patch({ currentMessageList: [] })
      }
      useChatStore().$patch({
        noMore: useChatStore().isMore,
        isChatBoxVisible: convId !== "@TIM#SYSTEM"
      })
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
  getters: {
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
    currentType(state) {
      if (!state.currentConversation || !state.currentConversation.type) {
        return "";
      }
      return state.currentConversation.type;
    },
    // 是否群会话
    isGroupChat(state) {
      if (!state.currentConversation || !state.currentConversation.type) return false;
      return state.currentConversation.type === "GROUP";
    },
  },
};

export default conversation;
