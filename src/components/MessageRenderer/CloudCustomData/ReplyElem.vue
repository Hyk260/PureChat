<template>
  <div v-if="hasReplyContent" class="reply-content">
    <!-- 回复发送者 -->
    <div v-if="replySender" class="reply-content__sender">{{ replySender }}:</div>

    <!-- 回复内容 -->
    <template v-if="messageAbstract">
      <div class="reply-content__content">
        <DynamicContent :text="messageAbstract" />
      </div>
      <div v-if="messageID" class="reply-content__mask" @click="scrollToMessage"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import DynamicContent from "@/components/Chat/DynamicContent.vue"

import { scrollToDomPosition } from "@/utils/chat"

import type { MessageStatus } from "@pure/database/schemas"

defineOptions({
  name: "ReplyElem",
})

interface Props {
  originalMsg: any
  status?: MessageStatus
}

const props = withDefaults(defineProps<Props>(), {
  status: "unSend",
})

const messageReply = computed(() => props.originalMsg?.messageReply || null)
const hasReplyContent = computed(() => !!messageReply.value)
const replySender = computed(() => messageReply.value.messageSender)
const messageAbstract = computed(() => messageReply.value.messageAbstract)
const messageID = computed(() => messageReply.value.messageID)

const scrollToMessage = () => {
  if (messageID.value) {
    scrollToDomPosition(messageID.value)
  }
}
</script>

<style lang="scss" scoped>
.reply-content {
  border-left: 3px solid #ccc;
  padding-left: 10px;
  color: #666;
  margin-bottom: 10px;
  position: relative;

  &__sender {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  &__mask {
    cursor: pointer;
    position: absolute;
    inset: 0;
  }
}
</style>
