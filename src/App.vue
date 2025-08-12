<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import { elementPlusLocales } from "@/locales/element-plus";
import { useSettings } from "@/hooks/useSettings";
import { useUserStore, useAppStore, useThemeStore } from "@/stores/index";

defineOptions({ name: "App" });

const appStore = useAppStore();
const userStore = useUserStore();
const themeStore = useThemeStore();
const locale = computed(() => elementPlusLocales[appStore.locale]);

onMounted(() => {
  themeStore.setFontTheme();
  themeStore.setThemeScheme();
  userStore.tryReconnect();
  useSettings()
});
</script>
