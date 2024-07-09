<template>
  <div
    class="message-view__item--text"
    :class="self ? 'is-text-self' : 'is-text-other'"
    @click="onClick(message)"
  >
    <template v-if="(message?.conversationType || msgType) == 'GROUP' || 'C2C'">
      <!-- 回复消息 -->
      <ReplyElem
        v-if="message.cloudCustomData"
        :originalMsg="message.cloudCustomData && JSON.parse(message.cloudCustomData)"
      />
      <div v-if="isRobot(toAccount) && message.flow == 'in'" v-html="fnMarked(message.payload.text)"></div>
      <DynamicContent v-else islink :text="message.payload.text" />
    </template>
  </div>
</template>

<script setup>
import ReplyElem from "./ReplyElem.vue";
import DynamicContent from "../components/DynamicContent.vue";
import { useGetters } from "@/utils/hooks/useMapper";
import { isRobot } from "@/utils/chat/index";
import { fnMarked } from "@/utils/marked/index";
const { toAccount } = useGetters(["toAccount"]);

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

const onClick = (data) => {
  console.log(data);
};
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
  // max-width: 360px;
  box-sizing: border-box;
  border-radius: 3px;
  word-break: break-all;
  white-space: pre-wrap;
  color: var(--color-text);
  ::selection {
    background-color: rgb(193, 203, 244);
  }
}
</style>
