import react from "@vitejs/plugin-react"
import { CodeInspectorPlugin } from "code-inspector-plugin"
import { resolve } from "path"
import { defineConfig } from "vite"
import compression from "vite-plugin-compression"
import visualizer from "rollup-plugin-visualizer"
// import dts from "vite-plugin-dts"

const isDev = process.env.NODE_ENV === "development"
const isAnalyze = process.env.ANALYZE === "true"

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || (isDev ? "development" : "production")),
  },
  plugins: [
    react({
      babel: {
        plugins: !isDev
          ? [
              // 生产环境移除 propTypes
              ["transform-react-remove-prop-types", { removeImport: true }],
            ]
          : [],
      },
    }),
    // 只在开发环境下启用 CodeInspectorPlugin
    ...(isDev ? [CodeInspectorPlugin({ bundler: "vite" })] : []),
    // 生产环境启用压缩
    ...(!isDev
      ? [
          // Gzip 压缩
          compression({
            algorithm: "gzip",
            ext: ".gz",
            threshold: 1024, // 仅压缩大于1kb的文件
            deleteOriginFile: false, // 保留原始文件
          }),
          // Brotli 压缩
          compression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 1024,
            deleteOriginFile: false,
          }),
        ]
      : []),
    // 包大小分析
    ...(isAnalyze
      ? [
          visualizer({
            filename: "stats.html",
            gzipSize: true,
            brotliSize: true,
            open: true,
          }),
        ]
      : []),
    // dts({
    //   insertTypesEntry: true,
    // }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "PureChatUI", // UMD 模式下全局变量名
      // es umd
      formats: ["es"],
      // 文件名
      fileName: "index",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        // 生产环境下进行代码优化
        compact: !isDev,
        // 生产环境下混淆属性名
        generatedCode: {
          reservedNamesAsProps: false,
        },
        extend: true,
        // 静态资源文件名哈希，避免缓存问题
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
      // 配置treeshaking优化
      treeshake: {
        // 生产环境启用treeshaking
        moduleSideEffects: false,
        // 更严格的treeshaking
        preset: 'smallest',
      },
      // input: {
      //   index: resolve(__dirname, "./index.html"),
      // },
    },
    // 添加源码映射以便调试
    sourcemap: isDev,
    // 生产环境开启代码压缩
    minify: !isDev ? "terser" : false,
    // 增加terser优化配置
    terserOptions: !isDev ? {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true, // 移除debugger
        pure_funcs: ['console.log', 'console.warn', 'console.error'], // 移除特定函数调用
      },
      mangle: {
        // 混淆变量名
        properties: {
          regex: /^_/, // 只混淆下划线开头的属性
        },
      },
    } : {},
    // 配置chunk大小警告阈值
    chunkSizeWarningLimit: 600,
    // 开启CSS代码分割
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@purechat/ui": resolve(__dirname, "src"),
    },
  },
})
