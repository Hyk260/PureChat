<template>
  <div class="message-renderer">
    <component :is="messageComponent" v-if="messageComponent" :message="message" v-bind="attrs" />
    <div v-else class="message-error">
      <span class="error-icon">⚠️</span>
      <span>未知的消息类型: {{ message?.type || "Unknown message type" }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMessageComponent } from "./utils/getMessageComponent"

import type { DB_Message } from "@pure/database/schemas"

defineOptions({
  name: "MessageRenderer",
})

interface Props {
  message: DB_Message
}

const props = defineProps<Props>()

const attrs = useAttrs()

const messageComponent = computed(() => {
  try {
    return getMessageComponent(props.message)
  } catch (error) {
    console.error("[MessageRenderer] 获取消息组件失败:", error)
    return null
  }
})
</script>

<style scoped lang="scss">
.message-renderer {
  max-width: 100%;
  min-width: 0px;
  // width: 100%;
  // width: fit-content;
}
.message-loading {
  min-height: 36px;
  padding: 8px;
  border-radius: 5px;
  color: #666;
  font-size: 12px;
  text-align: center;
  background: var(--other-msg-color);
}

.message-error {
  min-height: 36px;
  padding: 8px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 12px;
}
</style>
