<template>
  <ElConfigProvider :locale="locale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { computed, onMounted } from "vue";

import AppProvider from "@/components/Common/app-provider.vue";
import { useSettings } from "@/hooks/useSettings";
import { elementPlusLocales } from "@/locales/element-plus";
import { useAppStore, useThemeStore, useUserStore } from "@/stores";

defineOptions({ name: "App" });

const appStore = useAppStore();
const userStore = useUserStore();
const themeStore = useThemeStore();
const locale = computed(() => elementPlusLocales[appStore.lang]);

onMounted(() => {
  themeStore.setFontTheme();
  themeStore.setThemeScheme();
  userStore.tryReconnect();
  useSettings();
});
</script>
