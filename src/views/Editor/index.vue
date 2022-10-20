# 聊天工作室
<template>
  <div class="list-container">
    <!-- 聊天列表 -->
    <div class="message-left">
      <!-- 搜索框 -->
      <Search />
      <div :class="['scroll-container', !networkStatus ? 'style-net' : '']">
        <!-- 连接已断开 -->
        <networklink :show="!networkStatus" />
        <!-- 会话列表 -->
        <ConversationList />
      </div>
    </div>
    <!-- 聊天框 -->
    <div class="message-right" id="svgBox">
      <Header />
      <!-- 聊天窗口 -->
      <Chatwin ref="ChatRef" />
      <div
        id="svgResize"
        @mouseover="dragControllerDiv(ChatRef)"
        v-if="showMsgBox"
      >
        <!-- <div class="back-to-the-bottom" @click="toBottom">
          <el-icon class="svg-left">
            <DArrowLeft />
          </el-icon>
          <span>回到底部</span>
        </div> -->
      </div>
      <!-- 编辑器 -->
      <Editor v-show="showMsgBox" @sendMsgCallback="sendMsgCallback" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { copyFile } from "fs";
import { useState } from "@/utils/hooks/useMapper";
import { dragControllerDiv } from "./utils/utils";
import { useStore } from "vuex";
import Editor from "./Editor.vue";
import Search from "./components/Search.vue";
import Header from "./components/Header.vue";
import Chatwin from "./Chatwin.vue";
import networklink from "./components/networklink.vue";
import ConversationList from "./ConversationList.vue";
// import { nextTick } from "process";

const ChatRef = ref(null);
const { state, dispatch, commit } = useStore();

const { networkStatus, user, showMsgBox, conversationList, needScrollDown } =
  useState({
    networkStatus: (state) => state.conversation.networkStatus,
    user: (state) => state.data.user,
    showMsgBox: (state) => state.conversation.showMsgBox,
    conversationList: (state) => state.conversation.conversationList,
    needScrollDown: (state) => state.conversation.needScrollDown,
  });
console.log(needScrollDown);

const scrollInto = () => {
  nextTick(() => {
    ChatRef?.value.UpdataScrollInto();
  });
};

watch(
  needScrollDown,
  () => {
    scrollInto();
  },
  {
    deep: true, //深度监听
    immediate: true,
  }
);

const monitoring = () => {
  console.log(navigator);
  let status = navigator?.onLine;
  commit("SET_NETWORK_STATUS", status);
};
// 消息发送回调
const sendMsgCallback = (data) => {
  scrollInto();
};

window.addEventListener("online", monitoring);
window.addEventListener("offline", monitoring);

onBeforeUnmount(() => {
  window.removeEventListener("online", monitoring);
  window.removeEventListener("offline", monitoring);
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

  :deep(.is-active) {
    background: #f0f2f5;
  }
  :deep(.is-actives) {
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
  font-size: 12px;
}
.back-to-the-bottom {
  position: absolute;
  width: 70px;
  height: 20px;
  background: #17a7f6;
  top: -30px;
  right: 15px;
  z-index: 1;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
}
</style>
