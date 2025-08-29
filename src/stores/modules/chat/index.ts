import { ModelIDList } from "@shared/provider"
import { cloneDeep } from "lodash-es"
import { defineStore } from "pinia"

import { chatService } from "@/ai"
import { getModelId } from "@/ai/utils"
import { getAiAvatarUrl, getModelType } from "@/ai/utils"
import { generateReferencePrompt } from "@/config/prompts"
import { HISTORY_MESSAGE_COUNT, MULTIPLE_CHOICE_MAX } from "@/constants"
import { MessageModel } from "@/database/models/message"
import { timProxy } from "@/service/IM"
import {
  clearHistoryMessage,
  createTextMessage,
  deleteConversation,
  deleteMessage,
  getConversationProfile,
  getMessageList,
  getUnreadMsg,
  sendMessage,
  setMessageRead,
} from "@/service/im-sdk-api"
import { SetupStoreId } from "@/stores/enum"
import { getCloudCustomData } from "@/utils/chat"
import { addTimeDivider, checkTextNotEmpty, getBaseTime, scrollToMessage } from "@/utils/chat"
import emitter from "@/utils/mitt-bus"
import { localStg } from "@/utils/storage"

import { useGroupStore } from "../group"
import { useRobotStore } from "../robot"
import { useUserStore } from "../user"

import type { ChatState } from "./type"
import type { ModelProviderKey } from "@/ai/types"
import type { DB_Message } from "@/database/schemas/message"
import type { DB_Session } from "@/database/schemas/session"
import type { ModelIDValue } from "@shared/provider"

