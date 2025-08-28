<template>
  <div v-if="hasReplyContent" class="reply-content">
    <!-- 回复发送者 -->
    <div v-if="replySender" class="reply-content__sender">{{ replySender }}:</div>

    <!-- 思考状态内容 -->
    <div v-if="showThinkingContent">
      {{ thinkingContent }}
    </div>

    <!-- 深度思考内容 -->
    <div v-else-if="deeplyThoughtContent" class="reply-content__sender flex gap-8">
      <SvgIcon class="reasoning" local-icon="reasoning" />
      {{ deeplyThoughtContent }}
    </div>

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
import { scrollToDomPosition } from "@/utils/chat"
import DynamicContent from "@/views/chatStudio/components/DynamicContent.vue"

defineOptions({
  name: "ReplyElem",
})

const props = defineProps({
  originalMsg: {
    type: Object,
    default: () => ({}),
  },
  // unSend(未发送)fail(发送失败)success(发送成功)sending(发送中)
  status: {
    type: String,
    default: "unSend",
    validator: (value: string) => ["unSend", "fail", "success", "sending"].includes(value),
  },
})

const messageReply = computed(() => props.originalMsg?.messageReply || null)
const hasReplyContent = computed(() => !!messageReply.value)
const replySender = computed(() => messageReply.value.messageSender)
const thinkingContent = computed(() => messageReply.value.thinking)
const deeplyThoughtContent = computed(() => messageReply.value.deeplyThought)
const messageAbstract = computed(() => messageReply.value.messageAbstract)
const messageID = computed(() => messageReply.value.messageID)
const showThinkingContent = computed(() => thinkingContent.value && props.status === "sending")

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

    .reasoning {
      font-size: 15px;
    }
  }

  &__mask {
    cursor: pointer;
    position: absolute;
    inset: 0;
  }
}
</style>
