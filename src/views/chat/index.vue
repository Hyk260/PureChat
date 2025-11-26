<template>
  <div class="wh-full flex">
    <Message />
    <!-- 图片预览 -->
    <!-- <ImageViewer /> -->
    <!-- 合并消息弹框 -->
    <MergeMessagePopup />
    <!-- 群详情 -->
    <GroupDetails v-if="isGroupChat && currentConversation" :groupProfile="currentConversation.groupProfile" />
    <!-- HTML 预览弹窗 -->
    <HtmlArtifactsPopup title="HTML Preview" />
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from "@vueuse/core"

import { storeToRefs } from "pinia"

// import ImageViewer from "@/components/ImageViewer/index.vue"
import HtmlArtifactsPopup from "@/components/CodeBlockView/HtmlArtifactsPopup.vue"
import MergeMessagePopup from "@/components/Popups/MergeMessagePopup.vue"
import { setMessageRead } from "@/service/im-sdk-api"
import { useChatStore } from "@/stores"

import GroupDetails from "./chat/GroupDetails.vue"
import Message from "./message.vue"

defineOptions({ name: "Chat" })

const chatStore = useChatStore()

const { currentConversation, isGroupChat } = storeToRefs(chatStore)

useEventListener(window, "focus", () => {
  if (currentConversation.value) {
    setMessageRead(currentConversation.value)
  }
})
</script>

<style lang="scss" scoped></style>
