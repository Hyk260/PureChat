import { getFileType } from "@pure/utils"
import type { IDomEditor } from "@wangeditor/editor"

import type { AttachmentElement, EmojiElement, ImageElement, MentionElement } from "./types"

/**
 * 判断文件是否为视频文件
 */
export const isVideoFile = (fileName: string): boolean => {
  const video = ["mp4", "wmv", "webm"]
  const name = fileName.toLowerCase()
  const regex = new RegExp(`(${video.join("|")})$`, "i")
  return regex.test(name)
}

/**
 * 将包含表情图像的 HTML 字符串转换为对应的表情符号文本
 * @param editor 编辑器实例
 * @returns 转换后的表情文本
 *
 * 示例：
 * `<p>12<img src="*" alt="[酷]" />333</p>` → `12[酷]333`
 */
export const extractEmojiInfo = (editor: IDomEditor): string => {
  const html = editor.getHtml()
  const emojiMap = editor.getElemsByType("image") as EmojiElement[]

  if (!html || !emojiMap || !Array.isArray(emojiMap)) return ""

  const filtered = emojiMap.filter((item) => item.class === "EmoticonPack")
  if (filtered.length === 0) return ""

  const convertedData = filtered.map((item) => ({ [item.src]: item.alt }))
  const extended = Object.assign({}, ...convertedData) as Record<string, string>

  // 清除文件消息包含的字符串
  const fileRegex = /<span\s+data-w-e-type="attachment"[^>]*>(.*?)<\/span>/g
  const str = html.replace(fileRegex, "")

  // 替换表情包图片为字符串 -> '[**]'
  const imgRegex = /<img src="([^"]+)"[^>]+>/g
  const result = str.replace(imgRegex, (_match, src: string) => extended[src] || "")

  return result.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "")
}

/**
 * 提取图片信息（过滤表情包消息）
 */
export const extractImageInfo = (editor: IDomEditor): { images: ImageElement[] } => {
  const image = editor.getElemsByType("image") as ImageElement[]
  const images = image.filter((item) => item?.class !== "EmoticonPack")
  return { images }
}

/**
 * 提取文件信息（过滤视频文件）
 */
export const extractFilesInfo = (editor: IDomEditor): { files: AttachmentElement[] } => {
  const files = editor.getElemsByType("attachment") as unknown as AttachmentElement[]
  const filtered = files.filter((t) => !isVideoFile(getFileType(t.fileName)))
  return { files: filtered }
}

/**
 * 提取视频信息
 */
export const extractVideoInfo = (editor: IDomEditor): { video: AttachmentElement[] } => {
  const files = editor.getElemsByType("attachment") as unknown as AttachmentElement[]
  const video = files.filter((t) => isVideoFile(getFileType(t.fileName)))
  return { video }
}

/**
 * 从编辑器中提取 @ 信息和纯文本内容
 * @param editor 编辑器实例
 * @returns 包含纯文本内容和 @ 用户 ID 列表的对象
 */
export const extractAitInfo = (
  editor: IDomEditor
): {
  aitStr: string
  atUserList: string[]
} => {
  const aitStr = ""
  const atUserList: string[] = []

  const html = editor.getHtml()
  const mentions = editor.getElemsByType("mention") as unknown as MentionElement[]

  if (!mentions.length) {
    return { aitStr, atUserList }
  }

  // 移除附件标签
  const fileTagRegex = /<span\s+data-w-e-type="attachment"[^>]*>.*?<\/span>/g
  // 移除HTML标签
  const htmlTagRegex = /<[^>]+>/g
  // 移除&nbsp
  const nbspRegex = /&nbsp;/gi

  const cleanedHtml = html.replace(fileTagRegex, "").replace(htmlTagRegex, "").replace(nbspRegex, "")

  const uniqueUserIds = new Set<string>()
  mentions.forEach((item) => {
    if (item?.info?.id) {
      uniqueUserIds.add(item.info.id)
    }
  })

  return {
    aitStr: cleanedHtml,
    atUserList: Array.from(uniqueUserIds),
  }
}
