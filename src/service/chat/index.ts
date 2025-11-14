import { useWindowFocus } from "@vueuse/core"

import { C2CModelIDList } from "@shared/provider"
import { ElNotification } from "element-plus"
import { cloneDeep } from "lodash-es"

import chat from "@/service/chat/PureChatService"
import { setMessageRead } from "@/service/im-sdk-api"
import { useChatStore, useGroupStore, useUserStore } from "@/stores"
import { scrollToDomPosition } from "@/utils/chat"
import { emitUpdateScrollImmediate } from "@/utils/mitt-bus"

import { checkoutNetState, getConversationList, kickedOutReason } from "./utils"
import { GROUP_TIP_OPERATION_TYPE } from "@/database/schemas/message"

import type { DB_Message, DB_Session, GroupSystemNoticePayloadType, GroupTipOperationType } from "@/types"
import type { Profile } from "@/types/tencent-cloud-chat"

/**
 * 浏览器窗口焦点状态监听
 * 用于判断用户是否在当前页面，决定是否发送通知
 */
const isFocused = useWindowFocus()

/**
 * 检查是否为机器人会话
 */
const isRobotId = (data: DB_Message[]): boolean => {
  return C2CModelIDList.includes(data?.[0]?.conversationID ?? "")
}

export class TIMProxy {
  private userID: string = ""
  private readonly userSig: string = ""
  private userProfile: Profile | null = null
  private once: boolean = false
  isSDKReady: boolean = false

  constructor() {}

  private saveSelfToLocalStorage() {
    const stateData = {
      userID: this.userID,
      userSig: this.userSig,
      userProfile: this.userProfile,
    }

    window.localStg.set("timProxy", stateData)
  }

  init() {
    if (this.once) return
    this.once = true
    this.initListener()
  }

  initListener() {
    if (__LOCAL_MODE__) {
      chat.initialize()
    } else {
      this.registerCloudEvents()
    }

    this.registerCoreEvents()
  }

  private registerCoreEvents() {
    const events: Array<[string, (payload: any) => void]> = [
      ["sdkStateReady", this.onReadyStateUpdate.bind(this)],
      ["sdkStateNotReady", this.onReadyStateUpdate.bind(this)],
      ["onConversationListUpdated", this.onUpdateConversationList.bind(this)],
      ["onMessageModified", this.onMessageModified.bind(this)],
      ["onMessageReceived", this.onReceiveMessage.bind(this)],
    ]

    this.safeRegisterEvents(events)
  }

  private registerCloudEvents() {
    const events: Array<[string, (payload: any) => void]> = [
      ["onMessageRevoked", this.onMessageRevoked.bind(this)],
      ["onGroupListUpdated", this.onUpdateGroupList.bind(this)],
      ["kickedOut", this.onKickOut.bind(this)],
      ["error", this.onError.bind(this)],
      ["netStateChange", this.onNetStateChange.bind(this)],
      ["onTotalUnreadMessageCountUpdated", this.onTotalUnreadMessageCountUpdated.bind(this)],
    ]

    this.safeRegisterEvents(events)
  }

  private safeRegisterEvents(events: Array<[string, (payload: any) => void]>): void {
    try {
      events.forEach(([eventName, handler]) => {
        chat.on(eventName, handler)
      })
    } catch (err) {
      console.error("[timProxy] 注册事件失败:", err)
    }
  }

  /**
   * 处理 SDK 就绪状态更新
   */
  private onReadyStateUpdate({ name }: { name: string }) {
    console.log("[chat] SDK 状态更新:", name)
    this.isSDKReady = name === "sdkStateReady"
    if (!this.isSDKReady) {
      console.warn(`[chat] SDK 未就绪，等待就绪状态 ${name}`)
      return
    }
    // SDK 就绪后获取用户信息
    this.fetchUserProfile()
  }

  /**
   * 获取并更新用户信息
   */
  private async fetchUserProfile() {
    try {
      const { code, data } = await chat.getMyProfile()

      if (code !== 0) {
        window.$message?.error(`获取用户信息失败: ${code}`)
        return
      }

      this.userProfile = data
      this.userID = chat.getLoginUser()

      // 同步到本地存储和全局状态
      this.saveSelfToLocalStorage()
      useUserStore().setCurrentProfile(data)

      console.log("[chat] 用户信息获取成功:", this.userProfile)
    } catch (error) {
      console.error("[chat] 获取用户信息失败:", error)
      window.$message?.error("获取用户信息失败")
    }
  }

  /**
   * 处理未读消息总数更新
   */
  private onTotalUnreadMessageCountUpdated({ data }) {
    console.log("[chat] 未读消息总数更新:", data)
  }

