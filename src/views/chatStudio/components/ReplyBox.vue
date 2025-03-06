<template>
  <div class="reply-box flex-bc" v-if="replyMsgData" @click="onClick">
    <FontIcon class="close" iconName="CircleCloseFilled" @click="onClose" />
    <div class="reply-box-content">
      <div class="nick">{{ replyMsgData?.nick }} :</div>
      <div class="text" v-if="replyMsgData">
        <DynamicContent :text="fnReplyContent(replyMsgData)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useChatStore } from "@/stores/modules/chat/index";
import { fnReplyContent, scrollToDomPostion } from "@/utils/chat/index";
import DynamicContent from "./DynamicContent.vue";

defineOptions({
  name: "ReplyBox",
});

const chatStore = useChatStore();
const { replyMsgData } = storeToRefs(chatStore);

const onClose = () => {
  chatStore.$patch({ replyMsgData: null });
};

const onClick = () => {
  const { ID } = replyMsgData.value || {};
  ID && scrollToDomPostion(ID);
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
    .text {
      @include ellipsisBasic(1);
    }
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
