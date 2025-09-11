import { ThemeMode, ThemeModeKey } from "@shared/theme"
import { defineStore } from "pinia"

import { SetupStoreId } from "@/stores/enum"
import { localStg } from "@/utils/storage"

import type { ThemeState } from "./type"
// import { useEventListener, usePreferredColorScheme } from "@vueuse/core";

export const useThemeStore = defineStore(SetupStoreId.Theme, {
  state: (): ThemeState => ({
    themeScheme: ThemeMode.light,
    fontTheme: "AliFangYuan",
    fontThemeList: [{ label: "阿里方元", value: "AliFangYuan" }],
    page: {
      animate: true,
      animateMode: "fade-slide",
    },
  }),
  getters: {
    isDarkMode() {},
  },
  actions: {
    setFontTheme(theme = localStg.get("font-family") || "AliFangYuan") {
      this.fontTheme = theme
      localStg.set("font-family", theme)
      document.documentElement.style.setProperty("--font-family", theme)
    },
    setFontThemeList(list: { label: string; value: string }[]) {
      const existingValues = new Set(this.fontThemeList.map((f) => f.value))
      const uniqueNewFonts = list.filter((font) => !existingValues.has(font.value))

      if (uniqueNewFonts.length > 0 && this.fontThemeList.length < 20) {
        this.fontThemeList = [...this.fontThemeList, ...uniqueNewFonts]
      }
    },
    async loadSystemFonts() {
      try {
        const availableFonts = await window.queryLocalFonts()
        const newFonts = {}
        availableFonts.slice(0, 40).map((font: { family: string | number; fullName: any }) => {
          if (newFonts[font.family]) return
          newFonts[font.family] = { label: font.fullName, value: font.family }
        })
        this.setFontThemeList(Object.values(newFonts))
        return newFonts
      } catch {
        return []
      }
    },
    setThemeScheme(theme = localStg.get("themeScheme") || ThemeMode.light) {
      this.themeScheme = theme
      this.setTheme(theme)
    },
    toggleHtmlClass(theme: ThemeModeKey) {
      document.body.setAttribute("data-theme", theme)
      document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark")
    },
    /**
     * 切换主题风格
     */
    setTheme(themeScheme: ThemeModeKey = ThemeMode.light) {
      localStg.set("themeScheme", themeScheme)
      const isAuto = themeScheme === "auto"
      const systemThemeQuery = window.matchMedia("(prefers-color-scheme: light)")

      const theme = isAuto ? (systemThemeQuery.matches ? "light" : "dark") : themeScheme
      this.toggleHtmlClass(theme)

      // 监听系统主题变化，仅在自动模式下生效
      if (isAuto) {
        systemThemeQuery.addEventListener("change", (e) => {
          if (this.themeScheme === "auto") {
            this.toggleHtmlClass(e.matches ? "light" : "dark")
          }
        })
      }
    },
  },
  persist: {
    pick: ["themeScheme", "fontTheme"],
  },
  // persist: true,
})
