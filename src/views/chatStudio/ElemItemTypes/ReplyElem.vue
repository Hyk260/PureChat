<template>
  <div v-if="originalMsg.messageReply" class="reply-content">
    <div class="reply-content__sender">{{ originalMsg.messageReply.messageSender }}:</div>
    <div class="reply-content__content">
      <DynamicContent :text="originalMsg.messageReply.messageAbstract" />
    </div>
    <div class="reply-content__mask" @click="hanldeItemClick"></div>
  </div>
</template>

<script setup>
import { scrollToDomPostion } from "@/utils/chat/index";
import DynamicContent from "../components/DynamicContent.vue";

const props = defineProps({
  originalMsg: {
    type: Object,
    default: null,
  },
});

const hanldeItemClick = async () => {
  const { messageReply } = props.originalMsg || {};
  if (!messageReply) return;
  const ref = messageReply.messageID;
  if (ref) scrollToDomPostion(ref);
};
</script>

<style lang="scss" scoped>
:global(body .shrink-style) {
  border-radius: 3px;
  animation: fade 500ms infinite;
}
@keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}
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
