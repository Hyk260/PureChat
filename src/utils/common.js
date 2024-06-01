import dayjs from "dayjs";
 const title = import.meta.env.VITE_APP_NAME;

/**
 * 切换主题风格
 * @param {string}  appearance light || dark || auto
 */
export function setTheme(appearance = "light") {
  const isAuto = appearance === "auto";
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: light)");

  const theme = isAuto ? (systemThemeQuery.matches ? "light" : "dark") : appearance;
  document.body.setAttribute("data-theme", theme);
  document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");

  // 监听系统主题变化，仅在自动模式下生效
  if (isAuto) {
    systemThemeQuery.addEventListener("change", (e) => {
      const theme = e.matches ? "light" : "dark";
      document.body.setAttribute("data-theme", theme);
      document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");
    });
  }
}

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

export const isElectron = window && window.process && window.process.type;
