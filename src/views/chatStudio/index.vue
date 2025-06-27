<template>
  <div class="wh-full flex">
    <Message />
    <!-- 图片预览 -->
    <ImageViewer />
    <!-- 合并消息弹框 -->
    <MergeMessagePopup />
    <!-- 群详情 -->
    <GroupDetails v-if="isGroupChat" :groupProfile="currentConversation.groupProfile" />
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores/index";
import MergeMessagePopup from "@/components/Popups/MergeMessagePopup.vue";
import GroupDetails from "./chat/GroupDetails.vue";
import Message from "./message.vue";

const chatStore = useChatStore();

const { currentConversation, isGroupChat } = storeToRefs(chatStore);
</script>

<style lang="scss" scoped></style>
