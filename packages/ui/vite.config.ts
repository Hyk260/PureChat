import react from "@vitejs/plugin-react"
import { CodeInspectorPlugin } from "code-inspector-plugin"
import { resolve } from "path"
import { defineConfig } from "vite"
// import dts from "vite-plugin-dts"

const isDev = process.env.NODE_ENV === "development"

export default defineConfig({
  plugins: [
    react(),
    ...(isDev ? [CodeInspectorPlugin({ bundler: "vite" })] : []), // 只在开发环境下启用 CodeInspectorPlugin
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
      },
      input: {
        index: resolve(__dirname, "./index.html"),
      },
    },
    // 添加源码映射以便调试
    sourcemap: true,
    // 开发时禁用压缩以便调试
    minify: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
