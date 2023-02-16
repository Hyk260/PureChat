<template>
  <div class="login">
    <div class="login-inner select-none">
      <!-- 背景 -->
      <svg-icon iconClass="loginBg" class="wave" />
      <!-- 主题开关 -->
      <ThemeSwitch />
      <!-- 标题 -->
      <Motion>
        <header class="login-form">
          <div class="tip">
            <br />
            <h2>PURE ADMIN</h2>
          </div>
        </header>
      </Motion>
      <!-- 表单 -->
      <el-form ref="ruleFormRef" :model="user" :rules="rules">
        <!-- 账号 -->
        <el-form-item prop="username">
          <!-- <el-input
            v-model="user.username"
            placeholder="用户账号"
            :prefix-icon="User"
            size="large"
            clearable
          >
          </el-input> -->
          <el-autocomplete
            clearable
            debounce
            size="large"
            :prefix-icon="User"
            v-model="user.username"
            placeholder="用户账号"
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
            placeholder="用户密码"
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
            placeholder="验证码"
            clearable
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Key /></el-icon>
            </template>
            <template #append>
              <ReImageVerify v-model:code="imgCode" />
            </template>
          </el-input>
        </el-form-item>
        <!-- keep -->
        <div class="login-options">
          <el-checkbox v-model="keep">记住密码</el-checkbox>
          <div class="forget">忘记密码?</div>
        </div>
        <!-- 登录 -->
        <el-button
          type="primary"
          class="login-btn"
          @click="LoginBtn(ruleFormRef)"
          :loading="showload"
        >
          <template #loading>
            <div class="custom-loading">
              <svg class="circular" viewBox="-10, -10, 50, 50">
                <path
                  class="path"
                  d="
                  M 30 15
                  L 28 17
                  M 25.61 25.61
                  A 15 15, 0, 0, 1, 15 30
                  A 15 15, 0, 1, 1, 27.99 7.5
                  L 15 15"
                  style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                />
              </svg>
              <!-- <FontIcon iconName="Eleme" class="circular" /> -->
            </div>
          </template>
          登录
        </el-button>
        <!-- other -->
        <el-form-item v-if="false">
          <div class="w-full h-20px flex justify-between items-center">
            <el-button
              v-for="(item, index) in operates"
              :key="index"
              class="w-full mt-4"
              size="default"
              @click="onHandle(index + 1)"
            >
              {{ item.title }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="margin_t-20 flex-box flex_j_c-space-between">
        <el-button
          v-for="(item, index) in operates"
          :key="item.title"
          size="default"
          @click="onHandle(index + 1)"
        >
          {{ item.title }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Lock, User, Key } from "@element-plus/icons-vue";
import {
  reactive,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { login } from "@/api/user";
import { operates, thirdParty } from "./utils/enums";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { user, rules } from "./utils/validation";
import Motion from "@/utils/motion";
import FontIcon from "@/layout/FontIcon/indx.vue";
import ThemeSwitch from "../components/ThemeSwitch";
import ReImageVerify from "@/views/components/ReImageVerify/index.vue";
import emitter from "@/utils/mitt-bus";
const { production } = require("@/config/vue.custom.config");

const restaurants = ref([]);
const showload = ref(false);
const keep = ref(false);
const ruleFormRef = ref();
const imgCode = ref("");

const router = useRouter();
const { state, dispatch, commit } = useStore();

const handleSelect = (item) => {
  console.log(item);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  cb(results);
};

const LoginBtn = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) Signin();
  });
};

const Signin = () => {
  dispatch("LOG_IN", user);
};

const onHandle = (index) => {
  console.log(index);
};

const onkeypress = ({ code }) => {
  if (code === "Enter") {
    LoginBtn(ruleFormRef.value);
  }
};

emitter.on("showload", (flag) => {
  showload.value = flag;
});

const loadAll = () => {
  return [
    { value: "linjx", link: "" },
    { value: "admin", link: "" },
    { value: "zhangal", link: "" },
    // { value: "huangyk", link: "" },
  ];
};

onMounted(() => {
  restaurants.value = loadAll();
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

watch(imgCode, (value) => {
  dispatch("SET_VERIFYCODE", value);
  // 测试环境自动填充图形验证码
  if (!production) {
    user.verifyCode = value;
  }
});
</script>
<style lang="scss" scoped>
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
.login-form h2 {
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
  font: bold 200% Consolas, Monaco, monospace;
}
.login {
  height: 100vh;
  display: flex;
}
:deep(.el-autocomplete) {
  width: 100%;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
  box-shadow: none;
  background-color: transparent;
}
.wave {
  background: var(--color-body-bg);
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
.login-inner {
  width: 400px;
  margin: auto;
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
.tip {
  text-align: center;
  margin-bottom: 50px;
  span {
    font-size: 18px;
    color: #9e9e9e;
  }
}
</style>
