import { createStore } from "vuex";

import storage from "storejs"
import { logout } from '@/api/user';
import router from "@/router";
import { ToTree } from "@/utils/ToTree";
import views from "@/utils/assembly.js"
import initLocalStorage from './data/initLocalStorage'

const data = storage.get('userdata') || initLocalStorage.data // 账号信息
const settings = storage.get('setup') || initLocalStorage.settings // 
// import { useRouter } from "vue-router";
// const router = useRouter();

/**
 * 不需要手动导入应用模块
 * 自动导入模块文件中的所有vuex模块
 */
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
console.log(modules,"modules")

export default createStore({
  modules,
  state: {
    // 前端生成的验证码（按实际需求替换）
    verifyCode: "",
    views,
    data,
    settings,
  },
  mutations: {
    // 折叠侧边栏
    setCollapse(state) {
      state.data.isCollapse = !state.data.isCollapse
    },
    // 更新用户设置
    updateSettings(state, { key, value }) {
      state.settings[key] = value
    },
    // 更新用户信息
    updateData(state, { key, value }) {
      state.data[key] = value
      storage.set('userdata', state.data)
    },
  },
  actions: {
    // 更新路由
    updateRoute({ commit, state }, route) {
      route.map((t) => {
        if (t.componentName) {
          t.component = views[t.componentName];
        }
      });
      let root = route.find((t) => (t.path = "/"));
      ToTree(root, route);
      // 动态添加路由
      root.children.forEach((item) => {
        router.addRoute(item);
      });
      console.log(root.children)
      commit('updateData', { key: 'Routingtable', value: root.children })
    },
    preservation(){

    },
    // 设置验证码
    SET_VERIFYCODE(state,verifyCode) {
      state.verifyCode = verifyCode
    },
    logout(){
      logout()
      router.push("/login");
      storage.remove('userdata')
    }
  },
  getters: {
    // userInfo: state => state.userInfo,
    // allRoutes: state => state.allRoutes,
  },
});
