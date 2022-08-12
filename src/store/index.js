import { createStore } from "vuex";

import storage from "storejs";
import { logout } from "@/api/user";
import router from "@/router";
import { ToTree } from "@/utils/ToTree";
import views from "@/utils/assembly.js";
import initLocalStorage from "./data/initLocalStorage";
import { changeAppearance } from "@/utils/common";

const data = storage.get("userdata") || initLocalStorage.data; // 账号信息
const settings = storage.get("setup") || initLocalStorage.settings; //
// import { useRouter } from "vue-router";
// const router = useRouter();

/**
 * 不需要手动导入应用模块
 * 自动导入模块文件中的所有vuex模块
 *
 * 辅助函数
 * mapState、mapGetters、mapMutations、mapActions
 */
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
console.log(modules, "modules");

const store = createStore({
  modules,
  state: {
    data,
    settings,
  },
  mutations: {
    // 更新用户设置
    updateSettings(state, { key, value }) {
      state.settings[key] = value;
      storage.set("setup", state.settings);
    },
    // 更新用户信息
    updateData(state, { key, value }) {
      state.data[key] = value;
      storage.set("userdata", state.data);
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
      console.log(root.children);
      commit("updateData", { key: "Routingtable", value: root.children });
    },
    preservation() {},
    // 退出登录
    logout() {
      logout();
      router.push("/login");
      storage.remove("userdata");
    },
  },
  getters: {},
});
/**
 * 刷新页面保存当前主题色
 */
changeAppearance(store.state.settings.appearance);

console.log(store, "vuex数据");
export default store;
