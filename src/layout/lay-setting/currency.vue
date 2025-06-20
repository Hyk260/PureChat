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
        <span>显示消息时间线</span>
        <el-tooltip content="切换会话后生效" placement="top">
          <span class="flex cursor-pointer">
            <el-icon><QuestionFilled /></el-icon>
          </span>
        </el-tooltip>
      </div>
      <el-switch v-model="timeline" />
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
import { useUserStore, useThemeStore, useChatStore } from "@/stores/index";

const { DEV: isDev } = import.meta.env;

const userStore = useUserStore();
const themeStore = useThemeStore();
const chatStore = useChatStore();

function logout() {
  userStore.handleUserLogout();
}

const timeline = computed({
  get() {
    return chatStore.timeline;
  },
  set(val) {
    chatStore.setTimeline(val);
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
