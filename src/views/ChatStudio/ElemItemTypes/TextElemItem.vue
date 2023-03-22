<template>
  <div class="message-view__item--text">
    <template v-if="message.conversationType == 'GROUP' || 'C2C'">
      <ReplyElem
        v-if="message.cloudCustomData"
        :originalMsg="JSON.parse(message.cloudCustomData)"
      />
      <template v-for="item in decodeText(message.payload.text)" :key="item">
        <span
          v-if="item.name === 'text'"
          :class="{
            // linkUrl: verifyLink(item.text),
          }"
          class="text"
        >
          <analysis-url :text="item.text" />
        </span>
        <img
          class="emoji"
          v-else-if="item.name === 'img'"
          :src="item.src"
          alt="表情包"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import { decodeText } from "@/utils/decodeText";
import { toRefs, h } from "vue";
import ReplyElem from "./ReplyElem.vue";
const reg =
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
// eslint-disable-next-line no-undef
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
const { message } = toRefs(props);
console.log(message);
// 标签转义
function html2Escape(str) {
  return str.replace(/[<>&"]/g, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
}
function verifyLink(str) {
  return reg.test(str);
}
function shellOne(e) {
  console.log(e);
}
function AnalysisUrl(props) {
  const { text } = props;
  let str = html2Escape(text);
  // console.log(str);
  let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:|;|\+|\%|\#)+)/g;
  let flag = reg.test(str);
  let htmlStr = str.replace(
    reg,
    `<a data-link="$1$2" href="$1$2" class="linkUrl" target="_blank"> $1$2 </a>`
  );
  // console.log(htmlStr);
  return flag
    ? h("span", {
        // class: "linkUrl",
        innerHTML: htmlStr,
        onClick: () => {
          // console.log(123);
        },
      })
    : text;
}

// const isemote = computed(() => {
//   const { conversationType, payload } = message;
//   let isconv = conversationType == "GROUP" || "C2C";
//   if (payload.text.indexOf("[") != -1 && isconv) {
//     return true;
//   }
//   return false;
// });

// const lookText = computed(() => {

//   if (isemote.value) {
//     return decodeText(message.payload.text);
//   }
//   return [];
// });
// console.log(lookText);
</script>

<style lang="scss" scoped>
.message-view__item--text {
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
  word-break: break-all;
  :deep(.linkUrl) {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
    word-wrap: break-word;
  }
}
.emoji {
  width: 24px;
  vertical-align: bottom;
}
</style>
