<template>
  <div class="login">
    <div class="login-inner">
      <header>
        <p class="tip">
          <!-- <img src="../../assets/images/loginBg.svg" alt="" /> -->
          <br />
          <span>后台管理系统</span>
        </p>
      </header>

      <el-form ref="ruleFormRef" :model="state.user" :rules="state.rules">
        <el-form-item prop="username">
          <el-input v-model="state.user.username" placeholder="用户账号">
            <i class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="state.user.password" placeholder="用户密码"></el-input>
        </el-form-item>

        <div class="login-options">
          <el-checkbox v-model="state.keep">记住密码</el-checkbox>
          <div>忘记密码</div>
        </div>
        <el-button type="primary" class="login-btn" @click="login()">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { reactive,computed } from "vue"
import { Login, getMenu } from "@/api/user"
import ToTree from "@/utils/ToTree";
import { successMessage, warnMessage } from "@/utils/message"
import views from "@/utils/assembly.js"
import storeLocal from 'storejs'
import { useRouter } from "vue-router";
import { useStore } from 'vuex'


  const store = useStore();
  const router = useRouter();   

  const state = reactive({
    user:{
      username: "admin",
      password: "123456",
    },
    keep:false,
    rules:{
      username: [{ required: true, message: "用户名是必须的", trigger: "blur" }],
      password: [{ required: true, message: "密码是必须的", trigger: "blur" }]
    }
  })
  /**
   * 登录
   * */ 
  const login = async () => {
    const { username, password } = state.user
    const res = await Login({ username, password })
    console.log(res,"登录信息")
    if(!res) return;
    const { code, msg } = res
    verification(code,msg)

    if(code === 200){
      ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success',
      })

      let menu = await getMenu()
      // console.log(menu,"菜单列表")
      store.commit('updateData', { key: 'user', value: state.user })
      // Menulist
      await store.dispatch('updateRoute',menu)
      // console.log(router.options.routes)

      router.push("/home");
    }
  }

  function verification(code,msg){
    switch(code){
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
.login-options div{
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
