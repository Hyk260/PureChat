<template>
  <div class="wh-full flex">
    <Message />
    <!-- 图片预览 -->
    <ImageViewer />
    <!-- 合并消息弹框 -->
    <MergeMessagePopup />
    <!-- 群详情 -->
    <GroupDetails v-if="isGroupChat" :group-profile="currentConversation.groupProfile" />
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core"

import { storeToRefs } from "pinia"

import MergeMessagePopup from "@/components/Popups/MergeMessagePopup.vue"
import { setMessageRead } from "@/service/im-sdk-api"
import { useChatStore } from "@/stores"

import GroupDetails from "./chat/GroupDetails.vue"
import Message from "./message.vue"

defineOptions({ name: "Chat" })

const chatStore = useChatStore()

const { currentConversation, isGroupChat } = storeToRefs(chatStore)

useEventListener(window, "focus", () => {
  setMessageRead(currentConversation.value)
})
</script>

<style lang="scss" scoped></style>
