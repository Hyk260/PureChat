<template>
  <div class="conv-chat flex w-full">
    <!-- 聊天列表 -->
    <div class="message-left" :class="{ 'style-layoutkit': isChatSessionListCollapsed }">
      <!-- 搜索框 -->
      <Search v-show="!isChatSessionListCollapsed" />
      <!-- tabs切换 -->
      <el-tabs
        v-show="!isChatSessionListCollapsed"
        v-if="!isLocalMode"
        v-model="activeName"
        class="active-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane :label="$t('chat.whole')" name="whole"></el-tab-pane>
        <el-tab-pane :label="unread" name="unread"></el-tab-pane>
        <el-tab-pane :label="$t('chat.mention')" name="mention"></el-tab-pane>
      </el-tabs>
      <div
        class="scroll-container"
        :class="{ 'style-net': !appStore.networkStatus, 'local-mode': isLocalMode }"
      >
        <!-- 连接已断开 -->
        <networklink :show="!appStore.networkStatus" />
        <!-- 会话列表 -->
        <ConversationList />
      </div>
      <div class="layoutkit-center">
        <div @click="toggleCollapsed">
          <FontIcon :iconName="isChatSessionListCollapsed ? 'ArrowRight' : 'ArrowLeft'" />
        </div>
      </div>
      <!-- <div class="sidebar-drag"></div> -->
    </div>
    <!-- 聊天框 -->
    <div id="container" class="message-right">
      <EmptyMessage className="empty" v-if="!conver" />
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
    <!-- 合并消息弹框 -->
    <MergeMessagePopup />
    <!-- 群详情 -->
    <GroupDetails v-if="isGroupChat" :groupProfile="conver.groupProfile" />
  </div>
</template>

<script setup>
import { onActivated, onDeactivated, onMounted, onUnmounted, ref, watch } from "vue";
import { $t } from "@/locales/index";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";
import { storeToRefs } from "pinia";
import { isMacOS } from "@/utils/common";
import { useAppStore, useChatStore } from "@/stores/index";
import { useDragHandler } from "@/utils/hooks/useDragHandler";
import emitter from "@/utils/mitt-bus";

import Chatwin from "./chat/Chatwin.vue";
import ConversationList from "./chat/ConversationList.vue";
import Editor from "./chat/Editor.vue";
import GroupDetails from "./chat/GroupDetails.vue";
import EmptyMessage from "./components/EmptyMessage.vue";
import Header from "./components/Header.vue";
import MergeMessagePopup from "./components/MergeMessagePopup.vue";
import MultiChoiceBox from "./components/MultiChoiceBox.vue";
import ReplyBox from "./components/ReplyBox.vue";
import Search from "./components/Search.vue";
import networklink from "./components/networklink.vue";

const isLocalMode = __LOCAL_MODE__;

const unread = ref("");
const chatRef = ref(null);
const activeName = ref("whole");

const appStore = useAppStore();
const chatStore = useChatStore();

const { commit } = useStore();
const { isChatBoxVisible, isFullscreenInputActive, isChatSessionListCollapsed } = storeToRefs(chatStore);

const { isGroupChat } = useGetters(["isGroupChat"]);
const { conver } = useState({
  conver: (state) => state.conversation.currentConversation
});

const handleClick = ({ props }, event) => {
  const { label, name } = props;
  commit("toggleList", name);
};

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

const updateUnread = (count) => {
  const isUnread = count > 0;
  const num = count > 99 ? "99+" : count;
  unread.value = isUnread ? `${$t("chat.unread")}(${num})` : $t("chat.unread");
};

onActivated(() => {
  emitter.emit("updataScroll");
  updateUnread(chatStore.totalUnreadMsg);
  commit("toggleList", "whole");
});

onDeactivated(() => {});

onMounted(() => {
  chatStore.$patch({ isChatSessionListCollapsed: false });
});

onUnmounted(() => {});

watch(() => chatStore.totalUnreadMsg, updateUnread);

watch(isChatBoxVisible, (val) => {
  val && useDragHandler(chatRef.value);
});
</script>

<style lang="scss" scoped>
.active-tabs {
  // user-select: none;
  :deep(.el-tabs__header) {
    margin: 0;
    padding: 0 16px;
  }
  :deep(.el-tabs__nav-wrap) {
    margin: 0;
  }
}
.message-left {
  width: 280px;
  min-width: 280px;
  max-width: 380px;
  position: relative;
  border-right: 1px solid var(--color-border-default);
  // transition: width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.style-layoutkit {
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
  height: calc(100% - 60px - 40px);
  position: relative;
}
.local-mode {
  height: calc(100% - 60px);
  position: relative;
}
.style-net {
  height: calc(100% - 60px - 34px - 40px);
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
.layoutkit-center {
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
