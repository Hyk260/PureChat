// import store from '@/store/index';
const { title } = require("@/config/vue.custom.config");

/**
 * 切换主题风格
 * @param {string}  appearance light || dark
 */
export function changeAppearance(appearance = "light") {
  if (appearance === "auto") {
    // 查询系统主题色
    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.onchange = autotaggTheme;
    appearance = media.matches ? "light" : "dark";
  }
  // 设置element主题色
  if (appearance == "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  // 自定义主题设色
  document.body.setAttribute("data-theme", appearance);
}

/**
 * 根据系统主题颜色自动切换
 * @param {event}
 */
export function autotaggTheme(e) {
  if (e.matches) {
    document.body.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  } else {
    document.body.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
  }
}

/**
 * 将字节数转换为可读性更强的单位
 * @param {number} bytes - 需要转换的字节数值
 * @returns {string} - 转换后的字符串，表示合适的单位和对应的数值
 */
export function bytesToSize(bytes) {
  const marker = 1024; // Change to 1000 if required
  const decimal = 2; // Change as required
  const kiloBytes = marker;
  const megaBytes = marker * marker;
  const gigaBytes = marker * marker * marker;
  // const lang = store.state.settings.lang;
  const lang = "zh";
  if (bytes < kiloBytes) {
    return bytes + (lang === "en" ? " Bytes" : "字节");
  } else if (bytes < megaBytes) {
    return (bytes / kiloBytes).toFixed(decimal) + " KB";
  } else if (bytes < gigaBytes) {
    return (bytes / megaBytes).toFixed(decimal) + " MB";
  } else {
    return (bytes / gigaBytes).toFixed(decimal) + " GB";
  }
}

export function setPageTitle(routerTitle) {
  document.title = routerTitle ? `${routerTitle} | ${title}` || title : title;
}
