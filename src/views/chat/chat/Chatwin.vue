<template>
  <div v-show="currentConversation" class="message-info-view-content" :class="getMessageViewClasses()">
    <ElScrollbar
      id="message-view-scrollbar"
      ref="scrollbarRef"
      class="h-full"
      @end-reached="handleEnReached"
      @scroll="handleScrollbar"
    >
      <div ref="messageViewRef" class="message-view">
        <div v-for="item in currentMessageList" :key="item.ID" :class="{ 'reset-select': item.isRevoked }">
          <!-- 加载更多 -->
          <!-- <LoadMore :index="index" /> -->
          <!-- 时间 -->
          <div v-if="isTime(item) && appStore.timeline" class="message-time-divider">
            {{ timeFormat(item.time * 1000, true) }}
          </div>
          <!-- 消息内容 -->
          <div
            v-else-if="isValidMessage(item)"
            :id="`choice-${item.ID}`"
            class="message-view-item"
            :class="getMessageSelectionClass(item)"
            @click="handleMessageSelect(item)"
          >
            <!-- 非群聊时间分隔器 -->
            <TimeDivider v-if="!isGroupChat" :showCheck="isMultiSelectMode" :item="item" />
            <div class="message-view-item-content" :class="getMessageItemClasses(item)">
              <!-- 多选框 -->
              <Checkbox :item="item" :isRevoked="item.isRevoked" />
              <!-- 头像区域 -->
              <div v-if="shouldShowAvatar(item)" class="picture">
                <div
                  v-if="isLocalOutgoingMessage(item) && userStore.userLocalStore.native"
                  class="native cursor-pointer"
                  @click="handleAvatarClick(null, item)"
                >
                  {{ userStore.userLocalStore.native }}
                </div>
                <ElAvatar
                  v-else
                  :size="36"
                  :src="getAvatarUrl(item)"
                  shape="square"
                  @error="() => true"
                  @click.stop="handleAvatarClick($event, item)"
                  @contextmenu.prevent="handleAvatarContextMenu($event, item)"
                >
                  <div class="h-36 w-36 flex-c bg-[#5cadff]">
                    {{ getDisplayName(item.from) }}
                  </div>
                </ElAvatar>
              </div>
              <div :class="getMessageItemClass(item)">
                <div v-if="isGroupChat" class="message-view-top">
                  <NameComponent :item="item" />
                  <TimeDivider :item="item" :showCheck="isMultiSelectMode" type="group" />
                </div>
                <div :id="item.ID" class="message-view-body" :class="getMessageTypeClass(item.type)">
                  <!-- 消息编辑 -->
                  <MessageEditingBox v-if="chatStore.msgEdit?.ID === item.ID" :item="item" />
                  <MessageRenderer
                    v-else
                    :key="item.ID"
                    :message="item"
                    @contextmenu.prevent="handleMessageContextMenu($event, item)"
                  />
                  <!-- 消息发送加载状态 -->
                  <Stateful :item="item" :status="item.status" />
                  <!-- 菜单 -->
                  <MenuList
                    :item="item"
                    :status="item.status"
                    @handle-context-menu="handleMessageContextMenu"
                    @handle-single-click="handleSingleClick"
                  />
                </div>
                <AssistantMessage v-if="isAssistant && item.flow === 'in'" :item="item" />
              </div>
            </div>
          </div>
        </div>
        <div v-show="isMultiSelectMode" class="h-200"></div>
        <div ref="bottomSentinelRef" class="message-bottom-sentinel"></div>
      </div>
    </ElScrollbar>
    <!-- 卡片 -->
    <MyPopover />
    <UserPopup ref="userPopupRef" />
    <ContextMenu ref="contextMenuRef" :items="contextMenuItems" @menuClick="handleContextMenuItemClick" />
    <MessageNavigator v-if="currentConversation" :scrollbarRef="scrollbarRef" />
  </div>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus"
import { storeToRefs } from "pinia"
import { useIntersectionObserver } from "@vueuse/core"

