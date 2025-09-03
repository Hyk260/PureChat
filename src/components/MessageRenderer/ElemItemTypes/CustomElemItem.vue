<template>
  <div class="message-item-custom" :class="messageClass" @click="handleClick">
    <Loading v-if="isMessageType('loading')" />
    <div v-else class="text">{{ customMessageContent() }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue"

import { DB_Message } from "@/database/schemas/message"

import Loading from "../CustomMsgBody/Loading.vue"

const props = defineProps({
  message: {
    type: Object as PropType<DB_Message>,
    default: () => ({}),
  },
})

const messageClass = computed(() => [
  props.message.flow === "out" ? "is-text-self" : "is-text-other",
  // isMessageType("warning") ? "!p-0" : "",
])

const isMessageType = (type: string): boolean => props?.message?.payload?.description === type

const handleClick = () => {
  console.log(props.message)
}

const customMessageContent = (): string => {
  try {
    const { data, extension, text } = props.message.payload

    const payload = data ? JSON.parse(data) : {}

    if (payload.businessID === "group_create") {
      return `${payload.opUser}${payload.content}`
    }

    if (data === "group_create") {
      return extension || ""
    }

    if (payload?.onlyID === "warning") {
      return "API Key 不正确或为空，请检查 API Key 后重试"
    }

    if (payload?.chatbotPlugin === 2) {
      try {
        return payload?.chunks.map((chunk: string) => chunk).join("") || ""
      } catch (error) {
        console.error("解析消息内容失败:", error)
        return "[机器人自定义消息]"
      }
    }

    return text ?? "[自定义消息]"
  } catch (error) {
    console.error("解析消息内容失败:", error)
    return "[自定义消息]"
  }
}
</script>

<style lang="scss" scoped>
.message-item-custom {
  width: fit-content;
  padding: 10px 14px;
  max-width: 460px;
  min-height: 36px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  .text {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
}
</style>
