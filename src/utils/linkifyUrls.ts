import type { GroupMember } from "@/stores/modules/group/type"

interface LinkifyOptions {
  target?: string
  className?: string
}

// URL 匹配的正则表达式
// eslint-disable-next-line prettier/prettier
const URL_REGEX = /((?<!\+)https?:\/\/(?:www\.)?(?:[-\w.]+?[.@][a-zA-Z\d]{2,}|localhost)(?:[-\w.:%+~#*$!?&/=@]*?(?:,(?!\s))*?)*)/g

/**
 * 创建链接标签
 * @param href 链接地址
 * @param options 配置选项
 */
const createLinkTag = (href: string, options: LinkifyOptions = {}) => {
  const { target = "_blank", className = "linkUrl" } = options
  return `<a href="${href}" class="${className}" target="${target}">${href}</a>`
}

/**
 * 检查 URL 是否被截断
 * @param url URL字符串
 * @param nextChar URL后面的字符
 */
const isUrlTruncated = (url: string, nextChar: string): boolean => {
  return url.endsWith("...") || nextChar.startsWith("…")
}

/**
 * 将文本中的 URL 转换为可点击的链接
 * @param text 原始文本
 * @param options 配置选项
 * Check out this link: https://example.com
 */
export const linkifyUrls = (text: string, options?: LinkifyOptions): string => {
  if (!text) return ""

  return text.replace(URL_REGEX, (url, _, offset) => {
    return isUrlTruncated(url, text.charAt(offset + url.length)) ? url : createLinkTag(url, options)
  })
}

// **************** LinkSegment *************** //

/**
 * @mention 匹配的正则表达式
 * 匹配 @ 后面跟非空白字符，直到遇到空白字符、标点符号或文本结束
 */
export const MENTION_REGEX = /@([^\s@]+)/g

export interface LinkSegment {
  content: string
  isLink: boolean
  url?: string
  member?: GroupMember
  type: "link" | "mention" | "text"
}

export const hasLink = (text: string): boolean => {
  if (!text) return false
  return new RegExp(URL_REGEX.source, "i").test(text)
}

/**
 * 判断是否为有效的 URL
 */
export const isValidUrl = (text: string): boolean => {
  const urlRegex = /^(https?|ftp):\/\/[\w.-]+(?:\/[\w.-]*)*$/
  return urlRegex.test(text)
}

// 优化：更精确的 URL 正则，处理末尾标点符号
// const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`[\]]+?(?=[.,;:!?)]*(?:\s|$)|$)/gi

/**
 * 解析文本，将 URL text @mention 分离为独立片段
 * @param text 原始文本
 * @param atUserList 被 @ 的用户ID列表
 */
export function linkifySegment(text: string, atUserList: GroupMember[] | []): LinkSegment[] {
  if (!text) return []

  const segments: LinkSegment[] = []
  const regex = new RegExp(URL_REGEX.source, URL_REGEX.flags)

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index
    const matchedUrl = match[0]

    // URL 前的普通文本
    if (matchStart > lastIndex) {
      segments.push({ content: text.slice(lastIndex, matchStart), type: "text", isLink: false })
    }

    // URL 片段
    segments.push({ content: matchedUrl, type: "link", isLink: true, url: matchedUrl })
    lastIndex = matchStart + matchedUrl.length
  }

  // 剩余文本
  if (lastIndex < text.length) {
    segments.push({ content: text.slice(lastIndex), type: "text", isLink: false })
  }

  // 如果没有 atUserList，直接返回 URL 分段结果
  if (!atUserList || atUserList.length === 0) {
    return segments
  }

  // 进一步在普通文本片段中拆分出 @mention
  const result: LinkSegment[] = []

  for (const seg of segments) {
    // 链接片段保持不变
    if (seg.type !== "text") {
      result.push(seg)
      continue
    }

    const value = seg.content
    let lastTextIndex = 0
    let mentionMatch: RegExpExecArray | null

    // 重置正则的 lastIndex，避免受上一次 exec 影响
    MENTION_REGEX.lastIndex = 0

    while ((mentionMatch = MENTION_REGEX.exec(value)) !== null) {
      const matchStart = mentionMatch.index
      const matchText = mentionMatch[0] // 包含 @ 的完整文本，如 "@Hyk260"
      const mentionKey = mentionMatch[1] // 去掉 @ 后，如 "Hyk260"

      // 前面的普通文本
      if (matchStart > lastTextIndex) {
        result.push({
          content: value.slice(lastTextIndex, matchStart),
          type: "text",
          isLink: false,
        })
      }

      // 在 atUserList 中查找对应成员
      const member = atUserList.find((m) => m.nick === mentionKey)

      if (member) {
        // 命中的 @mention 片段
        result.push({
          content: matchText,
          type: "mention",
          isLink: false,
          member,
        })
      } else {
        // atUserList 里不存在的 @xxx，当普通文本处理
        result.push({
          content: matchText,
          type: "text",
          isLink: false,
        })
      }

      lastTextIndex = matchStart + matchText.length
    }

    // 剩余普通文本
    if (lastTextIndex < value.length) {
      result.push({
        content: value.slice(lastTextIndex),
        type: "text",
        isLink: false,
      })
    }
  }

  return result
}
