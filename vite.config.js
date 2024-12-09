import process from "node:process";
import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { setupVitePlugins, viteDefine } from "./build";

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());

  return {
    base: viteEnv.VITE_BASE_URL,
    define: viteDefine(viteEnv),
    resolve: {
      /** 设置别名 */
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      // 端口号
      port: viteEnv.VITE_PORT,
      open: true,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {},
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"],
      },
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
          index: fileURLToPath(new URL("./index.html", import.meta.url)),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          // #https://cn.rollupjs.org/configuration-options/#output-assetfilenames
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          // 手动分包 #https://cn.rollupjs.org/configuration-options/#output-manualchunks
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor";
          },
        },
      },
      // 启用/ 禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  };
});
