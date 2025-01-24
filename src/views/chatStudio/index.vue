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
import ImageViewer from "../components/ImageViewer/index.vue";
import { useState } from "@/utils/hooks/useMapper";
import AddressBook from "../components/AddressBook/index.vue";
import FriendsList from "../components/FriendsList/index.vue";
import Discover from "../components/Prompt/index.vue";
import frameView from "./frameView.vue";
import Message from "./message.vue";
import sidebar from "./sidebar.vue";
import test from "./test.vue";

const showChat = (value) => {
  return ["chat"].includes(value);
};

const frame = [
  "document",
  "chatgpt",
  // "github",
  // "gitee"
];

const Component = {
  test: test, // 测试;
  discover: Discover, // 发现
  notebook: AddressBook,
  friends: FriendsList,
};

const { outside } = useState({
  outside: (state) => state.conversation.outside,
});
</script>

<style lang="scss" scoped></style>
