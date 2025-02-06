import process from "node:process";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import removeConsole from "vite-plugin-remove-console";
import VueDevtools from "vite-plugin-vue-devtools";
import { visualizer } from "rollup-plugin-visualizer";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { setupHtmlPlugin } from "./html";
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
    // svg-icon
    createSvgIconsPlugin({
      iconDirs: [path.join(process.cwd(), "src/assets/icons/svg")],
      symbolId: `${viteEnv.VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__",
    }),
    setupHtmlPlugin(),
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
