<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { loader } from "@/utils/loaders";
import { onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const locale = zhCn;
const route = useRoute();
const router = useRouter();
const { state, dispatch, commit } = useStore();

onMounted(async () => {
  commit("updataRoute");
  setTimeout(() => {
    if (route.name !== "login") {
      dispatch("RE_LOGIN");
    }
  }, 200);
});
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
