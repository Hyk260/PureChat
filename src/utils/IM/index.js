import { C2C_ROBOT_COLLECT } from "@/ai/constant";
import { TIM_PROXY } from "@/constants/index";
import store from "@/store";
import TIM from "@/utils/IM/chat/index";
import tim from "@/utils/IM/im-sdk/tim";
import { scrollToDomPostion, setChatListCache } from "@/utils/chat/index";
import { localStg } from "@/utils/storage";
import emitter from "@/utils/mitt-bus";
import { useWindowFocus } from "@vueuse/core";
import { ElNotification } from "element-plus";
import { cloneDeep } from "lodash-es";
import {
  fnCheckoutNetState,
  getConversationID,
  getConversationList,
  kickedOutReason,
} from "./utils/index";

const isFocused = useWindowFocus(); // 判断浏览器窗口是否在前台可见状态

function isRobotId(data) {
  return C2C_ROBOT_COLLECT.includes(data?.[0].conversationID);
}

export class TIMProxy {
  constructor() {
    this.userProfile = {}; // IM用户信息
    this.userID = "";
    this.userSig = "";
    this.chat = null; // im实例
    this.TIM = null; // 命名空间
    this.once = false; // 防止重复初始化
    this.isSDKReady = false;
    // 暴露给全局
    window.TIMProxy = new Proxy(this, {
      set(target, key, val) {
        return Reflect.set(target, key, val);
      },
      get(target, key) {
        return Reflect.get(target, key);
      },
    });
  }
  // 缓存IM信息
  saveSelfToLocalStorage() {
    const player = {};
    for (const [key, value] of Object.entries(this)) {
      player[key] = value;
    }
    localStg.set(TIM_PROXY, player);
  }
  // 更新IM信息
  loadSelfFromLocalStorage() {
    const player = localStg.get(TIM_PROXY);
    if (!player) return;
    for (const [key, value] of Object.entries(player)) {
      this[key] = value;
    }
  }
  // 初始化
  init() {
    if (this.once) return;
    this.once = true;
    this.chat = tim;
    this.TIM = TIM;
    this.initListener(); // 监听SDK
    console.log("[chat] TIMProxy init");
  }
  initListener() {
    // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
    tim.on("sdkStateReady", this.onReadyStateUpdate, this);
    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    tim.on("sdkStateNotReady", this.onReadyStateUpdate, this);
    // 收到会话列表更新通知
    tim.on("onConversationListUpdated", this.onUpdateConversationList);
    // 收到推送的单聊、群聊、群提示、群系统通知的新消息
    tim.on("onMessageReceived", this.onReceiveMessage, this);
    // 收到消息被撤回的通知
    tim.on("onMessageRevoked", this.onMessageRevoked);
    // 群组列表更新
    tim.on("onGroupListUpdated", this.onUpdateGroupList);
    // 被踢出
    tim.on("kickedOut", this.onKickOut);
    // SDK内部出错
    tim.on("error", this.onError);
    // 网络监测
    tim.on("netStateChange", this.onNetStateChange);
    // 会话未读总数更新
    tim.on("onTotalUnreadMessageCountUpdated", this.onTotalUnreadMessageCountUpdated);
    // 收到好友申请列表更新通知
    // tim.on("onFriendApplicationListUpdated", this.onFriendApplicationListUpdated);
    // 收到好友分组列表更新通知
    // tim.on("onFriendGroupListUpdated", this.onFriendGroupListUpdated);
    // 已订阅用户或好友的状态变更（在线状态或自定义状态）时触发。
    // tim.on("onUserStatusUpdated", this.onUserStatusUpdated);
    // 收到消息被修改的通知
    tim.on("onMessageModified", this.onMessageModified, this);
  }
  onTotalUnreadMessageCountUpdated({ data }) {
    console.log("[chat] onTotalUnreadMessageCountUpdated:", data);
  }
  onReadyStateUpdate({ name }) {
    console.log("[chat] onReadyStateUpdate:", name);
    this.isSDKReady = name === "sdkStateReady";
    if (!this.isSDKReady) return;
    this.chat.getMyProfile().then(({ code, data }) => {
      this.userProfile = data;
      this.userID = this.chat.getLoginUser();
      this.saveSelfToLocalStorage();
      store.commit("setCurrentProfile", data);
    });
  }
  onUpdateConversationList({ data }) {
    console.log("[chat] 会话列表更新 onUpdateConversationList:", data);
    setChatListCache(data);
    const convId = getConversationID();
    const conv = data.filter((t) => t.conversationID == convId);
    // 更新会话列表
    store.commit("setConversationValue", { key: "conversationList", value: data });
    // 更新窗口数据
    if (conv) {
      store.commit("setConversationValue", {
        key: "currentConversation",
        value: cloneDeep(conv[0]),
      });
    }
    // 未读消息
    store.dispatch("updateUnreadMessageCount");
  }
  onReceiveMessage({ data }) {
    console.log("[chat] 收到新消息 onReceiveMessage:", data);
    const current = getConversationID() == data?.[0].conversationID;
    this.handleQuitGroupTip(data);
    this.handleNotificationTip(data);
    this.handleGroupSystemNoticeTip(data);
    this.handleUpdateMessage(data, current);
  }
  onMessageRevoked({ data }) {
    console.log("[chat] 撤回消息 onMessageRevoked:", data);
    store.commit("updateMessages", {
      convId: data?.[0].conversationID,
      message: cloneDeep(data[0]),
    });
  }
  onUpdateGroupList({ data }) {
    console.log("[chat] 群组列表更新 onUpdateGroupList:", data);
  }
  onKickOut({ data }) {
    console.log("[chat] onKickOut:", data);
    store.commit("showMessage", {
      message: `${kickedOutReason(data.type)}被踢出，请重新登录。`,
      type: "error",
    });
    store.dispatch("handleUserLogout");
  }
  onError({ data }) {
    console.log("[chat] onError:", data);
    if (data.message !== "Network Error") {
      store.commit("showMessage", {
        message: data.message,
        type: "error",
      });
    }
  }
  onMessageModified({ data }) {
    console.log("[chat] 历史消息更新 onMessageModified:", data);
    this.handleUpdateMessage(data, false);
  }
  onNetStateChange({ data }) {
    console.log("[chat] 网络状态变更 onNetStateChange:", data);
    store.commit("showMessage", fnCheckoutNetState(data.state));
  }
  onFriendApplicationListUpdated({ data }) {
    console.log("[chat] 好友申请列表 onFriendApplicationListUpdated:", data);
  }
  onFriendGroupListUpdated({ data }) {
    console.log(data);
  }
  onUserStatusUpdated({ data }) {
    console.log(data);
  }
  /**
   * 使用 window.Notification 进行全局的系统通知
   * 本地调试仅支持 http://localhost:8080/
   * https://developer.mozilla.org/zh-CN/docs/Web/API/notification
   * @param {Message} message
   */
  async notifyUser(message) {
    const permission = Notification.permission;
    console.log("[chat] notifyUser:", permission);
    // denied 用户拒绝显示通知
    // granted 用户接受显示通知
    // default 用户选择是未知的 因此浏览器的行为类似于值是 denied
    // 需检测浏览器支持和用户授权
    if (!("Notification" in window)) {
      console.log("浏览器不支持通知");
      this.handleElNotification(message);
    } else if (permission === "granted") {
      this.handleNotify(message);
    } else if (permission === "denied") {
      this.handleElNotification(message);
    } else if (permission !== "denied") {
      // 如果用户同意，就可以向他们发送通知
      Notification.requestPermission()
        .then(() => {
          this.handleNotify(message);
        })
        .catch(() => {
          this.handleElNotification(message);
        });
    }
  }
  handleNotify(message) {
    console.log("[chat] handleNotify", message);
    const { ID, payload, avatar } = message;
    const tip = "有人提到了你";
    const icon = avatar || `${import.meta.env.VITE_CLOUD_BASE_URL}log.png`;
    const notification = new window.Notification(tip, {
      icon: icon,
      body: payload.text,
    });
    notification.onclick = () => {
      // 切换会话列表
      store.dispatch("addConversation", { convId: message.conversationID });
      // 定位到指定会话
      setTimeout(() => {
        scrollToDomPostion(ID);
      }, 1000);
      window.focus();
      notification.close();
    };
  }
  /**
   * 收到有群成员/退群/被踢出/入群/的groupTip时,更新群成员列表
   * MSG_GRP_TIP: "TIMGroupTipElem" 群提示消息
   */
  handleQuitGroupTip(data) {
    if (data[0]?.type !== "TIMGroupTipElem") return;
    console.log("[chat] handleQuitGroupTip", data);
    const convId = getConversationID();
    if (convId !== data[0]?.conversationID) return;
    // TIM.TYPES.GRP_TIP_MBR_JOIN // 1 有成员加群
    // TIM.TYPES.GRP_TIP_MBR_QUIT // 2 有群成员退群
    // TIM.TYPES.GRP_TIP_MBR_KICKED_OUT // 3 有群成员被踢出群
    // TIM.TYPES.GRP_TIP_MBR_SET_ADMIN	//4	有群成员被设为管理员
    // TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN // 5 有群成员被撤销管理员
    const list = [1, 2, 3, 4, 5];
    const groupTips = data.filter((t) => {
      return list.includes(t.payload.operationType);
    });
    // 更新当前会话的群成员列表
    if (groupTips.length) {
      store.dispatch("getGroupMemberList");
    }
  }
  /**
   * 群系统通知的 系统会在恰当的时机，向特定用户发出群系统通知。例如：user1 被踢出群组，系统会给 user1 发送对应的群系统消息。
   * https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.GroupSystemNoticePayload
   * MSG_GRP_SYS_NOTICE "TIMGroupSystemNoticeElem"	群系统通知消息
   */
  handleGroupSystemNoticeTip(data) {
    if (data[0]?.type !== "TIMGroupSystemNoticeElem") return;
    console.log("[chat] handleGroupSystemNoticeTip", data);
    // 4	被踢出群组 被踢出的用户接收
    // 5	群组被解散 全体群成员接收
    const list = [4, 5];
    const convId = getConversationID();
    const groupSystemTips = data.filter((t) => {
      return list.includes(t.payload.operationType);
    });
    if (groupSystemTips.length > 0) {
      convId && store.dispatch("deleteSession", { convId });
    }
  }
  // 消息更新
  handleUpdateMessage(data, read = true) {
    if (!getConversationID()) return;
    if (isRobotId(data)) {
      store.dispatch("updateRobotMessageList", {
        convId: data?.[0].conversationID,
      });
    } else {
      // 更新会话消息
      store.commit("updateMessages", {
        convId: data?.[0].conversationID,
        message: cloneDeep(data[0]),
      });
    }
    // 消息已读
    read && this.reportedMessageRead(data);
    // 更新滚动条位置到底部
    emitter.emit("updataScroll", "bottom");
  }
  // 上报消息已读
  reportedMessageRead(data) {
    if (!isFocused.value) return;
    store.dispatch("hasReadMessage", { convId: data?.[0].conversationID, message: data });
  }
  handleElNotification(message) {
    const { ID, nick, payload, conversationID } = message;
    const Notification = ElNotification({
      title: `${nick}提到了你`,
      message: payload.text,
      duration: 6000,
      // type: "info",
      onClick: () => {
        store.dispatch("addConversation", { convId: conversationID });
        scrollToDomPostion(ID);
        Notification.close();
      },
    });
  }
  /**
   * 群详情 @好友 @全体成员 系统通知tips
   */
  handleNotificationTip(data) {
    const { userID } = this.userProfile || {};
    const { atUserList } = data[0];
    const massage = getConversationList(data);
    if (!atUserList.length) return;
    // @全体成员
    let atAll = atUserList.includes("__kImSDK_MesssageAtALL__");
    if (atAll) this.notifyUser(data[0]);
    // 消息免打扰
    if (!massage || massage?.[0]?.messageRemindType === "AcceptNotNotify") return;
    // @自己
    let atSelf = atUserList.includes(userID);
    if (atSelf) this.notifyUser(data[0]);
  }
}

export const timProxy = new TIMProxy();

if (__LOCAL_MODE__) {
  window.TIMProxy.init();
}
