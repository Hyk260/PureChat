import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "ReactMarkdownWC",
      fileName: (format) => `react-markdown-wc.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    // 添加源码映射以便调试
    sourcemap: true,
    // 开发时禁用压缩以便调试
    minify: false,
  },
})
