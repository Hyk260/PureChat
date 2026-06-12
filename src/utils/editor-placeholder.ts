import { computed } from "vue"

import { $t } from "@/locales"

export const placeholderMap = computed(() => {
  return {
    Windows: $t("chat.buttonPrompt"),
    "Mac OS": $t("chat.buttonPromptMac"),
    input: $t("chat.PromptInputContent"),
  }
})
