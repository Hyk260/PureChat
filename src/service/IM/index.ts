import emitter from "@/utils/mitt-bus";
import chat from "@/service/IM/im-sdk/tim";
import { C2CModelIDList } from '@shared/provider/config';
import { scrollToDomPosition } from "@/utils/chat/index";
import { setMessageRead } from "@/service/im-sdk-api/index";
import { localStg } from "@/utils/storage";
import { useWindowFocus } from "@vueuse/core";
import { ElNotification } from "element-plus";
import { cloneDeep } from "lodash-es";
import { useAppStore, useUserStore, useGroupStore, useChatStore } from "@/stores/index";
import {
  fnCheckoutNetState,
  getConversationList,
  kickedOutReason,
} from "./utils/index";

/**
 * 浏览器窗口焦点状态监听
 * 用于判断用户是否在当前页面，决定是否发送通知
 */
const isFocused = useWindowFocus();

/**
 * 检查是否为机器人会话
 * @param {Array} data - 消息数据数组
 * @returns {boolean} 是否为机器人会话
 */
function isRobotId(data) {
  return C2CModelIDList.includes(data?.[0].conversationID);
}

export class TIMProxy {
  constructor() {
    /**
     * 当前登录用户ID
     * @type {string}
     */
    this.userID = "";

    /**
     * 用户签名，用于 IM SDK 登录验证
     * @type {string}
     */
    this.userSig = "";

    /**
     * IM 用户详细信息
     * @type {Object}
     */
    this.userProfile = {};

    /**
     * 防止重复初始化标识
     * @type {boolean}
     * @private
     */
    this.once = false;

    /**
     * SDK 就绪状态
     * @type {boolean}
     */
    this.isSDKReady = false;

    /**
     * 群组操作类型映射
     * @type {Object}
     * @private
     */
    this.GROUP_TIP_TYPES = {
      MEMBER_JOIN: 1,        // 有成员加群
      MEMBER_QUIT: 2,        // 有群成员退群
      MEMBER_KICKED_OUT: 3,  // 有群成员被踢出群
      MEMBER_SET_ADMIN: 4,   // 有群成员被设为管理员
      MEMBER_CANCELED_ADMIN: 5 // 有群成员被撤销管理员
    };

    /**
     * 群系统通知类型映射
     * @type {Object}
     * @private
     */
    this.GROUP_SYSTEM_NOTICE_TYPES = {
      KICKED_OUT: 4,    // 被踢出群组
      GROUP_DISMISSED: 5 // 群组被解散
    };
  }

  /**
   * 保存当前实例状态到本地存储
   * 用于页面刷新后恢复状态
   * @private
   */
  saveSelfToLocalStorage() {
    const stateData = {
      userID: this.userID,
      userSig: this.userSig,
      userProfile: this.userProfile,
    };

    localStg.set("timProxy", stateData);
  }

  /**
   * 从本地存储加载实例状态
   * 用于页面刷新后恢复状态
   * @private
   */
  loadSelfFromLocalStorage() {
    const stateData = localStg.get("timProxy");
    if (!stateData) return;

    Object.assign(this, stateData);
  }

  /**
   * 初始化 TIM 代理
   * 设置事件监听器，开始监听 IM SDK 事件
   * 
   * @public
   * @example
   */
  init() {
    console.log("[chat] TIMProxy 开始初始化");

    if (this.once) {
      console.log("[chat] TIMProxy 已初始化，跳过重复初始化");
      return;
    }

    this.once = true;
    this.loadSelfFromLocalStorage();
    this.initListener();

    console.log("[chat] TIMProxy 初始化完成");
  }

  /**
   * 初始化事件监听器
   * 根据运行模式（本地/云端）注册不同的事件监听器
   * @private
   */
  initListener() {
    // 本地模式需要手动初始化
    if (__LOCAL_MODE__) {
      chat.initialize();
    }

    // 核心事件监听（本地模式和云端模式都需要）
    this.registerCoreEvents();

    // 云端模式特有事件监听
    if (!__LOCAL_MODE__) {
      this.registerCloudEvents();
    }

    console.log(`[chat] 事件监听器注册完成 (模式: ${__LOCAL_MODE__ ? '本地' : '云端'})`);
  }

  /**
   * 注册核心事件监听器
   * @private
   */
  registerCoreEvents() {
    const coreEvents = [
      { event: "sdkStateReady", handler: this.onReadyStateUpdate },
      { event: "sdkStateNotReady", handler: this.onReadyStateUpdate },
      { event: "onConversationListUpdated", handler: this.onUpdateConversationList },
      { event: "onMessageModified", handler: this.onMessageModified },
      { event: "onMessageReceived", handler: this.onReceiveMessage }
    ];

    coreEvents.forEach(({ event, handler }) => {
      chat.on(event, handler, this);
    });
  }

