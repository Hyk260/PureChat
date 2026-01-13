<template>
  <div class="message-view-item-text" :class="messageStyleClasses" @click="handleMessageClick">
    <template v-if="hasValidMessageType">
      <!-- 回复消息 -->
      <ReplyElem v-if="parsedCloudCustomData" :status="message.status" :originalMsg="parsedCloudCustomData" />
      <!-- 思考过程 -->
      <DeepThinking v-if="parsedCloudCustomData" :status="message.status" :originalMsg="parsedCloudCustomData" />
      <!-- web搜索 -->
      <WebSearch
        v-if="parsedCloudCustomData && message?.flow === 'in'"
        :status="message.status"
        :originalMsg="parsedCloudCustomData"
      />
      <!-- Markdown消息 -->
      <Markdown v-if="shouldShowMarkdown" :cloudCustomData="parsedCloudCustomData" :content="messageText" />
      <DynamicContent v-else :atUserList="message.atUserList" :text="messageText" />
      <!-- <AssistantMessageExtra v-if="chatStore.isAssistant && message.flow === 'in'" /> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import DynamicContent from "@/components/Chat/DynamicContent.vue"
import { DB_Message } from "@pure/database/schemas"
import { useAppStore, useChatStore } from "@/stores"

// import AssistantMessageExtra from "@/components/Chat/AssistantMessageExtra.vue"
import Markdown from "@/components/Markdown/index.vue"
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

const isOut = computed(() => props.message.flow === "out")

const messageText = computed(() => {
  return props.message.payload?.text || ""
})

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
  // 发出消息
  if (isOut.value) {
    return appStore.markdownRender
  } else {
    // 接收消息
    if (chatStore.isAssistant) {
      return appStore.markdownAssistantRender
    } else {
      return false
    }
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
  // width: fit-content;
  // width: 100%;
  max-width: 100%;
  min-width: 0px;
  // max-width: 570px;
  // max-width: calc(100% - 300px);
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
  // max-width: 580px;
}
</style>
