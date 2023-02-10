<template>
  <div class="list-container">
    <!-- 侧边栏 -->
    <Sidebar />
    <!-- 消息 -->
    <news v-show="outside == 'news'" />
    <!-- 通讯录 -->
    <mailList v-show="outside == 'mail_list'" />
    <!-- 应用 -->
    <application v-show="outside == 'application'" />
    <!-- 测试 -->
    <test v-show="outside == 'test'" />
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
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";

import Sidebar from "./Sidebar.vue";
import application from "./application.vue";
import mailList from "./mailList.vue";
import news from "./news.vue";
import test from "./test.vue";

const { state, dispatch, commit } = useStore();

const {
  networkStatus,
  conver,
  user,
  outside,
  groupDrawer,
  showMsgBox,
  conversationList,
} = useState({
  outside: (state) => state.conversation.outside,
  networkStatus: (state) => state.conversation.networkStatus,
  user: (state) => state.data.user,
  conver: (state) => state.conversation.currentConversation,
  showMsgBox: (state) => state.conversation.showMsgBox,
  groupDrawer: (state) => state.groupinfo.groupDrawer,
  conversationList: (state) => state.conversation.conversationList,
});
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
