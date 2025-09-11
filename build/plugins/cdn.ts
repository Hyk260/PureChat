import { Plugin as importToCDN } from "vite-plugin-cdn-import"

/**
 * @description 打包时采用`cdn`模式，仅限外网使用（默认不采用，如果需要采用cdn模式，请在 .env.production 文件，将 VITE_CDN 设置成Y）
 * 平台采用国内cdn：https://www.bootcdn.cn，当然你也可以选择 https://unpkg.com 或者 https://www.jsdelivr.com
 */
export const cdn = importToCDN({
  //（prodUrl解释： name: 对应下面modules的name，version: 自动读取本地package.json中dependencies依赖中对应包的版本号，path: 对应下面modules的path，当然也可写完整路径，会替换prodUrl）
  prodUrl: "https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}",
  modules: [
    {
      name: "vue",
      var: "Vue",
      path: "vue.global.prod.min.js",
    },
    {
      name: "vue-router",
      var: "VueRouter",
      path: "vue-router.global.min.js",
    },
    {
      name: "vue-i18n",
      var: "VueI18n",
      path: "vue-i18n.runtime.global.prod.min.js",
    },
    // {
    //   name: "pinia",
    //   var: "Pinia",
    //   path: "pinia.iife.min.js"
    // },
    {
      name: "element-plus",
      var: "ElementPlus",
      path: "index.full.min.js",
      css: "index.min.css",
    },
    {
      name: "axios",
      var: "axios",
      path: "axios.min.js",
    },
    {
      name: "dayjs",
      var: "dayjs",
      path: "dayjs.min.js",
    },
  ],
})