  /**
   * 注册云端模式特有事件监听器
   * @private
   */
  registerCloudEvents() {
    const cloudEvents = [
      { event: "onMessageRevoked", handler: this.onMessageRevoked },
      { event: "onGroupListUpdated", handler: this.onUpdateGroupList },
      { event: "kickedOut", handler: this.onKickOut },
      { event: "error", handler: this.onError },
      { event: "netStateChange", handler: this.onNetStateChange },
      { event: "onTotalUnreadMessageCountUpdated", handler: this.onTotalUnreadMessageCountUpdated },
      // { event: "onFriendApplicationListUpdated", handler: this.onFriendApplicationListUpdated }
      // { event: "onFriendGroupListUpdated", handler: this.onFriendGroupListUpdated }
      // { event: "onUserStatusUpdated", handler: this.onUserStatusUpdated }
    ];

    cloudEvents.forEach(({ event, handler }) => {
      chat.on(event, handler, this);
    });
  }

  /**
   * 处理 SDK 就绪状态更新
   * SDK 就绪后获取用户信息并更新状态
   * 
   * @param {Object} params - 事件参数
   * @param {string} params.name - 状态名称
   */
  onReadyStateUpdate({ name }) {
    console.log("[chat] SDK 状态更新:", name);
    this.isSDKReady = name === "sdkStateReady";
    if (!this.isSDKReady) {
      console.log("[chat] SDK 未就绪，等待就绪状态");
      return;
    }
    // SDK 就绪后获取用户信息
    this.fetchUserProfile();
  }


  /**
   * 获取并更新用户信息
   * @private
   */
  async fetchUserProfile() {
    try {
      const { code, data } = await chat.getMyProfile();

      if (code !== 0) {
        useAppStore().showMessage({
          message: `获取用户信息失败: ${data}`,
          type: "error"
        });
        return;
      }

      this.userProfile = data;
      this.userID = chat.getLoginUser();

      // 同步到本地存储和全局状态
      this.saveSelfToLocalStorage();
      useUserStore().setCurrentProfile(data);

      console.log("[chat] 用户信息获取成功:", this.userProfile);

    } catch (error) {
      console.error("[chat] 获取用户信息失败:", error);
      useAppStore().showMessage({
        message: "获取用户信息失败",
        type: "error"
      });
    }
  }

  /**
   * 处理未读消息总数更新
   * @param {Object} params - 事件参数
   * @param {*} params.data - 未读消息数据
   */
  onTotalUnreadMessageCountUpdated({ data }) {
    console.log("[chat] 未读消息总数更新:", data);
  }

  /**
   * 处理会话列表更新
   * 更新当前会话信息并标记消息为已读
   * 
   * @param {Object} params - 事件参数
   * @param {Array} params.data - 会话列表数据
   */
  onUpdateConversationList({ data }) {
    console.log("[chat] 会话列表更新:", data);

    const chatStore = useChatStore();
    const currentSessionId = chatStore.currentSessionId;

    // 更新会话列表
    chatStore.setConversationList(data);

    // 更新当前会话信息
    const currentConversation = data.find(conv => conv.conversationID === currentSessionId);
    if (currentConversation) {
      chatStore.setCurrentConversation(cloneDeep(currentConversation));
      this.reportedMessageRead(currentConversation);
    }

    // 更新未读消息总数
    chatStore.updateTotalUnreadMsg();
  }

  /**
   * 处理接收到的新消息
   * 根据消息类型进行不同的处理逻辑
   * 
   * @param {Object} params - 事件参数
   * @param {Array} params.data - 消息数据数组
   */
  onReceiveMessage({ data }) {
    console.log("[chat] 收到新消息:", data);
    if (!data || !data.length) return;
    const message = data[0];
    const isCurrentConversation = useChatStore().currentSessionId === message.conversationID;
    // this.handleQuitGroupTip(data);
    // this.handleNotificationTip(data);
    // this.handleGroupSystemNoticeTip(data);
    // 处理不同类型的消息
    this.processMessageByType(data);
    // 更新消息列表
    this.handleUpdateMessage(data, isCurrentConversation);
  }

  /**
   * 根据消息类型进行处理
   * @param {Array} data - 消息数据数组
   * @private
   */
  processMessageByType(data) {
    const message = data[0];

    switch (message.type) {
      case "TIMGroupTipElem":
        this.handleQuitGroupTip(data);
        break;
      case "TIMGroupSystemNoticeElem":
        this.handleGroupSystemNoticeTip(data);
        break;
      default:
        // 处理普通消息的通知
        this.handleNotificationTip(data);
        break;
    }
  }

