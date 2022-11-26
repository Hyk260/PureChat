<template>
  <div class="message-view__item--text">
    <!-- 用户 -->
    <template v-if="message.conversationType == 'GROUP' || 'C2C'">
      <!-- <span>
        {{ message.payload.text }}
      </span> -->
      <template v-for="item in decodeText(message.payload.text)" :key="item">
        <span v-if="item.name === 'text'" class="text linkUrl">
          {{ item.text }}
        </span>
        <img
          class="emoji"
          v-else-if="item.name === 'img'"
          :src="item.src"
          alt="表情包"
        />
      </template>
    </template>
    <!-- 系统 -->
    <template v-if="message.conversationType == '@TIM#SYSTEM'">
      <span>
        {{ GroupSystemNotice(message) }}
      </span>
    </template>
  </div>
</template>

<script setup>
import { GroupSystemNotice } from "../utils/utils";
import { decodeText } from "@/utils/decodeText";
import { toRefs } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
const { message } = toRefs(props);

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
}
.emoji {
  width: 24px;
  vertical-align: bottom;
}
</style>
