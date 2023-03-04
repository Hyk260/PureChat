<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { onMounted, nextTick, defineComponent } from "vue";
import { useStore, mapState } from "vuex";
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
    ...mapState({
      lang: (state) => state.settings.lang,
    }),
    currentLocale() {
      return this.lang === "zh-CN" ? zhCn : en;
    },
  },
  setup() {
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
</style>
