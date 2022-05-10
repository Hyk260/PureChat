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
          <div>忘记密码</div>
        </div>
        <el-button type="primary" class="login-btn" @click="login()">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
  import { Lock, User } from '@element-plus/icons-vue'
  import { ElNotification } from 'element-plus'
  import { reactive, ref, computed } from "vue"
  import { Login, getMenu } from "@/api/user"
  import ToTree from "@/utils/ToTree";
  import { successMessage, warnMessage } from "@/utils/message"
  import views from "@/utils/assembly.js"
  import storeLocal from 'storejs'
  import { useRouter } from "vue-router";
  import { useStore } from 'vuex'

  const store = useStore();
  const router = useRouter();
  const keep = ref(false)
  const user = reactive({
    username: "admin",
    password: "123456",
  })
  const rules = reactive({
    username: [{ required: true, message: "用户名是必须的", trigger: "blur" }],
    password: [{ required: true, message: "密码是必须的", trigger: "blur" }]
  })

  /**
   * 登录
   * */
  const login = async () => {
    const { username, password } = user
    const res = await Login({ username, password })
    console.log(res, "登录信息")
    if (!res) return;
    const { code, msg } = res
    verification(code, msg)

    if (code === 200) {
      ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success',
      })

      let menu = await getMenu()
      // console.log(menu,"菜单列表")
      store.commit('updateData', { key: 'user', value: user })
      // Menulist
      await store.dispatch('updateRoute', menu)
      // console.log(router.options.routes)

      router.push("/home");
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