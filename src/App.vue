<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import TIM from "tim-js-sdk";
import tim from "./utils/im-sdk/tim";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { loader } from "@/utils/loaders";
import { onMounted } from "vue";
import { tree } from "@/utils/ToTree";
import { useRouter } from "vue-router";
import storage from "storejs";
import { useStore } from "vuex";
import { debounce } from "@/utils/debounce";

const { state, dispatch, commit } = useStore();
const table = storage.get("userdata");
const locale = zhCn;

onMounted(() => {
  if (!table?.Routingtable) return;
  tree(table.Routingtable);
  table.Routingtable.forEach((item) => {
    useRouter().addRoute(item);
  });

  window.onresize = () => {
    debounce?.(() => {
      fnresize();
    }, 300);
  };
  // "https://unpkg.com/ace-builds/src-noconflict/ace.js"
  // let data = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.js'
  // loader.loadScript(data).then(() => {});
  initListener();
});

const fnresize = () => {
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
function initListener(){
  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onUpdateConversationList)
}
function onUpdateConversationList(event) {
  console.log(event.data)
  // commit('updateConversationList', event.data)
}

/** width app-wrapper类容器宽度
 * 0 < width <= 760 隐藏侧边栏
 * 760 < width <= 990 折叠侧边栏
 * width > 990 展开侧边栏
 */
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
