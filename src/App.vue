<template>
  <ElConfigProvider :locale="locale">
    <AppProvider>
      <RouterView />
      <!-- <Icon icon="cil:locomotive" :inline="true" /> -->
    </AppProvider>
  </ElConfigProvider>
</template>

<script setup lang="ts">
// import { Icon } from "@iconify/vue"
import { useCopyCode } from "@pure/utils/hooks"
import { ElConfigProvider } from "element-plus"

import AppProvider from "@/components/Common/app-provider.vue"
import { useSettings } from "@/hooks/useSettings"
import { elementPlusLocales } from "@/locales/element-plus"
import { useAppStore, useThemeStore, useUserStore } from "@/stores"

defineOptions({ name: "App" })

const appStore = useAppStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const locale = computed(() => elementPlusLocales[appStore.lang])

onMounted(() => {
  themeStore.setFontTheme()
  themeStore.setThemeScheme()
  userStore.tryReconnect()
  // setup global copy code handler
  useCopyCode({
    onSuccess: () => {
      window.$message?.success("复制成功")
    },
  })
  useSettings()
})
</script>
