<template>
  <div class="flex w-full">
    <!-- 聊天列表 -->
    <div class="message-left" :class="{ 'style-layout': isChatSessionListCollapsed }">
      <!-- 搜索框 -->
      <SearchInput />
      <div class="scroll-container">
        <!-- 会话列表 -->
        <ConversationList />
      </div>
      <div class="layout-center">
        <div @click="toggleCollapsed">
          <el-icon v-if="isChatSessionListCollapsed"><ArrowRight /></el-icon>
          <el-icon v-else><ArrowLeft /></el-icon>
        </div>
      </div>
      <!-- <div class="sidebar-drag"></div> -->
    </div>
    <!-- 聊天框 -->
    <div class="message-right">
      <EmptyMessage class-name="empty" />
      <ChatHeader />
      <!-- 聊天窗口 -->
      <Chatwin />
      <!-- 消息回复框 -->
      <ReplyBox />
      <!-- 编辑器 -->
      <Editor />
      <!-- 多选工具栏 -->
      <MessageToolbar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, onMounted } from "vue"
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue"

import { storeToRefs } from "pinia"

import ChatHeader from "@/components/Chat/ChatHeader.vue"
import MessageToolbar from "@/components/Popups/MessageToolbar.vue"
import { useChatStore } from "@/stores/modules/chat"
import { emitUpdateScrollImmediate } from "@/utils/mitt-bus"

import Chatwin from "./chat/Chatwin.vue"
import ConversationList from "./chat/ConversationList.vue"
import EmptyMessage from "./components/EmptyMessage.vue"
import ReplyBox from "./components/ReplyBox.vue"
import SearchInput from "./components/SearchInput.vue"
import Editor from "./editor/index.vue"

const chatStore = useChatStore()

const { isChatSessionListCollapsed } = storeToRefs(chatStore)

const toggleCollapsed = () => {
  chatStore.$patch((state) => {
    state.isChatSessionListCollapsed = !state.isChatSessionListCollapsed
  })
}

onActivated(() => {
  console.log("onActivated")
  emitUpdateScrollImmediate()
})

onDeactivated(() => {
  console.log("onDeactivated")
})

onMounted(() => {
  emitUpdateScrollImmediate()
})
</script>

<style lang="scss" scoped>
.message-left {
  width: 280px;
  min-width: 280px;
  max-width: 380px;
  position: relative;
  border-right: 1px solid var(--color-border-default);
  // transition: width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.style-layout {
  border-right: 0px;
  width: 0px !important;
  min-width: 0px !important;
}
.message-right {
  background: var(--color-body-bg);
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
  min-width: 375px;
}
.scroll-container {
  height: calc(100% - 60px);
  position: relative;
}
#drag {
  position: absolute;
  z-index: 10;
  height: 2px;
  width: 100%;
  user-select: none;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.resize-hover:hover {
  background: #409eff !important;
}
.sidebar-drag {
  pointer-events: all;
  position: absolute;
  z-index: 9;
  top: 0;
  right: -1px;
  display: flex;
  align-items: center;
  width: 2px;
  height: 100%;
  cursor: ew-resize;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  &:hover {
    background: #409eff !important;
  }
}
.layout-center {
  pointer-events: all;
  position: absolute;
  z-index: 1;
  top: 0;
  right: -16px;
  display: flex;
  align-items: center;
  width: 16px;
  height: 100%;
  & > div {
    display: flex;
    align-items: center;
    width: 16px;
    height: 40px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    color: #999999;
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid var(--color-border-default);
    border-left-width: 0;
    display: none;
  }
  &:hover > div {
    display: flex !important;
  }
}
</style>
