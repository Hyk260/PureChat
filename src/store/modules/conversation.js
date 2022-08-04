import { CONVERSATIONTYPE } from "../mutation-types";

const conversation = {
  // namespaced: true,
  state: {
    noMore: true, // 加载更多  false ? 显示loading : 没有更多
    networkStatus: true, // 网络状态
    needScrollDown: -1, // 是否向下滚动
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表
    currentConversation: null, //跳转窗口的属性
  },
  mutations: {
    // 设置历史消息
    SET_HISTORYMESSAGE(state, action) {
      const { type, payload } = action;
      switch (type) {
        // 更新消息
        case CONVERSATIONTYPE.UPDATE_MESSAGES: {
          console.log(payload);
          const { convId, message } = payload;
          state.currentMessageList.unshift(message);
          break;
        }
        // 删除消息
        case CONVERSATIONTYPE.DELETE_MESSAGE: {
          console.log(payload);
          break;
        }
        // 清除历史记录
        case CONVERSATIONTYPE.CLEAR_HISTORY: {
          state.historyMessageList = new Map();
          state.currentMessageList = [];
          break;
        }
        // 接收消息
        case CONVERSATIONTYPE.RECIVE_MESSAGE: {
          const { convId, message } = payload;
          state.currentMessageList = message.reverse();
          break;
        }
        // 加载更多状态
        case CONVERSATIONTYPE.UPDATE_NOMORE: {
          state.noMore = payload;
          break;
        }
      }
    },
    // 设置会话
    SET_CONVERSATION(state, action) {
      const { type, payload } = action;
      switch (type) {
        // 跳转会话
        case CONVERSATIONTYPE.UPDATE_CURRENT_SELECTED_CONVERSATION: {
          if (payload) {
            if (payload?.id == state.currentConversation?.id) return;
            state.needScrollDown = 0;
            // state.noMore = false;
            state.currentConversation = payload;
          }
          break;
        }
      }
    },
  },
  actions: {},
};

export default conversation;
