import {
  CONVERSATIONTYPE,
  GET_MESSAGE_LIST,
  HISTORY_MESSAGE_COUNT,
} from "@/store/mutation-types";
import { addTimeDivider } from "@/utils/addTimeDivider";
import {
  getMsgList,
  getConversationProfile,
  setMessageRead,
} from "@/api/im-sdk-api";
import { deepClone } from '@/utils/clone';

const getBaseTime = (list) => {
  return list?.length > 0 ? list.find((t) => t.isTimeDivider).time : 0;
};

const conversation = {
  // namespaced: true, //命名空间
  state: {
    showMsgBox: false, //是否显示输入框
    isShowModal: false, // @好友弹框
    noMore: false, // 加载更多  false ? 显示loading : 没有更多
    networkStatus: true, // 网络状态
    needScrollDown: -1, // 是否向下滚动 true ? 0 : -1
    uploadProgress: new Map(), //上传进度
    downloadProgress: new Map(), //下载进度
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], //会话列表数据
    activetab: 'whole',
  },
  mutations: {
    // 设置历史消息
    SET_HISTORYMESSAGE(state, action) {
      const { type, payload } = action;
      switch (type) {
        // 添加消息 首次进入会话是调用
        case CONVERSATIONTYPE.ADD_MESSAGE: {
          console.log("ADD_MESSAGE_添加消息");
          const { convId, message } = payload;
          state.historyMessageList.set(convId, message);
          if (state.currentConversation) {
            state.currentMessageList = state.historyMessageList.get(convId);
          } else {
            state.currentMessageList = [];
          }
          // 当前会话少于历史条数关闭loading
          if (state.currentMessageList?.length < HISTORY_MESSAGE_COUNT) {
            state.noMore = true;
          } else {
            state.noMore = false;
          }
          break;
        }
        // 添加更多消息
        case CONVERSATIONTYPE.ADD_MORE_MESSAGE: {
          console.log("ADD_MORE_MESSAGE_添加更多消息");
          const { convId, messages } = payload;
          let history = state.historyMessageList.get(convId);
          let baseTime = getBaseTime(history);
          let timeDividerResult = addTimeDivider(messages, baseTime).reverse();
          state.historyMessageList.set(
            convId,
            history ? history.concat(timeDividerResult) : timeDividerResult
          );
          state.currentMessageList = state.historyMessageList.get(convId);
          break;
        }
        // 更新消息
        case CONVERSATIONTYPE.UPDATE_MESSAGES: {
          console.log("UPDATE_MESSAGES_更新消息");
          const { convId, message } = payload;
          let newMessageList = [];
          newMessageList = state.currentMessageList;
          let baseTime = getBaseTime(newMessageList);
          let timeDividerResult = addTimeDivider([message], baseTime).reverse();
          newMessageList.unshift(...timeDividerResult);
          state.currentMessageList = newMessageList;
          state.needScrollDown = 0;
          break;
        }
        // 删除消息
        case CONVERSATIONTYPE.DELETE_MESSAGE: {
          const { convId, message } = payload;
          const history = state.historyMessageList.get(convId);
          if (!history) return;
          const newHistory = history.filter(
            (item) => !item.isTimeDivider && !item.isDeleted
          );
          const newHistoryList = addTimeDivider(newHistory.reverse()).reverse();
          state.historyMessageList.set(convId, newHistoryList);
          state.currentMessageList = newHistoryList;
          break;
        }
        // 撤回消息
        case CONVERSATIONTYPE.RECALL_MESSAGE: {
          const { convId, message } = payload;
          let oldConvId = state.currentConversation?.conversationID;
          let history = state.historyMessageList.get(convId);
          if (!history) return;
          if (oldConvId !== convId) return;
          const newHistory = history.filter((item) => !item.isTimeDivider);
          const newHistoryList = addTimeDivider(newHistory.reverse()).reverse();
          state.historyMessageList.set(convId, newHistoryList);
          state.currentMessageList = newHistoryList;
          break;
        }
        // 清除历史记录
        case CONVERSATIONTYPE.CLEAR_HISTORY: {
          state.historyMessageList = new Map();
          state.currentConversation = null;
          state.currentMessageList = [];
          state.showMsgBox = false;
          break;
        }
        // 加载更多状态
        case CONVERSATIONTYPE.UPDATE_NOMORE: {
          state.noMore = payload;
          break;
        }
        // 将消息标记为已读
        case CONVERSATIONTYPE.MARKE_MESSAGE_AS_READED: {
          const { convId, message: { unreadCount } } = payload
          if (unreadCount == "0") return
          setMessageRead(convId);
          break;
        }
        // 更新缓存数据
        case CONVERSATIONTYPE.UPDATE_CACHE: {
          console.log("更新缓存数据");
          const { convId, message } = payload;
          let history = state.historyMessageList.get(convId);
          if (!history) return;
          let baseTime = getBaseTime(history);
          let timeDivider = addTimeDivider(message, baseTime).reverse();
          history.unshift(...timeDivider);
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
            const { conversationID, toAccount } = payload;
            let oldConvId = state.currentConversation?.conversationID;

            if (conversationID == oldConvId) return;

            state.currentConversation = payload;
            // 系统消息关闭聊天框
            state.showMsgBox = conversationID == "@TIM#SYSTEM" ? false : true;

            if (state.currentConversation) {
              const history = state.historyMessageList.get(conversationID);
              state.currentMessageList = history;
            } else {
              state.currentMessageList = [];
            }

            // state.needScrollDown = 0;
            // 当前会话少于历史条数关闭loading
            if (state.currentMessageList?.length < HISTORY_MESSAGE_COUNT) {
              state.noMore = true;
            } else {
              state.noMore = false;
            }
          }
          break;
        }
        // 获取会话列表数据
        case CONVERSATIONTYPE.REPLACE_CONV_LIST: {
          state.conversationList = payload;
          break;
        }
        // 更新滚动条位置
        case CONVERSATIONTYPE.UPDATE_SCROLL_DOWN: {
          state.needScrollDown = payload;
          break;
        }
      }
    },
    /**
     * @description: 设置网络状态
     */
    SET_NETWORK_STATUS(state, action) {
      state.networkStatus = action;
    },
    /**
     * @description: 设置提及弹框显示隐藏
     */
    SET_MENTION_MODAL(state, action) {
      const { type } = state.currentConversation;
      if (type !== "GROUP") return;
      state.isShowModal = action
    },
    /**
    * @description: 切换列表 全部 未读 提及我
    */
    TOGGLE_LIST(state, action) {
      state.activetab = action
    }
  },
  actions: {
    // 获取消息列表
    async [GET_MESSAGE_LIST]({ commit, dispatch, state, rootState }, action) {
      let isSDKReady = rootState.user.isSDKReady;
      const { conversationID, type, toAccount } = action;
      let status =
        !state.currentMessageList || state.currentMessageList?.length == 0;
      // 当前会话有值
      if (state.currentConversation && isSDKReady && status) {
        const { isCompleted, messageList, nextReqMessageID } = await getMsgList(
          {
            conversationID: conversationID,
            count: 15,
          }
        );
        // 添加时间
        const addTimeDividerResponse = addTimeDivider(messageList).reverse();
        commit("SET_HISTORYMESSAGE", {
          type: "ADD_MESSAGE",
          payload: {
            convId: conversationID,
            message: addTimeDividerResponse,
          },
        });
        commit("updataScroll");
        if (type == "GROUP") {
          const { groupID } = action.groupProfile;
          dispatch("getGroupMemberList", { groupID });
        }
      } else {
        const { conversationID, type, toAccount } = action;
        if (type == "GROUP") {
          const { groupID } = action.groupProfile;
          dispatch("getGroupMemberList", { groupID });
        }
        console.log(state.historyMessageList, "获取缓存");
      }
      // 消息已读上报
      commit('SET_HISTORYMESSAGE', {
        type: "MARKE_MESSAGE_AS_READED",
        payload: {
          convId: conversationID,
          message: action
        }
      })
    },
    // 新增会话列表
    async CHEC_OUT_CONVERSATION({ state, commit }, action) {
      const { convId } = action;
      const { conversation } = await getConversationProfile({
        conversationID: convId,
      });
      console.log(conversation);
    },
  },
  getters: {
    toAccount: (state) => {
      if (
        !state.currentConversation ||
        !state.currentConversation.conversationID
      ) {
        return "";
      }
      const { type, conversationID } = state.currentConversation;
      switch (type) {
        case "C2C":
          return conversationID.replace("C2C", "");
        case "GROUP":
          return conversationID.replace("GROUP", "");
        default:
          return conversationID;
      }
    },
    tabList(state) {
      const { activetab } = state
      switch (activetab) {
        case "unread":
          return state.conversationList.filter((t) => t.unreadCount > 0)
        case "mention":
          return state.conversationList.filter((t) => t?.text)
        default:
          return state.conversationList
      }
    }
  },
};

export default conversation;
