import process from "node:process";
import path from "node:path";
// import unocss from "@unocss/vite";
// import Inspector from "vite-plugin-vue-inspector";
// import Inspect from "vite-plugin-inspect";
import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import removeConsole from "vite-plugin-remove-console";
import VueDevtools from "vite-plugin-vue-devtools";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { setupHtmlPlugin } from "./html";
import { cdn } from "./cdn";
// import pwa from "./pwa";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    // 查看代码编译源码
    // Inspect(),
    // 按下Command(⌘)+Shift(⇧)(Mac),ctrl+shift(Window)然后点击页面元素会自动打开本地编辑器并跳转到对应的代码位置
    // Inspector(),
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
    setupHtmlPlugin(),
  ];
  if (viteEnv.VITE_PWA === "Y" || viteEnv.VITE_VERCEL === "Y") {
    // plugins.push(pwa(viteEnv));
  }
  if (viteEnv.VITE_PWA === "Y") {
    plugins.push(cdn);
  }
  return plugins;
}
