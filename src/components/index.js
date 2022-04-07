/**
 * @description 加载所有组件
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllassembly(app) {
  const files = require.context('./', true, /\.vue$/)
  files.keys().forEach(key => {
    const name = key.replace(/\/index.vue/, ``).slice(2)
    const meter = files(key).default
    // console.log(name,meter)
    app.component(name, meter)
  })
}