  /**
   * 处理会话列表更新
   */
  private onUpdateConversationList({ data }: { data: DB_Session[] }) {
    console.log("[chat] 会话列表更新:", data)

    const chatStore = useChatStore()
    const currentSessionId = chatStore.currentSessionId

    // 更新会话列表
    chatStore.setConversationList(data)

    // 更新当前会话信息
    const currentConversation = data.find((t) => t.conversationID === currentSessionId)
    if (currentConversation) {
      chatStore.setCurrentConversation(cloneDeep(currentConversation))

      this.reportedMessageRead({
        conversationID: currentConversation.conversationID,
        unreadCount: currentConversation.unreadCount ?? 0,
      })
    }

    // 更新未读消息总数
    chatStore.updateTotalUnreadMsg()
  }

  /**
   * 处理接收到的新消息
   */
  private onReceiveMessage({ data }: { data: DB_Message[] }) {
    console.log("[chat] 收到新消息:", data)
    if (!data?.length) return
    const message = data[0]
    const isCurrentConversation = useChatStore().currentSessionId === message?.conversationID
    // 处理不同类型的消息
    this.processMessageByType(data)
    // 更新消息列表
    this.handleUpdateMessage(data, isCurrentConversation)
  }

  /**
   * 根据消息类型进行处理
   */
  private processMessageByType(data: DB_Message[]) {
    const message = data[0]

    switch (message?.type) {
      case "TIMGroupTipElem":
        this.handleQuitGroupTip(data)
        break
      case "TIMGroupSystemNoticeElem":
        this.handleGroupSystemNoticeTip(data)
        break
      default:
        // 处理普通消息的通知
        this.handleNotificationTip(data)
        break
    }
  }

  /**
   * 处理消息撤回事件
   */
  private onMessageRevoked({ data }: { data: DB_Message[] }) {
    console.log("[chat] 撤回消息:", data)

    if (!data?.length) return

    useChatStore().updateMessages({
      sessionId: data[0]?.conversationID ?? "",
      message: cloneDeep(data[0]) as DB_Message,
    })
  }

  /**
   * 处理群组列表更新
   */
  private onUpdateGroupList({ data }) {
    console.log("[chat] 群组列表更新:", data)
  }

  /**
   * 处理被踢出事件
   */
  private onKickOut({ data }: { data: { type: string } }) {
    console.log("[chat] 用户被踢出:", data)

    const reason = kickedOutReason(data.type)
    window.$message?.error(`${reason}被踢出，请重新登录。`)

    useUserStore().handleUserLogout()
  }

  /**
   * 处理 SDK 错误事件
   */
  private onError({ data }: { data: { message: string } }) {
    console.log("[chat] SDK 错误:", data)
    if (data.message !== "Network Error") {
      window.$message?.error(data?.message || "发生未知错误")
    }
  }

  /**
   * 处理消息修改事件
   */
  private onMessageModified({ data }: { data: DB_Message[] }) {
    console.log("[chat] 消息修改:", data)

    if (!data?.length) return

    const messages = cloneDeep(data[0])

    if (messages) useChatStore().modifiedMessages(messages)
  }

  /**
   * 处理网络状态变化
   */
  private onNetStateChange({ data }: { data: { state: string } }) {
    console.log("[chat] 网络状态变化:", data)
    window.$message?.(checkoutNetState(data.state))
  }

  /**
   * 处理好友申请列表更新
   */
  private onFriendApplicationListUpdated({ data }) {
    console.log("[chat] 好友申请列表更新:", data)
  }
  private onFriendGroupListUpdated({ data }) {
    console.log(data)
  }
  private onUserStatusUpdated({ data }) {
    console.log(data)
  }

  /**
   * 发送系统通知给用户
   * 支持浏览器原生通知和 Element Plus 通知两种方式
   * https://developer.mozilla.org/zh-CN/docs/Web/API/notification
   */
  private async notifyUser(message: DB_Message) {
    const permission = Notification.permission
    console.log("[chat] 通知权限状态:", permission)

    // 检查浏览器支持
    if (!("Notification" in window)) {
      console.log("[chat] 浏览器不支持原生通知，使用 Element 通知")
      this.handleElNotification(message)
      return
    }

    // 根据权限状态处理
    switch (permission) {
      // 接受显示通知
      case "granted":
        this.handleNotify(message)
        break
      // 拒绝显示通知
      case "denied":
        this.handleElNotification(message)
        break
      default:
        // 请求通知权限
        try {
          const newPermission = await Notification.requestPermission()
          if (newPermission === "granted") {
            this.handleNotify(message)
          } else {
            this.handleElNotification(message)
          }
        } catch (error) {
          console.error("[chat] 请求通知权限失败:", error)
          this.handleElNotification(message)
        }
        break
    }
  }

