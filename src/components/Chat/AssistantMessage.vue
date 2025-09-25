<template>
  <div>
    <div class="message-view-bottom">
      {{ messageAbstract }}
    </div>
    <div class="message-view-question">
      <div v-for="(text, i) in recommendedQuestions" :key="i" @click="handleQuestion(text)">
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageCreator } from "@/hooks/useMessageCreator"
import { useChatStore } from "@/stores"

import type { DB_Message } from "@/types"

defineOptions({
  name: "AssistantMessage",
})

const props = defineProps({
  item: {
    type: Object as PropType<DB_Message>,
    required: true,
  },
})

const chatStore = useChatStore()
const { messageCreator } = useMessageCreator()
const { toAccount, currentType } = storeToRefs(chatStore)

const parsedCustomData = computed(() => {
  if (!props.item.cloudCustomData) return null

  try {
    const data = JSON.parse(props.item.cloudCustomData)
    return data.messagePrompt
  } catch {
    return null
  }
})

const messageAbstract = computed(() => parsedCustomData.value?.messageAbstract ?? "")

const recommendedQuestions = computed(() => parsedCustomData.value?.recQuestion ?? [])

const handleQuestion = async (text: string) => {
  try {
    const message = await messageCreator({
      to: toAccount.value,
      type: currentType.value,
      text: text,
    })
    chatStore.updateSendingState(toAccount.value, "add")
    message.forEach((msg) => {
      chatStore.sendSessionMessage({ message: msg })
    })
  } catch (error) {
    console.error("Error sending chat message:", error)
  }
}
</script>

<style lang="scss" scoped>
.message-view-bottom {
  margin-top: 5px;
  font-size: 12px;
  opacity: 0.3;
  white-space: nowrap;
  transition: all 0.6s ease;
  color: #303030;
}

.message-view-question {
  font-size: 14px;
  margin-top: 5px;

  & > div {
    cursor: pointer;
    width: fit-content;
    padding: 6px 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    font-weight: 400;
    border: 1px solid rgba(6, 7, 8, 0.15);
    color: rgba(6, 7, 9, 0.8);

    &:hover {
      background-color: rgba(6, 7, 9, 0.1);
    }
  }
}
</style>
