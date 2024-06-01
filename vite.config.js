import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { setupVitePlugins, viteDefine } from "./build";

/** 启动`node`进程时所在工作目录的绝对路径 */
export const root = process.cwd();

/** 路径查找 */
const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias = {
  "@": pathResolve("src"),
  "~": pathResolve("./"),
};

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, root);
  return {
    base: viteEnv.VITE_BASE_URL,
    define: viteDefine,
    resolve: { alias },
    server: {
      // 端口号
      port: viteEnv.VITE_PORT,
      open: true,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {},
    },
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/mixin.scss" as *;`,
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
      // target: "es2015",
      // 生成生产源映射
      sourcemap: viteEnv.VITE_SOURCE_MAP === "Y",
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("index.html"),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
      reportCompressedSize: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  };
});
