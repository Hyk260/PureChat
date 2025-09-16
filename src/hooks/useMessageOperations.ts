import { useChatStore } from "@/stores"
import { abortCompletion } from "@/utils/abortController"

export const usePrepareMessageData = () => {}

export const useMessageOperations = () => {
  const pauseMessages = () => {
    const chatStore = useChatStore()
    const topicMessages = chatStore.currentMessageList
    if (!topicMessages) return

    const streamingMessages = topicMessages.filter((m) => m.status === "sending")

    const askIds = [...new Set(streamingMessages?.map((m) => m.ID).filter((id) => !!id))]

    if (!askIds.length) return

    for (const askId of askIds) {
      abortCompletion(askId)
    }
  }

  return {
    pauseMessages,
  }
}
