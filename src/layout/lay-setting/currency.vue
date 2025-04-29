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
          @click="languageChange"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </li>
    <li v-if="!isLocalMode">
      <el-button @click="logout" type="primary">
        {{ $t("login.logout") }}
      </el-button>
    </li>
  </ul>
</template>

<script setup>
import { languages, options } from "./enums";
import { useUserStore } from "@/stores/index";

const isLocalMode = __LOCAL_MODE__;
const { DEV: isDev } = import.meta.env;

const userStore = useUserStore();

function languageChange() {}

function logout() {
  userStore.handleUserLogout();
}

const themeColor = computed({
  get() {
    return userStore.themeScheme;
  },
  set(val) {
    userStore.setThemeScheme(val);
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