  /**
   * 处理消息撤回事件
   * @param {Object} params - 事件参数
   * @param {Array} params.data - 撤回消息数据
   */
  onMessageRevoked({ data }) {
    console.log("[chat] 撤回消息:", data);

    if (!data || !data.length) return;

    useChatStore().updateMessages({
      sessionId: data[0].conversationID,
      message: cloneDeep(data[0]),
    });
  }

  /**
   * 处理群组列表更新
   * @param {Object} params - 事件参数
   * @param {Array} params.data - 群组列表数据
   */
  onUpdateGroupList({ data }) {
    console.log("[chat] 群组列表更新:", data);
  }

  /**
   * 处理被踢出事件
   * @param {Object} params - 事件参数
   * @param {Object} params.data - 被踢出数据
   */
  onKickOut({ data }) {
    console.log("[chat] 用户被踢出:", data);

    const reason = kickedOutReason(data.type);
    useAppStore().showMessage({
      message: `${reason}被踢出，请重新登录。`,
      type: "error",
    });

    useUserStore().handleUserLogout();
  }

  /**
   * 处理 SDK 错误事件
   * @param {Object} params - 事件参数
   * @param {Object} params.data - 错误数据
   */
  onError({ data }) {
    console.log("[chat] SDK 错误:", data);
    if (data.message !== "Network Error") {
      useAppStore().showMessage({ message: data.message, type: "error" });
    }
  }

  /**
   * 处理消息修改事件
   * @param {Object} params - 事件参数
   * @param {Array} params.data - 修改的消息数据
   */
  onMessageModified({ data }) {
    console.log("[chat] 消息修改:", data);

    if (!data || !data.length) return;

    useChatStore().modifiedMessages(cloneDeep(data[0]));
  }

  /**
   * 处理网络状态变化
   * @param {Object} params - 事件参数
   * @param {Object} params.data - 网络状态数据
   */
  onNetStateChange({ data }) {
    console.log("[chat] 网络状态变化:", data);
    useAppStore().showMessage(fnCheckoutNetState(data.state));
  }

  /**
   * 处理好友申请列表更新
   * @param {Object} params - 事件参数
   * @param {Array} params.data - 好友申请数据
   */
  onFriendApplicationListUpdated({ data }) {
    console.log("[chat] 好友申请列表更新:", data);
  }
  onFriendGroupListUpdated({ data }) {
    console.log(data);
  }
  onUserStatusUpdated({ data }) {
    console.log(data);
  }

  /**
   * 发送系统通知给用户
   * 支持浏览器原生通知和 Element Plus 通知两种方式
   * https://developer.mozilla.org/zh-CN/docs/Web/API/notification
   * 
   * @param {Object} message - 消息对象
   * @param {string} message.ID - 消息ID
   * @param {string} message.nick - 发送者昵称
   * @param {Object} message.payload - 消息内容
   * @param {string} message.conversationID - 会话ID
   * @param {string} message.avatar - 发送者头像
   */
  async notifyUser(message) {
    const permission = Notification.permission;
    console.log("[chat] 通知权限状态:", permission);

    // 检查浏览器支持
    if (!("Notification" in window)) {
      console.log("[chat] 浏览器不支持原生通知，使用 Element 通知");
      this.handleElNotification(message);
      return;
    }

    // 根据权限状态处理
    switch (permission) {
      // 接受显示通知
      case "granted":
        this.handleNotify(message);
        break;
        // 拒绝显示通知
      case "denied":
        this.handleElNotification(message);
        break;
      default:
        // 请求通知权限
        try {
          const newPermission = await Notification.requestPermission();
          if (newPermission === "granted") {
            this.handleNotify(message);
          } else {
            this.handleElNotification(message);
          }
        } catch (error) {
          console.error("[chat] 请求通知权限失败:", error);
          this.handleElNotification(message);
        }
        break;
    }
  }

  /**
   * 处理浏览器原生通知
   * @param {Object} message - 消息对象
   * @private
   */
  handleNotify(message) {
    console.log("[chat] 发送原生通知", message);
    const { ID, payload, avatar, conversationID } = message;
    const title = "有人提到了你";
    const icon = avatar || `${import.meta.env.VITE_CLOUD_BASE_URL}log.png`;
    const notification = new window.Notification(title, {
      icon: icon,
      body: payload.text,
      tag: conversationID, // 防止重复通知
    });
    notification.onclick = () => {
      this.handleNotificationClick(conversationID, ID);
      notification.close();
    };
    // 自动关闭通知
    setTimeout(() => {
      notification.close();
    }, 5000);
  }

