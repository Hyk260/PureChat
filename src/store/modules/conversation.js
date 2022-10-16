import { CONVERSATIONTYPE, GET_MESSAGE_LIST } from "../mutation-types";
import { addTimeDivider } from "@/utils/addTimeDivider";
import { getMsgList } from "@/api/im-sdk-api";

const getBaseTime = (list) => {
  return list?.length > 0 ? list.find((t) => t.isTimeDivider).time : 0;
};

const conversation = {
  // namespaced: true,
  state: {
    showMsgBox: false, //是否显示输入框
    noMore: true, // 加载更多  false ? 显示loading : 没有更多
    networkStatus: true, // 网络状态
    needScrollDown: -1, // 是否向下滚动
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], //会话列表数据
  },
  mutations: {
    // 设置历史消息
    SET_HISTORYMESSAGE(state, action) {
      const { type, payload } = action;
      switch (type) {
        // 添加消息
        case CONVERSATIONTYPE.ADD_MESSAGE: {
          const { convId, message } = payload;
          console.log(convId, message);
          state.historyMessageList.set(convId, message);
          if (state.currentConversation) {
            state.currentMessageList = state.historyMessageList.get(convId);
          } else {
            state.currentMessageList = [];
          }
          console.log(state.historyMessageList);
          // state.currentMessageList = message;
          break;
        }
        // 添加更多消息
        case CONVERSATIONTYPE.ADD_MORE_MESSAGE: {
          console.log("添加更多消息");
          // state.historyMessageList =
          break;
        }
        // 更新消息
        case CONVERSATIONTYPE.UPDATE_MESSAGES: {
          const { convId, message } = payload;
          let newMessageList = [];
          newMessageList = state.currentMessageList;
          let baseTime = getBaseTime(newMessageList);
          let timeDividerResult = addTimeDivider([message], baseTime).reverse();
          newMessageList.unshift(...timeDividerResult);
          state.currentMessageList = newMessageList;
          // state.currentMessageList.unshift(message);
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
        // #接收消息
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
        // 将消息标记为已读
        case CONVERSATIONTYPE.MARKE_MESSAGE_AS_READED: {
          console.log("将消息标记为已读");
          break;
        }
      }
    },
    // 设置会话
    SET_CONVERSATION(state, action) {
      const { type, payload } = action;
      switch (type) {
        // 切换 跳转 会话
        case CONVERSATIONTYPE.UPDATE_CURRENT_SELECTED_CONVERSATION: {
          if (payload) {
            console.log(payload, "切换会话");
            const { conversationID } = payload;
            if (conversationID == state.currentConversation?.conversationID)
              return;
            if (conversationID == "@TIM#SYSTEM") {
              state.showMsgBox = false;
            } else {
              state.showMsgBox = true;
            }
            // state.needScrollDown = 0;
            // state.noMore = false;
            state.currentConversation = payload;
          }
          break;
        }
        // 获取会话列表数据
        case CONVERSATIONTYPE.REPLACE_CONV_LIST: {
          state.conversationList = payload;
          break;
        }
      }
    },
    // 设置网络状态
    SET_NETWORK_STATUS(state, action) {
      state.networkStatus = action;
    },
  },
  actions: {
    // 获取消息列表
    async [GET_MESSAGE_LIST]({ commit, dispatch, state, rootState }, action) {
      let isSDKReady = rootState.user.isSDKReady;
      
      // 当前会话有值
      if (state.currentConversation && isSDKReady) {
        // const { conversationID } = state.currentConversation;
        const { conversationID, type } = action;
        const result = await getMsgList({
          conversationID: conversationID,
          count: 15,
        });
        const { isCompleted, messageList, nextReqMessageID } = result;
        const addTimeDividerResponse = addTimeDivider(messageList).reverse();
        commit("SET_HISTORYMESSAGE", {
          type: "ADD_MESSAGE",
          payload: {
            convId: conversationID,
            message: addTimeDividerResponse,
          },
        });
      } else {
        console.log(123);
      }
    },
  },
  getters: {},
};

export default conversation;
