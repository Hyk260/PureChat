<template>
  <div
    class="message-item-custom"
    :class="self ? 'is-text-self' : 'is-text-other'"
    @click="onClick"
  >
    <div v-if="messageType('loading')">
      <loading />
    </div>
    <div v-else>
      {{ customMessage() }}
    </div>
  </div>
</template>

<script>
import loading from "../customMsgBody/loading.vue";

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
    loading,
  },
  methods: {
    customMessage(payload = this.message.payload) {
      let videoPayload = {};
      try {
        videoPayload = JSON.parse(payload.data);
      } catch (e) {
        videoPayload = {};
      }
      if (videoPayload.businessID == "group_create") {
        return videoPayload.opUser + videoPayload.content;
      }
      if (payload.data === "group_create") {
        return `${payload.extension}`;
      }
      if (payload.text) {
        return payload.text;
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
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
