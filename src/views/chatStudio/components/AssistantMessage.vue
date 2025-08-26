<template>
  <div>
    <div class="message-view-bottom">
      {{ messageAbstract }}
    </div>
    <div class="message-view-question">
      <div
        v-for="(question, index) in recommendedQuestions"
        :key="index"
        class="cursor-pointer"
        @click="handleQuestion(question)"
      >
        <span>{{ question }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useChatStore } from "@/stores";
import { sendChatMessage } from "../utils/utils";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const chatStore = useChatStore();
const { toAccount, currentType } = storeToRefs(chatStore);

const parsedCustomData = computed(() => {
  if (!props.item.cloudCustomData) return null;

  try {
    const data = JSON.parse(props.item.cloudCustomData);
    return data.messagePrompt;
  } catch {
    return null;
  }
});

const messageAbstract = computed(() => parsedCustomData.value?.messageAbstract ?? "");

const recommendedQuestions = computed(() => parsedCustomData.value?.recQuestion ?? []);

/**
 * 处理问题点击事件
 * @param questionText 点击的问题文本
 */
const handleQuestion = async (questionText) => {
  try {
    const message = await sendChatMessage({
      to: toAccount.value,
      type: currentType.value,
      text: questionText,
    });

    if (message?.[0]) {
      chatStore.updateSendingState(toAccount.value, "add");
      chatStore.sendSessionMessage({ message: message[0] });
    }
  } catch (error) {
    console.error("Error sending chat message:", error);
  }
};
</script>

<style lang="scss" scoped>
.message-view-bottom {
  margin-top: 5px;
  font-size: 12px;
  opacity: 0.3;
  white-space: nowrap;
  transition: all 0.6s ease;
  color: #303030;
}

.message-view-question {
  font-size: 14px;
  margin-top: 5px;

  & > div {
    width: fit-content;
    padding: 6px 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    font-weight: 400;
    border: 1px solid rgba(6, 7, 8, 0.15);
    color: rgba(6, 7, 9, 0.8);

    &:hover {
      background-color: rgba(6, 7, 9, 0.1);
    }
  }
}
</style>
