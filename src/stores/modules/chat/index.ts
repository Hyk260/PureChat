import { cloneDeep } from "lodash-es"
import { defineStore } from "pinia"
import { HISTORY_MESSAGE_COUNT, MULTIPLE_CHOICE_MAX, MIN_MESSAGES, INBOX_SESSION_ID } from "@purechat/const"
import { getModelType } from "@/ai/utils"
import { MessageModel } from "@/database/models/message"
import { timProxy } from "@/service/chat"
import { sendChatAssistantMessage } from "@/service/chatService"
import {
  clearHistoryMessage,
  deleteConversation,
  deleteMessage,
  getConversationProfile,
  getMessageList,
  getUnreadMsg,
  sendMessage,
  setMessageRead,
} from "@/service/im-sdk-api"
import { SetupStoreId } from "@/stores/enum"
import { addTimeDivider, checkTextNotEmpty, getBaseTime, scrollToMessage } from "@/utils/chat"
import { delay } from "@/utils/common"
import { ModelIDList } from "@/types/provider"
import { emitUpdateScroll } from "@/utils/mitt-bus"
import { localStg } from "@/utils/storage"

import { useGroupStore } from "../group"
import { useRobotStore } from "../robot"
import { useRouteStore } from "../route"
import { useTopicStore } from "../topic"
import { useAppStore } from "../app"

import type { ChatState } from "./type"
import type { ModelProviderKey } from "@/ai/types"
import type { DB_Message, DB_Session, TypeSchemaType, DraftData, ImagePayloadType } from "@/types"
import type { ModelIDValue } from "@/types/provider"

