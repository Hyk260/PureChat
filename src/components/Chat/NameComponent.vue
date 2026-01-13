<template>
  <div v-show="showMessageName" class="message-name">
    <!-- 系统通知 -->
    <span v-if="messageType.isSystem" class="system-message"> 系统通知 </span>

    <!-- 管理员消息 -->
    <span v-else-if="messageType.isFoundAdmin" class="admin-message"> 管理员 </span>

    <!-- 群组用户消息 -->
    <span
      v-else-if="messageType.isGroupMessage"
      class="group-message"
      :class="{ 'self-message': userInfo.isSelf }"
      @click="handleMentionUser"
    >
      <span :class="nickNameStyle">
        {{ displayName }}
      </span>
      <span v-if="!userInfo.isSelf" class="mention-symbol">@</span>
      <span v-if="userInfo.isGroupOwner" class="owner-badge">群主</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useChatStore, useGroupStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

import type { DB_Message } from "@pure/database/schemas"

interface Props {
  item: DB_Message
}

const props = withDefaults(defineProps<Props>(), {})

const groupStore = useGroupStore()
const chatStore = useChatStore()

const groupProfile = computed(() => groupStore.groupProfile)
const isMultiSelectMode = computed(() => chatStore.isMultiSelectMode)

const userInfo = computed(() => {
  const item = props.item
  if (!item || !item.from) {
    return {
      isSelf: false,
      isGroupOwner: false,
      senderId: "",
    }
  }

  return {
    isSelf: item.flow === "out",
    isGroupOwner: groupProfile.value?.ownerID === item.from,
    senderId: item.from,
  }
})

const messageType = computed(() => {
  const item = props.item
  if (!item) {
    return {
      isSystem: false,
      isFoundAdmin: false,
      isGroupMessage: false,
    }
  }

  const isGroupChat = item.conversationType !== "C2C"
  const senderId = item.from || ""

  return {
    isSystem: senderId === "@TIM#SYSTEM",
    isFoundAdmin: senderId === "@TLS#NOT_FOUND",
    isGroupMessage: isGroupChat,
  }
})

const showMessageName = computed(() => {
  const item = props.item
  if (!item) return false

  const shouldHide = item.isRevoked || item.type === "TIMGroupTipElem"
  return messageType.value.isGroupMessage && !shouldHide
})

const displayName = computed(() => {
  const item = props.item
  return item?.nick || item?.from || "未知用户"
})

const nickNameStyle = computed(() => (isMultiSelectMode.value ? "" : "nick"))

const handleMentionUser = () => {
  if (isMultiSelectMode.value) return

  if (userInfo.value.isSelf) return

  const item = props.item
  if (!item?.from) return

  try {
    emitter.emit("handleAt", {
      id: item.from,
      name: displayName.value,
    })
  } catch (error) {
    console.error("处理@用户时发生错误:", error)
  }
}
</script>

<style lang="scss" scoped>
.message-name {
  margin-bottom: 5px;
  white-space: nowrap;
  color: var(--color-time-divider);
  font-size: 12px;
}

.owner-badge {
  white-space: nowrap;
  background: #e6f7ff;
  border: 1px solid rgb(145, 213, 255);
  color: #1890ff;
  border-radius: 2px;
  font-size: 10px;
  padding: 0 4px;
  display: inline-block;
}

.group-message {
  cursor: pointer;

  .mention-symbol {
    visibility: hidden;
  }

  &:hover {
    .mention-symbol,
    .nick {
      color: rgb(84, 180, 239);
      visibility: visible;
    }
  }
}

.self-message {
  display: flex;
  flex-direction: row-reverse;

  .owner-badge {
    margin-right: 6px;
  }
}

.system-message,
.admin-message {
  font-weight: 500;
}
</style>
