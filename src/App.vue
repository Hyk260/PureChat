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
