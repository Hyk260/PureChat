<template>
  <div v-if="shouldShowState(item)" class="stateful flex-c mt-auto">
    <!-- 发送中 -->
    <div v-show="isStatus('unSend')" aria-label="发送中" class="iconify-icon svg-spinners"></div>
    <!-- 发送失败 -->
    <div v-show="isStatus('fail')" aria-label="发送失败" class="iconify-icon fluent-error" @click="handleRetry"></div>
  </div>
</template>

<script setup lang="ts">
import { MessageStatusSchema } from "@/database/schemas/message"

import type { DB_Message, MessageStatus } from "@/database/schemas/message"

defineOptions({
  name: "Stateful",
})

const props = defineProps({
  item: {
    type: Object as PropType<DB_Message>,
    required: true,
  },
  status: {
    type: String as PropType<MessageStatus>,
    default: "unSend",
    validator: (value: string) => MessageStatusSchema.options.includes(value as MessageStatus),
  },
})

const isStatus = (value: MessageStatus) => {
  // return true
  return props.status === value
}

const shouldShowState = (item: DB_Message) => {
  return (
    item.flow === "out" &&
    !item.isRevoked &&
    item.type !== "TIMTextElem" &&
    item.type !== "TIMGroupTipElem" &&
    (isStatus("unSend") || isStatus("fail"))
  )
}

const handleRetry = () => {
  console.log("重试发送消息")
}
</script>

<style lang="scss" scoped>
.stateful {
  .fluent-error {
    cursor: pointer;
  }
}
</style>
