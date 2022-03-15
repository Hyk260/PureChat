/**
 * 加载插件文件
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app) {
  const files = require.context('.', true, /\.js$/)
  files.keys().forEach(key => {
    if (typeof files(key).default === 'function') {
      if (key !== './index.js') files(key).default(app)
    }
  })
}
