import process from "node:process";
import path from "node:path";
// import unocss from "@unocss/vite";
import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import removeConsole from "vite-plugin-remove-console";
import VueDevtools from "vite-plugin-vue-devtools";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { setupHtmlPlugin } from './html';
import { __APP_INFO__ } from '../config/index';
// import pwa from "./pwa";
const buildTime = __APP_INFO__.lastBuildTime
/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    VueDevtools(),
    // 打包进度
    progress(),
    // https://unocss.dev/
    // unocss(),
    // 线上环境删除console
    removeConsole(),
    // svg-icon
    createSvgIconsPlugin({
      iconDirs: [path.join(process.cwd(), "src/assets/icons/svg")],
      symbolId: `icon-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__",
    }),
    setupHtmlPlugin(buildTime)
  ];
  if (viteEnv.VITE_PWA === "Y" || viteEnv.VITE_VERCEL === "Y") {
    // plugins.push(pwa(viteEnv));
  }
  return plugins;
}
