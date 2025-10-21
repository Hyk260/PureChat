<template>
  <div v-if="shouldShowState(item)" class="stateful flex-c mt-auto">
    <!-- 发送中 -->
    <div v-show="isStatus('unSend') || isStatus('sending')" aria-label="发送中" class="iconify-icon svg-spinners"></div>
    <!-- 发送失败 -->
    <div v-show="isStatus('fail')" aria-label="发送失败" class="iconify-icon fluent-error" @click="handleRetry"></div>
  </div>
</template>

<script setup lang="ts">
import type { DB_Message, MessageStatus } from "@/database/schemas/message"

interface Props {
  item: DB_Message
  testStatus?: MessageStatus
  testShow?: boolean
}

defineOptions({
  name: "Stateful",
})

const props = withDefaults(defineProps<Props>(), {
  testStatus: "unSend",
  testShow: true,
})

const isStatus = (value: MessageStatus) => {
  // return props.testStatus === value
  return props.item.status === value
}

const shouldShowState = (item: DB_Message) => {
  // return props.testShow
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
