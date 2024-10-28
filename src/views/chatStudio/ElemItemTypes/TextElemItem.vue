<template>
  <div class="message-view__item--text" :class="fnStyle()" @click="onClick(message)">
    <template v-if="isMsgType">
      <!-- 回复消息 -->
      <ReplyElem v-if="cloudCustomData" :originalMsg="cloudCustomData" />
      <Markdown v-if="showMarked(message)" :marked="message.payload.text" />
      <DynamicContent v-else :atUserList="message.atUserList" :text="message.payload.text" />
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import "@/styles/highlight.scss";
import ReplyElem from "./ReplyElem.vue";
import DynamicContent from "../components/DynamicContent.vue";
import { useGetters } from "@/utils/hooks/useMapper";
import { isRobot } from "@/utils/chat/index";
import { Markdown, handleCopyClick } from "@/utils/markdown/index";

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

const { toAccount } = useGetters(["toAccount"]);

const isMsgType = computed(() => {
  const { message, msgType } = props;
  return (message?.conversationType || msgType)
})

const cloudCustomData = computed(() => {
  const { message } = props;
  if (message?.cloudCustomData) {
    return JSON.parse(message.cloudCustomData);
  } else {
    return null;
  }
});

const onClick = (data) => {
  console.log(data);
};
// 发送者是ai 展示markdown
function showMarked(message) {
  return isRobot(toAccount.value) && message?.flow === "in";
}

function fnStyle() {
  let marked = showMarked(props.message) ? "markdown" : "";
  return props.self ? ["is-text-self", marked] : ["is-text-other", marked];
}

onMounted(() => {
  handleCopyClick();
});
</script>

<style lang="scss" scoped>
.is-text-self {
  background: var(--self-msg-color);
}
.is-text-other {
  background: var(--other-msg-color);
}
.emoji {
  width: 23px;
  vertical-align: sub;
}
.message-view__item--text {
  width: fit-content;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
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
