<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { loader } from "@/utils/loaders";
import { onMounted, nextTick } from "vue";
import { useState } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const locale = zhCn;
const route = useRoute();
const router = useRouter();
const { state, dispatch, commit } = useStore();

const { currentConversation, userInfo, currentMessageList } = useState({
  currentConversation: (state) => state.conversation.currentConversation,
  currentMessageList: (state) => state.conversation.currentMessageList,
  userInfo: (state) => state.data.user,
});

onMounted(async () => {
  commit("updataRoute");
  setTimeout(() => {
    if (route.name !== "login") {
      dispatch("RE_LOGIN");
    }
  }, 200);
});

const fnresize = () => {
  /** width app-wrapper类容器宽度
   * 0 < width <= 760 隐藏侧边栏
   * 760 < width <= 990 折叠侧边栏
   * width > 990 展开侧边栏
   */
  // let dom = document.getElementById("app");
  // let setWidth = dom?.offsetWidth;
  // if (!setWidth) return;
  // if (setWidth <= 760) {
  //   commit("updateSettings", {
  //     key: "sidebar",
  //     value: false,
  //   });
  // } else {
  //   commit("updateSettings", {
  //     key: "sidebar",
  //     value: true,
  //   });
  // }
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
.content-wrap {
  padding: 24px;
  height: calc(100vh - 86px);
}
</style>
