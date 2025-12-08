<template>
  <div v-if="chatStore.isMultiSelectMode" class="message-toolbar">
    <div class="toolbar-content">
      <span class="selected-count">选中 {{ getForwardCount }} 条消息</span>
      <div class="action-buttons">
        <ElTooltip content="截图分享" placement="top">
          <button class="action-btn" :disabled="isForwardDataEmpty" @click="handleShare">
            <Share2 :size="16" />
          </button>
        </ElTooltip>

        <ElTooltip v-if="!IS_LOCAL_MODE" content="合并转发" placement="top">
          <button class="action-btn" :disabled="isForwardDataEmpty" @click="onMergeForward">
            <Merge :size="16" />
          </button>
        </ElTooltip>

        <ElTooltip v-if="!IS_LOCAL_MODE" content="逐条转发" placement="top">
          <button class="action-btn" :disabled="isForwardDataEmpty" @click="onForwardItemByItem">
            <Forward :size="16" />
          </button>
        </ElTooltip>

        <ElTooltip content="删除" placement="top">
          <button class="action-btn delete-btn" :disabled="isForwardDataEmpty" @click="handleDelete">
            <Trash2 :size="16" />
          </button>
        </ElTooltip>

        <ElTooltip content="关闭" placement="top">
          <button class="action-btn close-btn" @click="handleClose">
            <X :size="16" />
          </button>
        </ElTooltip>
      </div>
    </div>
    <!-- 截图分享弹窗 -->
    <ShareModal @on-close="handleClose" />
    <!-- 合并/逐条转发弹窗 -->
    <MessageForwardingPopup ref="wardingRef" @confirm="confirm" />
  </div>
</template>

<script setup lang="ts">
import { Forward, Merge, Share2, Trash2, X } from "lucide-vue-next"
import { ElMessageBox } from "element-plus"
import { storeToRefs } from "pinia"

import MessageForwardingPopup from "@/components/Popups/MessageForwardingPopup.vue"
import ShareModal from "@/components/ShareModal/index.vue"
import { createForwardMessage, createMergerMessage, sendMessage } from "@/service/im-sdk-api"
import { useChatStore, useUserStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

const chatStore = useChatStore()
const userStore = useUserStore()

const wardingRef = useTemplateRef("wardingRef")
const multipleValue = ref(null)

const { getForwardCount, isForwardDataEmpty, currentSessionId, isGroupChat, currentConversation } =
  storeToRefs(chatStore)

const handleShare = () => {
  emitter.emit("handleShareModal", true)
}

const onMergeForward = () => {
  if (isForwardDataEmpty.value) return
  setDialogVisible("MergeForward")
}

const onForwardItemByItem = () => {
  if (isForwardDataEmpty.value) return
  setDialogVisible("ForwardItemByItem")
}

const handleDelete = async () => {
  const result = await ElMessageBox.confirm(`确认删除选中的 ${getForwardCount.value} 条消息吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
  if (result === "cancel") return
  if (isForwardDataEmpty.value) return
  const data = chatStore.getSortedForwardData
  chatStore.deleteMessage({
    sessionId: currentSessionId.value,
    messageIdArray: [...data.map((item) => item.ID)],
    message: data,
  })
  shutdown()
}

const handleClose = () => {
  shutdown()
}

const confirm = ({ value, type }) => {
  setMultipleValue(value)
  handleConfirm(type)
}

const handleConfirm = (type) => {
  switch (type) {
    case "MergeForward":
      mergeForward()
      break
    case "ForwardItemByItem":
      aQuickForward()
      break
  }
}

const setDialogVisible = (type = "") => {
  wardingRef.value?.openPopup(type)
}

const setMultipleValue = (value = null) => {
  multipleValue.value = value
}

const shutdown = () => {
  chatStore.setForwardData({ type: "clear" })
  chatStore.toggleMultiSelectMode(false)
  setMultipleValue()
}

const transformData = (data) => {
  return data.map((item) => {
    if (item.type === "TIMTextElem") {
      return `${item.nick}: ${item.payload.text}`
    } else if (item.type === "TIMImageElem") {
      return `${item.nick}: [图片]`
    } else if (item.type === "TIMFileElem") {
      return `${item.nick}: [文件]`
    } else if (item.type === "TIMRelayElem") {
      return `${item.nick}: [合并消息]`
    } else if (item.type === "TIMCustomElem") {
      return `${item.nick}: [自定义消息]`
    } else {
      return `${item.nick}: [待开发]`
    }
  })
}

const mergeTitle = () => {
  const otherProfile = currentConversation.value.userProfile || {}
  const self = userStore.userProfile.nick || userStore.userProfile.userID
  return isGroupChat.value ? "群聊的聊天记录" : `${otherProfile?.nick}和${self}的聊天记录`
}

const sendAndHandleMessage = async (message) => {
  const { code, message: data } = await sendMessage(message)
  if (code === 0) {
    chatStore.sendSessionMessage({ message: data })
  }
}

const mergeForward = async () => {
  if (!multipleValue.value) return
  const { toAccount, type } = multipleValue.value
  const forwardData = chatStore.getSortedForwardData
  const forwardMsg = createMergerMessage({
    to: toAccount,
    type,
    title: mergeTitle(),
    abstractList: transformData(forwardData),
    messageList: forwardData,
  })
  await sendAndHandleMessage(forwardMsg)
  shutdown()
}

const aQuickForward = async () => {
  if (!multipleValue.value) return
  const forwardData = chatStore.getSortedForwardData
  const { toAccount, type } = multipleValue.value
  await Promise.all(
    forwardData.map(async (t) => {
      const forwardMsg = createForwardMessage({
        to: toAccount,
        type,
        message: t,
      })
      await sendAndHandleMessage(forwardMsg)
    })
  )
  shutdown()
}
</script>

<style lang="scss" scoped>
.message-toolbar {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 20px;
  bottom: 60px;
  z-index: 5;
  transform: translateX(-50%);
  left: 50%;

  .toolbar-content {
    display: flex;
    align-items: center;
    background-color: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 6px 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    gap: 8px;

    .selected-count {
      font-size: 14px;
      color: #333;
      margin-right: 8px;
    }

    .action-buttons {
      display: flex;
      align-items: center;
      gap: 8px;

      .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background-color: transparent;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #666;

        &:hover {
          background-color: #f5f5f5;
          color: #333;
        }

        &.delete-btn {
          color: #ff4757;

          &:hover {
            background-color: #fff5f5;
            color: #ff3742;
          }
        }

        &.close-btn {
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .message-toolbar {
    padding: 16px;

    .toolbar-content {
      padding: 10px 12px;
      gap: 12px;

      .selected-count {
        font-size: 13px;
      }

      .action-buttons {
        gap: 6px;

        .action-btn {
          width: 28px;
          height: 28px;
        }
      }
    }
  }
}

:deep(.el-tooltip__trigger) {
  display: inline-flex;
}
</style>
