<template>
  <component :is="renderContent" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useChatStore } from "@/stores/modules/chat"
import { formatContent } from "@/utils/chat"
import type { DB_Session } from "@/types"

interface Props {
  item: DB_Session
}

const props = defineProps<Props>()

const PROMPT_STYLE = { color: "#f44336" }
const PROMPT_LABELS = {
  at: "有人@我",
  draft: "草稿",
}

const chatStore = useChatStore()
const { currentSessionId } = storeToRefs(chatStore)

const conversationID = computed(() => props.item.conversationID)
const unreadCount = computed(() => props.item.unreadCount ?? 0)
const lastMessage = computed(() => props.item.lastMessage)

const lastNick = computed(() => lastMessage.value?.nick ?? "未知用户")
const messageForShow = computed(() => lastMessage.value?.messageForShow ?? "")

const draftContent = computed(() => {
  const draft = chatStore.chatDraftMap?.get(conversationID.value)
  return draft ? formatContent(draft) : ""
})

const shouldShowDraft = computed(() => draftContent.value && conversationID.value !== currentSessionId.value)

const isUnread = computed(() => unreadCount.value !== 0)

const createPromptNode = (type: keyof typeof PROMPT_LABELS) => {
  return h("span", { style: PROMPT_STYLE }, `[${PROMPT_LABELS[type]}]`)
}

const renderContent = () => {
  const nodes: Array<string | ReturnType<typeof h>> = []

  if (shouldShowDraft.value) {
    // 草稿模式：[草稿] 草稿内容
    nodes.push(createPromptNode("draft"), " ", draftContent.value)
  } else {
    // 普通消息模式：[有人@我] 昵称: 消息内容
    if (isUnread.value) {
      nodes.push(createPromptNode("at"), " ")
    }
    nodes.push(`${lastNick.value}: ${messageForShow.value}`)
  }

  return h("span", { class: "session-preview" }, nodes)
}
</script>
