<template>
  <div class="message-view-item-text" :class="messageStyleClasses" @click="handleMessageClick">
    <template v-if="hasValidMessageType">
      <!-- 回复消息 -->
      <ReplyElem v-if="parsedCloudCustomData" :status="message.status" :original-msg="parsedCloudCustomData" />
      <Markdown v-if="shouldShowMarkdown" :cloud-custom-data="parsedCloudCustomData" :marked="message.payload.text" />
      <DynamicContent v-else :at-user-list="message.atUserList" :text="message.payload.text" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue"

import { DB_Message } from "@/database/schemas/message"
import { useAppStore, useChatStore } from "@/stores"
import DynamicContent from "@/views/chat/components/DynamicContent.vue"

import ReplyElem from "./ReplyElem.vue"

const props = defineProps({
  message: {
    type: Object as PropType<DB_Message>,
    default: () => ({}),
  },
})

const chatStore = useChatStore()
const appStore = useAppStore()

const hasValidMessageType = computed(() => {
  return !!props.message && !!props.message?.conversationType
})

const parsedCloudCustomData = computed(() => {
  try {
    return props.message?.cloudCustomData ? JSON.parse(props.message.cloudCustomData) : null
  } catch (error) {
    console.error("Failed to parse cloudCustomData:", error)
    return null
  }
})

const shouldShowMarkdown = computed(() => {
  if (appStore.markdownRender) return true
  return chatStore.isAssistant && props.message?.flow === "in"
})

const messageStyleClasses = computed(() => {
  return [props.message?.flow === "in" ? "is-text-other" : "is-text-self", shouldShowMarkdown.value ? "markdown" : ""]
    .join(" ")
    .trim()
})

const handleMessageClick = () => {
  console.log("Message clicked:", props.message)
}
</script>

<style lang="scss" scoped>
:global(body .is-text-self) {
  background: var(--self-msg-color);
}

:global(body .is-text-other) {
  background: var(--other-msg-color);
}

.message-view-item-text {
  width: fit-content;
  max-width: 570px;
  min-height: 36px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  word-break: break-all;
  white-space: pre-wrap;
  color: var(--color-text);
}

.markdown {
  white-space: unset;
}

.markdown-body {
  position: relative;
  overflow: hidden;
  max-width: 580px;
}
</style>