import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import AssistantMessage from "@/components/Chat/AssistantMessage.vue"
import Checkbox from "@/components/Chat/Checkbox.vue"
import MenuList from "@/components/Chat/MenuList.vue"
import MessageEditingBox from "@/components/Chat/MessageEditingBox.vue"
import MessageNavigator from "@/components/Chat/MessageNavigator.vue"
import NameComponent from "@/components/Chat/NameComponent.vue"
import Stateful from "@/components/Chat/Stateful.vue"
import TimeDivider from "@/components/Chat/TimeDivider.vue"
import ContextMenu from "@/components/ContextMenu"
import MessageRenderer from "@/components/MessageRenderer/index.vue"
import MyPopover from "@/components/MyPopover/index.vue"
import UserPopup from "@/components/Popups/UserPopup.vue"
import { useContextMenu } from "@/composables/useContextMenu"
import { MULTIPLE_CHOICE_MAX } from "@/constants"
import { useMessageOperations } from "@/hooks/useMessageOperations"
import { getMessageList, revokeMsg, translateText } from "@/service/im-sdk-api"
import { useAppStore, useChatStore, useGroupStore, useUserStore } from "@/stores"
import {
  download,
  getMessageItemClass,
  getMessageTypeClass,
  handleCopyMsg,
  isTime,
  scrollToMessage,
  validateLastMessage,
} from "@/utils/chat"
import { getUnixTimestampSec } from "@/utils/common"
import { avatarContextMenuItems, messageContextMenuItems } from "@/utils/contextMenuPresets"
import { ElMessageBox } from "element-plus"
import emitter from "@/utils/mitt-bus"
import { delay } from "@/utils/common"
import { timeFormat } from "@/utils/timeFormat"

// import LoadMore from "../components/LoadMore.vue"

import type { DB_Message, FilePayloadType } from "@/types"
import type { MenuItem } from "@/types/contextMenu"

const userPopupRef = useTemplateRef("userPopupRef")
const scrollbarRef = useTemplateRef("scrollbarRef")
const messageViewRef = useTemplateRef("messageViewRef")
const bottomSentinelRef = useTemplateRef("bottomSentinelRef")

const contextMenuItems = ref<MenuItem[] | []>([])
const currentMenuItem = ref<DB_Message | null>(null)
const isBottomVisible = shallowRef(false)

const groupStore = useGroupStore()
const chatStore = useChatStore()
const appStore = useAppStore()
const userStore = useUserStore()

const { resendMessage } = useMessageOperations()
const { contextMenuRef, showContextMenu } = useContextMenu()

const {
  isAssistant,
  isGroupChat,
  currentType,
  isMultiSelectMode,
  isChatBoxVisible,
  scrollTopID,
  currentMessageList,
  currentConversation,
} = storeToRefs(chatStore)

const REVOKE_TIME_LIMIT = 120 // 2分钟撤回时限

const isValidMessage = (item: DB_Message) => {
  return item.ID && !isTime(item) && !item.isDeleted
}

const getMessageSelectionClass = (item: DB_Message) => {
  return chatStore.isMessageSelected(item.ID) ? "style-select" : ""
}

const scrollToMessagePosition = (messageId: string) => {
  if (!messageId) return

  nextTick(() => {
    const element = document.getElementById(`choice-${messageId}`)
    element?.scrollIntoView({ block: "start" })
  })
}

const getAvatarUrl = (item: DB_Message) => {
  if (isLocalOutgoingMessage(item)) {
    return userStore.getUserAvatar
  } else {
    return item.avatar || getAiAvatarUrl(item.from)
  }
}

const getDisplayName = (name: string) => {
  return name?.slice(0, 2).toUpperCase() || "unknown"
}

const shouldShowAvatar = (item: DB_Message) => {
  return !item.isRevoked && item.type !== "TIMGroupTipElem"
}

/**
 * 本地模式且是自己发送的消息
 */
const isLocalOutgoingMessage = (message: DB_Message) => {
  return message.flow === "out" && __LOCAL_MODE__
}

const getMessageItemClasses = (item: DB_Message) => {
  const classes: string[] = [item.flow === "in" ? "is-other" : "is-self"]

  if (isMultiSelectMode.value && !item.isRevoked && item.type !== "TIMGroupTipElem") {
    classes.push("style-choice")
  }

  return classes
}

const getMessageViewClasses = () => {
  return [
    isChatBoxVisible.value ? "" : "style-msg-box",
    chatStore.replyMsgData ? "style-reply" : "",
    chatStore.isFullscreenInputActive ? "chat-h-full" : "",
    chatStore.isMultiSelectMode ? "multi-select-mode" : "",
  ]
}

const toggleMessageSelection = (item: DB_Message, forceChecked: boolean | null = null) => {
  // tip消息 撤回消息
  if (!isMultiSelectMode.value || item.type == "TIMGroupTipElem" || item.isRevoked) {
    return
  }

  const isSelected = chatStore.isMessageSelected(item.ID)

  if (forceChecked && !isSelected && chatStore.isFwdDataMaxed) {
    window.$message?.error(`最多只能选择${MULTIPLE_CHOICE_MAX}条`)
    return
  }

  chatStore.toggleMessageSelection(item, forceChecked)
}

