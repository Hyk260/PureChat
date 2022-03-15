/**
 * @description 加载所有组件
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllassembly(app) {
  const files = require.context('./', true, /\.vue$/)
  files.keys().forEach(key => {
    app.component(key.replace(/\/index.vue/, ``).slice(2), files(key).default)
  })
}