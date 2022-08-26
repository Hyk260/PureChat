import { createStore } from "vuex";
import { useI18n } from "vue-i18n";

import saveToLocalStorage from "./plugins/localStorage"; // 自定义插件
import { changeAppearance } from "@/utils/common";
import mutations from "./mutations";
import actions from "./actions";
import state from "./state";

const plugins = [saveToLocalStorage];
const modulesFiles = require.context("./modules", true, /\.js$/);
/**
 * 不需要手动导入应用模块
 * 自动导入模块文件中的所有vuex模块
 *
 * 辅助函数
 * mapState、mapGetters、mapMutations、mapActions
 */
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
console.log(modules, "modules");

const store = createStore({
  modules,
  state,
  mutations,
  actions,
  getters: {},
  // 自定义属性
  plugins,
});

/**
 * 刷新页面保存当前主题色
 */
changeAppearance(store.state.settings.appearance);

console.log(store, "vuex数据");
export default store;