const handleMessageSelect = (item: DB_Message) => {
  toggleMessageSelection(item)
}

const handleAvatarClick = (e: Event | null, item: DB_Message) => {
  if (isLocalOutgoingMessage(item)) {
    userPopupRef.value?.show()
    return
  }
  if (item.flow === "out" || isMultiSelectMode.value) return
  if (item.conversationID === "@TIM#SYSTEM") return
  emitter.emit("setPopoverStatus", { status: true, seat: e, cardData: item })
}

const isScrolledToBottom = (threshold: number = 2): boolean => {
  const scrollContainer = scrollbarRef.value?.wrapRef
  if (!scrollContainer) return false

  const { scrollTop, clientHeight, scrollHeight } = scrollContainer
  const distanceToBottom = scrollHeight - (scrollTop + clientHeight)

  return distanceToBottom <= threshold
}

useIntersectionObserver(
  bottomSentinelRef,
  ([entry]) => {
    const isVisible = entry?.isIntersecting || false
    isBottomVisible.value = isVisible
    nextTick(() => {
      emitter.emit("handleToBottom", isVisible)
    })
  },
  {
    root: scrollbarRef.value?.wrapRef || null,
    rootMargin: "0px 0px 10px 0px",
    threshold: 1.0,
  }
)

const handleEnReached = (direction: string) => {
  console.log("滚动方向:", direction)
  if (direction === "top") {
    loadMoreMessages()
  } else if (direction === "bottom") {
    emitter.emit("handleToBottom", true)
  }
}

const handleScrollbar = () => {}

const scrollToBottom = async () => {
  // await delay(10)
  nextTick(() => {
    if (!currentConversation.value) return
    bottomSentinelRef.value?.scrollIntoView()
    // bottomSentinelRef.value?.scrollIntoView({ behavior: "smooth" })
    // scrollbarRef.value?.scrollTo(0, messageViewRef.value?.scrollHeight || 0)
  })
}

const updateScrollbar = () => {
  nextTick(() => {
    scrollbarRef.value?.update()
  })
}

const loadMoreMessages = async () => {
  if (!currentConversation.value) return
  try {
    const { conversationID: sessionId } = currentConversation.value
    const messages = currentMessageList.value
    if (!messages.length) return
    const lastMessage = validateLastMessage(messages)

    const result = await getMessageList({
      conversationID: sessionId,
      nextReqMessageID: lastMessage?.ID || "",
    })

    const { isCompleted, messageList } = result
    if (!messageList.length && isCompleted) {
      chatStore.setNoMore(true)
    } else if (messageList.length) {
      chatStore.loadMoreMessages({ sessionId, messages: messageList, msgId: messageList?.[0]?.ID || "" })
      chatStore.setScrollTopID(lastMessage?.ID)
    } else {
      chatStore.setNoMore(true)
    }
  } catch (error) {
    console.error("加载更多消息失败:", error)
    chatStore.setNoMore(true)
  }
}

/**
 * 获取过滤后的上下文菜单项
 */
const getFilteredContextMenuItems = (message: DB_Message): MenuItem[] => {
  const { flow, type, time } = message
  let menuItems = [...messageContextMenuItems]

  // 消息类型检查
  const messageTypes = {
    isFile: type === "TIMFileElem",
    isText: type === "TIMTextElem",
    isRelay: type === "TIMRelayElem",
    isCustom: type === "TIMCustomElem",
  }

  // 撤回权限检查
  const canRevoke = getUnixTimestampSec() - time < REVOKE_TIME_LIMIT
  const isGroupOwner = groupStore.isOwner && isGroupChat.value
  const isFromSelf = flow === "out"

  const filterRules = [
    // 两分钟内消息可撤回
    { condition: !isFromSelf || !canRevoke, key: "revoke" },
    // 群主可撤回所有消息
    { condition: isGroupOwner, action: "reset" },
    // 合并消息不支持复制
    { condition: messageTypes.isRelay, key: "copy" },
    // 非文件消息不支持另存为
    { condition: !messageTypes.isFile, key: "saveAs" },
    // 文件消息在非客户端（Electron）环境下不支持复制
    { condition: messageTypes.isFile && !__IS_ELECTRON__, key: "copy" },
    // AI消息不支持引用回复和撤回
    { condition: isAssistant.value, keys: ["quote", "revoke"] },
    // 非文本消息不支持编辑
    { condition: !messageTypes.isText, key: "edit" },
    // 非文本消息或自己发送的消息不支持重新生成
    { condition: !messageTypes.isText || isFromSelf, key: "refresh" },
    // 自定义消息只保留删除
    { condition: messageTypes.isCustom, preserve: ["delete"] },
  ]

  filterRules.forEach((rule) => {
    if (rule.condition) {
      if (rule.action === "reset") {
        menuItems = [...messageContextMenuItems]
      } else if (rule.preserve) {
        menuItems = menuItems.filter((item) => rule.preserve!.includes(item.key))
      } else if (rule.keys) {
        menuItems = menuItems.filter((item) => !rule.keys!.includes(item.key))
      } else if (rule.key) {
        menuItems = menuItems.filter((item) => item.key !== rule.key)
      }
    }
  })

  return menuItems
}

