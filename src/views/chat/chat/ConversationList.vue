<template>
  <ElScrollbar class="scrollbar-list">
    <EmptyMessage v-if="conversationList.length === 0" className="no-msg" />
    <template v-if="!isEnableVirtualList">
      <div
        v-for="item in displayData"
        :id="`message_${item.conversationID}`"
        :key="item.conversationID"
        class="message-item"
        :class="{ 'is-active': item._isActive }"
        @click="handleConversationListClick(item)"
        @drop="(e) => handleDrop(e, item, handleConversationListClick)"
        @dragover="handleDragOver"
        @dragenter="(e) => handleDragEnter(e, item)"
        @dragleave="(e) => handleDragLeave(e, item)"
        @contextmenu.prevent="handleContextMenuEvent($event, item)"
      >
        <!-- 置顶图标 -->
        <div v-show="item.isPinned" class="pinned-tag"></div>
        <!-- 头像 -->
        <ElBadge class="avatar" isDot :hidden="isShowCount(item) || !isNotify(item)">
          <UserAvatar
            words="3"
            shape="square"
            :sessionId="item.conversationID"
            :type="item.type === 'C2C' ? 'single' : 'group'"
            :nickName="item._displayName"
            :url="item.type === 'C2C' ? item.userProfile?.avatar : item?.groupProfile?.avatar"
          />
        </ElBadge>
        <!-- 消息 -->
        <div class="message-item-right">
          <div class="message-item-right-top flex-bc">
            <div class="message-chat-name flex">
              <span class="name-title truncate">{{ item._displayName }}</span>
              <CustomLabel v-if="item.userProfile?.userID" :item="item" :userID="item.userProfile.userID" />
            </div>
            <div v-if="item._displayTime" class="message-time">
              {{ item._displayTime }}
            </div>
          </div>
          <div class="message-item-right-bottom truncate">
            <CustomMention v-if="item._isMention || item._hasDraft" :item="item" />
            <span v-else>{{ item._displayMessage }}</span>
          </div>
          <!-- 未读消息红点 -->
          <ElBadge v-show="item._showUnreadCount" :value="item.unreadCount" :max="99" />
          <!-- 消息免打扰 -->
          <BellOff v-show="item._showDontNotify" :size="15" class="dont" />
        </div>
      </div>
    </template>
    <VirtualList v-else :list="displayData" />
    <ContextMenu ref="contextMenuRef" :items="contextMenuItems" @menuClick="handleClickMenuItem" />
  </ElScrollbar>
</template>

<script setup lang="ts">
import { BellOff } from "lucide-vue-next"
import { storeToRefs } from "pinia"

import { useContextMenu } from "@/composables/useContextMenu"
import { useHandlerDrop } from "@/hooks/useHandlerDrop"
import { pinConversation } from "@/service/im-sdk-api"
import { setMessageRemindType } from "@/service/im-sdk-api"
import { useChatStore, useGroupStore, useUserStore, useRouteStore, useTopicStore, useRobotStore } from "@/stores"
import { chatName, formatNewsMessage, isShowCount, isNotify } from "@/utils/chat"
import { chatSessionListData } from "@/utils/contextMenuPresets"
import { timeFormat } from "@/utils/timeFormat"
import { delay } from "@/utils/common"
import emitter, { emitUpdateScrollImmediate } from "@/utils/mitt-bus"

import CustomLabel from "@/components/Chat/CustomLabel.vue"
import CustomMention from "@/components/Chat/CustomMention.vue"
import ContextMenu from "@/components/ContextMenu"
import EmptyMessage from "../components/EmptyMessage.vue"
import VirtualList from "./VirtualList.vue"

import type { DB_Session } from "@/types"
import type { MenuItem } from "@/types/contextMenu"

const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useHandlerDrop()

const isEnableVirtualList = ref(false)
const contextMenuItems = ref<MenuItem[] | []>([])
const contextMenuItemInfo = ref<DB_Session | null>(null)

const groupStore = useGroupStore()
const userStore = useUserStore()
const topicStore = useTopicStore()
const robotStore = useRobotStore()
const chatStore = useChatStore()

const routeStore = useRouteStore()

const { contextMenuRef, showContextMenu, hideContextMenu } = useContextMenu()

const { currentConversation, conversationList, searchConversationList, currentSessionId, sessionId } =
  storeToRefs(chatStore)

const searchForData = computed(() => {
  if (searchConversationList.value?.length) {
    return searchConversationList.value
  } else {
    return conversationList.value
  }
})

interface DisplayCacheItem {
  _displayName: string
  _displayTime: string
  _displayMessage: string
  _isActive: boolean
  _showUnreadCount: boolean
  _isMention: boolean
  _hasDraft: boolean
  _showDontNotify: boolean
}

const displayData = computed(() => {
  const currentId = currentSessionId.value
  return searchForData.value.map((item) => {
    const conversationID = item.conversationID
    const name = chatName(item)
    const lastMessageTime = item.lastMessage?.lastTime
    const time = lastMessageTime ? timeFormat(lastMessageTime * 1000) : ""
    const messageContent = formatNewsMessage(item, userStore.userProfile?.userID)
    const isActive = conversationID === currentId
    const showUnreadCount = !isShowCount(item) && !isNotify(item) && item.type !== "@TIM#SYSTEM"
    const isMentioned = (item.groupAtInfoList?.length ?? 0) > 0
    const hasDraft = conversationID !== currentId && chatStore.chatDraftMap.has(conversationID)
    const showDontNotify = isNotify(item)

    const computedData: DisplayCacheItem = {
      _displayName: name,
      _displayTime: time,
      _displayMessage: messageContent,
      _isActive: isActive,
      _showUnreadCount: showUnreadCount,
      _isMention: isMentioned,
      _hasDraft: hasDraft,
      _showDontNotify: showDontNotify,
    }

    return {
      ...item,
      ...computedData,
    }
  })
})

