import { nextTick } from "vue"
import { useChatStore } from "@/stores/modules/chat"

export function findGroupChat(group: { groupID: string }) {
  const { groupID } = group || {}
  nextTick(() => {
    setTimeout(() => {
      const dom = document.getElementById(`message_GROUP${groupID}`)
      if (dom) {
        useChatStore().addConversation({ sessionId: `GROUP${groupID}` })
        dom.scrollIntoView({ behavior: "smooth", block: "center" })
      } else {
        console.warn("定位到群聊失败")
      }
    }, 1350)
  })
}
