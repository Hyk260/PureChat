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
