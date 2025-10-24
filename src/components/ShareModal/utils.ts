export interface BackgroundOption {
  colorA: string
  colorB: string
  angle: string
}

/**
 * 背景色配置列表
 */
export const backgroundColors: BackgroundOption[] = [
  {
    colorA: "#6DD5C4",
    colorB: "#5697F9",
    angle: "45deg",
  },
  // {
  //   colorA: "#622FC2",
  //   colorB: "#87FFAD",
  //   angle: "45deg",
  // },
  // {
  //   colorA: "#4A4FFF",
  //   colorB: "#87FFAD",
  //   angle: "45deg",
  // },
  {
    colorA: "#BAA7E4",
    colorB: "#F59F9C",
    angle: "45deg",
  },
  {
    colorA: "#45A5D7",
    colorB: "#F59F9C",
    angle: "45deg",
  },
  {
    colorA: "#2CB0CE",
    colorB: "#CDCBFF",
    angle: "150deg",
  },
  {
    colorA: "#B0BDBF",
    colorB: "#CDCBFF",
    angle: "45deg",
  },
]

/**
 * 预览区域默认背景样式
 */
export const backgroundStyle = {
  "--houdini-colorA": "#B0BDBF",
  "--houdini-colorB": "#CDCBFF",
  "--houdini-angle": "135deg",
  background: "linear-gradient(var(--houdini-angle), var(--houdini-colorA), var(--houdini-colorB))",
}

/**
 * 根据背景选项获取样式对象
 * @param item 背景选项
 * @returns CSS样式对象
 */
export const getBackgroundStyle = (item: BackgroundOption): Record<string, string> => {
  return {
    background: `linear-gradient(${item.angle}, ${item.colorA}, ${item.colorB})`,
  }
}

/**
 * 切换背景颜色
 * @param item 选中的背景选项
 */
export const changeBackgroundColor = (item: BackgroundOption): void => {
  const preview = document.querySelector("#preview")
  if (preview) {
    preview.style.setProperty("--houdini-colorA", item.colorA)
    preview.style.setProperty("--houdini-colorB", item.colorB)
    preview.style.setProperty("--houdini-angle", item.angle)
  }
}
