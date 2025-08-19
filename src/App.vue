<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { computed, onMounted } from "vue";

import { useSettings } from "@/hooks/useSettings";
import { elementPlusLocales } from "@/locales/element-plus";
import { useAppStore, useThemeStore, useUserStore } from "@/stores/index";

defineOptions({ name: "App" });

const appStore = useAppStore();
const userStore = useUserStore();
const themeStore = useThemeStore();
const locale = computed(() => elementPlusLocales[appStore.locale]);

onMounted(() => {
  themeStore.setFontTheme();
  themeStore.setThemeScheme();
  userStore.tryReconnect();
  useSettings();
});
</script>
