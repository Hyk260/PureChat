<template>
  <div v-if="replyMsgData" class="reply-box flex-bc" @click="onClick">
    <FontIcon class="close" icon-name="CircleCloseFilled" @click="onClose" />
    <div class="reply-box-content multi-truncate-2">
      <div v-if="replyMsgData?.nick" class="nick">{{ replyMsgData?.nick }} :</div>
      <div v-if="replyMsgData" class="text">
        <DynamicContent :text="getAbstractContent(replyMsgData)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useChatStore } from "@/stores/modules/chat/index";
import { getAbstractContent, scrollToDomPosition } from "@/utils/chat/index";
import DynamicContent from "./DynamicContent.vue";

defineOptions({
  name: "ReplyBox",
});

const chatStore = useChatStore();
const { replyMsgData } = storeToRefs(chatStore);

const onClose = () => {
  chatStore.setReplyMsgData(null)
};

const onClick = () => {
  const { ID } = replyMsgData.value || {};
  ID && scrollToDomPosition(ID);
};
</script>

<style lang="scss" scoped>
.reply-box {
  height: 60px;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  padding: 0 10px;
  .reply-box-content {
    border-left: 3px solid #ccc;
    padding: 0 25px 0 10px;
    color: #666;
    margin-bottom: 10px;
  }
  .close {
    color: rgb(140, 140, 140);
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 20px;
  }
}
</style>
