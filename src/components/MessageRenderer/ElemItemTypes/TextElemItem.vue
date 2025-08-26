<template>
  <div
    class="message-view-item-text"
    :class="messageStyleClasses"
    @click="handleMessageClick(message)"
  >
    <template v-if="hasValidMessageType">
      <!-- 回复消息 -->
      <ReplyElem
        v-if="parsedCloudCustomData"
        :status="message.status"
        :original-msg="parsedCloudCustomData"
      />
      <Markdown
        v-if="shouldShowMarkdown"
        :cloud-custom-data="parsedCloudCustomData"
        :marked="message.payload.text"
      />
      <DynamicContent v-else :at-user-list="message.atUserList" :text="message.payload.text" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useChatStore, useUserStore } from "@/stores/index";
import ReplyElem from "./ReplyElem.vue";
import DynamicContent from "@/views/chatStudio/components/DynamicContent.vue";

const props = defineProps({
  msgType: {
    type: String,
    default: "",
  },
  message: {
    type: Object,
    default: () => ({}),
  },
  self: {
    type: Boolean,
    default: false,
  },
});

const chatStore = useChatStore();
const userStore = useUserStore();

const hasValidMessageType = computed(() => {
  return !!props.message?.conversationType || !!props.msgType;
});

const parsedCloudCustomData = computed(() => {
  try {
    return props.message?.cloudCustomData ? JSON.parse(props.message.cloudCustomData) : null;
  } catch (error) {
    console.error("Failed to parse cloudCustomData:", error);
    return null;
  }
});

const shouldShowMarkdown = computed(() => {
  if (userStore.markdownRender) return true
  return chatStore.isAssistant && props.message?.flow === "in"
});

const messageStyleClasses = computed(() => {
  return [
      props.self ? "is-text-self" : "is-text-other",
      shouldShowMarkdown.value ? "markdown" : ""
    ]
    .join(" ")
    .trim();
});

const handleMessageClick = (message) => {
  console.log("Message clicked:", message);
};
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
