import process from "node:process";
import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import removeConsole from "vite-plugin-remove-console";
import VueDevtools from "vite-plugin-vue-devtools";
import { visualizer } from "rollup-plugin-visualizer";
import { setupUnplugin } from './unplugin';
import { setupHtmlPlugin } from "./html";
import { viteBuildInfo } from "./info";
import { setupUnocss } from './unocss';
import { cdn } from "./cdn";
// import pwa from "./pwa";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    // 打包进度
    progress(),
    // 线上环境删除console
    removeConsole(),
    setupUnocss(viteEnv),
    setupHtmlPlugin(),
    viteBuildInfo(),
    ...setupUnplugin(viteEnv),
  ];
  if (viteEnv.VITE_DEV_TOOLS === "Y") {
    plugins.push(VueDevtools());
  }
  // 打包视图分析
  if (process.env.npm_lifecycle_event === "report") {
    plugins.push(visualizer({ open: true, brotliSize: true, filename: "report.html" }))
  }
  if (viteEnv.VITE_PWA === "Y" || viteEnv.VITE_VERCEL === "Y") {
    // plugins.push(pwa(viteEnv));
  }
  if (viteEnv.VITE_CDN === "Y") {
    plugins.push(cdn);
  }
  return plugins;
}

/**
 * 配置 Vite 外部依赖
 * @param {Object} viteEnv - 环境变量配置对象
 * @returns {(RegExp[]|string[])[]} 外部依赖配置数组
 */
export function setupViteExternal(viteEnv) {
  // 本地开发模式需要排除的依赖
  const localExternals = [
    /^@tencentcloud\/chat/,
    /^tim-upload-plugin/,
    // /^pinyin-pro/
  ];

  if (viteEnv.VITE_LOCAL_MODE === "Y") {
    return localExternals;
  }

  return [];
}
