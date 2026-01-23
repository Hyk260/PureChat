/**
 * 格式化标题长度
 * 确保标题长度不超过60个字符（包含附加内容长度）
 * @param title 原始标题字符串
 * @param addOnLength 附加内容的长度
 * @returns 格式化后的标题字符串
 */
export const formatTitleLength = (title: string, addOnLength: number = 0) => {
  if (title.length > 60 - addOnLength) {
    return title.slice(0, 57 - addOnLength) + "..."
  } else {
    return title
  }
}

/**
 * 格式化描述长度
 * 确保描述长度不超过160个字符，支持添加标签
 * @param desc 原始描述字符串
 * @param tags 可选的标签数组
 * @returns 格式化后的描述字符串
 */
export const formatDescLength = (desc: string, tags?: string[]): any => {
  if (!desc) return
  if (desc.length > 160) {
    return desc.slice(0, 157) + "..."
  } else {
    if (!tags) return desc
    const tagStr: string = tags ? tags.join(", ") : ""
    const tagLength = 160 - desc.length - 3
    const newDesc = desc + tagStr.slice(0, tagLength) + (tagStr.length > tagLength ? "..." : "")
    return newDesc.length <= 157 ? newDesc : newDesc + "..."
  }
}
