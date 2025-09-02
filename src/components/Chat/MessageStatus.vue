<template>
  <div v-if="shouldShowState" class="stateful flex-c mt-auto">
    <!-- 发送状态图标 -->
    <div v-show="status === MessageStatus.SENDING" class="iconify-icon svg-spinners" aria-label="发送中" />

    <div
      v-show="status === MessageStatus.FAIL"
      class="iconify-icon fluent-error cursor-pointer"
      aria-label="发送失败"
      @click="handleRetry"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import type { DB_Message } from "@/database/schemas/message"
import { isSelf } from "@/utils/chat"

// 消息状态枚举
enum MessageStatus {
  SENDING = "sending",
  FAIL = "fail",
  SUCCESS = "success",
  UNSEND = "unSend",
}

// 不显示状态的消息类型
const EXCLUDED_MESSAGE_TYPES = ["TIMTextElem", "TIMGroupTipElem"]

defineOptions({
  name: "MessageStatus",
})

interface Props {
  item: DB_Message | null
  status: MessageStatus
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  status: MessageStatus.UNSEND,
})

// 是否显示状态
const shouldShowState = computed(() => {
  if (!props.item) return false

  const { type, isRevoked } = props.item
  const isValidStatus = [MessageStatus.UNSEND, MessageStatus.FAIL].includes(props.status)

  return isSelf(props.item) && !isRevoked && !EXCLUDED_MESSAGE_TYPES.includes(type) && isValidStatus
})

const handleRetry = () => {
  if (props.status === MessageStatus.FAIL) {
    console.log("重试发送消息")
  }
}
</script>

<style lang="scss" scoped>
.stateful {
  .fluent-error {
    cursor: pointer;
  }
}
</style>
