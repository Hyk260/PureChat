import unocss from "@unocss/vite";
import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import removeConsole from "vite-plugin-remove-console";
import vitePluginRequire from "vite-plugin-require";
import VueDevtools from "vite-plugin-vue-devtools";
import pwa from "./pwa";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    VueDevtools(),
    vitePluginRequire(),
    // 打包进度
    progress(),
    // https://unocss.dev/
    unocss(),
    // 线上环境删除console
    removeConsole(),
  ];
  if (viteEnv.VITE_PWA === "Y" || viteEnv.VITE_VERCEL === "Y") {
    plugins.push(pwa());
  }
  return plugins;
}
