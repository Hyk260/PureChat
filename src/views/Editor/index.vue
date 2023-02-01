<template>
  <div class="list-container">
    <Sidebar />
    <!-- 聊天列表 -->
    <div class="message-left">
      <!-- 搜索框 -->
      <Search />
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="全部" name="whole"></el-tab-pane>
        <el-tab-pane label="未读" name="unread"></el-tab-pane>
        <el-tab-pane label="@我" name="mention"></el-tab-pane>
      </el-tabs>
      <div :class="['scroll-container', !networkStatus ? 'style-net' : '']">
        <!-- 连接已断开 -->
        <networklink :show="!networkStatus" />
        <!-- 会话列表 -->
        <ConversationList />
      </div>
    </div>
    <!-- 聊天框 :class="['message-right', groupDrawer ? 'style-group' : '']"-->
    <div
      :class="{ 'message-right': true, 'style-group': groupDrawer }"
      id="svgBox"
    >
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
      <!-- 多选框 -->
      <MultiChoiceBox />
      <!-- 编辑器 -->
      <Editor />
    </div>
    <!-- 群详情 -->
    <GroupDetails />
  </div>
</template>

<script setup>
import {
  ref,
  onActivated,
  onDeactivated,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import { useEventListener } from "@/utils/hooks/index";
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { dragControllerDiv } from "./utils/utils";
import { useStore } from "vuex";

import Editor from "./Editor.vue";
import Sidebar from "./Sidebar.vue";
import Search from "./components/Search.vue";
import Header from "./components/Header.vue";
import Chatwin from "./Chatwin.vue";
import GroupDetails from "./GroupDetails.vue";
import networklink from "./components/networklink.vue";
import ConversationList from "./ConversationList.vue";
import MultiChoiceBox from "./components/MultiChoiceBox.vue";

const ChatRef = ref(null);
const showGroup = ref(false);
const activeName = ref("whole");
const { state, dispatch, commit } = useStore();

const { toAccount } = useGetters(["toAccount"]);
const {
  networkStatus,
  conver,
  user,
  groupDrawer,
  showMsgBox,
  conversationList,
} = useState({
  networkStatus: (state) => state.conversation.networkStatus,
  user: (state) => state.data.user,
  conver: (state) => state.conversation.currentConversation,
  showMsgBox: (state) => state.conversation.showMsgBox,
  groupDrawer: (state) => state.groupinfo.groupDrawer,
  conversationList: (state) => state.conversation.conversationList,
});
const handleClick = ({ props }, event) => {
  const { label, name } = props;
  commit("TOGGLE_LIST", name);
};
useEventListener(window, "online", () => {
  commit("SET_NETWORK_STATUS", true);
});
useEventListener(window, "offline", () => {
  commit("SET_NETWORK_STATUS", false);
});
onActivated(() => {
  console.log("onActivated");
  commit("updataScroll");
});
onDeactivated(() => {
  console.log("onDeactivated");
  commit("setgroupDrawer", false);
});
onMounted(() => {});
onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.demo-tabs {
  :deep(.el-tabs__header) {
    margin: 0;
    padding: 0 16px;
  }
  :deep(.el-tabs__nav-wrap) {
    margin: 0;
  }
}
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
  width: calc(100% - 280px - 68px);
  height: 100%;
  position: relative;
  overflow: hidden;
  min-width: 274px;
}
.style-group {
  width: calc(100% - 280px - 68px - 220px);
}
.scroll-container {
  height: calc(100% - 60px - 40px);
  position: relative;

  :deep(.is-active) {
    background: #f0f2f5;
  }
  :deep(.is-actives) {
    background: rgba(0, 0, 0, 0.03);
  }
}
.style-net {
  height: calc(100% - 60px - 34px - 40px);
}

#svgResize {
  position: relative;
  height: 5px;
  width: 100%;
  cursor: s-resize;
  // cursor: row-resize;
  font-size: 12px;
}
:deep(.group-chat-switch) {
  position: absolute;
  right: 0;
  background: rgb(218, 218, 218);
  border-radius: 2px 0 0 2px;
  width: 10px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background: rgb(137, 210, 243);
  }
  .el-icon {
    font-size: 14px !important;
    color: #fff;
  }
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
