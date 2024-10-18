<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import { elementPlusLocales } from "@/locales/element-plus";
import { initThemeSettings } from "@/theme/settings"
import { setTheme } from "@/utils/common";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  computed: {
    ...mapState({
      lang: (state) => state.user.lang,
    }),
    locale() {
      return elementPlusLocales[this.lang];
    },
  },
  mounted() {
    setTheme(initThemeSettings()) 
    this.loginAgain(this.$route);
  },
  methods: {
    loginAgain({ name }) {
      if (!name) return;
      this.$nextTick(() => {
        if (name === "login") return;
        this.$store.dispatch("reLoginHandler");
      });
    },
  },
});
</script>
