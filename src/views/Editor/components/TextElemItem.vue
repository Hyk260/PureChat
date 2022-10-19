<template>
  <div class="message_name">
    <span v-if="message.from == '@TIM#SYSTEM'"> 系统 </span>
    <span v-else>
      {{ message.from }}
    </span>
  </div>
  <div class="message">
    <template v-if="false">
      <span
        class="message-view__item--text text"
        v-for="item in lookText"
        :key="item"
      >
        <!-- <span v-if="item.name === 'text'" class="text linkUrl">
          {{ item.text }}
        </span>
        <img class="emoji" v-else :src="item.src" alt="" /> -->
        {{ message.payload.text }}
      </span>
    </template>
    <!-- 用户 -->
    <template v-if="message.conversationType == 'GROUP' || 'C2C'">
      <span class="message-view__item--text">
        {{ message.payload.text }}
      </span>
    </template>
    <!-- 系统 -->
    <template v-if="message.conversationType == '@TIM#SYSTEM'">
      <span class="message-view__item--text">
        {{ GroupSystemNotice(message) }}
      </span>
    </template>
  </div>
</template>

<script setup>
import { GroupSystemNotice } from "../utils/utils";
import { decodeText } from "@/utils/decodeText";
import { computed } from "vue-demi";
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
const { message } = props;
// console.log(message);

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
.message_name {
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
.message {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
}
.message-view__text {
  width: fit-content;
  margin-bottom: 5px;
}
.emoji {
  width: 24px;
  vertical-align: bottom;
}
</style>
