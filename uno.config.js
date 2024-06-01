import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  content: {
    pipeline: {
      exclude: ["node_modules", "dist"],
    },
  },
  presets: [presetUno(), presetAttributify()],
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-center": "flex justify-center items-center",
    "flex-col-center": "flex-center flex-col",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
    "i-flex-center": "inline-flex justify-center items-center",
    "i-flex-x-center": "inline-flex justify-center",
    "i-flex-y-center": "inline-flex items-center",
    "flex-col": "flex flex-col",
    "flex-col-stretch": "flex-col items-stretch",
    "i-flex-col": "inline-flex flex-col",
    "i-flex-col-stretch": "i-flex-col items-stretch",
    "flex-1-hidden": "flex-1 overflow-hidden",
    "nowrap-hidden": "whitespace-nowrap overflow-hidden",
    "ellipsis-text": "nowrap-hidden text-ellipsis",
    "transition-base": "transition-all duration-300 ease-in-out",
  },
});
