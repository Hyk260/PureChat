<template>
  <div v-show="currentConversation" class="message-info-view-content" :class="classMessageInfoView()">
    <el-scrollbar ref="scrollbarRef" class="h-full" @end-reached="handleEnReached" @scroll="handleScrollbar">
      <div ref="messageViewRef" class="message-view">
        <div v-for="(item, index) in currentMessageList" :key="item.ID" :class="{ 'reset-select': item.isRevoked }">
          <!-- 加载更多 -->
          <LoadMore :index="index" />
          <!-- 时间 -->
          <div v-if="isTime(item) && appStore.timeline" class="message-time-divider">
            {{ timeFormat(item.time * 1000, true) }}
          </div>
          <!-- 消息体 -->
          <div
            v-else-if="item.ID && !isTime(item) && !item.isDeleted"
            :id="`choice-${item.ID}`"
            class="message-view-item"
            :class="getSelectedMessageClass(item)"
            @click="handleSelect(item, 'outside')"
          >
            <TimeDivider v-if="!isGroupChat" :show-check="isMultiSelectMode" :item="item" />
            <div class="message-view-item-content" :class="classMessageViewItem(item)">
              <!-- 多选框 -->
              <Checkbox :item="item" :is-revoked="item.isRevoked" />
              <div v-if="showAvatar(item)" class="picture">
                <div
                  v-if="isSelf(item) && IS_LOCAL_MODE && userStore.userLocalStore.native"
                  class="native cursor-pointer"
                  @click="onClickAvatar(null, item)"
                >
                  {{ userStore.userLocalStore.native }}
                </div>
                <el-avatar
                  v-else
                  v-contextmenu:contextmenu
                  :size="36"
                  :src="fnAvatar(item)"
                  shape="square"
                  @error="() => true"
                  @click.stop="onClickAvatar($event, item)"
                  @contextmenu.prevent="handleContextAvatarMenuEvent($event, item)"
                >
                  <div class="h-36 w-36 flex-c bg-[#5cadff]">
                    {{ displayInfo(item.from) }}
                  </div>
                </el-avatar>
              </div>
              <div :class="getMessageItemClass(item)">
                <div v-if="isGroupChat" class="message-view-top">
                  <NameComponent :item="item" />
                  <TimeDivider :item="item" :show-check="isMultiSelectMode" type="group" />
                </div>
                <div :id="item.ID" class="message-view-body" :class="getMessageTypeClass(item.type)">
                  <!-- 消息编辑 -->
                  <MessageEditingBox v-if="chatStore.msgEdit?.ID === item.ID" :item="item" />
                  <MessageRenderer
                    v-else
                    :key="item.ID"
                    v-contextmenu:contextmenu
                    :message="item"
                    :status="item.status"
                    @contextmenu.prevent="handleContextMenuEvent($event, item)"
                  >
                  </MessageRenderer>
                  <!-- 消息发送加载状态 -->
                  <Stateful :item="item" :status="item.status" />
                  <!-- 菜单 -->
                  <MenuList :item="item" :status="item.status" @handle-single-click="handleSingleClick" />
                </div>
                <AssistantMessage v-if="isAssistant && item.flow === 'in'" :item="item" />
              </div>
            </div>
          </div>
        </div>
        <!-- sentinel for intersection observer to detect bottom -->
        <div ref="bottomSentinelRef" class="message-bottom-sentinel"></div>
        <div v-show="isMultiSelectMode" class="h-45"></div>
      </div>
    </el-scrollbar>
    <!-- 卡片 -->
    <MyPopover />
    <UserPopup ref="UserPopupRef" />
    <Contextmenu ref="contextmenu" :disabled="!isRight">
      <ContextmenuItem
        v-for="item in contextMenuItems"
        :key="item.id"
        :class="item.class"
        :style="item.style"
        @click="handleRightClick(item)"
      >
        <el-icon><component :is="item.icon" /> </el-icon>
        <span>{{ item.text }}</span>
      </ContextmenuItem>
    </Contextmenu>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from "vue"

import { ElScrollbar } from "element-plus"
import { debounce } from "lodash-es"
import { storeToRefs } from "pinia"
import { Contextmenu, ContextmenuItem } from "v-contextmenu"

