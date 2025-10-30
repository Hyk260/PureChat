<template>
  <div v-if="replyMsgData" class="reply-box flex-bc" @click="handleReplyClick">
    <ElIcon class="close" @click="handleClose">
      <CircleX />
    </ElIcon>

    <div class="reply-box-content multi-truncate-2">
      <div v-if="hasNickname" class="nick">{{ replyMsgData.nick }} :</div>
      <div class="text">
        <DynamicContent :text="getAbstractContent(replyMsgData)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleX } from "lucide-vue-next"

import { storeToRefs } from "pinia"

import DynamicContent from "@/components/Chat/DynamicContent.vue"
import { useChatStore } from "@/stores/modules/chat"
import { getAbstractContent, scrollToDomPosition } from "@/utils/chat"

defineOptions({
  name: "ReplyBox",
})

const chatStore = useChatStore()
const { replyMsgData } = storeToRefs(chatStore)

const hasNickname = computed(() => Boolean(replyMsgData.value?.nick))

const handleClose = () => {
  chatStore.setReplyMsgData(null)
}

const handleReplyClick = () => {
  const messageId = replyMsgData.value?.ID
  messageId && scrollToDomPosition(messageId)
}
</script>

<style lang="scss" scoped>
.reply-box {
  height: 60px;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  padding: 0 10px;
  .reply-box-content {
    border-left: 3px solid #ccc;
    padding: 0 25px 0 10px;
    color: #666;
    margin-bottom: 10px;
  }
  .close {
    color: rgb(140, 140, 140);
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 20px;
  }
}
</style>
