<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { tree } from "@/utils/ToTree";
import { useRouter } from "vue-router";
import storage from "storejs";
import { useStore } from "vuex";
const { state, dispatch, commit } = useStore();
const table = storage.get("userdata");

onMounted(() => {
  if (!table?.Routingtable) return;
  tree(table.Routingtable);
  table.Routingtable.forEach((item) => {
    useRouter().addRoute(item);
  });

  window.onresize = () => {
    let dom = document.getElementsByClassName("content")[0];
    console.log(dom.offsetWidth);
    let setWidth = dom.offsetWidth;
    // if (setWidth <= 760) {
    //   commit("updateSettings", {
    //     key: "sidebar",
    //     value: false,
    //   });
    // } else if (setWidth <= 990) {
    //   commit("setCollapse", false);
    // } else if (setWidth > 990) {
    //   commit("setCollapse", true);
    // }
    if (setWidth <= 760) {
      commit("updateSettings", {
        key: "sidebar",
        value: false,
      });
    } else {
      commit("updateSettings", {
        key: "sidebar",
        value: true,
      });
      // if (setWidth < 990) {
      //   commit("setCollapse", false);
      // } else if (setWidth > 990) {
      //   commit("setCollapse", true);
      // }
    }
  };
});

/** width app-wrapper类容器宽度
 * 0 < width <= 760 隐藏侧边栏
 * 760 < width <= 990 折叠侧边栏
 * width > 990 展开侧边栏
 */
</script>

<style lang="scss">
// @import "./styles/mixin.scss";
#app {
  height: 100%;
  // @include clearfix;
}
.content-wrap {
  padding: 24px;
  height: calc(100vh - 86px);
}
</style>
