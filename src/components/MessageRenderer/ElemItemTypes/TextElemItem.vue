<template>
  <div class="message-view-item-text" :class="messageStyleClasses" @click="handleMessageClick">
    <template v-if="hasValidMessageType">
      <!-- 回复消息 -->
      <ReplyElem v-if="parsedCloudCustomData" :status="message.status" :original-msg="parsedCloudCustomData" />
      <!-- 思考过程 -->
      <DeepThinking v-if="parsedCloudCustomData" :status="message.status" :original-msg="parsedCloudCustomData" />
      <!-- web搜索 -->
      <WebSearch
        v-if="parsedCloudCustomData && message?.flow === 'in'"
        :status="message.status"
        :original-msg="parsedCloudCustomData"
      />
      <!-- Markdown消息 -->
      <Markdown v-if="shouldShowMarkdown" :cloud-custom-data="parsedCloudCustomData" :content="message.payload.text" />
      <DynamicContent v-else :at-user-list="message.atUserList" :text="message.payload.text" />
    </template>
  </div>
</template>

<script setup lang="ts">
import DynamicContent from "@/components/Chat/DynamicContent.vue"
import { DB_Message } from "@/database/schemas/message"
import { useAppStore, useChatStore } from "@/stores"

import ReplyElem from "../CloudCustomData/ReplyElem.vue"
import DeepThinking from "../CloudCustomData/DeepThinking.vue"
import WebSearch from "../CloudCustomData/WebSearch.vue"

interface Props {
  message: DB_Message
  showMarkdown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showMarkdown: true,
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
  if (!props.showMarkdown) return false
  if (chatStore.isAssistant) {
    // 支持输入消息markdown渲染
    if (appStore.markdownRender && props.message?.flow === "out") return true
    // 助手消息markdown渲染
    if (appStore.markdownAssistantRender && props.message?.flow === "in") return true
    return false
  } else {
    return false
  }
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