import { getAiAvatarUrl } from "@/ai/utils"
import AssistantMessage from "@/components/Chat/AssistantMessage.vue"
import Checkbox from "@/components/Chat/Checkbox.vue"
import MenuList from "@/components/Chat/MenuList.vue"
import MessageEditingBox from "@/components/Chat/MessageEditingBox.vue"
import NameComponent from "@/components/Chat/NameComponent.vue"
import Stateful from "@/components/Chat/Stateful.vue"
import TimeDivider from "@/components/Chat/TimeDivider.vue"
import MessageRenderer from "@/components/MessageRenderer/index.vue"
import MyPopover from "@/components/MyPopover/index.vue"
import UserPopup from "@/components/Popups/UserPopup.vue"
import { MULTIPLE_CHOICE_MAX } from "@/constants"
import { useMessageOperations } from "@/hooks/useMessageOperations"
import { getMessageList, revokeMsg, translateText } from "@/service/im-sdk-api"
import { useAppStore, useChatStore, useGroupStore, useUserStore } from "@/stores"
import {
  download,
  getMessageItemClass,
  getMessageTypeClass,
  handleCopyMsg,
  isSelf,
  isTime,
  validateLastMessage,
} from "@/utils/chat"
import { getTime } from "@/utils/common"
import { showConfirmationBox } from "@/utils/message"
import emitter from "@/utils/mitt-bus"
import { timeFormat } from "@/utils/timeFormat"

import LoadMore from "../components/LoadMore.vue"
import { avatarMenu, menuOptionsList } from "../utils/menu"

// import { validateLastMessage } from "../utils/utils"
import type { DB_Message } from "@/database/schemas/message"

