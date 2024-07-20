<template>
  <div class="message-view__item--text" :class="fnStyle()">
    <template v-if="(message?.conversationType || msgType) == 'GROUP' || 'C2C'">
      <!-- 回复消息 -->
      <ReplyElem
        v-if="message.cloudCustomData"
        :originalMsg="message.cloudCustomData && JSON.parse(message.cloudCustomData)"
      />
      <Markdown v-if="showMarked(message)" :marked="message.payload.text" />
      <DynamicContent v-else islink :text="message.payload.text" />
    </template>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import "@/styles/css/hljs.css";
import ReplyElem from "./ReplyElem.vue";
import DynamicContent from "../components/DynamicContent.vue";
import { useGetters } from "@/utils/hooks/useMapper";
import { isRobot } from "@/utils/chat/index";
import { Markdown, addCopyButton } from "@/utils/marked/index";

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

const onClick = (data) => {
  console.log(data);
};

function showMarked(message) {
  return isRobot(toAccount.value) && message.flow == "in";
}

function fnStyle() {
  let marked = showMarked(props.message) ? "markdown" : "";
  return props.self ? ["is-text-self", marked] : ["is-text-other", marked];
}

onMounted(() => {
  addCopyButton();
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
  // width: 100%;
  // max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
  word-break: break-all;
  white-space: pre-wrap;
  color: var(--color-text);
  // ::selection {
  //   background-color: rgb(193, 203, 244);
  // }
}
.markdown {
  white-space: unset;
}
.markdown-body {
  position: relative;
  overflow: hidden;
  max-width: 600px;
}
</style>