const handleAvatarContextMenu = (event: MouseEvent, item: DB_Message) => {
  const { flow, type } = item
  // 单人聊天、自己发送的消息、系统消息不显示菜单
  if (currentType.value === "C2C" || flow === "out" || type === "TIMGroupSystemNoticeElem") {
    return
  }
  showContextMenu(event, item)
  currentMenuItem.value = item
  contextMenuItems.value = avatarContextMenuItems
}

const handleMessageContextMenu = (event: MouseEvent, item: DB_Message) => {
  const { isRevoked, type } = item
  const invalidTypes = ["TIMGroupSystemNoticeElem", "TIMGroupTipElem"]
  // 撤回消息、多选状态、系统类型消息、提示类型消息不显示菜单
  if (isRevoked || isMultiSelectMode.value || invalidTypes.includes(type)) {
    return
  }

  showContextMenu(event, item)
  currentMenuItem.value = item
  contextMenuItems.value = getFilteredContextMenuItems(item)
}

const handleContextMenuItemClick = (menuItem: MenuItem, i?: number) => {
  const subMenuItem = i !== undefined ? (menuItem.children?.[i] ?? menuItem) : menuItem
  const message = currentMenuItem.value

  if (!message) return
  switch (menuItem.key) {
    case "refresh": // 重新生成
      handleRefreshMessage(message)
      break
    case "send": // 发起会话
      handleSendMessage(message)
      break
    case "at": // @对方
      handleAtUser(message)
      break
    case "edit": // 编辑
      handleEditMessage(message)
      break
    case "copy": // 复制
      handleCopyMsg(message)
      break
    case "translate": // 翻译
      handleTranslate(message, subMenuItem)
      break
    case "revoke": // 撤回
      handleRevokeMessage(message)
      break
    case "forward": // 转发
      // handleForward(message)
      break
    case "saveAs": // 另存为
      handleSaveFile(message)
      break
    case "quote": // 引用回复
      handleReplyMessage(message)
      break
    case "multiSelect": // 多选
      handleMultiSelectMessage(message)
      break
    case "delete": // 删除
      handleDeleteMessage(message)
      break
    default:
      console.log("未定义操作")
  }
}

const handleSingleClick = ({ item, key }: { item: DB_Message; key: string }) => {
  currentMenuItem.value = item
  handleContextMenuItemClick({ key, label: "" })
}

const handleEditMessage = (item: DB_Message) => {
  scrollToMessage(item.ID)
  chatStore.setMsgEdit(item)
}

const handleAtUser = (data: DB_Message) => {
  const { from, nick, conversationType: type } = data
  if (type === "C2C") return
  emitter.emit("handleAt", { id: from, name: nick })
}

const handleSendMessage = (data: DB_Message) => {
  chatStore.addConversation({ sessionId: `C2C${data.from}` })
}

const handleRefreshMessage = (data: DB_Message) => {
  resendMessage(data.ID, data)
}

const handleSaveFile = (message: DB_Message) => {
  const filePayload = message.payload as unknown as FilePayloadType
  const { fileUrl, fileName } = filePayload
  if (!fileUrl || !fileName) {
    window.$message?.error("文件不存在")
    return
  }
  download(fileUrl, fileName)
}

const handleTranslate = async (item: DB_Message, menu?: { key: string }) => {
  const data = await translateText({ text: item.payload?.text || "", target: menu?.key || "zh" })
}

const handleForward = (data: DB_Message) => {}

const handleReplyMessage = (data: DB_Message) => {
  chatStore.setReplyMsgData(data)
  if (data.flow === "in") handleAtUser(data)
}

