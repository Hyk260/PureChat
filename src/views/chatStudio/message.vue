<template>
  <div class="conv-chat flex w-full">
    <!-- 聊天列表 -->
    <div class="message-left" :class="{ 'style-layoutkit': arrowRight }">
      <!-- 搜索框 -->
      <Search :class="{ 'opacity-0': arrowRight }" />
      <!-- tabs切换 -->
      <el-tabs
        v-if="!isLocalMode"
        v-model="activeName"
        class="active-tabs"
        :class="{ 'opacity-0': arrowRight }"
        @tab-click="handleClick"
      >
        <el-tab-pane :label="$t('chat.whole')" name="whole"></el-tab-pane>
        <el-tab-pane :label="unread" name="unread"></el-tab-pane>
        <el-tab-pane :label="$t('chat.mention')" name="mention"></el-tab-pane>
        <!-- <el-tab-pane label="群聊" name="groupChat"></el-tab-pane> -->
      </el-tabs>
      <div
        class="scroll-container"
        :class="{ 'style-net': !networkStatus, 'local-mode': isLocalMode }"
      >
        <!-- 连接已断开 -->
        <networklink :show="!networkStatus" />
        <!-- 会话列表 -->
        <ConversationList />
      </div>
      <div class="layoutkit-center">
        <div @click="onRight(arrowRight)">
          <FontIcon :iconName="arrowRight ? 'ArrowRight' : 'ArrowLeft'" />
        </div>
      </div>
      <div v-if="false" v-show="!arrowRight" class="sidebar-drag">
        <!-- <svg-icon iconClass="drag" class="drag-icon" /> -->
      </div>
    </div>
    <!-- 聊天框 -->
    <div class="message-right" :class="{ 'message-h-full': arrowRight }" id="container">
      <EmptyMessage classNmae="empty" v-if="!conver" />
      <Header />
      <!-- 聊天窗口 -->
      <Chatwin ref="chatRef" :class="{ 'chat-h-full': fullScreen }" />
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
import {
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
  watch,
  nextTick,
} from "vue";
import { $t } from "@/locales/index";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import { useEventListener } from "@vueuse/core";
import { useStore } from "vuex";
import { dragControllerDivHorizontal, createDragHandler } from "./utils/utils";
import { isMacOS } from "@/utils/common";

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

let destroyHandler = null;
const isLocalMode = __LOCAL_MODE__;
const unread = ref("");
const chatRef = ref(null);
const activeName = ref("whole");
const { dispatch, commit } = useStore();

const { isGroupChat } = useGetters(["isGroupChat"]);
const { networkStatus, conver, isChatBoxVisible, totalUnreadMsg, arrowRight, fullScreen } =
  useState({
    networkStatus: (state) => state.conversation.networkStatus,
    totalUnreadMsg: (state) => state.conversation.totalUnreadMsg,
    conver: (state) => state.conversation.currentConversation,
    isChatBoxVisible: (state) => state.conversation.isChatBoxVisible,
    arrowRight: (state) => state.conversation.arrowRight,
    fullScreen: (state) => state.conversation.fullScreen,
  });

const fnTotalUnreadMsg = () => {
  const unreadCount = totalUnreadMsg.value;
  const isUnread = unreadCount > 0;
  const num = unreadCount > 99 ? "99+" : unreadCount;
  unread.value = isUnread ? `${$t("chat.unread")}(${num})` : $t("chat.unread");
};
const handleClick = ({ props }, event) => {
  const { label, name } = props;
  commit("toggleList", name);
};
const fnDragCss = () => {
  if (fullScreen.value) return "";
  const cursor = isMacOS() ? "!cursor-row-resize" : "cursor-n-resize";
  return [cursor, !fullScreen.value ? "resize-hover" : ""];
};
const onRight = (value) => {
  commit("setConversationValue", { key: "arrowRight", value: !value });
};
const onDrag = () => {
  const dragElement = document.getElementById("drag");
  const chatBox = document.getElementById("chat-box");
  const editor = document.getElementById("editor");
  const container = document.getElementById("container");
  const dragHover = document.querySelector(".resize-hover");

  if (!dragElement || !chatBox || !editor || !container || !dragHover) {
    console.warn("Required DOM elements are missing!");
    return;
  }
  // 配置拖动
  const dragConfig = {
    dragElement,
    chatBox,
    editor,
    container,
    dragHover,
    minHeight: 200,
    offsetHeight: 60,
    scrollBar: chatRef.value,
  };

  // 初始化拖拽逻辑
  const { initialize, destroy } = createDragHandler(dragConfig);
  initialize();
  destroyHandler = destroy;
};
useEventListener(window, "online", () => {
  commit("setNetworkStatus", true);
});
useEventListener(window, "offline", () => {
  commit("setNetworkStatus", false);
});
useEventListener(window, "focus", () => {
  if (!conver.value) return;
  dispatch("hasReadMessage", { convId: conver?.value.conversationID, message: conver.value });
});
onActivated(() => {
  emitter.emit("updataScroll");
  commit("toggleList", "whole");
});
onDeactivated(() => {});

onMounted(() => {
  commit("setConversationValue", { key: "arrowRight", value: false });
});

onUnmounted(() => {
  // 清理拖动逻辑
  if (destroyHandler) {
    destroyHandler();
  }
});

watchEffect(() => {
  fnTotalUnreadMsg();
});

watch(isChatBoxVisible, (val) => {
  if (val) {
    nextTick(() => {
      onDrag();
    });
  }
});
</script>

<style lang="scss" scoped>
.active-tabs {
  user-select: none;
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
  transition: width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.style-layoutkit {
  border-right: 0px;
  width: 0px !important;
  min-width: 0px;
}
.chat-h-full {
  height: 0px !important;
  border-bottom: none;
}
.message-h-full {
  width: 100% !important;
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
  background: #409EFF !important;
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
    background: #409EFF !important;
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
