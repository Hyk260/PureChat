<template>
  <div class="login flex">
    <div class="login-inner">
      <!-- 背景 -->
      <svg-icon local-icon="loginBg" class="wave" />
      <!-- 主题开关 -->
      <ThemeSwitch />
      <!-- 标题 -->
      <header class="login-form">
        <div class="tip">
          <h2>{{ titleApp }}</h2>
        </div>
      </header>
      <!-- 账号登陆 -->
      <Account v-if="currentPage === 0" />
      <!-- 二维码登录 -->
      <!-- <QrCode v-else-if="currentPage === 2" /> -->
      <!-- 注册 -->
      <!-- <Register v-else-if="currentPage === 3" /> -->
    </div>
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/useMapper";
import ThemeSwitch from "../components/ThemeSwitch/index.vue";
import Account from "./components/Account.vue";
// import QrCode from "./components/qrCode.vue";
// import Register from "./components/Register.vue";

const titleApp = import.meta.env.VITE_APP_NAME;

const { currentPage } = useState({
  currentPage: (state) => state.user.currentPage,
});
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  .login-form {
    .tip {
      text-align: center;
      margin-bottom: 50px;
      h2 {
        margin: 15px 0;
        color: #999;
        font:
          bold 200% Consolas,
          Monaco,
          monospace;
      }
      span {
        font-size: 18px;
        color: #9e9e9e;
      }
    }
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
    user-select: none;
    width: 400px;
    margin: auto;
    transition: width 0.3s ease;
  }
}

@media only screen and (max-width: 568px) {
  .login-inner {
    width: 300px;
  }
}

@media only screen and (min-width: 569px) {
  .login-inner {
    width: 400px;
  }
}
</style>
