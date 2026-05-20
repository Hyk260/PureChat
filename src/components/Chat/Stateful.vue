<template>
  <div v-if="shouldShowState(item)" class="stateful flex-c mt-auto">
    <!-- 发送中 -->
    <SpinnersRingResize v-if="isStatus('unSend') || isStatus('sending')" aria-label="发送中" />
    <!-- <div v-if="isStatus('unSend') || isStatus('sending')" aria-label="发送中" class="iconify-icon svg-spinners"></div> -->
    <!-- 发送失败 -->
    <CircleAlert
      v-else-if="isStatus('fail')"
      class="fluent-fail"
      aria-label="发送失败"
      :size="16"
      @click="handleRetry"
    />
  </div>
</template>

<script setup lang="ts">
import { SpinnersRingResize } from "@pure/icons"
import { CircleAlert } from "@lucide/vue"

import type { DB_Message, MessageStatus } from "@pure/database/schemas"

interface Props {
  item: DB_Message
  status: MessageStatus
  testStatus?: MessageStatus
  testShow?: boolean
}

defineOptions({
  name: "Stateful",
})

const props = withDefaults(defineProps<Props>(), {
  testStatus: "sending",
  testShow: false,
})

const isStatus = (value: MessageStatus) => {
  if (props.testShow) return props.testStatus === value
  return props.status === value
}

const shouldShowState = (item: DB_Message) => {
  if (props.testShow) return true
  return (
    item.flow === "out" &&
    !item.isRevoked &&
    item.type !== "TIMTextElem" &&
    item.type !== "TIMGroupTipElem" &&
    (isStatus("unSend") || isStatus("sending") || isStatus("fail"))
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
  .fluent-fail {
    color: #f44336;
    cursor: pointer;
  }
}
</style>
