<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import { elementPlusLocales } from "@/locales/element-plus";
import { initThemeSettings } from "@/theme/settings";
import { useUserStore } from "@/stores/modules/user";
import { useAppStore } from '@/stores/modules/app';

defineOptions({ name: "App" });

const appStore = useAppStore();
const userStore = useUserStore();
const locale = computed(() => elementPlusLocales[appStore.locale]);

onMounted(() => {
  userStore.setThemeScheme(initThemeSettings());
  userStore.tryReconnect();
});
</script>
