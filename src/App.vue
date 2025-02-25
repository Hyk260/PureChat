<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed, onMounted, nextTick } from "vue";
import { ElConfigProvider } from "element-plus";
import { elementPlusLocales } from "@/locales/element-plus";
import { initThemeSettings } from "@/theme/settings";
import { useUserStore } from "@/stores/modules/user";
import { useAppStore } from './stores/modules/app';
import { setTheme } from "@/utils/common";
import router from "@/router";

defineOptions({ name: "App" });

const appStore = useAppStore();
const userStore = useUserStore();
const locale = computed(() => elementPlusLocales[appStore.locale]);

onMounted(() => {
  setTheme(initThemeSettings());
  loginAgain(router.currentRoute.value);
});

function loginAgain({ name }) {
  if (!name) return;
  nextTick(() => {
    if (name === "login") return;
    userStore.reLoginHandler();
  });
}
</script>
