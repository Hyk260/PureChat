<template>
  <div class="login flex">
    <div class="login-inner">
      <!-- 背景 -->
      <SvgIcon local-icon="loginBg" class="wave" />
      <!-- 主题开关 -->
      <ThemeSwitch />
      <!-- 标题 -->
      <header class="login-form">
        <div class="tip">
          <h2>{{ VITE_APP_NAME }}</h2>
        </div>
      </header>
      <!-- 账号登陆 -->
      <Account v-if="currentPage === 0" />
      <!-- 二维码登录 -->
      <LoginQrCode v-if="currentPage === 2" />
      <!-- 注册 -->
      <LoginRegist v-if="currentPage === 3" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/index";
import Account from "./components/Account.vue";
import LoginQrCode from "./components/LoginQrCode.vue";
import LoginRegist from "./components/LoginRegist.vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";

const currentPage = computed(() => {
  return useUserStore().currentPage;
});

const { VITE_APP_NAME } = import.meta.env;

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
