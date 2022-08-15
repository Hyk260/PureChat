import store from "vuex";

/** 切换主题风格
 * @param {string}  appearance light || dark
 */
export function changeAppearance(appearance = "auto") {
  if (appearance === "auto" || appearance === undefined) {
    appearance = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.body.setAttribute("data-theme", appearance);
  let dom = document.querySelector('meta[name="theme-color"]');
  dom?.setAttribute("content", appearance === "dark" ? "#222" : "#fff");
  let text = appearance === "dark" ? "黑色" : "白色";
  console.log(appearance, `${text}-主题`);
}

/**
 * 格式化文件大小
 * @param {Number}  bytes
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
  } else return (bytes / gigaBytes).toFixed(decimal) + " GB";
}

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
