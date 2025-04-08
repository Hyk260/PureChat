<template>
  <div>
    <div class="message-view-bottom">
      {{ handleCustomData(item, "messageAbstract") }}
    </div>
    <div class="message-view-question">
      <div
        v-for="(item, i) in handleCustomData(item, 'recQuestion') || []"
        :key="i"
        @click="handleQuestion(item)"
      >
        <span class="question"> {{ item }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores/index";
import { sendChatMessage } from "../utils/utils";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const chatStore = useChatStore();

const { toAccount, currentType } = storeToRefs(chatStore);

const handleQuestion = async (text) => {
  const message = await sendChatMessage({
    to: toAccount.value,
    type: currentType.value,
    text,
  });
  console.log("sendChatMessage:", message);
  chatStore.sendSessionMessage({ message: message[0] });
};

const handleCustomData = (item, type) => {
  // type messageAbstract
  const data = item.cloudCustomData;
  if (!data) return;
  try {
    const message = JSON.parse(data);
    if (message.messagePrompt) {
      return message.messagePrompt[type];
    } else {
      return "";
    }
  } catch (error) {
    return "";
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
  .question {
    cursor: pointer;
  }
}
</style>
