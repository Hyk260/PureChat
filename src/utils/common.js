import dayjs from "dayjs";
import { localStg } from "@/utils/storage";
import { localStgThemeScheme } from "@/theme/settings";
const title = import.meta.env.VITE_APP_NAME;

function toggleHtmlClass(theme) {
  document.body.setAttribute("data-theme", theme);
  document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");
}
/**
 * 切换主题风格
 * @param {string}  themeScheme light || dark || auto
 */
export function setTheme(themeScheme = "light") {
  localStgThemeScheme(themeScheme);
  const isAuto = themeScheme === "auto";
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: light)");

  const theme = isAuto ? (systemThemeQuery.matches ? "light" : "dark") : themeScheme;
  toggleHtmlClass(theme);

  // 监听系统主题变化，仅在自动模式下生效
  if (isAuto) {
    systemThemeQuery.addEventListener("change", (e) => {
      if (localStg.get("themeSettings") === "auto") {
        toggleHtmlClass(e.matches ? "light" : "dark");
      }
    });
  }
}

export const isElectron = window && window?.electron;

export function setPageTitle(routerTitle) {
  if (isElectron) return;
  document.title = routerTitle ? `${routerTitle} | ${title}` || title : title;
}

export function formatTime(data) {
  return dayjs(data).format("YYYY-MM-DD HH:mm:ss"); // 2022-5-7 9:17:56
}

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

// Male Female
export const getGender = (data, type = "") => {
  return data?.gender === `Gender_Type_${type}`;
};


export const getTime = () => {
  return Math.round(new Date().getTime() / 1000);
}

