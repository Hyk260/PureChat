import type { Plugin } from "vite"
import { Plugin as importToCDN } from "vite-plugin-cdn-import"

interface CDNModule {
  name: string
  var: string
  path: string
  css?: string
}

interface CDNConfig {
  prodUrl: string
  modules: CDNModule[]
}

// name: 对应下面modules的name
// version: 自动读取本地package.json中dependencies依赖中对应包的版本号
// path: 对应下面modules的path
const CDN_SOURCES = {
  bootcdn: "https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}",
  unpkg: "https://unpkg.com/{name}@{version}/{path}",
  jsdelivr: "https://cdn.jsdelivr.net/npm/{name}@{version}/{path}",
} as const

const CDN_MODULES: CDNModule[] = [
  // {
  //   name: "vue",
  //   var: "Vue",
  //   path: "vue.global.prod.min.js",
  // },
  // {
  //   name: "vue-router",
  //   var: "VueRouter",
  //   path: "vue-router.global.min.js",
  // },
  // {
  //   name: "vue-i18n",
  //   var: "VueI18n",
  //   path: "vue-i18n.runtime.global.prod.min.js",
  // },
  // {
  //   name: "element-plus",
  //   var: "ElementPlus",
  //   path: "index.full.min.js",
  //   css: "index.min.css",
  // },
  // {
  //   name: "axios",
  //   var: "axios",
  //   path: "axios.min.js",
  // },
  // {
  //   name: "dayjs",
  //   var: "dayjs",
  //   path: "dayjs.min.js",
  // },
]

/**
 * @description 打包时采用`cdn`模式，仅限外网使用（默认不采用，如果需要采用cdn模式，请在 .env.production 文件，将 VITE_CDN 设置成Y）
 */
export const cdn = (source: keyof typeof CDN_SOURCES = "bootcdn", customModules: CDNModule[] = []): Plugin<any>[] => {
  const config: CDNConfig = {
    prodUrl: CDN_SOURCES[source],
    modules: [...CDN_MODULES, ...customModules],
  }

  return importToCDN(config)
}
