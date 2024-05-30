import { defineConfig, loadEnv } from "vite";
import { getSrcPath, setupVitePlugins, viteDefine } from "./build";

/** 启动`node`进程时所在工作目录的绝对路径 */
export const root = process.cwd();

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, root);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    define: viteDefine,
    resolve: {
      alias: {
        "@": getSrcPath(),
      },
    },
    server: {
      // 端口号
      port: viteEnv.VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {},
    },
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/styles/mixin.scss" as *;`,
        },
      },
    },
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      // include,
      // exclude,
    },
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
    },
  };
});
