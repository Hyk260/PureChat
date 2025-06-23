import { defineStore } from "pinia";
import { SetupStoreId } from '@/stores/plugins/index';
import { localStg } from "@/utils/storage";
import { useEventListener, usePreferredColorScheme } from "@vueuse/core";

export const useThemeStore = defineStore(SetupStoreId.Theme, {
  state: () => ({
    themeScheme: "light",
    fontTheme: "AliFangYuan",
    fontThemeList: [
      { label: "阿里方元", value: "AliFangYuan" },
    ],
  }),
  getters: {
    isDarkMode() { },
  },
  actions: {
    setFontTheme(theme = localStg.get("font-family") || "AliFangYuan") {
      this.fontTheme = theme;
      localStg.set("font-family", theme);
      document.documentElement.style.setProperty("--font-family", theme);
    },
    setFontThemeList(list) {
      const existingValues = new Set(this.fontThemeList.map(f => f.value));
      const uniqueNewFonts = list.filter(font => !existingValues.has(font.value));

      if (uniqueNewFonts.length > 0 && this.fontThemeList.length < 20) {
        this.fontThemeList = [...this.fontThemeList, ...uniqueNewFonts];
      }
    },
    async loadSystemFonts() {
      if (!window.queryLocalFonts) {
        console.warn('Local Font Access API is not supported in this browser');
        return;
      }

      try {
        const availableFonts = await window.queryLocalFonts();
        const newFonts = {}
        availableFonts.slice(0, 40).map(font => {
          if (newFonts[font.family]) return;
          newFonts[font.family] = { label: font.fullName, value: font.family, };
        });
        this.setFontThemeList(Object.values(newFonts));
        return newFonts;
      } catch (err) {
        return [];
      }
    },
    setThemeScheme(theme = localStg.get("themeScheme") || "light") {
      this.themeScheme = theme;
      this.setTheme(theme);
    },
    toggleHtmlClass(theme) {
      document.body.setAttribute("data-theme", theme);
      document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");
    },
    /**
     * 切换主题风格
     * @param {string} themeScheme light || dark || auto
     */
    setTheme(themeScheme = "light") {
      localStg.set("themeScheme", themeScheme);
      const isAuto = themeScheme === "auto";
      const systemThemeQuery = window.matchMedia("(prefers-color-scheme: light)");

      const theme = isAuto ? (systemThemeQuery.matches ? "light" : "dark") : themeScheme;
      this.toggleHtmlClass(theme);

      // 监听系统主题变化，仅在自动模式下生效
      if (isAuto) {
        systemThemeQuery.addEventListener("change", (e) => {
          if (this.themeScheme === "auto") {
            this.toggleHtmlClass(e.matches ? "light" : "dark");
          }
        });
      }
    },
  },
  persist: {
    pick: ['themeScheme', "fontTheme"]
  },
  // persist: true,
});
