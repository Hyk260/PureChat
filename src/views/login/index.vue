<template>
  <div class="login">
    <div class="login-inner">
      <!-- 背景 -->
      <svg-icon iconClass="loginBg" class="wave" />
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
          <el-input
            v-model="user.username"
            placeholder="用户账号"
            :prefix-icon="User"
            size="large"
            clearable
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            placeholder="用户密码"
            :prefix-icon="Lock"
            size="large"
            show-password
            clearable
          >
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="verifyCode">
          <el-input
            v-model="user.verifyCode"
            @keydown.enter="LoginBtn(ruleFormRef)"
            size="large"
            :prefix-icon="Key"
            placeholder="验证码"
            clearable
          >
            <template v-slot:append>
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
    </div>
  </div>
</template>

<script setup>
import { Lock, User, Key } from "@element-plus/icons-vue";
import ReImageVerify from "@/views/components/ReImageVerify/index.vue";
import { ElNotification } from "element-plus";
import { reactive, ref, computed, watch } from "vue";
import { Login } from "@/api/user";
import { getMenu } from "@/api/menu";
import { operates, thirdParty } from "./utils/enums";
import { successMessage, warnMessage } from "@/utils/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { user, rules } from "./utils/validation";
import FontIcon from "@/layout/FontIcon/indx.vue";
import Motion from "@/utils/motion";
const router = useRouter();
const showload = ref(false);
const keep = ref(false);
const ruleFormRef = ref();
const imgCode = ref("");
const { state, dispatch, commit } = useStore();

watch(imgCode, (value) => {
  dispatch("SET_VERIFYCODE", value);
});

const LoginBtn = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      login();
    } else {
      return false;
    }
  });
};

const login = async () => {
  showload.value = true;
  const { username, password } = user;
  const res = await Login({ username, password });
  dispatch("TIM_LOG_IN", username);
  // return
  console.log(res, "登录信息");
  if (!res) return;
  const { code, msg, result } = res;
  verification(code, msg);

  if (code === 200) {
    let menu = await getMenu();
    // console.log(menu,"菜单列表")
    commit("updateData", { key: "user", value: result });
    // Menulist
    await dispatch("updateRoute", menu);
    // console.log(router.options.routes)
    setTimeout(() => {
      ElNotification({
        title: "Success",
        message: "登录成功",
        type: "success",
      });
      router.push("/home");
    }, 1500);
  } else {
    showload.value = false;
  }
};

const onHandle = (index) => {
  console.log(index);
};

const verification = (code, msg) => {
  switch (code) {
    case 401:
      warnMessage(msg);
      break;
    case 400:
      warnMessage(msg);
      break;
  }
};
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
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
  box-shadow: none;
  background-color: transparent;
}
.wave {
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
  // .img{
  //   display: flex;
  //   justify-content: flex-end;
  //   align-items: center;
  // }
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
  img {
    width: 300px;
  }
}
</style>