export const useChatStore = defineStore(SetupStoreId.Chat, {
  state: (): ChatState => ({
    sessionId: INBOX_SESSION_ID, // 当前会话id
    historyMessageList: new Map(), // 历史消息
    currentMessageList: [], // 当前消息列表(窗口聊天消息)
    currentConversation: null, // 跳转窗口的属性
    conversationList: [], // 会话列表数据
    searchConversationList: [], // 搜索后的会话列表
    totalUnreadMsg: 0, // 未读消息总数
    scrollTopID: "", // 滚动到的消息ID
    isMultiSelectMode: false, // 是否多选模式
    noMore: false, // 加载更多  false ? 显示loading : 没有更多
    isChatBoxVisible: false, // 聊天框是否显示
    isMentionModalVisible: false, // @成员弹窗
    isFullscreenInputActive: false, // 是否全屏输入框
    isChatSessionListCollapsed: false, // 聊天会话列表是否折叠
    replyMsgData: null, // 回复消息数据
    msgEdit: null, // 消息编辑
    recently: new Set(), // 最近使用表情包
    chatDraftMap: new Map(), // 会话草稿
    forwardData: new Map(), // 多选数据
    revokeMsgMap: new Map(), // 撤回消息重新编辑
    sendingMap: new Map(),
    selectedMessageMap: new Map(), // 多选消息
    selectedMessageIds: new Set(), // 选中的消息ID集合
  }),
  getters: {
    isSending(): boolean {
      if (this.isAssistant) {
        return this.sendingMap.has(this.toAccount)
      } else {
        return false
      }
    },
    isFwdDataMaxed(): boolean {
      return this.forwardData.size >= MULTIPLE_CHOICE_MAX
    },
    isShowNavigator(): boolean {
      return this.currentMessageList.length > MIN_MESSAGES && !this.isFullscreenInputActive && __LOCAL_MODE__
    },
    currentType(): TypeSchemaType | "" {
      return this.currentConversation?.type ?? ""
    },
    hasConversationList(): boolean {
      return this.conversationList?.length > 0
    },
    getNonBotList(): DB_Session[] {
      return this.conversationList.filter((t) => !/@RBT#/.test(t.conversationID))
    },
    getNonBotC2CList(): DB_Session[] {
      return this.conversationList.filter((t) => t.type === "C2C" && !/@RBT#/.test(t.conversationID))
    },
    currentSessionProvider(): ModelProviderKey {
      const provider = getModelType(this.toAccount)
      return provider
    },
    isAssistant(): boolean {
      return /@RBT#/.test(this.toAccount) && ModelIDList.includes(this.toAccount as ModelIDValue)
    },
    isMore(): boolean {
      return this.currentMessageList?.length < HISTORY_MESSAGE_COUNT
    },
    imgUrlList(): string[] {
      if (!this.currentMessageList.length) return []
      const filteredMessages = this.currentMessageList.filter(
        (item) => item.type === "TIMImageElem" && !item.isRevoked && !item.isDeleted
      )
      const reversedUrls = filteredMessages.reduce((urls: string[], data) => {
        const imagePayload = data.payload as ImagePayloadType
        const url = imagePayload?.imageInfoArray?.[0]?.url || ""
        urls.push(url)
        return urls
      }, [])
      return reversedUrls
    },
    currentSessionId(): string {
      return this.currentConversation?.conversationID || ""
    },
    toAccount(): string {
      const ID = this.currentConversation?.conversationID || ""
      return ID?.replace(/^(C2C|GROUP)/, "")
    },
    isGroupChat(): boolean {
      if (!this.currentConversation) return false
      return this.currentType === "GROUP"
    },
    isForwardDataEmpty(): boolean {
      return this.forwardData.size === 0
    },
    getForwardCount(): number {
      return this.forwardData.size
    },
    getSortedForwardData(): DB_Message[] {
      const chatData = Object.values(Object.fromEntries(this.forwardData))
      return chatData.sort((a, b) => a.clientTime - b.clientTime)
    },
    // 检查消息是否被选中
    isMessageSelected() {
      return (messageId: string) => this.selectedMessageIds.has(messageId)
    },
    totalUnreadCount(): number {
      if (!this.currentConversation) return 0
      const result = this.conversationList.reduce((count, data) => {
        if (this.currentConversation?.conversationID === data.conversationID) {
          return count
        }
        return count + (data.unreadCount || 0)
      }, 0)
      return result
    },
  },
  actions: {
    setChatSessionListCollapsed(bol: boolean) {
      this.isChatSessionListCollapsed = bol
    },
    toggleMultiSelectMode(bool: boolean) {
      this.isMultiSelectMode = bool
      if (!bool) {
        this.selectedMessageMap = new Map()
        this.setForwardData({ type: "clear" })
        this.clearSelectedMessageIds()
      }
    },
    setReplyMsgData(data: DB_Message | null) {
      this.replyMsgData = data
    },
    setMsgEdit(data: DB_Message | null) {
      this.msgEdit = data
    },
    setCurrentConversation(data: DB_Session) {
      this.currentConversation = data
    },
    updateCurrentConversation(data: Partial<DB_Session>) {
      if (!this.currentConversation) return
      Object.assign(this.currentConversation, data)
    },
    setConversationList(list: DB_Session[] = []) {
      this.conversationList = list
    },
    updateConversationList(data: Partial<DB_Session>) {
      const { conversationID, topicId } = data
      if (!conversationID) return

      const index = this.conversationList.findIndex((item) => item.conversationID === conversationID)

      if (index !== -1 && this.conversationList[index]) {
        Object.assign(this.conversationList[index], { topicId: topicId ?? "" })
      }
    },
    getHistoryMessageList(sessionId: string) {
      const history = this.historyMessageList.get(sessionId)
      if (history) {
        const topicStore = useTopicStore()
        if (topicStore?.topicId) {
          return history.filter((item) => item.topicId === topicStore.topicId)
        } else {
          return history
        }
      }
      return history
    },
    setHistoryMessageList(sessionId: string, message: DB_Message[] | []) {
      this.historyMessageList.set(sessionId, message)
    },
    setScrollTopID(id: string = "") {
      this.scrollTopID = id
    },
    setNoMore(bool: boolean) {
      this.noMore = bool
    },
    updateSendingState(sessionId: string, type: "delete" | "add") {
      if (!this.isAssistant) return
      if (type === "delete") {
        this.sendingMap.delete(sessionId)
      } else {
        this.sendingMap.set(sessionId, true)
      }
    },
    addAiPresetPromptWords(data: { sessionId: string; message: DB_Message }) {
      const { sessionId, message } = data
      const history = this.getHistoryMessageList(sessionId)
      if (this.currentConversation) {
        if (history?.length) {
          this.currentMessageList = [...history, message]
        } else {
          this.currentMessageList = [message]
        }
      }
      emitUpdateScroll()
    },
    updateSelectedConversation(payload: DB_Session) {
      const { conversationID: sessionId } = payload
      const oldSessionId = this.currentConversation?.conversationID
      if (sessionId === oldSessionId) return
      this.sessionId = sessionId
      this.currentConversation = payload
      this.toggleMultiSelectMode(false)
      useRouteStore().handleSessionClick(payload)
      if (payload) {
        const history = this.getHistoryMessageList(sessionId)
        this.currentMessageList = cloneDeep(history) ?? []
      } else {
        this.currentMessageList = []
      }
      this.setNoMore(this.isMore)
      this.isChatBoxVisible = sessionId !== "@TIM#SYSTEM"
      if (this.isAssistant) {
        useRobotStore().updateModelConfig()
      }
    },
    addMessage(payload: { conversationID: string; message: DB_Message[]; isDone: boolean }) {
      console.log("[chat] 添加消息 addMessage:", payload)
      const { conversationID, message, isDone } = payload || {}
      if (this.currentConversation) {
        // if (message.length) {
        //   this.currentMessageList = message
        // }
        this.currentMessageList = message
      } else {
        this.currentMessageList = []
      }
      if (message.length) {
        this.setHistoryMessageList(conversationID, message)
      }
      const isMore = this.isMore || isDone
      console.log("isDone:", isMore ? "没有更多" : "显示loading")
      this.setNoMore(isMore)
    },
    async deleteMessage(payload: { sessionId: string; messageIdArray: string[]; message: DB_Message[] }) {
      console.log("[chat] 删除消息 deleteMessage:", payload)
      const { sessionId, messageIdArray = [], message = [] } = payload || {}
      const { code } = await deleteMessage(message)
      if (code !== 0) {
        console.error("[chat] 删除消息失败")
        return
      }
      const history = this.getHistoryMessageList(sessionId)
      if (!history) {
        console.error("[chat] 删除消息失败，历史消息不存在")
        return
      }
      const newHistory = history.filter((t) => !t.isTimeDivider && !t.isDeleted && !messageIdArray.includes(t.ID))
      const newHistoryList = addTimeDivider(newHistory)
      this.currentMessageList = cloneDeep(newHistoryList)
      this.setHistoryMessageList(sessionId, newHistoryList)
    },
    loadMoreMessages(payload: { sessionId: string; messages: DB_Message[]; msgId: string }) {
      console.log("[chat] 加载更多消息 loadMoreMessages:", payload)
      const { sessionId, messages } = payload
      const history = this.getHistoryMessageList(sessionId) || []

      const historyIds = new Set(history.map((t) => t?.ID))
      const cleanedMessages = messages.filter((msg) => !historyIds.has(msg.ID))

      // console.log("原始消息数量:", messages.length, "清理后消息数量:", cleanedMessages.length)

      if (cleanedMessages.length === 0) {
        this.setNoMore(true)
        return
      }

      const appStore = useAppStore()
      let resultMessages: DB_Message[] = []
      const baseTime = getBaseTime(history, "last")
      if (appStore.timeline) {
        resultMessages = addTimeDivider(cleanedMessages.reverse(), baseTime, "last")
      } else {
        resultMessages = cleanedMessages
      }
      const newHistory = [...resultMessages, ...history]
      this.currentMessageList = newHistory
      this.setHistoryMessageList(sessionId, newHistory)
    },
    updateMessages(payload: { sessionId: string; message: DB_Message }) {
      console.log("[chat] 更新消息 updateMessages:", payload)
      const { sessionId, message } = payload
      if (!sessionId || !message?.ID) {
        console.warn("sessionId 或 ID 不存在")
        return
      }
      const oldMessageList = this.getHistoryMessageList(sessionId) || []
      if (__LOCAL_MODE__) {
        MessageModel.update(message.ID, message)
      }
      const newMessageList = oldMessageList.map((item) => {
        return item.ID === message.ID ? payload.message : item
      })
      const latest = !newMessageList.some((item) => item.ID === message.ID)
      if (latest) {
        const baseTime = getBaseTime(newMessageList, "last")
        const timeDividerResult = addTimeDivider([message], baseTime)
        newMessageList.push(...timeDividerResult)
      }
      if (this.currentConversation?.conversationID === sessionId) {
        this.currentMessageList = newMessageList
      }
      this.setHistoryMessageList(sessionId, newMessageList)
    },
    modifiedMessages(message: DB_Message) {
      console.log("[chat] 历史消息更新 modifiedMessages:", message)
      if (!message?.ID) {
        console.warn("ID 不存在")
        return
      }
      const sessionId = message.conversationID
      const oldMessageList = this.getHistoryMessageList(sessionId)
      if (!oldMessageList) {
        console.warn("oldMessageList 不存在")
        return
      }
      const newMessageList = oldMessageList.map((item) => {
        return item.ID === message.ID ? message : item
      })
      if (this.currentConversation?.conversationID === sessionId) {
        this.currentMessageList = newMessageList
      }
      this.setHistoryMessageList(sessionId, newMessageList)
    },
    async sendSessionMessage(data: { message: DB_Message; last?: boolean }) {
      const { message, last = true } = data
      const sessionId = message.conversationID || ""
      if (!sessionId) {
        console.error("sessionId is required")
        return
      }
      // 消息上屏 预加载
      this.updateMessages({ sessionId, message })
      emitUpdateScroll()
      const { code, message: result } = await sendMessage(message)
      if (code === 0) {
        this.sendMsgSuccessCallback({ sessionId, message: result, last })
      } else {
        console.log("发送失败", code, result)
      }
    },
    async sendMsgSuccessCallback(data: { sessionId: string; message: DB_Message; last: boolean }) {
      console.log("消息发送成功 sendMsgSuccessCallback", data)
      const { sessionId, message, last } = data
      this.updateMessages({ sessionId, message })
      emitUpdateScroll()
      if (last && ModelIDList.includes(message?.to as ModelIDValue)) {
        await delay(20)
        await sendChatAssistantMessage({
          chat: message,
          provider: getModelType(message.to),
          messages: this.currentMessageList ?? [message],
        })
      }
    },
    async updateMessageList(data: DB_Session) {
      if (!timProxy.isSDKReady) {
        console.warn("TIM SDK 未初始化")
        return
      }
      const { conversationID: sessionId } = data
      const { messageList, isCompleted: isDone } = await getMessageList({ conversationID: sessionId })
      const message = addTimeDivider(messageList)
      this.addMessage({ conversationID: sessionId, isDone, message })
      setMessageRead({ conversationID: data.conversationID })
      emitUpdateScroll()
    },
    async addConversation(action: { sessionId: string }) {
      const { sessionId } = action
      const { conversation: data } = await getConversationProfile({ sessionId })
      this.updateSelectedConversation(data)
      this.updateMessageList(data)
      scrollToMessage(`message_${sessionId}`)
      if (data?.type === "GROUP") {
        useGroupStore().handleGroupProfile(data)
        useGroupStore().handleGroupMemberList({ groupID: data.groupProfile?.groupID })
      }
      if (this.isAssistant) {
        useRobotStore().updateModelConfig()
      }
      emitUpdateScroll()
    },
    clearCurrentMessage() {
      this.isChatBoxVisible = false
      this.currentConversation = null
      this.currentMessageList = []
    },
    toggleMentionModal(flag: boolean) {
      if (this.isGroupChat) {
        this.isMentionModalVisible = flag
      } else {
        this.isMentionModalVisible = false
      }
    },
    setForwardData({ type, payload }: { type: string; payload?: DB_Message | null }) {
      switch (type) {
        case "set":
          if (payload) {
            this.forwardData.set(payload?.ID, payload)
          }
          break
        case "del":
          if (payload) {
            this.forwardData.delete(payload?.ID)
          }
          break
        case "clear":
          this.forwardData.clear()
          break
      }
    },
    setSelectedMessageId(messageId: string, selected = true) {
      if (selected) {
        this.selectedMessageIds.add(messageId)
      } else {
        this.selectedMessageIds.delete(messageId)
      }
    },
    clearSelectedMessageIds() {
      this.selectedMessageIds.clear()
    },
    toggleMessageSelection(item: DB_Message, forceChecked: boolean | null = null) {
      const isCurrentlySelected = this.selectedMessageIds.has(item.ID)
      const willBeSelected = forceChecked !== null ? forceChecked : !isCurrentlySelected

      this.setSelectedMessageId(item.ID, willBeSelected)

      if (willBeSelected) {
        this.setForwardData({ type: "set", payload: item })
      } else {
        this.setForwardData({ type: "del", payload: item })
      }
    },
    updateRevokeMsg({ data, type }: { data: DB_Message; type: string }) {
      if (type === "set") {
        this.revokeMsgMap.set(data.ID, data.payload)
      } else {
        this.revokeMsgMap.delete(data.ID)
      }
    },
    updateChatDraft(data: { ID: string; payload: DraftData }) {
      if (!data) return
      const { ID, payload } = data
      if (checkTextNotEmpty(payload)) {
        this.chatDraftMap.set(ID, payload)
      } else {
        this.chatDraftMap.delete(ID)
      }
    },
    updateTotalUnreadMsg() {
      this.totalUnreadMsg = getUnreadMsg()
    },
    async deleteSession(data: { sessionId: string }) {
      const { sessionId } = data
      if (!sessionId) {
        console.warn("sessionId is required")
        return
      }
      const { code } = await deleteConversation({ sessionId })
      if (code === 0) this.clearCurrentMessage()
    },
    async deleteHistoryMessage(id?: string) {
      const sessionId = id || this.currentSessionId
      if (!sessionId) return
      const { code } = await clearHistoryMessage(sessionId)
      if (code === 0) {
        this.currentMessageList = []
        this.setHistoryMessageList(sessionId, [])
      }
    },
    setRecently({ data = "", type }: { data: string; type: string }) {
      switch (type) {
        case "add": {
          this.recently.add(data)
          if (this.recently.size > 12) {
            const oldestElement = this.recently.values().next().value
            this.recently.delete(oldestElement)
          }
          localStg.set("Emoji-Recently", Array.from(this.recently))
          break
        }
        case "revert": {
          const recently = localStg.get("Emoji-Recently")
          if (recently) this.recently = new Set([...recently])
          break
        }
        case "clean":
          this.recently.clear()
          localStg.remove("Emoji-Recently")
          break
      }
    },
  },
  persist: {
    pick: [
      "sessionId",
      // "noMore",
      // "isChatSessionListCollapsed",
      // "isChatBoxVisible",
      // "currentConversation",
      // "currentMessageList",
      // "conversationList",
    ],
  },
})
