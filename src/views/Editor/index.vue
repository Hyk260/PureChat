# 聊天工作室
<template>
  <div class="list-container">
    <!-- 聊天列表 -->
    <div class="message-left">
      <!-- 搜索框 -->
      <Search />
      <div :class="['scroll-container', networkStatus ? 'style-net' : '']">
        <!-- 连接已断开 -->
        <networklink :show="networkStatus" />
        <!-- 会话列表 -->
        <ConversationList />
      </div>
    </div>
    <!-- 聊天框 -->
    <div class="message-right" id="svgBox">
      <Header />
      <!-- 聊天窗口 -->
      <Chatwin ref="ChatRef" />
      <div id="svgResize" @mouseover="dragControllerDiv(ChatRef)"></div>
      <!-- 编辑器 -->
      <Editor />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { copyFile } from "fs";
import { useStore } from "vuex";
import { getChat, getMsgList } from "@/api/chat";
import { useState } from "@/utils/hooks/useMapper";
import { dragControllerDiv } from "./utils/utils";

import Editor from "./Editor.vue";
import Search from "./components/Search.vue";
import Header from "./components/Header.vue";
import Chatwin from "./Chatwin.vue";
import networklink from "./components/networklink.vue";
import ConversationList from "./ConversationList.vue";

const ChatRef = ref(null);
const { state, dispatch, commit } = useStore();
const {
  noMore,
  userInfo,
  networkStatus,
  currentMessageList,
  historyMessageList,
  currentConversation,
} = useState({
  userInfo: (state) => state.data,
  noMore: (state) => state.conversation.noMore,
  networkStatus: (state) => state.conversation.networkStatus,
  currentMessageList: (state) => state.conversation.currentMessageList,
  historyMessageList: (state) => state.conversation.historyMessageList,
  currentConversation: (state) => state.conversation.currentConversation,
});
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 100%;
  display: flex;
}
.message-left {
  width: 280px;
}
.message-right {
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  width: calc(100% - 280px);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.scroll-container {
  height: calc(100% - 60px);
  position: relative;
  ::v-deep .is-active {
    background: #f0f2f5;
    // background: #00000008;
  }
  ::v-deep .is-actives {
    background: rgba(0, 0, 0, 0.03);
  }
}
.style-net {
  height: calc(100% - 60px - 34px);
}

#svgResize {
  position: relative;
  height: 5px;
  width: 100%;
  cursor: s-resize;
  // cursor: row-resize;
}
</style>
