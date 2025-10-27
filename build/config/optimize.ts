/**
 * https://vitejs.cn/vite3-cn/config/dep-optimization-options.html#optimizedeps-include
 * 强制预构建链接的包
 */
const include = [
  "vue",
  "sass",
  "mitt",
  "axios",
  "pinia",
  "dayjs",
  "unocss",
  "vue-router",
  "vue-i18n",
  "lodash-es",
  "@vueuse/core",
  "@wangeditor/editor",
  "@wangeditor/editor-for-vue",
  "@microsoft/fetch-event-source",
  "markdown-it",
  "highlight.js",
  "element-plus",
  // "monaco-editor",
]

/**
 * https://vitejs.cn/vite3-cn/config/dep-optimization-options.html#optimizedeps-exclude
 * 在预构建中强制排除的依赖项
 */
const exclude = ["@iconify/json", "@purechat/ui"]

export { include, exclude }
