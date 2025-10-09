/**
 * 文件类型到图标名称的映射表
 */
const FILE_TYPE_ICON_MAPPING: Record<string, string> = {
  // 表格文件
  xlsx: "form",
  xls: "form",

  // 文档文件
  doc: "document",
  docx: "document",

  // 演示文稿
  pptx: "ppt",
  ppt: "ppt",

  // 压缩文件
  rar: "zip",
  zip: "zip",

  // 文本文件
  txt: "txt",
  log: "txt",

  // PDF文件
  pdf: "pdf",

  // 图片文件
  png: "picture",
  jpg: "picture",
  gif: "picture",
  jpeg: "picture",
  webp: "picture",
  svg: "picture",

  // 视频文件
  mp4: "video",

  // 音频文件
  mp3: "audio",

  // 可执行文件
  exe: "exe",

  // 代码文件
  json: "json",
  js: "js",
} as const

/**
 * URL缓存映射，避免重复创建相同的URL对象
 */
const iconUrlCache = new Map<string, string>()

/**
 * 根据文件类型渲染对应的文件图标URL
 * @param fileType 文件扩展名（如：'jpg', 'pdf', 'docx'等）
 * @returns 图标文件的完整URL路径
 */
export const renderFileIcon = (fileType = ""): string => {
  if (typeof fileType !== "string") {
    console.warn("renderFileIcon: fileType should be a string, received:", typeof fileType)
    fileType = String(fileType)
  }

  const normalizedFileType = fileType.toLowerCase().trim()

  const iconType = FILE_TYPE_ICON_MAPPING[normalizedFileType] ?? "default"

  if (iconUrlCache.has(iconType)) {
    return iconUrlCache.get(iconType) as string
  }

  try {
    const iconUrl = new URL(`../../assets/message/${iconType}.png`, import.meta.url).href
    iconUrlCache.set(iconType, iconUrl)
    return iconUrl
  } catch (error) {
    console.error("Failed to create icon URL for type:", iconType, error)
    const defaultUrl = new URL("../../assets/message/default.png", import.meta.url).href
    return defaultUrl
  }
}

/**
 * 清空图标URL缓存（可选的工具函数，用于内存管理）
 */
export const clearIconCache = () => {
  iconUrlCache.clear()
}

/**
 * 获取支持的文件类型列表
 * @returns 支持的文件扩展名数组
 */
export const getSupportedFileTypes = (): string[] => {
  return Object.keys(FILE_TYPE_ICON_MAPPING)
}
