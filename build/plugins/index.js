import process from "node:process";
import path from "node:path";
import unocss from "@unocss/vite";
import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import removeConsole from "vite-plugin-remove-console";
// import vitePluginRequire from "vite-plugin-require";
// import sass from "vite-plugin-sass";
import VueDevtools from "vite-plugin-vue-devtools";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import pwa from "./pwa";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    VueDevtools(),
    // sass(),
    // vitePluginRequire(),
    // 打包进度
    progress(),
    // https://unocss.dev/
    unocss(),
    // 线上环境删除console
    removeConsole(),
    createSvgIconsPlugin({
      iconDirs: [path.join(process.cwd(), "src/assets/icons/svg")],
      symbolId: `icon-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__",
    }),
  ];
  if (viteEnv.VITE_PWA === "Y" || viteEnv.VITE_VERCEL === "Y") {
    plugins.push(pwa());
  }
  return plugins;
}
