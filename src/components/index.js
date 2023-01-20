/**
 * @description 加载所有组件
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
const whiteList = ["SvgIcon"]; //组件白名单

export function loadAllassembly(app) {
  const files = require.context("./", true, /\.vue$/);
  files.keys().forEach((key) => {
    const name = key.replace(/\/index.vue/, "").slice(2);
    const meter = files(key).default;
    // console.log(name,meter)
    let off = whiteList.includes(name);
    !off && app.component(name, meter);
  });
}
