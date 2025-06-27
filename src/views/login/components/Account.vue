<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <!-- 账号 -->
    <el-form-item prop="username">
      <el-autocomplete
        clearable
        size="large"
        :debounce="200"
        :prefix-icon="User"
        v-model="form.username"
        :placeholder="$t('login.username')"
        @select="handleSelect"
        :fetch-suggestions="handleSearch"
      />
      <!-- <el-input
        v-model="form.username"
        :placeholder="$t('login.username')"
        :prefix-icon="User"
        size="large"
        clearable
      >
      </el-input> -->
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        :placeholder="$t('login.password')"
        :prefix-icon="Lock"
        size="large"
        clearable
        show-password
      >
      </el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item v-if="showVerifyCode" prop="verifyCode">
      <el-input
        v-model="form.verifyCode"
        size="large"
        :placeholder="$t('login.verifyCode')"
        clearable
      >
        <template #prefix>
          <el-icon><Key /></el-icon>
        </template>
        <template #append>
          <ImageVerify v-model:code="verifyCode" />
        </template>
      </el-input>
    </el-form-item>
    <!-- 记住密码 -->
    <div class="login-options">
      <el-checkbox v-model="form.remember">{{ $t("login.remember") }}</el-checkbox>
      <div class="forget-password">{{ $t("login.forget") }}</div>
    </div>
    <!-- 登录 -->
    <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
      <template #loading>
        <div class="iconify-icon svg-spinners mr-8"></div>
      </template>
      <span> {{ $t("login.login") }}</span>
    </el-button>
  </el-form>
  <!-- other hidden -->
  <div class="mt-20 flex justify-evenly">
    <el-button v-for="item in operates" :key="item.title" size="default" @click="setCurrentPage(item)">
      {{ item.title }}
    </el-button>
  </div>
  <!-- 第三方登录 -->
  <el-form-item>
    <el-divider>
      <p class="text-gray-500">{{ $t("login.thirdLogin") }}</p>
    </el-divider>
    <div class="social-login">
      <span
        v-for="(item, index) in thirdParty"
        :key="index"
        :title="item.title"
        :class="loading ? 'pointer-events-none' : ''"
        @click="handleSocialLogin(item)"
      >
        <SvgIcon class="social-icon" :local-icon="item.icon" />
      </span>
    </div>
  </el-form-item>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { getUserList } from "@/service/api/index";
import { Lock, User } from "@element-plus/icons-vue";
import { useOAuth } from "@/hooks/useOAuth";
import { useState } from "@/utils/hooks/index";
import { operates, thirdParty } from "../utils/enums";
import { rules, defaultForm } from "../utils/validation";
import { useUserStore } from "@/stores/index";
import ImageVerify from "@/components/ImageVerify/index.vue";

const { DEV: isDev } = import.meta.env;

const showVerifyCode = false;
const verifyCode = ref("");
const formRef = ref();
const form = ref({ ...defaultForm });
const userSuggestions = ref([]);

const userStore = useUserStore();
const [loading, setLoading] = useState();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const { oauthAuthorize } = useOAuth({
  onSuccess: (data) => {
    console.log("授权成功", data);
    userStore.handleSuccessfulAuth(data);
    setLoading(true);
  },
  onError: (error) => {
    console.error("授权失败", error);
    setLoading(false);
  },
});

const handleSelect = (item) => {
  console.log(item);
};

const handleSearch = (query, callback) => {
  const results = query
    ? userSuggestions.value.filter((user) => user.value.toLowerCase().includes(query.toLowerCase()))
    : userSuggestions.value;
  callback(results);
};

const handleLogin = async () => {
  if (!formRef.value) return;
  setLoading(true);
  try {
    await formRef.value.validate();
    if (isDev) await delay(1000);
    await userStore.handleUserLogin(form.value);
  } finally {
    setLoading(false);
  }
};

const handleSocialLogin = async ({ icon }) => {
  setLoading(true);
  if (icon === "github") oauthAuthorize();
};

const setCurrentPage = (item) => {
  userStore.setCurrentPage(item.currentPage)
};

const handleKeyPress = ({ code }) => {
  if (code === "Enter") handleLogin(formRef.value);
};

onMounted(async () => {
  userSuggestions.value = await getUserList();
  window.document.addEventListener("keypress", handleKeyPress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", handleKeyPress);
});

watch(verifyCode, (value) => {
  // 测试环境自动填充图形验证码
  if (isDev) form.value.verifyCode = value;
  userStore.setVerifyCode(value);
});
</script>

<style lang="scss" scoped>
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
  .forget-password {
    cursor: pointer;
    color: var(--el-color-primary);
  }
}

.social-login {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  .social-icon {
    cursor: pointer;
    color: rgb(107, 114, 128);
  }
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
  box-shadow: none;
  background-color: transparent;
}
</style>
