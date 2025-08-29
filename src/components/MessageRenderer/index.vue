<template>
  <div class="message-renderer">
    <component :is="messageComponent" v-if="messageComponent" :key="messageKey" :message="message" v-bind="$attrs" />
    <div v-else class="message-error">Unknown message type: {{ message?.type }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue"

import type { DB_Message } from "@/database/schemas/message"

import { getMessageComponent } from "./utils/getMessageComponent"

defineOptions({
  name: "MessageRenderer",
})

interface Props {
  message: DB_Message
}

const props = defineProps<Props>()
const { message } = toRefs(props)

const messageComponent = computed(() => {
  return getMessageComponent(message.value)
})

const messageKey = computed(() => {
  return `${message.value.ID}_${message.value?.type}_${message.value?.isRevoked ? "revoked" : "normal"}`
})
</script>

<style scoped lang="scss">
.message-error {
  padding: 8px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 12px;
}
</style>
