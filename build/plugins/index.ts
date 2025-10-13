import process from "node:process"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import progress from "vite-plugin-progress"
import removeConsole from "vite-plugin-remove-console"
import vueDevtools from "vite-plugin-vue-devtools"
import type { PluginOption } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import { setupUnplugin } from "./unplugin"
import { setupHtmlPlugin } from "./html"
import { viteBuildInfo } from "./info"
import { setupUnocss } from "./unocss"
import { cdn } from "./cdn"
// import react from "@vitejs/plugin-react"
// import pwa from "./pwa";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: Env.ImportMeta) {
  const customElement = ["webview"]

  const plugins: PluginOption = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => customElement.includes(tag),
        },
      },
    }),
    // react(),
    vueJsx(),
    // 打包进度
    progress(),
    setupUnocss(viteEnv),
    setupHtmlPlugin(),
    viteBuildInfo(),
    ...setupUnplugin(viteEnv),
  ]

  if (viteEnv.VITE_REMOVE_CONSOLE === "Y") {
    plugins.push(removeConsole())
  }

  if (viteEnv.VITE_DEV_TOOLS === "Y") {
    plugins.push(
      vueDevtools({
        launchEditor: viteEnv.VITE_DEVTOOLS_LAUNCH_EDITOR || "code", // code cursor
      })
    )
  }
  // 打包视图分析
  if (process.env.npm_lifecycle_event === "report") {
    plugins.push(visualizer({ open: true, brotliSize: true, filename: "report.html" }))
  }
  // if (viteEnv.VITE_PWA === "Y" && viteEnv.VITE_VERCEL === "Y") {
  //   plugins.push(pwa(viteEnv));
  // }
  if (viteEnv.VITE_CDN === "Y") {
    plugins.push(cdn)
  }

  return plugins
}

/**
 * 配置 Vite 外部依赖
 * @param {Object} viteEnv - 环境变量配置对象
 * @returns {(RegExp[]|string[])[]} 外部依赖配置数组
 */
export function setupViteExternal(viteEnv: Env.ImportMeta): (RegExp | string)[] {
  // 本地模式需要排除的依赖
  const localExternals = [/^@tencentcloud\/chat/, /^tim-upload-plugin/]
  // 始终外部化 @purechat/ui，避免被打包参与 Tree-Shaking
  const commonExternals = [/^@purechat\/ui$/]

  if (viteEnv.VITE_LOCAL_MODE === "Y") {
    return [...localExternals, ...commonExternals]
  }

  return [...commonExternals]
}
