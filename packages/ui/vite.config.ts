import react from "@vitejs/plugin-react"
import { CodeInspectorPlugin } from "code-inspector-plugin"
import { resolve } from "path"
import { defineConfig } from "vite"
// import dts from "vite-plugin-dts"

const isDev = process.env.NODE_ENV === "development"

export default defineConfig({
  plugins: [
    react({
      // babel: {
      //   plugins: !isDev
      //     ? [
      //         // 生产环境移除 propTypes
      //         ["transform-react-remove-prop-types", { removeImport: true }],
      //       ]
      //     : [],
      // },
    }),
    // 只在开发环境下启用 CodeInspectorPlugin
    ...(isDev ? [CodeInspectorPlugin({ bundler: "vite" })] : []),
    // 生产环境启用压缩
    // ...(!isDev
    //   ? [
    //       // Gzip 压缩
    //       compression({
    //         algorithm: "gzip",
    //         ext: ".gz",
    //         threshold: 1024, // 仅压缩大于1kb的文件
    //       }),
    //       // Brotli 压缩
    //       compression({
    //         algorithm: "brotliCompress",
    //         ext: ".br",
    //         threshold: 1024,
    //       }),
    //     ]
    //   : []),
    // 包大小分析
    // ...(isAnalyze
    //   ? [
    //       visualizer({
    //         filename: "stats.html",
    //         gzipSize: true,
    //         brotliSize: true,
    //       }),
    //     ]
    //   : []),
    // dts({
    //   insertTypesEntry: true,
    // }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "PureChatUI",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // 生产环境下进行代码优化
        compact: !isDev,
        // 生产环境下混淆属性名
        generatedCode: {
          reservedNamesAsProps: false,
        },
      },
      // input: {
      //   index: resolve(__dirname, "./index.html"),
      // },
    },
    // 添加源码映射以便调试
    sourcemap: isDev,
    // 生产环境开启代码压缩
    minify: !isDev ? "terser" : false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@purechat/ui": resolve(__dirname, "src"),
    },
  },
})
