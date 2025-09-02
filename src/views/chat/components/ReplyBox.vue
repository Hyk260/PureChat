<template>
  <div v-if="replyMsgData" class="reply-box flex-bc" @click="onClick">
    <el-icon class="close" @click="onClose"><CircleCloseFilled /></el-icon>
    <div class="reply-box-content multi-truncate-2">
      <div v-if="replyMsgData?.nick" class="nick">{{ replyMsgData?.nick }} :</div>
      <div v-if="replyMsgData" class="text">
        <DynamicContent :text="getAbstractContent(replyMsgData)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleCloseFilled } from "@element-plus/icons-vue"
import { storeToRefs } from "pinia"

import DynamicContent from "@/components/Chat/DynamicContent.vue"
import { useChatStore } from "@/stores/modules/chat"
import { getAbstractContent, scrollToDomPosition } from "@/utils/chat"

defineOptions({
  name: "ReplyBox",
})

const chatStore = useChatStore()
const { replyMsgData } = storeToRefs(chatStore)

const onClose = () => {
  chatStore.setReplyMsgData(null)
}

const onClick = () => {
  const { ID } = replyMsgData.value || {}
  ID && scrollToDomPosition(ID)
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
