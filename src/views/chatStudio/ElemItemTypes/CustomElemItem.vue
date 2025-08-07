<template>
  <div class="message-item-custom" :class="messageClass" @click="handleClick">
    <Loading v-if="isMessageType('loading')" />
    <div v-else class="text">{{ customMessageContent() }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Loading from "../customMsgBody/loading.vue";
// import ToolCall from "../customMsgBody/toolCall.vue";
// import Warning from "../customMsgBody/warning.vue";

const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
  self: {
    type: Boolean,
    default: false,
  },
});

const messageClass = computed(() => [
  props.self ? "is-text-self" : "is-text-other",
  isMessageType("warning") ? "!p-0" : "",
]);

const isMessageType = (type) => props?.message?.payload?.description === type;

const handleClick = () => {
  console.log(props.message);
};

const customMessageContent = () => {
  try {
    const { data, extension, text } = props.message.payload;

    const payload = data ? JSON.parse(data) : {};

    if (payload.businessID === "group_create") {
      return `${payload.opUser}${payload.content}`;
    }

    if (data === "group_create") {
      return extension || "";
    }

    return text || "[自定义消息]";
  } catch (error) {
    console.error("解析消息内容失败:", error);
    return "[自定义消息]";
  }
};
</script>

<style lang="scss" scoped>
.message-item-custom {
  width: fit-content;
  padding: 10px 14px;
  max-width: 460px;
  min-height: 36px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  .text {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
}
</style>
