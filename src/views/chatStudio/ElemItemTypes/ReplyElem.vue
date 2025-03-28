<template>
  <div v-if="originalMsg.messageReply" class="reply-content">
    <div v-if="originalMsg.messageReply.messageSender" class="reply-content__sender">
      {{ originalMsg.messageReply.messageSender }}:
    </div>
    <div v-if="originalMsg.messageReply?.thinking && status === 'sending'">
      {{ originalMsg.messageReply.thinking }}
    </div>
    <div v-else class="reply-content__sender">
      {{ originalMsg.messageReply?.deeplyThought || "" }}
    </div>
    <div class="reply-content__content">
      <DynamicContent :text="originalMsg.messageReply.messageAbstract" />
    </div>
    <div class="reply-content__mask" @click="handleItemClick"></div>
  </div>
</template>

<script setup>
import { scrollToDomPosition } from "@/utils/chat/index";
import DynamicContent from "../components/DynamicContent.vue";

defineOptions({
  name: "ReplyElem",
});

const props = defineProps({
  originalMsg: {
    type: Object,
    default: null,
  },
  // unSend(未发送)fail(发送失败)success(发送成功)sending(发送中)
  status: {
    type: String,
    default: "unSend",
  },
});

const handleItemClick = async () => {
  const { messageReply } = props.originalMsg || {};
  if (!messageReply) return;
  const ref = messageReply.messageID;
  if (ref) scrollToDomPosition(ref);
};
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
  }
  &__mask {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
