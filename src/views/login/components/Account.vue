<template>
  <el-form ref="ruleFormRef" :model="user" :rules="rules">
    <!-- 账号 -->
    <el-form-item prop="username">
      <el-autocomplete
        clearable
        :debounce="200"
        size="large"
        :prefix-icon="User"
        v-model="user.username"
        :placeholder="$t('login.username')"
        @select="handleSelect"
        class="inline-input w-50"
        :fetch-suggestions="querySearch"
      />
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        v-model="user.password"
        type="password"
        :placeholder="$t('login.password')"
        :prefix-icon="Lock"
        size="large"
        show-password
      >
      </el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item prop="verifyCode">
      <el-input
        v-model="user.verifyCode"
        size="large"
        :placeholder="$t('login.verifyCode')"
        clearable
      >
        <template #prefix>
          <FontIcon class="el-input__icon" iconName="Key" />
        </template>
        <template #append>
          <ImageVerify v-model:code="imgCode" />
        </template>
      </el-input>
    </el-form-item>
    <!-- keep -->
    <div class="login-options">
      <el-checkbox v-model="user.keep">{{ $t("login.remember") }}</el-checkbox>
      <div class="forget">{{ $t("login.forget") }}</div>
    </div>
    <!-- 登录 -->
    <el-button type="primary" class="login-btn" @click="loginBtn(ruleFormRef)" :loading="false">
      <template #loading>
        <loadingSvg />
      </template>
      <span> {{ $t("login.login") }}</span>
    </el-button>
  </el-form>
  <!-- other hidden -->
  <div class="mt-20 flex justify-between" hidden>
    <el-button
      v-for="item in operates"
      :key="item.title"
      size="default"
      @click="onHandle(item.currentPage)"
    >
      {{ item.title }}
    </el-button>
  </div>
  <!-- 第三方登录 -->
  <el-form-item>
    <el-divider>
      <p class="text-gray-500 text-xs">{{ $t("login.thirdLogin") }}</p>
    </el-divider>
    <div class="w-full flex justify-evenly">
      <span v-for="(item, index) in thirdParty" :key="index" :title="item.title">
        <svg-icon @click="onClick(item)" class="icon" :iconClass="item.icon" />
      </span>
    </div>
  </el-form-item>
</template>

<script setup>
import { getuser } from "@/api/node-admin-api/index";
import { isDev } from "@/config/env";
import ImageVerify from "@/views/components/ImageVerify/index.vue";
import { Lock, User } from "@element-plus/icons-vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { authorizedLogin, oauthAuthorize } from "../utils/auth";
import { operates, thirdParty } from "../utils/enums";
import { rules, user } from "../utils/validation";
import loadingSvg from "./loadingSvg";

const router = useRouter();
const restaurants = ref([]);
const ruleFormRef = ref();
const imgCode = ref("");

const { dispatch, commit } = useStore();

const handleSelect = (item) => {
  console.log(item);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  cb(results);
};

const loginBtn = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) dispatch("LOG_IN", user);
  });
};

const onClick = async ({ icon }) => {
  oauthAuthorize(icon);
};

const onHandle = (index) => {
  commit("setCurrentPage", index);
};

const onkeypress = ({ code }) => {
  if (code === "Enter") {
    loginBtn(ruleFormRef.value);
  }
};

onMounted(async () => {
  const { loadAll } = await getuser();
  restaurants.value = loadAll;
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

watch(imgCode, (value) => {
  commit("UPDATE_USER_INFO", { key: "verifyCode", value });
  // 测试环境自动填充图形验证码
  if (isDev) user.verifyCode = value;
});
watch(
  () => router.currentRoute.value.query,
  (data) => {
    authorizedLogin(data?.code);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.icon {
  color: rgb(107, 114, 128);
}
.login-btn {
  width: 100%;
  margin-top: 20px;
}
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  font-size: 14px;
  div {
    cursor: pointer;
    color: var(--el-color-primary);
  }
}
:deep(.el-autocomplete) {
  width: 100%;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
  box-shadow: none;
  background-color: transparent;
}
</style>
