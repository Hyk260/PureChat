import process from "node:process"
import { fileURLToPath, URL } from "node:url"
import { defineConfig, loadEnv } from "vite"
import { manualChunks, viteDefine } from "./build/config/define"
import { exclude, include } from "./build/config/optimize"
import { setupViteExternal, setupVitePlugins } from "./build/plugins"

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta

  return {
    base: viteEnv.VITE_BASE_URL,
    define: viteDefine(viteEnv),
    resolve: {
      /** 设置别名 */
      alias: {
        // 配置路径别名~(根路径)
        "~": fileURLToPath(new URL("./", import.meta.url)),
        // 配置主路径别名@
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // 配置共享路径别名@shared
        "@shared": fileURLToPath(new URL("./packages/shared", import.meta.url)),
        // 配置数据库路径别名@database
        "@database": fileURLToPath(new URL("./packages/database", import.meta.url)),
        // 配置类型包别名@purechat/types
        "@purechat/types": fileURLToPath(new URL("./packages/types", import.meta.url)),
        // 配置const路径别名@purechat/const
        "@purechat/const": fileURLToPath(new URL("./packages/const", import.meta.url)),
        // 配置utils路径别名@purechat/utils
        "@purechat/utils": fileURLToPath(new URL("./packages/utils", import.meta.url)),
      },
      extensions: [".js", ".ts", ".json"],
    },
    // https://cn.vitejs.dev/config/server-options.html#server-options
    server: {
      // 端口号
      port: viteEnv.VITE_PORT,
      open: true,
      host: "0.0.0.0",
      proxy: {},
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"],
      },
    },
    // esbuild: {
    //   pure: viteEnv.PROD ? ["console.log", "console.info", "console.debug", "console.warn"] : [],
    //   drop: viteEnv.PROD ? ["debugger"] : [],
    // },
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "./src/styles/global/mixin.scss" as *;`,
        },
      },
    },
    // https://cn.vitejs.dev/config/dep-optimization-options#optimizedeps-entries
    optimizeDeps: {
      include,
      exclude,
      // entries,
    },
    worker: {
      format: "es",
    },
    build: {
      // https://cn.vitejs.dev/config/build-options.html#build-target
      // target: "esnext",
      // 打包时清除dist目录
      // emptyOutDir: true,
      // 启用 CSS 代码拆分
      // cssCodeSplit: true,
      // 指定使用哪种混淆器
      // minify: "esbuild",
      // 生成生产源映射
      sourcemap: viteEnv.VITE_SOURCE_MAP === "Y",
      // 调整块大小警告阈值（kB单位）
      chunkSizeWarningLimit: 1024,
      // 启用/ 禁用 gzip 压缩大小报告
      reportCompressedSize: false,
      rollupOptions: {
        external: setupViteExternal(viteEnv),
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
          manualChunks,
          // 将外部化的 @purechat/ui 映射到预构建产物路径，避免 Rollup 解析
          // paths: {
          //   "@purechat/ui": "/purechat-ui/index.js",
          // },
        },
      },
    },
  }
})
