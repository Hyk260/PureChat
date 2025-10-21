<template>
  <div class="message-renderer">
    <Suspense v-if="messageComponent">
      <component :is="messageComponent" :key="messageKey" :message="message" v-bind="$attrs" />
      <template #fallback>
        <div class="message-loading">加载中...</div>
      </template>
    </Suspense>
    <div v-else class="message-error">
      <span class="error-icon">⚠️</span>
      <span>未知的消息类型: {{ message?.type || "Unknown message type" }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMessageComponent } from "./utils/getMessageComponent"

import type { DB_Message } from "@/database/schemas/message"

defineOptions({
  name: "MessageRenderer",
})

interface Props {
  message: DB_Message
}

const props = defineProps<Props>()

const messageComponent = computed(() => {
  try {
    return getMessageComponent(props.message)
  } catch (error) {
    console.error("[MessageRenderer] 获取消息组件失败:", error)
    return null
  }
})

const messageKey = computed(() => {
  const { ID, type, isRevoked } = props.message
  const status = isRevoked ? "revoked" : "normal"
  return `${ID}_${type}_${status}`
})
</script>

<style scoped lang="scss">
.message-loading {
  padding: 8px;
  color: #666;
  font-size: 12px;
  text-align: center;
  opacity: 0.7;
}

.message-error {
  padding: 8px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 12px;
}
</style>