const handleContextMenuEvent = (event: MouseEvent, item: DB_Session) => {
  if (item.type === "@TIM#SYSTEM") {
    hideContextMenu()
    return
  }
  handleContextMenu(item)
  showContextMenu(event, item)
}

const handleContextMenu = (item: DB_Session) => {
  contextMenuItemInfo.value = item
  const hiddenKeys = new Set<string>()
  item.isPinned ? hiddenKeys.add("pin") : hiddenKeys.add("unpin")
  isNotify(item) ? hiddenKeys.add("mute") : hiddenKeys.add("unmute")
  contextMenuItems.value = chatSessionListData.filter((t) => !hiddenKeys.has(t.key))
}

const handleConversationListClick = (data: DB_Session) => {
  console.log("会话点击 handleConversationListClick:", data)
  if (currentSessionId.value === data?.conversationID) return

  chatStore.setMsgEdit(null)
  chatStore.setScrollTopID("")
  chatStore.setReplyMsgData(null)
  chatStore.setForwardData({ type: "clear" })
  chatStore.updateSelectedConversation(data)
  topicStore.setRolePrompt(robotStore.promptConfig?.prompt[0]?.content || "")

  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(
      () => {
        chatStore.updateMessageList(data)
        if (data?.type === "GROUP") {
          groupStore.handleGroupProfile(data)
          groupStore.handleGroupMemberList({ groupID: data?.groupProfile?.groupID ?? "" })
        }
      },
      { timeout: 100 }
    )
  } else {
    setTimeout(() => {
      chatStore.updateMessageList(data)
      if (data?.type === "GROUP") {
        groupStore.handleGroupProfile(data)
        groupStore.handleGroupMemberList({ groupID: data?.groupProfile?.groupID ?? "" })
      }
    }, 0)
  }

  emitter.emit("handleInsertDraft", {
    sessionId: data?.conversationID,
  })
  emitUpdateScrollImmediate()
}

const handleClickMenuItem = (item: { key: string }) => {
  const data = contextMenuItemInfo.value
  if (!data) return
  if (["pin", "unpin"].includes(item.key)) {
    pingConversation(data) // 置顶 or 取消置顶
  } else if (["mute", "unmute"].includes(item.key)) {
    disableRecMsg(data) // 消息免打扰 or 允许消息提醒
  } else if (item.key === "delete") {
    removeConversation(data) // 删除会话
  } else if (item.key === "clean") {
    console.log("清除消息") // 清除消息
  }
}
// 消息免打扰
const disableRecMsg = async (data: DB_Session) => {
  await setMessageRemindType(data)
}

const removeConversation = async (data: DB_Session) => {
  chatStore.deleteSession({ sessionId: data.conversationID })
}

const pingConversation = async (data: DB_Session) => {
  await pinConversation({
    conversationID: data.conversationID,
    isPinned: Boolean(data?.isPinned),
  })
}

onMounted(async () => {
  await nextTick()
  if (!currentConversation.value) {
    if (sessionId.value !== "inbox") {
      await delay(200)
      const matchedConversation = conversationList.value.find((item) => item.conversationID === sessionId.value)
      if (matchedConversation) {
        handleConversationListClick(matchedConversation)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.scrollbar-list {
  background: var(--color-body-bg);
  height: 100%;
  overflow: hidden;
}
.message-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 12px 16px;
  user-select: none;
  height: 64px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  color: var(--color-text);
  content-visibility: auto;
  contain-intrinsic-size: 0 64px;
  transform: translateZ(0);
  will-change: transform;
  &:hover {
    background: var(--icon-hover-color);
  }
  .avatar {
    height: 40px;
    min-width: 40px;
  }
  .pinned-tag {
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    border-radius: 2px;
    opacity: 0.8;
    border: 6px solid rgb(121.3, 187.1, 255);
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .portrait {
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }
  .message-item-right {
    width: 200px;
    min-width: 200px;
    height: 100%;
    position: relative;
    .dont {
      position: absolute;
      right: 0;
      top: 26px;
      font-size: 14px;
      color: var(--color-time-divider);
    }
    .message-item-right-top {
      padding-bottom: 10px;
      width: 100%;
      .message-chat-name {
        font-size: 14px;
        color: var(--color-message-chat-name);
        max-height: 18px;
        line-height: 18px;
        max-width: 140px;
        .name-title {
          padding-right: 5px;
        }
      }
      .message-time {
        font-family: MicrosoftYaHei;
        font-size: 10px;
        color: var(--color-time-divider);
      }
    }
    .message-item-right-bottom {
      font-size: 12px;
      color: var(--color-time-divider);
      width: 180px;
      max-width: 200px;
      /* 优化 LCP：使用 content-visibility 延迟渲染非关键内容 */
      content-visibility: auto;
      contain-intrinsic-size: 0 18px;
      /* 优化文本渲染性能 */
      text-rendering: optimizeSpeed;
      /* 避免不必要的重绘 */
      transform: translateZ(0);
      backface-visibility: hidden;
    }
    .svg-icon {
      color: rgba(0, 0, 0, 0.45);
    }
    .el-badge {
      position: absolute;
      right: 0px;
      bottom: -2px;
      sup {
        top: 0;
      }
    }
  }
}
.is-active {
  background: var(--color-message-active) !important;
}
.over-style {
  background: var(--color-message-active) !important;
}
</style>
