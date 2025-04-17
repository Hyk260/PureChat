<template>
  <div class="conv-chat flex w-full">
    <!-- 聊天列表 -->
    <div class="message-left" :class="{ 'style-layout': isChatSessionListCollapsed }">
      <!-- 搜索框 -->
      <Search v-show="!isChatSessionListCollapsed" />
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
    <div id="container" class="message-right">
      <EmptyMessage className="empty" v-if="!currentConversation" />
      <Header />
      <!-- 聊天窗口 -->
      <Chatwin ref="chatRef" :class="{ 'chat-h-full': isFullscreenInputActive }" />
      <!-- 消息回复框 -->
      <ReplyBox />
      <!-- Resize -->
      <div v-if="isChatBoxVisible" id="drag" :class="fnDragCss()"></div>
      <!-- 编辑器 -->
      <Editor />
      <!-- 多选框 -->
      <MultiChoiceBox />
    </div>
  </div>
</template>

<script setup>
import { onActivated, onDeactivated, onMounted, onUnmounted, ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { isMacOS } from "@/utils/common";
import { useAppStore, useChatStore } from "@/stores/index";
import { useDragHandler } from "@/utils/hooks/useDragHandler";
import emitter from "@/utils/mitt-bus";
import Chatwin from "./chat/Chatwin.vue";
import MultiChoiceBox from "./components/MultiChoiceBox.vue";
import ConversationList from "./chat/ConversationList.vue";
import Editor from "./editor/index.vue";
import EmptyMessage from "./components/EmptyMessage.vue";
import Header from "./components/Header.vue";
import ReplyBox from "./components/ReplyBox.vue";
import Search from "./components/Search.vue";

const isLocalMode = __LOCAL_MODE__;

const chatRef = ref(null);
const appStore = useAppStore();
const chatStore = useChatStore();

const {
  isChatBoxVisible,
  isFullscreenInputActive,
  isChatSessionListCollapsed,
  totalUnreadMsg,
  currentConversation,
} = storeToRefs(chatStore);

const fnDragCss = () => {
  if (isFullscreenInputActive.value) return "";
  const cursor = isMacOS() ? "!cursor-row-resize" : "cursor-n-resize";
  return [cursor, !isFullscreenInputActive.value ? "resize-hover" : ""];
};

const toggleCollapsed = () => {
  chatStore.$patch((state) => {
    state.isChatSessionListCollapsed = !state.isChatSessionListCollapsed;
  });
};

onActivated(() => {
  emitter.emit("updateScroll");
  isChatBoxVisible.value && useDragHandler(chatRef.value);
});

onDeactivated(() => {});

onMounted(() => {
  chatStore.$patch({ isChatSessionListCollapsed: false });
});

onUnmounted(() => {});

watch(isChatBoxVisible, (val) => {
  val && useDragHandler(chatRef.value);
});
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
.chat-h-full {
  height: 0px !important;
  border-bottom: none;
}
.message-right {
  background: var(--color-body-bg);
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
