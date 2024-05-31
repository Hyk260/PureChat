<template>
  <div class="merge" @click="onClick">
    <div class="preview">
      <div class="preview_title">
        <span :title="message.payload.title"> {{ message.payload.title }}</span>
      </div>
      <div class="preview_item" v-for="item in abstractList" :key="item">
        <div class="preview_text">{{ item }}</div>
      </div>
    </div>
    <div class="footer" v-show="num">{{ `查看${num}条转发消息` }}</div>
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import { computed, toRefs } from "vue";

const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
const { message } = toRefs(props);

const { showCheckbox } = useState({
  showCheckbox: (state) => state.conversation.showCheckbox,
});

const num = computed(() => {
  return message.value.payload.messageList?.length || message.value.payload.abstractList?.length;
});

const abstractList = computed(() => {
  return message.value.payload.abstractList?.slice(0, 3) || [];
});
function onClick() {
  if (showCheckbox.value) return;
  emitter.emit("openMergePopup", message.value);
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
  .preview {
    max-height: 105px;
    .preview_title {
      font-size: 16px;
      height: 40px;
      padding: 12px 12px 0 12px;
      color: rgba(0, 0, 0, 0.85);
      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .preview_item {
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      height: 20px;
      padding: 0 12px;
      .preview_text {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
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
}
</style>
