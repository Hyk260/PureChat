<template>
  <div class="flex w-full">
    <!-- 聊天列表 -->
    <div class="message-left" :class="{ 'style-layoutkit': arrowRight }">
      <!-- 搜索框 -->
      <Search :class="{ 'opacity-0': arrowRight }" />
      <!-- tabs切换 -->
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        :class="{ 'opacity-0': arrowRight }"
        @tab-click="handleClick"
      >
        <el-tab-pane :label="$t('chat.whole')" name="whole"></el-tab-pane>
        <el-tab-pane :label="unread" name="unread"></el-tab-pane>
        <el-tab-pane :label="$t('chat.mention')" name="mention"></el-tab-pane>
        <!-- <el-tab-pane label="群聊" name="groupChat"></el-tab-pane> -->
      </el-tabs>
      <div class="scroll-container" :class="{ 'style-net': !networkStatus }">
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
      <div
        id="drag"
        :class="{ 'resize-hover': !fullScreen }"
        @mouseover="dragControllerDiv(chatRef)"
        v-if="showMsgBox"
      ></div>
      <!-- 编辑器 -->
      <Editor />
      <!-- 多选框 -->
      <MultiChoiceBox />
    </div>
    <!-- 合并消息弹框 -->
    <MergeMessagePopup />
    <!-- 群详情 -->
    <GroupDetails
      v-if="isGroupChat"
      :groupProfile="conver.groupProfile"
      :staff="isallStaff(conver)"
    />
    <ImageViewer />
  </div>
</template>

<script setup>
import { $t } from "@/locales/index";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import { useEventListener } from "@vueuse/core";
import { onActivated, onDeactivated, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { dragControllerDiv, isallStaff } from "./utils/utils";
import ImageViewer from '../components/ImageViewer/index.vue';

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

const unread = ref("");
const chatRef = ref(null);
const activeName = ref("whole");
const { dispatch, commit } = useStore();

const { isGroupChat } = useGetters(["isGroupChat"]);
const { networkStatus, conver, showMsgBox, totalUnreadMsg, arrowRight, fullScreen } = useState({
  networkStatus: (state) => state.conversation.networkStatus,
  totalUnreadMsg: (state) => state.conversation.totalUnreadMsg,
  conver: (state) => state.conversation.currentConversation,
  showMsgBox: (state) => state.conversation.showMsgBox,
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
  commit("TOGGLE_LIST", name);
};
const onRight = (value) => {
  commit("SET_CONVERSATION_VALUE", { key: "arrowRight", value: !value });
};
useEventListener(window, "online", () => {
  commit("SET_NETWORK_STATUS", true);
});
useEventListener(window, "offline", () => {
  commit("SET_NETWORK_STATUS", false);
});
useEventListener(window, "focus", () => {
  if (!conver.value) return;
  commit("SET_HISTORYMESSAGE", {
    type: "MARKE_MESSAGE_AS_READED",
    payload: {
      convId: conver?.value.conversationID,
      message: conver.value,
    },
  });
});
onActivated(() => {
  emitter.emit("updataScroll");
  commit("TOGGLE_LIST", "whole");
});
onDeactivated(() => {});
onMounted(() => {
  commit("SET_CONVERSATION_VALUE", { key: "arrowRight", value: false });
});
onUnmounted(() => {});
watchEffect(() => {
  fnTotalUnreadMsg();
});
</script>

<style lang="scss" scoped>
.demo-tabs {
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
  position: relative;
  border-right: 1px solid var(--color-border-default);
  transition: width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.style-layoutkit {
  border-right: 0px;
  width: 0px;
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
  min-width: 274px;
}
.scroll-container {
  height: calc(100% - 60px - 40px);
  position: relative;
}
.style-net {
  height: calc(100% - 60px - 34px - 40px);
}

#drag {
  position: absolute;
  height: 3px;
  z-index: 10;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.resize-hover:hover {
  cursor: row-resize;
  background: #eeeeee;
  // --color-drag-hover: #eeeeee;
}
.back-to-the-bottom {
  @include flex-center;
  position: absolute;
  width: 70px;
  height: 20px;
  background: #17a7f6;
  top: -30px;
  right: 15px;
  z-index: 1;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
}
.layoutkit-center {
  pointer-events: all;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  top: 0;
  right: -17px;
  width: 16px;
  height: 100%;
  display: flex;
  & > div {
    align-items: center;
    display: flex;
    width: 16px;
    height: 40px;
    border-radius: 0 4px 4px 0;
    pointer-events: all;
    cursor: pointer;
    color: #999999;
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid var(--color-button-border);
    border-left-width: 0;
    display: none;
  }
  &:hover > div {
    display: flex !important;
  }
}
</style>
