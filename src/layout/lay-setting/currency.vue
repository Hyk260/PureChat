<template>
  <ul class="setting w-full">
    <li>
      <span>{{ $t("common.theme") }}</span>
      <ElSelect v-model="themeColor" placeholder="主题颜色">
        <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          <div class="flex items-center gap-5">
            <component :is="item.icon" :size="16" />
            <span> {{ item.label }}</span>
          </div>
        </ElOption>
      </ElSelect>
    </li>
    <li v-if="isDev">
      <span>{{ $t("common.language") }}</span>
      <ElSelect v-model="language" placeholder="选择语言">
        <ElOption v-for="item in languages" :key="item.value" :label="item.label" :value="item.value" />
      </ElSelect>
    </li>
    <li>
      <span>字体设置</span>
      <ElSelect v-model="font" placeholder="选择字体">
        <ElOption v-for="item in themeStore.fontThemeList" :key="item.value" :label="item.label" :value="item.value" />
      </ElSelect>
    </li>
    <li>
      <div class="flex items-center gap-5">
        <span>消息时间线</span>
      </div>
      <ElSwitch v-model="timeline" />
    </li>
    <li v-if="isDev">
      <div class="flex items-center gap-5">
        <ElBadge value="Dev" :offset="[8, -2]">
          <span>Markdown 渲染输入消息</span>
        </ElBadge>
      </div>
      <ElSwitch v-model="markdownRender" />
    </li>
    <li v-if="isDev">
      <div class="flex items-center gap-5">
        <ElBadge value="Dev" :offset="[8, -2]">
          <span>Markdown 渲染助手消息</span>
        </ElBadge>
      </div>
      <ElSwitch v-model="appStore.markdownAssistantRender" />
    </li>
    <li v-if="!IS_LOCAL_MODE">
      <ElButton type="primary" @click="logout">
        {{ $t("login.logout") }}
      </ElButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore, useUserStore } from "@/stores"

import { languages, options } from "./settings"

const { DEV: isDev } = import.meta.env

const appStore = useAppStore()
const userStore = useUserStore()
const themeStore = useThemeStore()

function logout() {
  userStore.handleUserLogout()
}

const timeline = computed({
  get() {
    return appStore.timeline
  },
  set(val) {
    appStore.setTimeline(val)
  },
})

const font = computed({
  get() {
    return themeStore.fontTheme
  },
  set(val) {
    themeStore.setFontTheme(val)
  },
})

const themeColor = computed({
  get() {
    return themeStore.themeScheme
  },
  set(val) {
    themeStore.setThemeScheme(val)
  },
})

const language = computed({
  get() {
    return appStore.lang
  },
  set(val) {
    appStore.setLang(val)
  },
})

const markdownRender = computed({
  get() {
    return appStore.markdownRender
  },
  set(val) {
    appStore.setMarkdownRender(val)
  },
})

onMounted(() => {
  themeStore.loadSystemFonts()
})
</script>

<style lang="scss" scoped>
.setting {
  display: flex;
  flex-direction: column;
  gap: 20px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-select {
      max-width: 180px;
    }
  }
}
</style>
