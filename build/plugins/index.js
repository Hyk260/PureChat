import vue from "@vitejs/plugin-vue";
import progress from "vite-plugin-progress";
import removeConsole from "vite-plugin-remove-console";
import VueDevtools from "vite-plugin-vue-devtools";
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
    // 线上环境删除console
    removeConsole(),
  ];
  return plugins;
}
