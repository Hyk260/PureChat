<template>
  <span v-html="displayText"></span>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useChatStore } from "@/stores"
import { formatContent } from "@/utils/chat"
import { encodeHTML } from "@/utils/common"
import type { DB_Session } from "@/types"

interface Props {
  item: DB_Session
}

const props = defineProps<Props>()

const chatStore = useChatStore()
const { currentSessionId } = storeToRefs(chatStore)

const createMessagePrompt = (type: "at" | "draft" = "at") => {
  const messageTypes = { at: "有人@我", draft: "草稿" }
  return `<span style='color:#f44336;'>[${messageTypes[type]}]</span>`
}

const displayText = computed(() => {
  const { item } = props
  const { lastMessage, conversationID: ID, unreadCount } = item
  const { messageForShow, nick: lastNick = "未知用户" } = lastMessage ?? {}
  const draft = chatStore.chatDraftMap.get(ID)

  // 草稿
  if (draft && ID !== currentSessionId.value) {
    const str = encodeHTML(formatContent(draft))
    return `${createMessagePrompt("draft")} ${str}`
  }

  // @消息
  const isUnread = unreadCount !== 0
  return `${isUnread ? `${createMessagePrompt("at")}` : ""} ${lastNick}: ${messageForShow}`
})
</script>
