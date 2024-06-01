<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  computed: {
    ...mapState({
      lang: (state) => state.settings.lang,
    }),
    locale() {
      return this.lang === "zh" ? zhCn : en;
    },
  },
  mounted() {
    this.loginAgain(this.$route);
  },
  methods: {
    loginAgain({ name }) {
      if (!name) return;
      this.$nextTick(() => {
        if (name === "login") return;
        this.$store.dispatch("LOG_IN_AGAIN");
      });
    },
  },
});
</script>

<style lang="scss">
#app {
  height: 100%;
}
.v-contextmenu {
  .v-contextmenu-item--hover {
    background: #f6f7f8 !important;
  }
  .v-contextmenu-item {
    height: 23px;
    line-height: 23px;
    padding: 0px 5px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    font-weight: 500;
  }
  .v-contextmenu-inner {
    width: 110px;
    padding: 5px 5px;
  }
}
</style>

