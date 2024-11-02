<template>
  <div class="merge" @click="onClick">
    <div class="preview">
      <div class="preview-title">
        <span :title="message.payload.title"> {{ message.payload.title }}</span>
      </div>
      <div class="preview-item" v-for="item in abstractList" :key="item">
        <div class="preview-text">{{ item }}</div>
      </div>
    </div>
    <div class="footer" v-show="num">{{ `查看${num}条转发消息` }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";

const { message } = defineProps({
  message: {
    type: Object,
    default: null,
  },
});

const { showCheckbox } = useState({
  showCheckbox: (state) => state.conversation.showCheckbox,
});

const num = computed(() => {
  return message.payload.messageList?.length || message.payload.abstractList?.length;
});

const abstractList = computed(() => {
  return message.payload.abstractList?.slice(0, 3) || [];
});

function onClick() {
  if (showCheckbox.value) return;
  emitter.emit("openMergePopup", message);
}
</script>

<style lang="scss" scoped>
.merge {
  font-size: 12px;
  width: 232px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  cursor: pointer;
}
.preview {
  max-height: 105px;
  .preview-title {
    font-size: 16px;
    height: 40px;
    padding: 12px 12px 0 12px;
    color: rgba(0, 0, 0, 0.85);
    span {
      width: 100%;
      display: inline-block;
      @include text-ellipsis;
    }
  }
  .preview-item {
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    height: 20px;
    padding: 0 12px;
    .preview-text {
      @include text-ellipsis;
    }
  }
}
.footer {
  height: 30px;
  line-height: 30px;
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.45);
  border-top: 1px solid #d5dbdf;
}
</style>
