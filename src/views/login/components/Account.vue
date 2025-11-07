<template>
  <ElForm ref="formRef" :model="form" :rules="rules">
    <!-- 账号 -->
    <ElFormItem prop="username">
      <template v-if="isAutoComplete">
        <ElAutocomplete
          v-model="form.username"
          clearable
          size="large"
          :debounce="200"
          :prefix-icon="User"
          :placeholder="$t('login.username')"
          :fetch-suggestions="handleSearch"
          @select="handleSelect"
        />
      </template>
      <template v-else>
        <ElInput v-model="form.username" :placeholder="$t('login.username')" :prefix-icon="User" size="large" clearable>
        </ElInput>
      </template>
    </ElFormItem>
    <!-- 密码 -->
    <ElFormItem prop="password">
      <ElInput
        v-model="form.password"
        type="password"
        :placeholder="$t('login.password')"
        size="large"
        clearable
        show-password
      >
        <template #prefix>
          <ElIcon><Lock /></ElIcon>
        </template>
      </ElInput>
    </ElFormItem>
    <!-- 验证码 -->
    <ElFormItem v-if="showVerifyCode" prop="verifyCode">
      <ElInput v-model="form.verifyCode" size="large" :placeholder="$t('login.verifyCode')" clearable>
        <template #prefix>
          <ElIcon><Key /></ElIcon>
        </template>
        <template #append>
          <ImageVerify v-model:code="verifyCode" />
        </template>
      </ElInput>
    </ElFormItem>
    <!-- 记住密码 -->
    <div class="login-options">
      <ElCheckbox v-model="form.remember">{{ $t("login.remember") }}</ElCheckbox>
      <div class="forget-password">{{ $t("login.forget") }}</div>
    </div>
    <!-- 登录 -->
    <ElButton type="primary" class="login-btn" :loading="loading" @click="handleLogin">
      <template #loading>
        <div class="iconify-icon svg-spinners mr-8"></div>
      </template>
      <span> {{ $t("login.login") }}</span>
    </ElButton>
  </ElForm>
  <!-- other hidden -->
  <div v-if="isDev" class="mt-20 flex justify-evenly">
    <ElButton v-for="item in operates" :key="item.title" size="default" @click="setCurrentPage(item)">
      {{ item.title }}
    </ElButton>
  </div>
  <!-- 第三方登录 -->
  <ElFormItem>
    <ElDivider>
      <p class="text-gray-500">{{ $t("login.thirdLogin") }}</p>
    </ElDivider>
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
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElAutocomplete } from "element-plus"
import { Lock, User } from "lucide-vue-next"
import { Key } from "@element-plus/icons-vue"

import ImageVerify from "@/components/ImageVerify/index.vue"
import { useOAuth } from "@/hooks/useOAuth"
import { useState } from "@/hooks/useState"
import { getUserList } from "@/service/api"
import { useUserStore } from "@/stores/modules/user"

import { operates, thirdParty } from "../utils/enums"
import { defaultForm, rules } from "../utils/validation"

const { DEV: isDev } = import.meta.env

defineOptions({ name: "Account" })

const showVerifyCode = false
const isAutoComplete = true
const verifyCode = ref("")
const formRef = ref()
const form = ref({ ...defaultForm })
const userSuggestions = ref<{ value: string }[]>([])

const userStore = useUserStore()
const [loading, setLoading] = useState(false)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const { oauthAuthorize } = useOAuth({
  onStart: () => {
    setLoading(true)
  },
  onSuccess: (data) => {
    console.log("授权成功", data)
    userStore.handleSuccessfulAuth(data)
    setLoading(true)
  },
  onError: (data) => {
    window.$message?.error(data.error || "授权失败")
    console.error("授权失败", data)
    setLoading(false)
  },
})

const handleSelect = (item) => {
  console.log(item)
}

const handleSearch = (query, callback) => {
  const results = query
    ? userSuggestions.value.filter((user) => user.value.toLowerCase().includes(query.toLowerCase()))
    : userSuggestions.value
  callback(results)
}

const handleLogin = async () => {
  if (!formRef.value) return
  setLoading(true)
  try {
    await formRef.value.validate()
    if (isDev) await delay(1000)
    await userStore.handleUserLogin(form.value)
  } finally {
    setLoading(false)
  }
}

const handleSocialLogin = async ({ icon }) => {
  setLoading(true)
  if (icon === "github") oauthAuthorize()
}

const setCurrentPage = (item) => {
  userStore.setCurrentPage(item.currentPage)
}

const handleKeyPress = ({ code }) => {
  if (code === "Enter") handleLogin()
}

onMounted(async () => {
  userSuggestions.value = getUserList()
  window.document.addEventListener("keypress", handleKeyPress)
})

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", handleKeyPress)
})

watch(verifyCode, (value) => {
  // 测试环境自动填充图形验证码
  if (isDev) form.value.verifyCode = value
  userStore.setVerifyCode(value)
})
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