  /**
   * 处理群组提示消息
   * 当有群成员变动时更新群成员列表
   * 收到有群成员/退群/被踢出/入群/的tip时,更新群成员列表
   * 
   * @param {Array} data - 消息数据数组
   * @private
   */
  handleQuitGroupTip(data) {
    const message = data[0];
    if (message.type !== "TIMGroupTipElem") return;
    console.log("[chat] 处理群组提示", data);

    const currentSessionId = useChatStore().currentSessionId;
    if (currentSessionId !== data[0]?.conversationID) return;

    const { operationType } = message.payload;
    const memberOperationTypes = Object.values(this.GROUP_TIP_TYPES);

    // 检查是否为群成员相关操作
    if (memberOperationTypes.includes(operationType)) {
      console.log("[chat] 群成员变动，更新成员列表");
      useGroupStore().handleGroupMemberList({ groupID: currentSessionId });
    }
  }

  /**
   * 处理群系统通知
   * 处理被踢出群组或群组解散的通知
   * https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.GroupSystemNoticePayload

   * @param {Array} data - 消息数据数组
   * @private
   */
  handleGroupSystemNoticeTip(data) {
    const message = data[0];
    if (message?.type !== "TIMGroupSystemNoticeElem") return;

    console.log("[chat] 处理群系统通知:", data);

    const { operationType } = message.payload;
    const { KICKED_OUT, GROUP_DISMISSED } = this.GROUP_SYSTEM_NOTICE_TYPES;

    // 处理被踢出或群解散的情况
    if ([KICKED_OUT, GROUP_DISMISSED].includes(operationType)) {
      const currentSessionId = useChatStore().currentSessionId;
      console.log("[chat] 群组被解散或被踢出，删除会话");
      useChatStore().deleteSession({ sessionId: currentSessionId });
    }
  }

  /**
   * 更新消息列表
   * @param {Array} data - 消息数据数组
   * @param {boolean} shouldMarkRead - 是否标记为已读
   * @private
   */
  handleUpdateMessage(data, shouldMarkRead = true) {
    const chatStore = useChatStore();

    if (!chatStore.currentSessionId) return;
    if (isRobotId(data)) return;

    const message = data[0];

    chatStore.updateMessages({
      sessionId: message.conversationID,
      message: cloneDeep(message),
    });

    if (shouldMarkRead) {
      this.reportedMessageRead(data);
    }

    emitter.emit("updateScroll", "bottom");
  }

  /**
   * 上报消息已读状态
   * 只在窗口获得焦点时上报已读
   * 
   * @param {Array|Object} data - 消息数据
   * @private
   */
  reportedMessageRead(data) {
    if (isFocused.value) {
      setMessageRead(data);
    }
  }


  /**
   * 处理通知点击事件
   * @param {string} conversationID - 会话ID
   * @param {string} messageID - 消息ID
   * @private
   */
  handleNotificationClick(conversationID, messageID) {
    // 切换到对应会话
    useChatStore().addConversation({ sessionId: conversationID });

    // 聚焦窗口
    window.focus();

    // 滚动到指定消息位置
    setTimeout(() => {
      scrollToDomPosition(messageID);
    }, 1000);
  }

  /**
   * 处理 Element Plus 通知
   * @param {Object} message - 消息对象
   * @private
   */
  handleElNotification(message) {
    const { ID, nick, payload, conversationID } = message;

    const Notification = ElNotification({
      title: `${nick}提到了你`,
      message: payload.text,
      duration: 6000,
      // type: "info",
      onClick: () => {
        this.handleNotificationClick(conversationID, ID);
        Notification.close();
      },
    });
  }

  /**
   * 处理 @ 提及通知
   * 检查消息中是否包含对当前用户的 @ 提及
   * 
   * @param {Array} data - 消息数据数组
   * @private
   */
  handleNotificationTip(data) {
    const message = data[0];
    const { atUserList = [] } = message;

    if (!atUserList.length) return;

    const { userID } = this.userProfile || {};
    if (!userID) return;

    // 检查消息免打扰设置
    const conversation = getConversationList(data);
    if (conversation?.[0]?.messageRemindType === "AcceptNotNotify") {
      console.log("[chat] 消息免打扰，跳过通知");
      return;
    }

    // 检查是否 @ 全体成员
    let isAtAll = atUserList.includes("__kImSDK_MesssageAtALL__");
    if (isAtAll) {
      console.log("[chat] @ 全体成员，发送通知");
      this.notifyUser(message);
      return
    }

    // 检查是否 @ 当前用户
    let isAtSelf = atUserList.includes(userID);
    if (isAtSelf) {
      console.log("[chat] @ 当前用户，发送通知");
      this.notifyUser(message);
    }
  }
}

export const timProxy = new TIMProxy();
