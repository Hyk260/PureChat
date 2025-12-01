import { defineStore } from "pinia"

import { setLocale } from "@/locales"
import { SetupStoreId } from "@/stores/enum"

import type { AppState } from "./type"

export const useAppStore = defineStore(SetupStoreId.App, {
  state: (): AppState => ({
    lang: "zh-CN",
    timeline: true,
    contentXScrollable: false,
    markdownRender: false,
    markdownAssistantRender: true,
  }),
  actions: {
    setLang(lang: "en" | "zh-CN") {
      this.lang = lang
      setLocale(lang)
    },
    setTimeline(val: boolean) {
      this.timeline = val
    },
    setMarkdownRender(val: boolean) {
      this.markdownRender = val
    },
    setContentXScrollable(value: boolean) {
      this.contentXScrollable = value
    },
  },
  persist: {
    pick: ["lang", "timeline", "markdownRender", "markdownAssistantRender"],
  },
})
