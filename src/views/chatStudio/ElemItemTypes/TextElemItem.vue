<template>
  <!-- markdown is-text-self is-text-other -->
  <div class="message-view-item-text" :class="fnStyle()" @click="onClick(message)">
    <template v-if="isMsgType">
      <!-- 回复消息 -->
      <ReplyElem v-if="cloudCustomData" :status="message.status" :originalMsg="cloudCustomData" />
      <Markdown v-if="showMarked(message)" :cloudCustomData="cloudCustomData" :marked="message.payload.text" />
      <DynamicContent v-else :atUserList="message.atUserList" :text="message.payload.text" />
    </template>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores/index";
import ReplyElem from "./ReplyElem.vue";
import DynamicContent from "../components/DynamicContent.vue";

const props = defineProps({
  msgType: {
    type: String,
    default: "",
  },
  message: {
    type: Object,
    default: null,
  },
  self: {
    type: Boolean,
    default: false,
  },
});

const chatStore = useChatStore()

const isMsgType = computed(() => {
  const { message, msgType } = props;
  return message?.conversationType || msgType;
});

const cloudCustomData = computed(() => {
  const { message } = props;
  if (message?.cloudCustomData) {
    try {
      return JSON.parse(message.cloudCustomData);
    } catch (error) {
      console.error("cloudCustomData", error);
      return null;
    }
  } else {
    return null;
  }
});

const onClick = (data) => {
  console.log(data);
};
// 发送者是ai 展示markdown
function showMarked(message) {
  return chatStore.isAssistant && message?.flow === "in";
}

function fnStyle() {
  let marked = showMarked(props.message) ? "markdown" : "";
  return props.self ? ["is-text-self", marked] : ["is-text-other", marked];
}
</script>

<style lang="scss" scoped>
:global(body .is-text-self) {
  background: var(--self-msg-color);
}

:global(body .is-text-other) {
  background: var(--other-msg-color);
}

.message-view-item-text {
  width: fit-content;
  max-width: 570px;
  min-height: 36px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  word-break: break-all;
  white-space: pre-wrap;
  color: var(--color-text);
}

.markdown {
  white-space: unset;
}

.markdown-body {
  position: relative;
  overflow: hidden;
  max-width: 580px;
}
</style>
