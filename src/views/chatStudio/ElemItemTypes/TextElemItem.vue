<template>
  <!-- markdown is-text-self is-text-other -->
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
        :originalMsg="parsedCloudCustomData"
      />
      <Markdown
        v-if="shouldShowMarkdown"
        :cloudCustomData="parsedCloudCustomData"
        :marked="message.payload.text"
      />
      <DynamicContent v-else :atUserList="message.atUserList" :text="message.payload.text" />
      <!-- <div>
        "首字时延 {{time_first_token_millsec}}ms | 每秒 {{token_speed}} tokens"
      </div> -->
    </template>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores/index";
import ReplyElem from "./ReplyElem.vue";
import DynamicContent from "../components/DynamicContent.vue";

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

// const time_first_token_millsec = 123
// const token_speed = 10;

const chatStore = useChatStore();

const hasValidMessageType = computed(() => {
  return props.message?.conversationType || props.msgType;
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
  return chatStore.isAssistant && props.message?.flow === "in";
});

const messageStyleClasses = computed(() => {
  const classes = [];
  classes.push(props.self ? "is-text-self" : "is-text-other");
  if (shouldShowMarkdown.value) {
    classes.push("markdown");
  }
  return classes;
});

const handleMessageClick = () => {
  console.log("Message clicked:", props.message);
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
