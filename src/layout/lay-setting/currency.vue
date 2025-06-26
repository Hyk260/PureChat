<template>
  <ul class="setting w-full">
    <li>
      <span>{{ $t("common.theme") }}</span>
      <el-select v-model="themeColor" placeholder="主题颜色">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </li>
    <li v-if="isDev">
      <span>{{ $t("common.language") }}</span>
      <el-select v-model="language" placeholder="选择语言">
        <el-option
          v-for="item in languages"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </li>
    <li>
      <span>字体设置</span>
      <el-select v-model="font" placeholder="选择字体">
        <el-option
          v-for="item in themeStore.fontThemeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </li>
    <li>
      <div class="flex items-center gap-5">
        <span>消息时间线</span>
      </div>
      <el-switch v-model="timeline" />
    </li>
    <li>
      <div class="flex items-center gap-5">
        <span>Markdown渲染输入消息</span>
      </div>
      <el-switch v-model="markdownRender" />
    </li>
    <li v-if="!IS_LOCAL_MODE">
      <el-button @click="logout" type="primary">
        {{ $t("login.logout") }}
      </el-button>
    </li>
  </ul>
</template>

<script setup>
import { onMounted } from "vue";
import { languages, options } from "./enums";
import { useUserStore, useThemeStore } from "@/stores/index";

const { DEV: isDev } = import.meta.env;

const userStore = useUserStore();
const themeStore = useThemeStore();

function logout() {
  userStore.handleUserLogout();
}

const timeline = computed({
  get() {
    return userStore.timeline;
  },
  set(val) {
    userStore.setTimeline(val);
  },
});

const font = computed({
  get() {
    return themeStore.fontTheme;
  },
  set(val) {
    themeStore.setFontTheme(val);
  },
});

const themeColor = computed({
  get() {
    return themeStore.themeScheme;
  },
  set(val) {
    themeStore.setThemeScheme(val);
  },
});

const language = computed({
  get() {
    return userStore.lang;
  },
  set(val) {
    userStore.setLang(val);
  },
});

const markdownRender = computed({
  get() {
    return userStore.markdownRender;
  },
  set(val) {
    userStore.setMarkdownRender(val);
  },
});

onMounted(() => {
  themeStore.loadSystemFonts();
});
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