const UserPopupRef = ref()
const timeout = ref(false)
const isRight = ref(true)
const contextMenuItems = shallowRef<ContextmenuItem[]>([])
const menuItemInfo = ref<DB_Message | null>(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const messageViewRef = ref<HTMLDivElement | null>(null)
const bottomSentinelRef = ref<HTMLElement | null>(null)
const isBottomVisible = ref(false)
let bottomObserver: IntersectionObserver | null = null

const { resendMessage } = useMessageOperations()
const groupStore = useGroupStore()
const chatStore = useChatStore()
const appStore = useAppStore()
const userStore = useUserStore()

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

const isMessageSelected = (messageId: string) => {
  return chatStore.isMessageSelected(messageId)
}

const getSelectedMessageClass = (item: DB_Message) => {
  return isMessageSelected(item.ID) ? "style-select" : ""
}

const updateLoadMore = (id: string) => {
  nextTick(() => {
    const el = document.getElementById(`choice-${id}`)
    if (el) {
      el.scrollIntoView({ block: "start" })
    } else {
      console.warn("未找到对应的元素")
    }
  })
}

const fnAvatar = (item: DB_Message) => {
  if (isSelf(item) && __LOCAL_MODE__) {
    return userStore.getUserAvatar
  } else {
    return item.avatar || getAiAvatarUrl(item.from)
  }
}

const displayInfo = (info: string) => {
  if (!info) return "unknown"
  return info.slice(0, 2).toUpperCase()
}

const showAvatar = (item: DB_Message) => {
  return !item.isRevoked && item.type !== "TIMGroupTipElem"
}

const classMessageViewItem = (item: DB_Message) => {
  return [
    item.flow === "in" ? "is-other" : "is-self",
    isMultiSelectMode.value && !item.isRevoked && item.type !== "TIMGroupTipElem" ? "style-choice" : "",
  ]
}

const classMessageInfoView = () => {
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

  const isCurrentlySelected = chatStore.isMessageSelected(item.ID)

  if (forceChecked !== null && forceChecked && !isCurrentlySelected && chatStore.isFwdDataMaxed) {
    window.$message?.error(`最多只能选择${MULTIPLE_CHOICE_MAX}条`)
    return
  }

  chatStore.toggleMessageSelection(item, forceChecked)
}

const handleSelect = (item: DB_Message, type = "initial") => {
  if (type === "choice") {
    toggleMessageSelection(item, true)
    return
  }

  toggleMessageSelection(item)
}

const onClickAvatar = (e: Event | null, item: DB_Message) => {
  if (__LOCAL_MODE__ && isSelf(item)) {
    UserPopupRef.value.show()
    return
  }
  if (isSelf(item) || isMultiSelectMode.value) return
  const { conversationID: id } = item || {}
  if (id === "@TIM#SYSTEM") return
  emitter.emit("setPopoverStatus", { status: true, seat: e, cardData: item })
}

// 检查滚动条是否到达页面底部
const isScrolledToBottom = (lower = 2): boolean => {
  if (bottomObserver && bottomSentinelRef.value) {
    return Boolean(isBottomVisible.value)
  }

  // 回退到像素比较的兼容逻辑
  const threshold = Math.max(0, Number(lower) || 0)
  const wrapRef = scrollbarRef.value?.wrapRef
  if (!wrapRef) return false

  const scrollTop = Number(wrapRef.scrollTop ?? 0)
  const clientHeight = Number(wrapRef.clientHeight ?? 0)
  const scrollHeight = Number(wrapRef.scrollHeight ?? 0)

  if (!Number.isFinite(scrollTop) || !Number.isFinite(clientHeight) || !Number.isFinite(scrollHeight)) return false

  const distanceToBottom = scrollHeight - (scrollTop + clientHeight)
  return distanceToBottom <= threshold
}

const initBottomObserver = () => {
  if (bottomObserver) return

  try {
    bottomObserver = new IntersectionObserver(
      (entries) => {
        const ent = entries[0]
        if (!ent) return
        // 当 sentinel 可见时，表示滚动到达底部（或接近底部，取决于 rootMargin）
        isBottomVisible.value = ent.isIntersecting
        emitter.emit("handleToBottom", isBottomVisible.value)
      },
      {
        root: scrollbarRef.value?.wrapRef || null,
        rootMargin: "0px 0px 10px 0px",
        threshold: 0.01,
      }
    )

    if (bottomSentinelRef.value) {
      bottomObserver.observe(bottomSentinelRef.value)
    }
  } catch {
    bottomObserver = null
  }
}

const destroyBottomObserver = () => {
  try {
    if (bottomObserver) {
      bottomObserver.disconnect()
      bottomObserver = null
    }
  } catch {
    // ignore
  }
}

// const loadMoreMessages = () => {
//   emitter.emit("handleToBottom", isScrolledToBottom())
// }

// const debouncedFunc = debounce(loadMoreMessages, 300)

const handleEnReached = (direction: string) => {
  console.log("handleEnReached:", direction)
  if (direction === "top") {
    loadMoreMsg()
  } else if (direction === "bottom") {
    emitter.emit("handleToBottom", true)
  }
}

const handleScrollbar = () => {
  // debouncedFunc()
}

const updateScrollBarHeight = () => {
  nextTick(() => {
    // scrollbarRef.value?.setScrollTop(0);
    scrollbarRef.value?.scrollTo(0, messageViewRef.value?.scrollHeight)
  })
}

const updateScrollbar = () => {
  nextTick(() => {
    scrollbarRef.value?.update()
  })
}

const loadMoreMsg = async () => {
  if (!currentConversation.value) return
  try {
    const { conversationID: sessionId } = currentConversation.value
    const msglist = currentMessageList.value
    if (!msglist.length) return
    const nextMsg = validateLastMessage(msglist)
    // console.log("nextMsg:", nextMsg);

    if (nextMsg?.type === "TIMCustomElem") {
      // console.log("nextMsg:text", nextMsg?.payload?.data);
    } else if (nextMsg?.type === "TIMTextElem") {
      // console.log("nextMsg:text", nextMsg?.payload?.text);
      // console.log("nextMsg:ID", nextMsg?.ID);
      // const el = document.getElementById(`choice-${nextMsg?.ID}`);
      // console.log("nextMsg:el", el);
    }

    const result = await getMessageList({
      conversationID: sessionId,
      nextReqMessageID: nextMsg?.ID || "",
    })

    // console.log("getMessageList:", result);
    const { isCompleted, messageList } = result
    if (!messageList.length && isCompleted) {
      // console.log("[chat] 没有更多消息了 loadMoreMsg:");
      chatStore.setNoMore(true)
    } else if (messageList.length) {
      chatStore.setScrollTopID(nextMsg?.ID)
      chatStore.loadMoreMessages({ sessionId, messages: messageList, msgId: messageList[0].ID })
    } else {
      chatStore.setNoMore(true)
    }
  } catch (e) {
    console.error("loadMoreMsg:", e)
    chatStore.setNoMore(true)
  }
}

const handleContextAvatarMenuEvent = (_: Event, item: DB_Message) => {
  const { flow } = item
  const type = currentType.value
  // 单人 & 自己发送的消息 & 系统消息
  if (type === "C2C" || flow === "out" || item.type === "TIMGroupSystemNoticeElem") {
    isRight.value = false
    return
  }
  isRight.value = true
  menuItemInfo.value = item
  contextMenuItems.value = avatarMenu
}

const handleContextMenuEvent = (_: Event, item: DB_Message) => {
  const { isRevoked, time, type } = item
  const messageTypes = {
    isFile: type === "TIMFileElem",
    isRelay: type === "TIMRelayElem",
    isCustom: type === "TIMCustomElem",
    isSystemNotice: type === "TIMGroupSystemNoticeElem",
    isGroupTip: type === "TIMGroupTipElem",
  }
  // 撤回消息 多选状态 系统类型消息 提示类型消息
  if (isRevoked || isMultiSelectMode.value || messageTypes.isSystemNotice || messageTypes.isGroupTip) {
    isRight.value = false
    return
  }

  console.log("handleContextMenuEvent:", item)

  let menuItems = [...menuOptionsList]
  const canRevoke = getTime() - time < 120 // 两分钟内可撤回
  const isGroupOwner = groupStore.isOwner && currentType.value === "GROUP"
  const isFromSelf = isSelf(item)
  // 对方消息 超过撤回时间
  if (!isFromSelf || !canRevoke) {
    menuItems = menuItems.filter((t) => t.id !== "revoke")
  }
  // 群主 & 群聊 & 不限制2分钟撤回时间
  if (isGroupOwner) {
    menuItems = [...menuOptionsList]
  }
  // 合并消息
  if (messageTypes.isRelay) {
    menuItems = menuItems.filter((t) => t.id !== "copy")
  }
  // 非文件消息过滤另存为
  if (!messageTypes.isFile) {
    menuItems = menuItems.filter((t) => t.id !== "saveAs")
  }
  // 文件消息 非electron环境下过滤复制
  if (messageTypes.isFile && !__IS_ELECTRON__) {
    menuItems = menuItems.filter((t) => t.id !== "copy")
  }
  // ai消息过滤 撤回 回复
  if (isAssistant.value) {
    menuItems = menuItems.filter((t) => t.id !== "reply" && t.id !== "revoke")
  }

  if (messageTypes.isCustom) {
    menuItems = menuItems.filter((t) => t.id === "delete")
  }

  timeout.value = !canRevoke
  isRight.value = true
  menuItemInfo.value = item
  contextMenuItems.value = menuItems
}

const handleRightClick = (data: { id: string }) => {
  const info = menuItemInfo.value as DB_Message
  const { id } = data || {}
  switch (id) {
    case "refresh": // 重新生成
      handleRefreshMsg(info)
      break
    case "send": // 发起会话
      handleSendMessage(info)
      break
    case "ait": // @对方
      handleAt(info)
      break
    case "copy": // 复制
      handleCopyMsg(info)
      break
    case "translate": // 翻译
      handleTranslate(info)
      break
    case "revoke": // 撤回
      handleRevokeMsg(info)
      break
    case "forward": // 转发
      // handleForward(info)
      break
    case "saveAs": // 另存为
      handleSave(info)
      break
    case "reply": // 回复
      handleReplyMsg(info)
      break
    case "multiSelect": // 多选
      handleMultiSelectMsg(info)
      break
    case "delete": // 删除
      handleDeleteMsg(info)
      break
  }
}

const handleSingleClick = ({ item, id }) => {
  menuItemInfo.value = item
  handleRightClick({ id })
}

const handleAt = (data: DB_Message) => {
  const { from, nick, conversationType: type } = data
  if (type === "C2C") return
  emitter.emit("handleAt", { id: from, name: nick })
}

const handleSendMessage = (data: DB_Message) => {
  chatStore.addConversation({ sessionId: `C2C${data.from}` })
}

const handleRefreshMsg = (data: DB_Message) => {
  resendMessage(data.ID, data)
}

const handleSave = ({ payload }) => {
  if (!payload.fileUrl || !payload.fileName) {
    window.$message?.error("文件不存在")
    return
  }
  download(payload.fileUrl, payload.fileName)
}

const handleTranslate = (data: DB_Message) => {
  translateText({ textList: data.payload.text })
}

// const handleForward = (data: DB_Message) => {}

const handleReplyMsg = (data: DB_Message) => {
  chatStore.setReplyMsgData(data)
  if (!isSelf(data)) handleAt(data)
}

const handleDeleteMsg = async (data: DB_Message) => {
  // const result = await showConfirmationBox({ message: "确定删除消息?", iconType: "warning" });
  // if (result === "cancel") return;
  chatStore.deleteMessage({
    sessionId: data.conversationID,
    messageIdArray: [data.ID],
    message: [data],
  })
}

const handleMultiSelectMsg = (item: DB_Message) => {
  chatStore.toggleMultiSelectMode(true)
  chatStore.setReplyMsgData(null)
  // updateLoadMore(item?.ID);
  handleSelect(item, "choice")
}

const handleRevokeChange = (data: DB_Message, type: string) => {
  if (data.type !== "TIMTextElem") return
  chatStore.updateRevokeMsg({ data, type })
}

const handleRevokeMsg = async (data: DB_Message) => {
  if (timeout.value) {
    const result = await showConfirmationBox({ message: "确定撤回这条消息?", iconType: "warning" })
    if (result === "cancel") return
  }
  const { code, message } = await revokeMsg(data)
  if (code !== 0) return
  if (message.flow !== "out") return
  handleRevokeChange(message, "set")
  setTimeout(() => {
    handleRevokeChange(message, "delete")
  }, 60000)
}

let updateScrollRaf: number | null = null

const updateScrollHandler = (type?: "bottom" | "robot" | undefined) => {
  try {
    if (updateScrollRaf !== null) cancelAnimationFrame(updateScrollRaf)

    if (type === "bottom") {
      if (isScrolledToBottom()) {
        updateScrollBarHeight()
      }
      return
    }

    if (type === "robot") {
      if (isScrolledToBottom(15)) {
        updateScrollBarHeight()
        // updateScrollRaf = requestAnimationFrame(() => updateScrollBarHeight())
      }
      return
    }

    // 立即调度更新（在下一帧）
    updateScrollRaf = requestAnimationFrame(() => updateScrollBarHeight())
  } catch {
    // ignore
  }
}

function onEmitter() {
  emitter.on("updateScroll", updateScrollHandler)
}

function offEmitter() {
  emitter.off("updateScroll", updateScrollHandler)
  if (updateScrollRaf !== null) {
    cancelAnimationFrame(updateScrollRaf)
    updateScrollRaf = null
  }
}

watch(
  () => scrollTopID.value,
  (data) => {
    updateLoadMore(data)
  }
)

watch(
  () => chatStore.replyMsgData,
  () => {
    updateScrollbar()
  }
)

onMounted(() => {
  onEmitter()
  initBottomObserver()
})

onUnmounted(() => {
  offEmitter()
  destroyBottomObserver()
})

defineExpose({ updateScrollbar, updateScrollBarHeight })
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
  height: calc(100% - 60px - 200px);
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
  padding: 0 16px 16px 16px;
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
.style-choice {
  padding-left: 35px;
  padding-right: 10px;
  user-select: none;
  pointer-events: none;
}
.message-view-item {
  padding: 10px 0 10px 0;
  &:hover .time-divider {
    visibility: visible;
  }
}
.message-view-item-content {
  position: relative;
  display: flex;
  flex-direction: row;
  transition: all 0.15s ease;
  gap: 8px;
  .message-view-top {
    display: flex;
  }
  .message-view-body {
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover .menubar {
      opacity: 1;
    }
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
