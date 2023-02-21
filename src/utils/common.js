// import store from '@/store/index';

/**
 * 切换主题风格
 * @param {string}  appearance light || dark
 */
export function changeAppearance(appearance = "light") {
  if (appearance === "auto") {
    // 查询系统主题色
    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.onchange = autotaggTheme;
    // console.log(media);
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
  let text = appearance === "dark" ? "黑色" : "白色";
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
 * @description: 格式化文件大小
 * @param { Number }  bytes
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
/**
 * @description: 生成随机数
 */
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}