export const useChatStore = defineStore(SetupStoreId.Chat, {
  state: (): ChatState => ({
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], // 会话列表数据
    searchConversationList: [], // 搜索后的会话列表
    filterConversationList: [], // 过滤后的会话列表
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
    currentType(): DB_Session["type"] | "" {
      return this.currentConversation?.type ?? ""
    },
    getNonBotList(): DB_Session[] {
      return this.conversationList.filter((t) => !/@RBT#/.test(t.conversationID))
    },
    getNonBotC2CList(): DB_Session[] {
      return this.conversationList.filter((t) => t.type === "C2C" && !/@RBT#/.test(t.conversationID))
    },
    currentSessionProvider(): ModelProviderKey | "" {
      const provider = getModelType(this.toAccount)
      return provider
    },
    isAssistant(): boolean {
      return /@RBT#/.test(this.toAccount)
    },
    isMore(): boolean {
      return this.currentMessageList?.length < HISTORY_MESSAGE_COUNT
    },
    imgUrlList(): string[] {
      if (!this.currentMessageList.length) return []
      const filteredMessages = this.currentMessageList.filter(
        (item) => item.type === "TIMImageElem" && !item.isRevoked && !item.isDeleted
      )
      const reversedUrls = filteredMessages.reduce((urls, data) => {
        const url = data.payload.imageInfoArray[0].url
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
    getSortedForwardData() {
      const chatData = Object.values(Object.fromEntries(this.forwardData))
      return chatData.sort((a, b) => a.clientTime - b.clientTime)
    },
    // 检查消息是否被选中
    isMessageSelected() {
      return (messageId: string) => this.selectedMessageIds.has(messageId)
    },
    totalUnreadCount(): number {
      if (!this.currentConversation) return 0
      const result = this.conversationList.reduce((count: number, data: DB_Session) => {
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
    setConversationList(list: DB_Session[] = []) {
      this.conversationList = list
    },
    setScrollTopID(id: string = "") {
      this.scrollTopID = id
    },
    setNoMore(bool: boolean) {
      this.noMore = bool
    },
    updateSendingState(sessionId: string, type: string) {
      // set delete
      if (!this.isAssistant) return
      if (type === "delete") {
        this.sendingMap.delete(sessionId)
      } else {
        this.sendingMap.set(sessionId, true)
      }
    },
    async createAiPromptMsg() {
      const to = useUserStore()?.userProfile?.userID
      const defaultBot = useRobotStore().defaultProvider
      const from = getModelId(defaultBot)
      const meta = useRobotStore().promptStore[defaultBot]?.[0]?.meta
      const text = `你好，我是 ${meta.avatar} ${meta.title} ${meta.description} 让我们开始对话吧！`
      const msg = await createTextMessage({ to: from, text, cache: false })
      const promptContent = getCloudCustomData(
        { key: "messagePrompt", payload: { text: "预设提示词" } },
        { recQuestion: meta.recQuestion || [] }
      )
      msg.conversationID = `C2C${from}`
      msg.avatar = getAiAvatarUrl(from)
      msg.cloudCustomData = promptContent
      msg.flow = "in"
      msg.to = to
      msg.from = from
      msg.nick = ""
      msg.status = "success"
      return { sessionId: `C2C${msg.from}`, message: msg }
    },
    async addAiPresetPromptWords() {
      const { sessionId, message } = await this.createAiPromptMsg()
      const history = this.historyMessageList.get(sessionId)
      if (this.currentConversation && this.currentMessageList) {
        const data = cloneDeep(history)
        if (data) this.currentMessageList = [...data, message]
      }
      emitter.emit("updateScroll")
    },
    updateSelectedConversation(payload: DB_Session) {
      const { conversationID: sessionId } = payload
      const oldSessionId = this.currentConversation?.conversationID
      if (sessionId === oldSessionId) return
      this.currentConversation = payload
      this.toggleMultiSelectMode(false)
      if (payload) {
        const history = this.historyMessageList.get(sessionId)
        this.currentMessageList = cloneDeep(history) ?? []
      } else {
        this.currentMessageList = []
      }
      this.setNoMore(this.isMore)
      this.isChatBoxVisible = sessionId !== "@TIM#SYSTEM"
      this.isAssistant && useRobotStore().updateModelConfig()
    },
    addMessage(payload: { conversationID: string; message: DB_Message[]; isDone: boolean }) {
      console.log("[chat] 添加消息 addMessage:", payload)
      const { conversationID, message, isDone } = payload || {}
      if (this.currentConversation) {
        this.currentMessageList = message
      } else {
        this.currentMessageList = []
      }
      this.historyMessageList.set(conversationID, message)
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
      const history = this.historyMessageList.get(sessionId)
      if (!history) {
        console.error("[chat] 删除消息失败，历史消息不存在")
        return
      }
      const newHistory = history.filter((t) => !t.isTimeDivider && !t.isDeleted && !messageIdArray.includes(t.ID))
      const newHistoryList = addTimeDivider(newHistory)
      this.currentMessageList = cloneDeep(newHistoryList)
      this.historyMessageList.set(sessionId, newHistoryList)
    },
    loadMoreMessages(payload: { sessionId: string; messages: DB_Message[]; msgId: string }) {
      console.log("[chat] 加载更多消息 loadMoreMessages:", payload)
      const { sessionId, messages, msgId = "" } = payload
      // 历史消息
      const history = this.historyMessageList.get(sessionId) || []
      if (history.map((t) => t?.ID).includes(msgId)) {
        console.warn("重复加载", msgId)
        this.setNoMore(true)
        return
      }
      console.log("历史消息 history:", history)
      const baseTime = getBaseTime(history, "last")
      const timeDividerResult = addTimeDivider(messages.reverse(), baseTime, "last")
      const newHistory = [...timeDividerResult, ...history]
      this.currentMessageList = newHistory
      this.historyMessageList.set(sessionId, newHistory)
    },
    updateMessages(payload: { sessionId: string; message: DB_Message }) {
      console.log("[chat] 更新消息 updateMessages:", payload)
      const { sessionId, message } = payload
      if (!sessionId || !message?.ID) {
        console.warn("sessionId 或 ID 不存在")
        return
      }
      const oldMessageList = this.historyMessageList.get(sessionId)
      if (!oldMessageList) {
        console.warn("oldMessageList 不存在")
        return
      }
      __LOCAL_MODE__ && MessageModel.update(message.ID, message)
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
      this.historyMessageList.set(sessionId, newMessageList)
    },
    modifiedMessages(message: DB_Message) {
      console.log("[chat] 历史消息更新 modifiedMessages:", message)
      if (!message?.ID) {
        console.warn("ID 不存在")
        return
      }
      const sessionId = message.conversationID
      const oldMessageList = this.historyMessageList.get(sessionId)
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
      this.historyMessageList.set(sessionId, newMessageList)
    },
    async sendSessionMessage(data: { message: DB_Message; last: boolean }) {
      const { message, last = true } = data
      const sessionId = message.conversationID || ""
      if (!sessionId) {
        console.error("sessionId is required")
        return
      }
      // 消息上屏 预加载
      this.updateMessages({ sessionId, message })
      emitter.emit("updateScroll")

      if (useRobotStore().enableWebSearch && useRobotStore().isWebSearchModel) {
        const custom = { key: "webSearch", payload: { text: "" } }
        custom.payload.text = (await generateReferencePrompt({ content: message?.payload?.text })) || ""
        message.cloudCustomData = getCloudCustomData(custom)
      }
      // 发送消息
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
      emitter.emit("updateScroll")
      if (last && ModelIDList.includes(message?.to as ModelIDValue)) {
        setTimeout(async () => {
          await chatService({
            chat: message,
            provider: getModelType(message.to),
            messages: this.currentMessageList ?? [message],
          })
        }, 50)
      }
    },
    async updateMessageList(data: DB_Message) {
      if (!timProxy.isSDKReady) {
        console.warn("TIM SDK 未初始化")
        return
      }
      const { conversationID: sessionId } = data
      const { messageList, isCompleted: isDone } = await getMessageList({ conversationID: sessionId })
      const message = addTimeDivider(messageList)
      this.addMessage({ conversationID: sessionId, isDone, message })
      emitter.emit("updateScroll")
      setMessageRead(data)
    },
    async addConversation(action: { sessionId: string }) {
      const { sessionId } = action
      const { conversation: data } = await getConversationProfile({ sessionId })
      this.updateSelectedConversation(data)
      this.updateMessageList(data)
      scrollToMessage(`message_${sessionId}`)
      if (data?.type === "GROUP") {
        useGroupStore().handleGroupProfile(data)
        useGroupStore().handleGroupMemberList({ groupID: data.groupProfile.groupID })
      }
      this.isAssistant && useRobotStore().updateModelConfig()
      emitter.emit("updateScroll")
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
    updateRevokeMsg({ data, type }: { data: any; type: string }) {
      if (type === "set") {
        this.revokeMsgMap.set(data.ID, data.payload)
      } else {
        this.revokeMsgMap.delete(data.ID)
      }
    },
    updateChatDraft(data: any) {
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
        console.error("sessionId is required")
        return
      }
      const { code } = await deleteConversation({ sessionId })
      if (code === 0) this.clearCurrentMessage()
    },
    async deleteHistoryMessage(id: string) {
      const sessionId = id || this.currentSessionId
      if (!sessionId) {
        console.error("sessionId is required")
        return
      }
      const { code } = await clearHistoryMessage(sessionId)
      if (code === 0) {
        this.historyMessageList.set(sessionId, [])
        this.clearCurrentMessage()
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
    pick: ["noMore", "isChatBoxVisible", "currentConversation", "currentMessageList", "conversationList"],
  },
})