const handleDeleteMessage = async (message: DB_Message) => {
  chatStore.deleteMessage({
    sessionId: message.conversationID,
    messageIdArray: [message.ID],
    message: [message],
  })
}

const handleMultiSelectMessage = (item: DB_Message) => {
  chatStore.toggleMultiSelectMode(true)
  chatStore.setReplyMsgData(null)
  toggleMessageSelection(item, true)
}

const handleRevokeChange = (data: DB_Message, type: string) => {
  if (data.type !== "TIMTextElem") return
  chatStore.updateRevokeMsg({ data, type })
}

const handleRevokeMessage = async (data: DB_Message) => {
  const isTimeout = getUnixTimestampSec() - data.time > REVOKE_TIME_LIMIT
  if (!isTimeout) {
    const result = await ElMessageBox.confirm("确定撤回这条消息?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    if (result === "cancel") return
  }
  const { code, message } = await revokeMsg(data)
  if (code !== 0 || message.flow !== "out") return
  handleRevokeChange(message, "set")
  setTimeout(() => {
    handleRevokeChange(message, "delete")
  }, 60000)
}

const updateScrollHandler = (type?: "bottom" | "robot") => {
  // return
  try {
    if (type === "bottom") {
      if (isBottomVisible.value) {
        scrollToBottom()
      }
      return
    }

    if (type === "robot") {
      if (isScrolledToBottom(15)) {
        scrollToBottom()
      }
      return
    }

    scrollToBottom()
  } catch {
    // ignore
  }
}

function onEmitter() {
  emitter.on("updateScroll", updateScrollHandler)
}

function offEmitter() {
  emitter.off("updateScroll", updateScrollHandler)
}

watch(
  () => scrollTopID.value,
  (messageId) => {
    scrollToMessagePosition(messageId)
  },
  { immediate: true }
)

watch(
  () => chatStore.replyMsgData,
  () => {
    updateScrollbar()
  }
)

onMounted(() => {
  onEmitter()
})

onUnmounted(() => {
  offEmitter()
})

defineExpose({ updateScrollbar, scrollToBottom })
</script>

<style lang="scss" scoped>
.message-view-tips-elem {
  margin: auto;
  .message-name {
    display: none;
  }
}
.multi-select-mode {
  height: calc(100% - 60px) !important;
}
.chat-h-full {
  height: 0px !important;
  border-bottom: none;
}
.message-view-item-index {
  width: 100%;
}
.message-info-view-content {
  position: relative;
  // height: calc(100% - 60px - 200px);
  height: calc(100% - 200px);
}
.style-msg-box {
  height: calc(100% - 60px) !important;
}
.style-reply {
  height: calc(100% - 60px - 200px - 60px) !important;
}
.message-time-divider {
  position: relative;
  margin: 10px 0;
  max-height: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: var(--color-time-divider);
}
.message-view {
  display: flex;
  flex-direction: column;
  min-width: 375px;
  height: 100%;
  padding: 0 16px 5px 16px;
  box-sizing: border-box;
  overflow-y: overlay;
  overflow-x: hidden;
  .picture {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    user-select: none;
    --el-border-radius-base: 6px;
    --el-text-color-disabled: #ffffff00;
    .native {
      font-size: 28px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.message-bottom-sentinel {
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
.style-select {
  border-radius: 3px;
  background: var(--color-multiple-choice);
}
.reset-select {
  border-radius: 3px;
}
.message-view-item {
  padding: 10px 0;
  // contain: layout style paint;
  &:hover .time-divider {
    visibility: visible;
  }
}
.message-view-item-content {
  position: relative;
  display: flex;
  flex-direction: row;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease,
    padding 0.1s ease;
  gap: 8px;
  // min-height: 56px;
  padding-left: 0;
  padding-right: 0;

  .message-view-top {
    display: flex;
  }

  .message-view-body {
    display: flex;
    align-items: center;
    gap: 8px;
    // flex-direction: column;
    // align-items: flex-start;
    &:hover .menubar {
      opacity: 1;
    }
  }

  &.style-choice {
    padding-left: 35px;
    padding-right: 10px;
    user-select: none;
    pointer-events: none;
  }
}

.is-self {
  flex-direction: row-reverse;
  .message-view-top {
    flex-direction: row-reverse;
  }
  .message-view-body {
    flex-direction: row-reverse;
  }
  .message-view__img,
  .message-view__file,
  .message-view__text {
    align-items: center;
  }
}
</style>
