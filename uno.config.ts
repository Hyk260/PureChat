import presetIcons from "@unocss/preset-icons"
import presetRemToPx from "@unocss/preset-rem-to-px"
import presetUno, { type Theme } from "@unocss/preset-uno"
import { defineConfig } from "unocss"

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ["node_modules", "dist", ".git", ".vscode", "public", "build", "config"],
    },
  },
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({
      scale: 1.2, // 图标缩放比例
      warn: true, // 开启警告信息
      collections: {},
    }),
  ],
  /**
   * 快捷键命名标准
   */
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-c": "flex justify-center items-center",
    "flex-sc": "flex justify-start items-center",
    "flex-ac": "flex justify-around items-center",
    "flex-bc": "flex justify-between items-center",
    "flex-ae": "flex justify-around items-end",
    "flex-ss": "flex justify-start items-start",
    truncate: "overflow-hidden text-ellipsis whitespace-nowrap",
  },
  rules: [
    [
      /^multi-truncate-(\d+)$/,
      ([, n]) => ({
        "--line-clamp": n,
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "var(--line-clamp)",
        overflow: "hidden",
        "text-overflow": "ellipsis",
      }),
    ],
  ],
})
