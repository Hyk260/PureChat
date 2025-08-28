<template>
  <div class="relay-message" @click="handleClick">
    <div class="relay-preview">
      <div class="relay-title">
        <span class="title-text truncate" :title="message.payload.title">
          {{ message.payload.title }}
        </span>
      </div>
      <div class="relay-abstract-list">
        <div v-for="item in abstractList" :key="item" class="abstract-item truncate">
          {{ item }}
        </div>
      </div>
    </div>
    <div v-show="messageCount" class="relay-footer">
      {{ `查看${messageCount}条转发消息` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import emitter from "@/utils/mitt-bus"

defineOptions({
  name: "RelayElemItem",
})

const { message } = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const messageCount = computed(() => {
  return message.payload.messageList?.length || message.payload.abstractList?.length
})

const abstractList = computed(() => {
  return message.payload.abstractList?.slice(0, 2) || []
})

function handleClick() {
  emitter.emit("openMergePopup", message)
}
</script>

<style lang="scss" scoped>
.relay-message {
  width: 232px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
}

.relay-preview {
  max-height: 105px;
}

.relay-title {
  height: 35px;
  padding: 12px 12px 0;

  .title-text {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    width: 100%;
    display: inline-block;
  }
}

.relay-abstract-list {
  .abstract-item {
    height: 20px;
    padding: 0 12px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    box-sizing: border-box;
  }
}

.relay-footer {
  height: 30px;
  line-height: 30px;
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.45);
  border-top: 1px solid #d5dbdf;
}
</style>
