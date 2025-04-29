import { defineStore } from "pinia";
import { SetupStoreId } from "../../plugins/index";
import { localStg } from "@/utils/storage";
import { useEventListener, usePreferredColorScheme } from "@vueuse/core";

export const useThemeStore = defineStore(SetupStoreId.Theme, {
  state: () => ({
    themeScheme: "light",
  }),
  getters: {
    isDarkMode() {},
  },
  actions: {
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
  persist: true,
});
