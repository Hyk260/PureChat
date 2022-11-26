"use strict";
import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";
import { errorMessage } from "@/utils/message";
import store from "@/store";

function kickedOutReason(type) {
  switch (type) {
    case TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
      return "由于多实例登录";
    case TIM.TYPES.KICKED_OUT_MULT_DEVICE:
      return "由于多设备登录";
    case TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
      return "由于 userSig 过期";
    default:
      return "";
  }
}
function checkoutNetState(state) {
  switch (state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      return { message: "已接入网络", type: "success" };
    case TIM.TYPES.NET_STATE_CONNECTING:
      return { message: "当前网络不稳定", type: "warning" };
    case TIM.TYPES.NET_STATE_DISCONNECTED:
      return { message: "当前网络不可用", type: "error" };
    default:
      return "";
  }
}

export default class {
  constructor() {
    this.userProfile = {}; // IM用户信息
    this.isLogin = false; // IM登陆状态
    this.isSDKReady = false; // TIM SDK 是否 ready
    this.userID = 0;
    this.userSig = "";
    this.sdkAppID = 0;
    // 初始化
    this.init();
    // 暴露给全局
    window.TIMProxy = this;
  }
  init() {
    console.log("init");
    // 监听SDK
    this.initListener();
  }
  initListener() {
    // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
    tim.on(TIM.EVENT.SDK_READY, this.onReadyStateUpdate);
    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    tim.on(TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate);
    // 收到会话列表更新通知
    tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList);
    // 收到推送的单聊、群聊、群提示、群系统通知的新消息
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
    // 收到消息被撤回的通知
    tim.on(TIM.EVENT.MESSAGE_REVOKED, this.onMessageRevoked);
    // 群组列表更新
    tim.on(TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList);
    // 被踢出
    tim.on(TIM.EVENT.KICKED_OUT, this.onKickOut);
    // SDK内部出错
    tim.on(TIM.EVENT.ERROR, this.onError);
    // 网络监测
    tim.on(TIM.EVENT.NET_STATE_CHANGE, this.onNetStateChange);
    // 收到好友申请列表更新通知
    tim.on(
      TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED,
      this.onFriendApplicationListUpdated
    );
    // 收到好友分组列表更新通知
    tim.on(TIM.EVENT.FRIEND_GROUP_LIST_UPDATED, this.onFriendGroupListUpdated);
  }
  onReadyStateUpdate({ name }) {
    const isSDKReady = name === TIM.EVENT.SDK_READY ? true : false;
    store.commit("toggleIsSDKReady", isSDKReady);
    if (isSDKReady) {
      store.dispatch("GET_MYPROFILE");
    }
  }
  onUpdateConversationList({ data, name }) {
    console.log(data, "onUpdateConversationList_会话列表更新");
    store.commit("SET_CONVERSATION", {
      type: "REPLACE_CONV_LIST",
      payload: data,
    });
  }
  onReceiveMessage({ data, name }) {
    const { toAccount } = store.state.conversation.currentConversation;
    console.log(data, "收到新消息");
    // 收到新消息 且 为当前选中会话 更新消息
    if (data?.[0].to !== toAccount) return;
    store.commit("SET_HISTORYMESSAGE", {
      type: "UPDATE_MESSAGES",
      payload: {
        convId: "",
        message: data[0],
      },
    });
  }
  onMessageRevoked({ data, name }) {
    console.log(data, "onMessageRevoked_撤回消息");
    store.commit("SET_HISTORYMESSAGE", {
      type: "RECALL_MESSAGE",
      payload: {
        convId: data[0].to,
        message: data,
      },
    });
  }
  onUpdateGroupList({ data, name }) {
    console.log(data, "onUpdateGroupList_群组列表更新");
    // commit('updateGroupList', data)
  }
  onKickOut({ data }) {
    const message = kickedOutReason(data.type);
    store.commit("showMessage", {
      message: `${message}被踢出，请重新登录。`,
      type: "error",
    });
    store.dispatch("LOG_OUT");
    store.dispatch("TIM_LOG_OUT");
  }
  onError({ data }) {
    if (data.message !== "Network Error") {
      store.commit("showMessage", {
        message: data.message,
        type: "error",
      });
    }
  }
  onNetStateChange({ data }) {
    store.commit("showMessage", checkoutNetState(data.state));
  }
  onFriendApplicationListUpdated(event) {
    console.log(event);
  }
  onFriendGroupListUpdated(event) {
    console.log(event);
  }
  /**
   * 使用 window.Notification 进行全局的系统通知
   * @param {Message} message
   */
  notifyMe(message) {
    // 需检测浏览器支持和用户授权
    if (!("Notification" in window)) {
      return;
    } else if (window.Notification.permission === "granted") {
      this.handleNotify(message);
    } else if (window.Notification.permission !== "denied") {
      window.Notification.requestPermission().then((permission) => {
        // 如果用户同意，就可以向他们发送通知
        if (permission === "granted") {
          this.handleNotify(message);
        }
      });
    }
  }
  handleNotify(message) {
    const notification = new window.Notification("有人提到了你", {
      icon: "https://web.sdk.qcloud.com/im/assets/images/logo.png",
      body: message.payload.text,
    });
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }
}
