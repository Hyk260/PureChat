<template>
  <div class="reply-box" v-show="currentReplyMsg">
    <FontIcon class="close" iconName="CircleCloseFilled" @click="onClose" />
    <div class="reply-box-content">
      <div class="nick">{{ currentReplyMsg?.nick }} :</div>
      <div class="text" v-if="currentReplyMsg">
        <DynamicContent :text="fnReplyContent(currentReplyMsg)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { fnReplyContent } from "@/utils/chat/index";
import { useState } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";
import DynamicContent from "./DynamicContent.vue";

const { commit } = useStore();
const { currentReplyMsg } = useState({
  currentReplyMsg: (state) => state.conversation.currentReplyMsg,
});
const onClose = () => {
  commit("setReplyMsg", null);
};
</script>

<style lang="scss" scoped>
.reply-box {
  height: 60px;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  padding: 0 10px;
  display: flex;
  align-items: center;
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
