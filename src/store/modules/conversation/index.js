import { ROBOT_COLLECT } from "@/ai/constant";
import { chatService } from "@/ai/index";
import {
  deleteConversation,
  getConversationProfile,
  getMsgList,
  getUnreadMsg,
  sendMsg,
  setMessageRead,
  setMessageRemindType,
} from "@/api/im-sdk-api/index";
import {
  CONVERSATIONTYPE,
  EMOJI_RECENTLY,
  GET_MESSAGE_LIST,
  HISTORY_MESSAGE_COUNT,
} from "@/constants/index";
import TIM from "@/utils/IM/chat/index";
import { addTimeDivider, checkTextNotEmpty, getBaseTime, transformData } from "@/utils/chat/index";
import storage from "@/utils/localforage/index";
import emitter from "@/utils/mitt-bus";
import { cloneDeep } from "lodash-es";

const conversation = {
  // namespaced: true, //命名空间
  state: {
    sessionDraftMap: new Map(), //会话草稿
    totalUnreadMsg: 0, // 未读消息总数
    showMsgBox: false, //是否显示输入框
    showCheckbox: false, //是否显示多选框
    isShowModal: false, // @好友弹框
    noMore: false, // 加载更多  false ? 显示loading : 没有更多
    networkStatus: true, // 网络状态
    needScrollDown: -1, // 是否向下滚动 true ? 0 : -1
    forwardData: new Map(), // 多选数据
    downloadProgress: new Map(), //下载进度
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], // 会话列表数据
    currentReplyMsg: null, // 回复数据
    activetab: "whole", // 全部 未读 提及我
    outside: "message", // 侧边栏初始状态
    revokeMsgMap: new Map(), // 撤回消息重新编辑
    recently: new Set(),
    postponeUnread: new Set(),
  },
  mutations: {
    // 设置历史消息
    SET_HISTORYMESSAGE(state, action) {
      const { type, payload } = action;
      switch (type) {
        case CONVERSATIONTYPE.ADD_MESSAGE: {
          console.log("[chat] 添加消息 ADD_MESSAGE:", payload);
          const { convId, isDone, message } = payload;
          state.historyMessageList.set(convId, message);
          if (state.currentConversation) {
            state.currentMessageList = state.historyMessageList.get(convId);
          } else {
            state.currentMessageList = [];
          }
          const isMore = state.currentMessageList?.length < HISTORY_MESSAGE_COUNT;
          // 是否已经拉完所有消息 '没有更多' : '显示loading'
          console.log("isDone:", isMore || isDone ? "没有更多" : "显示loading");
          state.noMore = isMore || isDone;
          break;
        }
        case CONVERSATIONTYPE.ADD_MORE_MESSAGE: {
          console.log("[chat] 加载更多 ADD_MORE_MESSAGE:", payload);
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
        case CONVERSATIONTYPE.UPDATE_MESSAGES: {
          console.log("[chat] 更新消息 UPDATE_MESSAGES:", payload);
          const { convId, message } = payload;
          let matched = false;
          let oldMessageList = state.historyMessageList.get(convId);
          if (!oldMessageList) return;
          const newMessageList = oldMessageList.reduce((acc, item) => {
            if (item.ID === payload.message.ID) {
              matched = true;
              acc.push(payload.message);
            } else {
              acc.push(item);
            }
            return acc;
          }, []);
          // 新消息
          if (!matched) {
            let baseTime = getBaseTime(newMessageList);
            let timeDividerResult = addTimeDivider([message], baseTime).reverse();
            newMessageList.unshift(...timeDividerResult);
          }
          // 更新历史消息
          state.historyMessageList.set(convId, newMessageList);
          // 当前会有列表有值
          if (state.currentConversation) {
            if (state.currentConversation.conversationID === convId) {
              state.currentMessageList = newMessageList;
            }
            state.needScrollDown = 0;
          }
          break;
        }
        case CONVERSATIONTYPE.DELETE_MESSAGE: {
          console.log("[chat] 删除消息 DELETE_MESSAGE:", payload);
          const { convId } = payload;
          const history = state.historyMessageList.get(convId);
          if (!history) return;
          const newHistory = history.reverse();
          const newHistoryList = addTimeDivider(newHistory).reverse();
          state.historyMessageList.set(convId, newHistoryList);
          state.currentMessageList = newHistoryList;
          break;
        }
        case CONVERSATIONTYPE.CLEAR_HISTORY: {
          Object.assign(state, {
            sessionDraftMap: new Map(),
            historyMessageList: new Map(),
            currentConversation: null,
            currentMessageList: [],
            conversationList: [],
            activetab: "whole",
            showMsgBox: false,
            showCheckbox: false,
            currentReplyMsg: null,
          });
          console.log("[chat] 清除历史记录 CLEAR_HISTORY:", state);
          break;
        }
        case CONVERSATIONTYPE.UPDATE_NOMORE: {
          console.log("[chat] 加载更多消息状态 UPDATE_NOMORE:", payload);
          state.noMore = payload;
          break;
        }
        case CONVERSATIONTYPE.MARKE_MESSAGE_AS_READED: {
          const {
            convId,
            message: { unreadCount },
          } = payload;
          // tab 不为全部不进行消息已读
          if (state.activetab !== "whole" && state.currentConversation.conversationID === convId) {
            state.postponeUnread.add(convId);
            return;
          }
          if (unreadCount === 0) return;
          console.log("[chat] 消息已读 MARKE_MESSAGE_AS_READED:", payload);
          setMessageRead(convId);
          break;
        }
        case CONVERSATIONTYPE.UPDATE_CACHE: {
          console.log("[chat] 更新缓存 UPDATE_CACHE:", payload);
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
        // 切换会话
        case CONVERSATIONTYPE.UPDATE_CURRENT_SELECTED_CONVERSATION: {
          if (payload) {
            const { conversationID: convId } = payload;
            const oldConvId = state.currentConversation?.conversationID;
            if (convId == oldConvId) return;
            state.currentConversation = payload;
            // 系统消息关闭聊天框
            state.showMsgBox = convId !== "@TIM#SYSTEM";
            state.showCheckbox = false;
            if (state.currentConversation) {
              state.currentMessageList = state.historyMessageList.get(convId);
            } else {
              state.currentMessageList = [];
            }
            // 当前会话少于历史条数关闭loading
            const isMore = state.currentMessageList?.length < HISTORY_MESSAGE_COUNT;
            state.noMore = isMore;
          }
          break;
        }
        // 更新当前会话
        case CONVERSATIONTYPE.UPDATE_CURRENT_SESSION: {
          state.currentConversation = payload;
          break;
        }
        // 更新会话列表
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
    // 设置网络状态
    SET_NETWORK_STATUS(state, action) {
      state.networkStatus = action;
    },
    // 设置提及弹框显示隐藏
    SET_MENTION_MODAL(state, action) {
      const { type } = state.currentConversation;
      if (type !== "GROUP") {
        state.isShowModal = false;
        return;
      }
      state.isShowModal = action;
    },
    //  切换列表 全部 未读 提及我
    TOGGLE_LIST(state, action) {
      state.activetab = action;
    },
    SET_FORWARD_DATA(state, action) {
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
    SET_CHEC_BOX(state, flag) {
      state.showCheckbox = flag;
    },
    // 设置聊天框状态
    SET_SHOW_MSG_BOX(state, flag) {
      state.showMsgBox = flag;
    },
    // 切换侧边栏
    TAGGLE_OUE_SIDE(state, item) {
      state.outside = item;
    },
    // 回复消息
    setReplyMsg(state, payload) {
      state.currentReplyMsg = payload;
    },
    SET_CONVERSATION_VALUE(state, { key, value }) {
      state[key] = value;
    },
    // 设置会话草稿
    SET_SESSION_DRAFT(state, action) {
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
      if (type == "set") {
        state.revokeMsgMap.set(data.ID, data.payload);
      } else {
        state.revokeMsgMap.delete(data.ID);
      }
    },
    setRecently(state, action) {
      const { data, type } = action;
      if (type == "add") {
        state.recently.add(data);
        if (state.recently.size > 12) {
          const iterator = state.recently.values();
          const oldestElement = iterator.next().value;
          state.recently.delete(oldestElement);
        }
        storage.set(EMOJI_RECENTLY, [...state.recently]);
      } else if (type == "revert") {
        const recently = storage.get(EMOJI_RECENTLY);
        if (recently) state.recently = new Set([...recently]);
      } else if (type == "clean") {
        state.recently.clear();
      }
    },
  },
  actions: {
    // 获取消息列表
    async [GET_MESSAGE_LIST]({ commit, dispatch, state }, action) {
      const isSDKReady = window.TIMProxy.chat.isReady();
      const { conversationID, type } = action;
      let status = !state.currentMessageList || state.currentMessageList?.length == 0;
      // 当前会话有值
      if (state.currentConversation && isSDKReady && status) {
        const { messageList, isCompleted } = await getMsgList({
          conversationID: conversationID,
        });
        commit("SET_HISTORYMESSAGE", {
          type: "ADD_MESSAGE",
          payload: {
            convId: conversationID,
            isDone: isCompleted,
            message: addTimeDivider(messageList).reverse(), // 添加时间
          },
        });
        emitter.emit("updataScroll");
        if (type == "GROUP") {
          const { groupID } = action.groupProfile;
          dispatch("getGroupMemberList", { groupID });
        }
      } else {
        const { type } = action;
        if (type == "GROUP") {
          const { groupID } = action.groupProfile;
          dispatch("getGroupMemberList", { groupID });
        }
        console.log(state.historyMessageList, "获取缓存");
      }
      // 消息已读上报
      commit("SET_HISTORYMESSAGE", {
        type: "MARKE_MESSAGE_AS_READED",
        payload: {
          convId: conversationID,
          message: action,
        },
      });
    },
    async GET_ROBOT_MESSAGE_LIST({ state, commit }, action) {
      const { convId } = action;
      const { messageList } = await getMsgList({
        conversationID: convId,
      });
      const message = addTimeDivider(messageList).reverse();
      state.historyMessageList.set(convId, cloneDeep(message));
      commit("SET_HISTORYMESSAGE", {
        type: "UPDATE_MESSAGES",
        payload: {
          convId: message?.[0].conversationID,
          message: cloneDeep(message[0]),
        },
      });
      emitter.emit("updataScroll");
    },
    // 新增会话列表
    async CHEC_OUT_CONVERSATION({ commit, dispatch }, action) {
      const { convId } = action;
      const { conversation } = await getConversationProfile({
        conversationID: convId,
      });
      // 切换会话
      commit("SET_CONVERSATION", {
        type: "UPDATE_CURRENT_SELECTED_CONVERSATION",
        payload: conversation,
      });
      // 群详情信息
      dispatch("getGroupProfile", conversation);
      // 获取会话列表
      dispatch("GET_MESSAGE_LIST", conversation);
    },
    // 删除会话列表
    async DELETE_SESSION({ dispatch }, action) {
      const { convId } = action;
      const { code } = await deleteConversation({ convId });
      if (code !== 0) return;
      dispatch("CLEAR_CURRENT_MSG");
    },
    // 清除当前消息记录
    async CLEAR_CURRENT_MSG({ state, commit }) {
      state.currentConversation = null;
      state.currentMessageList = [];
      commit("SET_SHOW_MSG_BOX", false);
    },
    // 获取未读消息总数
    async GET_TOTAL_UNREAD_MSG({ state }) {
      const isSDKReady = window.TIMProxy.chat.isReady();
      if (!isSDKReady) return;
      state.totalUnreadMsg = await getUnreadMsg();
    },
    // 消息免打扰
    async SET_MESSAGE_REMIND_TYPE({ state }, action) {
      const { type, toAccount, remindType } = action;
      if (type === "@TIM#SYSTEM") return;
      await setMessageRemindType({ userID: toAccount, remindType, type });
    },
    // 会话消息发送
    async SESSION_MESSAGE_SENDING({ state, commit, dispatch }, action) {
      const { payload } = action;
      const { convId, message } = payload;
      commit("SET_HISTORYMESSAGE", {
        type: "UPDATE_MESSAGES",
        payload: { convId, message },
      });
      emitter.emit("updataScroll");
      // 发送消息
      const { code, message: result } = await sendMsg(message);
      if (code === 0) {
        dispatch("SENDMSG_SUCCESS_CALLBACK", { convId, message: result });
        dispatch("IM_CHAT_CALLBACK", {
          list: transformData(state.currentMessageList),
          message: result,
        });
      } else {
        console.log("发送失败", code, result);
      }
    },
    // 消息发送成功回调
    async SENDMSG_SUCCESS_CALLBACK({ state, commit }, action) {
      console.log("消息发送成功 SENDMSG_SUCCESS_CALLBACK", action);
      const { convId, message } = action;
      commit("SET_HISTORYMESSAGE", {
        type: "UPDATE_MESSAGES",
        payload: { convId, message },
      });
      emitter.emit("updataScroll");
    },
    IM_CHAT_CALLBACK({ state }, action) {
      console.log("IM_CHAT_CALLBACK", action);
      const { message, list } = action;
      const { to } = message;
      if (!ROBOT_COLLECT.includes(to)) return;
      chatService({ messages: list, chat: message });
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
    tabList(state) {
      switch (state.activetab) {
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
      const filteredMessages = state.currentMessageList.filter(
        (item) => item.type === TIM.TYPES.MSG_IMAGE && !item.isRevoked && !item.isDeleted
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
      return state.currentConversation.type === TIM.TYPES.CONV_GROUP;
    },
  },
};

export default conversation;
