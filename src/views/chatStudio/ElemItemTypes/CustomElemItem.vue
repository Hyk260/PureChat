<template>
  <div
    class="message-item-custom"
    :class="fnClass(message)"
    @click="onClick"
  >
    <Loading v-if="messageType('loading')" />
    <Warning v-else-if="messageType('warning')" :payload="message.payload" />
    <ToolCall v-else-if="messageType('tool_call')" :payload="message.payload" />
    <div v-else>{{ customMessage() }}</div>
  </div>
</template>

<script>
import Loading from "../customMsgBody/loading.vue";
import ToolCall from "../customMsgBody/toolCall.vue";
import Warning from "../customMsgBody/warning.vue";

export default {
  name: "CustomElemItem",
  props: {
    message: {
      type: Object,
      default: null,
    },
    self: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Warning,
    Loading,
    ToolCall,
  },
  methods: {
    fnClass() {
      return [
        this.self ? "is-text-self" : "is-text-other",
        this.messageType("warning") ? "!p-0" : "",
      ];
    },
    customMessage(data = this.message.payload) {
      let payload = {};
      try {
        payload = JSON.parse(data.data);
      } catch (e) {
        payload = {};
      }
      if (payload.businessID == "group_create") {
        return payload.opUser + payload.content;
      }
      if (data.data === "group_create") {
        return `${data.extension}`;
      }
      if (data.text) {
        return data.text;
      } else {
        return "[自定义消息]";
      }
    },
    messageType(type) {
      return this.message.payload.description === type;
    },
    onClick() {
      console.log(this.message);
    },
  },
};
</script>

<style lang="scss" scoped>
.message-item-custom {
  width: fit-content;
  padding: 10px 14px;
  max-width: 460px;
  min-height: 36px;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
