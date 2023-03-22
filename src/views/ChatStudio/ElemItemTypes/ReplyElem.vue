<template>
  <div v-if="originalMsg.messageReply" class="reply-msg-content">
    <div class="reply-msg-content__sender">
      {{ originalMsg.messageReply.messageSender }}:
    </div>
    <div class="reply-msg-content__content">
      {{ originalMsg.messageReply.messageAbstract }}
    </div>
    <div class="reply-msg-content__mask" @click="hanldeItemClick"></div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
  defineProps,
} from "vue";
const props = defineProps({
  originalMsg: {
    type: Object,
    default: null,
  },
});
// getRef, convId, convType
const { originalMsg } = toRefs(props);
// const { messageID } = originalMsg
const scrollToDomPostion = (dom) => {
  dom.scrollIntoView({ behavior: "smooth", block: "center" });
  dom.classList.add("shrink-style");
  setTimeout(() => {
    dom.classList.remove("shrink-style");
  }, 2000);
};
const getRef = (id) => {
  return document.getElementById(`${id}`);
};
const hanldeItemClick = async () => {
  console.log(originalMsg);
  const { messageReply } = originalMsg.value;
  if (!originalMsg) return;
  const ref = getRef(messageReply.messageID);
  if (ref) {
    scrollToDomPostion(ref);
  }
};
</script>

<style lang="scss" scoped>
:global(body .shrink-style) {
  // background: #ffe7ba !important;
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
.reply-msg-content {
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
