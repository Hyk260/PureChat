<template>
  <div class="login">
    <div class="login-inner">
      <header class="login-form">
        <p class="tip">
          <!-- <img src="../../assets/images/loginBg.svg" alt="" /> -->
          <br />
          <h2>PURE ADMIN</h2>
        </p>
      </header>

      <el-form ref="ruleFormRef" :model="user" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="用户账号" :prefix-icon="User" size="large" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="用户密码" :prefix-icon="Lock" size="large" show-password clearable>
          </el-input>
        </el-form-item>

        <div class="login-options">
          <el-checkbox v-model="keep">记住密码</el-checkbox>
          <div class="forget">忘记密码?</div>
        </div>
        <el-button type="primary" class="login-btn" @click="LoginBtn(ruleFormRef)" :loading="showload">
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
                  L 15 15
                "
                  style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                />
              </svg>
            </div>
          </template>
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
  import { Lock, User } from '@element-plus/icons-vue'
  import { ElNotification } from 'element-plus'
  import { reactive, ref, computed } from "vue"
  import { Login } from "@/api/user"
  import { getMenu } from "@/api/menu"
  import { successMessage, warnMessage } from "@/utils/message"
  import { useRouter } from "vue-router";
  import { useStore } from 'vuex'

  const store = useStore();
  const router = useRouter();
  const showload = ref(false)
  const keep = ref(false)
  const ruleFormRef = ref()
  const user = reactive({
    username: "admin",
    password: "123456",
  })
  const rules = reactive({
    username: [{ required: true, message: "用户名是必须的", trigger: "blur" }],
    password: [{ required: true, message: "密码是必须的", trigger: "blur" }]
  })

  const LoginBtn = (formEl) => {
    formEl.validate((valid) => {
      if (valid) {
        login()
      } else {
        return false
      }
    })
  }
  
  const login = async () => {
    showload.value = true
    const { username, password } = user
    const res = await Login({ username, password })
    console.log(res, "登录信息")
    if (!res) return;
    const { code, msg } = res
    verification(code, msg)

    if (code === 200) {
      let menu = await getMenu()
      // console.log(menu,"菜单列表")
      store.commit('updateData', { key: 'user', value: user })
      // Menulist
      await store.dispatch('updateRoute', menu)
      // console.log(router.options.routes)
      setTimeout(() => {
        ElNotification({
          title: 'Success',
          message: '登录成功',
          type: 'success',
        })
        router.push("/home");
      },1000)
    }else{
      showload.value = false
    }
  }

  function verification(code, msg) {
    switch (code) {
      case 401:
        warnMessage(msg)
        break
      case 400:
        warnMessage(msg)
        break
    }
  }
</script>
<style style="scss" scoped>
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
    /* background: url(../../assets/images/loginBg.svg); */
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
  }

  .login-options div {
    cursor: pointer;
  }

  .tip {
    text-align: center;
    margin-bottom: 50px;
  }

  .tip span {
    font-size: 18px;
    color: #9e9e9e;
  }

  .tip img {
    width: 300px;
  }
</style>