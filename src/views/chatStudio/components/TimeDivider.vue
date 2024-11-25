<template>
  <div v-if="showClientTime(item)" class="time-divider" :class="fnStyle">
    {{ formatTimestamp(item.clientTime * 1000) }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import { isSelf } from "../utils/utils";
import { formatTimestamp } from "@/utils/timeFormat";
import { useState } from "@/utils/hooks/useMapper";

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
});

const {
  showCheckbox,
} = useState({
  showCheckbox: (state) => state.conversation.showCheckbox,
});

function showClientTime(item) {
  // 图片 文件 文本 合并 视频
  const msg = ["TIMImageElem", "TIMFileElem", "TIMTextElem", "TIMRelayElem", "TIMVideoFileElem"];
  return (
    item.clientTime && msg.includes(item.type) && item.type !== "TIMGroupTipElem" && !item.isRevoked
  );
}

const fnStyle = computed(() => {
  let _isSelf = isSelf(props.item);
  if (props.type === "group") {
    return [_isSelf ? "text-right pr-5" : "text-left pl-5"];
  } else {
    if (showCheckbox.value) return ["!opacity-0"];
    return [_isSelf ? "text-right pr-44" : "text-left pl-44"];
  }
});
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
  z-index: 1;
}
</style>
