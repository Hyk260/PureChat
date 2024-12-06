<template>
  <div class="wh-full flex">
    <!-- 侧边栏 -->
    <sidebar />
    <!-- chat -->
    <Message v-show="showChat(outside)" />
    <!-- iframe -->
    <frameView v-if="frame.includes(outside)" :type="outside" />
    <!-- component -->
    <component v-else-if="Component[outside]" :is="Component[outside]" />
    <!-- 图片预览 -->
    <ImageViewer />
  </div>
</template>

<script setup>
import ImageViewer from '../components/ImageViewer/index.vue';
import { useState } from "@/utils/hooks/useMapper";
import AddressBook from "../components/AddressBook/index.vue";
import Prompt from "../components/Prompt/index.vue";
import frameView from "./frameView.vue";
import Message from "./message.vue";
import sidebar from "./sidebar.vue";
import test from "./test.vue";

const showChat = (value) => {
  return outsideList.value[0].only.includes(value);
};

const frame = [
  "document",
  "chatgpt",
  // "github",
  // "gitee"
];
const Component = {
  test: test, // 测试;
  prompt: Prompt,
  notebook: AddressBook,
};
const { outside, outsideList } = useState({
  outsideList: (state) => state.sidebar.outsideList,
  outside: (state) => state.conversation.outside,
});
</script>

<style lang="scss" scoped></style>
