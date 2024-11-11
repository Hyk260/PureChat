<template>
  <div v-if="showClientTime(item)" class="time-divider" :class="fnStyle(item)">
    {{ formatTimestamp(item.clientTime * 1000) }}
  </div>
</template>

<script setup>
import { isSelf } from "../utils/utils";
import { formatTimestamp } from "@/utils/timeFormat";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: "single", // group or single
  },
});

function showClientTime(item) {
  // 图片 文件 文本 合并 视频
  const msg = ["TIMImageElem", "TIMFileElem", "TIMTextElem", "TIMRelayElem","TIMVideoFileElem"];
  return (
    item.clientTime && msg.includes(item.type) && item.type !== "TIMGroupTipElem" && !item.isRevoked
  );
}

function fnStyle(item) {
  if (props.type === "group") return [isSelf(item) ? "time-right-group" : "time-left-group"];
  return [isSelf(item) ? "time-right" : "time-left"];
}
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
.time-right-group {
  padding-right: 5px;
  text-align: right;
}
.time-left-group {
  padding-left: 5px;
  text-align: left;
}
.time-right {
  padding-right: 44px;
  text-align: right;
}
.time-left {
  padding-left: 44px;
  text-align: left;
}
</style>