  /**
   * 处理浏览器原生通知
   */
  private handleNotify(message: DB_Message) {
    console.log("[chat] 发送原生通知", message)
    const { ID, payload, avatar, conversationID } = message
    const title = "有人提到了你"
    const icon = avatar || `${import.meta.env.VITE_CLOUD_BASE_URL}log.png`
    const notification = new window.Notification(title, {
      icon: icon,
      body: payload?.text || "",
      tag: conversationID, // 防止重复通知
    })
    notification.onclick = () => {
      this.handleNotificationClick(conversationID, ID)
      notification.close()
    }
    // 自动关闭通知
    setTimeout(() => {
      notification.close()
    }, 5000)
  }

  /**
   * 处理群组提示消息
   * 当有群成员变动时更新群成员列表
   * 收到有群成员/退群/被踢出/入群/的tip时,更新群成员列表
   */
  private handleQuitGroupTip(data: DB_Message[]) {
    const message = data[0]
    if (message?.type !== "TIMGroupTipElem") return
    console.log("[chat] 处理群组提示", data)

    const currentSessionId = useChatStore().currentSessionId
    if (currentSessionId !== data[0]?.conversationID) return

    const { operationType } = message.payload as GroupSystemNoticePayloadType
    const memberOperationTypes = Object.values(GROUP_TIP_OPERATION_TYPE)

    // 检查是否为群成员相关操作
    if (memberOperationTypes.includes(operationType as GroupTipOperationType)) {
      console.log("[chat] 群成员变动，更新成员列表")
      useGroupStore().handleGroupMemberList({ groupID: currentSessionId })
    }
  }

  /**
   * 处理群系统通知
   * 处理被踢出群组或群组解散的通知
   * https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.GroupSystemNoticePayload
   */
  private handleGroupSystemNoticeTip(data: DB_Message[]) {
    const message = data[0]
    if (message?.type !== "TIMGroupSystemNoticeElem") return

    console.log("[chat] 处理群系统通知:", data)

    const { operationType } = message.payload as GroupSystemNoticePayloadType

    // 处理被踢出或群解散的情况
    if ([4, 5].includes(operationType)) {
      const currentSessionId = useChatStore().currentSessionId
      console.log("[chat] 群组被解散或被踢出，删除会话")
      useChatStore().deleteSession({ sessionId: currentSessionId })
    }
  }

  /**
   * 更新消息列表
   */
  private handleUpdateMessage(data: DB_Message[], shouldMarkRead = true) {
    const chatStore = useChatStore()

    if (!chatStore.currentSessionId) return
    if (isRobotId(data)) return

    const message = data[0] as DB_Message

    chatStore.updateMessages({
      sessionId: message?.conversationID,
      message: cloneDeep(message),
    })

    if (shouldMarkRead) {
      this.reportedMessageRead({
        conversationID: message?.conversationID ?? "",
        unreadCount: 1,
      })
    }

    emitUpdateScrollImmediate("bottom")
  }

  /**
   * 上报消息已读状态
   * 只在窗口获得焦点时上报已读
   */
  private reportedMessageRead(data: { unreadCount?: number; conversationID: string }) {
    if (isFocused.value) {
      setMessageRead(data)
    }
  }

  /**
   * 处理通知点击事件
   */
  private handleNotificationClick(conversationID: string, messageID: string) {
    // 切换到对应会话
    useChatStore().addConversation({ sessionId: conversationID })

    // 聚焦窗口
    window.focus()

    // 滚动到指定消息位置
    setTimeout(() => {
      scrollToDomPosition(messageID)
    }, 1000)
  }

  /**
   * 处理 Element Plus 通知
   */
  private handleElNotification(message: DB_Message) {
    const { ID, nick, payload, conversationID } = message

    const Notification = ElNotification({
      title: `${nick}提到了你`,
      message: payload?.text || "",
      duration: 6000,
      // type: "info",
      onClick: () => {
        this.handleNotificationClick(conversationID, ID)
        Notification.close()
      },
    })
  }

  /**
   * 处理 @ 提及通知
   * 检查消息中是否包含对当前用户的 @ 提及
   */
  private handleNotificationTip(data: DB_Message[]) {
    const message = data[0] as DB_Message
    const { atUserList = [] } = message

    if (!atUserList.length) return

    const { userID } = this.userProfile || {}
    if (!userID) return

    // 检查消息免打扰设置
    const conversation = getConversationList(data)
    if (conversation?.[0]?.messageRemindType === "AcceptNotNotify") {
      console.log("[chat] 消息免打扰，跳过通知")
      return
    }

    // 检查是否 @ 全体成员
    const isAtAll = atUserList.includes("__kImSDK_MesssageAtALL__")
    if (isAtAll) {
      console.log("[chat] @ 全体成员，发送通知")
      this.notifyUser(message)
      return
    }

    // 检查是否 @ 当前用户
    const isAtSelf = atUserList.includes(userID)
    if (isAtSelf) {
      console.log("[chat] @ 当前用户，发送通知")
      this.notifyUser(message)
    }
  }
}

export const timProxy = new TIMProxy()
