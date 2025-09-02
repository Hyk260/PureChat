<template>
  <div v-if="isShowState(item)" class="stateful flex-c mt-auto">
    <!-- 发送中 -->
    <div v-show="isShow('unSend')" class="iconify-icon svg-spinners"></div>
    <!-- 发送失败 -->
    <div v-show="isShow('fail')" class="iconify-icon fluent-error"></div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"

import type { DB_Message } from "@/database/schemas/message"

defineOptions({
  name: "Stateful",
})

const props = defineProps({
  item: {
    type: Object as PropType<DB_Message>,
    default: null,
  },
  // unSend(未发送)fail(发送失败)success(发送成功)sending(发送中)
  status: {
    type: String,
    default: "unSend",
  },
})

const isShow = (value: string) => {
  // return true
  return props.status === value
}

const isShowState = (item: DB_Message) => {
  return (
    item.flow === "out" &&
    !item.isRevoked &&
    item.type !== "TIMTextElem" &&
    item.type !== "TIMGroupTipElem" &&
    (isShow("unSend") || isShow("fail"))
  )
}
</script>

<style lang="scss" scoped>
.stateful {
  .fluent-error {
    cursor: pointer;
  }
}
</style>
