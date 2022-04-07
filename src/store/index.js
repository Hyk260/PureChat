import { createStore } from "vuex";
import storeLocal from "storejs"
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

export default createStore({
  modules,
  state: {
  },
  mutations: {},
  actions: {},
  modules: {},
});
