<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { onMounted, nextTick, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  computed: {
    currentLocale() {
      return en;
      // this.$storage.locale?.locale === "zh" ? zhCn : en;
    },
  },
  setup() {
    // const locale = zhCn;
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
    return {
      //  locale,
      route,
    };
  },
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
.drawer-group {
  background-color: rgba(255, 255, 255, 0) !important;
  .el-drawer {
    border-radius: 5px 0 0 5px;
  }
}
</style>
