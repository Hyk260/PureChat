<template>
  <div v-if="shouldShowTime" class="time-divider" :class="timeStyles">
    {{ formatTimestamp(item.clientTime * 1000) }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

// import { useChatStore } from "@/stores/modules/chat"
import { isSelf } from "@/utils/chat"
import { formatTimestamp } from "@/utils/timeFormat"

import type { DB_Message } from "@pure/database/schemas"

defineOptions({
  name: "TimeDivider",
})

interface Props {
  item: DB_Message
  type?: "single" | "group"
  showCheck?: boolean
}

// 支持显示时间的消息类型
const SUPPORTED_MESSAGE_TYPES = [
  "TIMImageElem",
  "TIMFileElem",
  "TIMTextElem",
  "TIMRelayElem",
  "TIMVideoFileElem",
  "TIMCustomElem",
]

const props = withDefaults(defineProps<Props>(), {
  type: "single",
  showCheck: false,
})

// const chatStore = useChatStore()

const shouldShowTime = computed(() => {
  if (!props.item.clientTime) return false

  const { type, isRevoked } = props.item

  return SUPPORTED_MESSAGE_TYPES.includes(type) && type !== "TIMGroupTipElem" && !isRevoked
})

const timeStyles = computed(() => {
  const isCurrentUserMessage = isSelf(props.item)
  const { type, showCheck } = props

  const styleConfig = {
    group: {
      self: ["text-right", "pr-5"],
      other: ["text-left", "pl-5"],
    },
    single: {
      self: ["text-right", "pr-44", "mb-4"],
      other: ["text-left", "pl-44", "mb-4"],
    },
  }

  const baseStyles = styleConfig[type][isCurrentUserMessage ? "self" : "other"]

  // 多选模式下隐藏时间
  if (type === "single" && showCheck) {
    return [...baseStyles, "!opacity-0"]
  }

  return baseStyles
})
</script>

<style lang="scss" scoped>
.time-divider {
  visibility: hidden;
  font-weight: 400;
  color: var(--color-time-divider);
  font-size: 12px;
  opacity: 0.6;
  white-space: nowrap;
  transition: all 0.6s ease;
  width: 100%;
  pointer-events: none;
}
</style>
