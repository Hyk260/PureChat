<template>
  <component
    :is="messageComponent"
    v-if="messageComponent"
    :key="messageKey"
    :msg-type="msgType"
    :message="message"
    :self="self"
    v-bind="$attrs"
  />
  <div v-else class="message-error">Unknown message type: {{ message?.type }}</div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue"

import type { MessageComponentProps, MessageItem } from "./types/message"
import { getMessageComponent } from "./utils/getMessageComponent"

interface Props extends MessageComponentProps {
  item: MessageItem
}

const props = defineProps<Props>()
const { item, message, self } = toRefs(props)

const messageComponent = computed(() => {
  return getMessageComponent(item.value)
})

const messageKey = computed(() => {
  return `${item.value.ID}_${item.value?.type}_${item.value?.isRevoked ? "revoked" : "normal"}`
})

const msgType = computed(() => {
  return item.value.conversationType
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
