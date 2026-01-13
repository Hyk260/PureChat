<template>
  <div class="message-item-custom" :class="messageClass" @click="handleClick">
    <Loading v-if="isMessageType('loading')" />
    <Warning v-else-if="isMessageType('warning')" :payload="message.payload" />
    <div v-else class="text">{{ customMessageContent() }}</div>
  </div>
</template>

<script setup lang="ts">
import Loading from "../CustomMsgBody/Loading.vue"
import Warning from "../CustomMsgBody/Warning.vue"

import type { DB_Message, CustomPayloadType } from "@pure/database/schemas"

interface Props {
  message: DB_Message
}

const props = defineProps<Props>()

const messageClass = computed(() => [
  props.message.flow === "out" ? "is-text-self" : "is-text-other",
  isMessageType("warning") ? "!p-0" : "",
])

const isMessageType = (type: string): boolean => props?.message?.payload?.description === type

const handleClick = () => {
  console.log("CustomMsgBody:", props.message)
}

const customMessageContent = (): string => {
  try {
    const messagePayload = props.message.payload as CustomPayloadType
    const { data, extension, text } = messagePayload

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
        if (payload?.errorInfo) {
          return payload?.errorInfo
        } else {
          return "[chatbot自定义消息]"
        }
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
    word-break: break-all;
  }
}
</style>
