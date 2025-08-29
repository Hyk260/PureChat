<template>
  <div v-if="showClientTime(item)" class="time-divider" :class="fnStyle">
    {{ formatTimestamp(item.clientTime * 1000) }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { useChatStore } from "@/stores/modules/chat"
import { isSelf } from "@/utils/chat"
import { formatTimestamp } from "@/utils/timeFormat"

defineOptions({
  name: "TimeDivider",
})

const chatStore = useChatStore()

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: "single", // group or single
  },
  showCheck: {
    type: Boolean,
    default: false, // group or single
  },
})

function showClientTime(item) {
  // 图片 文件 文本 合并 视频 自定义
  const msg = ["TIMImageElem", "TIMFileElem", "TIMTextElem", "TIMRelayElem", "TIMVideoFileElem", "TIMCustomElem"]
  return item.clientTime && msg.includes(item.type) && item.type !== "TIMGroupTipElem" && !item.isRevoked
}

const fnStyle = computed(() => {
  let _isSelf = isSelf(props.item)
  if (props.type === "group") {
    return [_isSelf ? "text-right pr-5" : "text-left pl-5"]
  } else {
    const styleArray = [_isSelf ? "text-right pr-44 mb-4" : "text-left pl-44 mb-4"]
    if (chatStore.isMultiSelectMode) return [...styleArray, "!opacity-0"]
    return styleArray
  }
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
