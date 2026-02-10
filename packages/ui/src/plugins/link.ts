import type MarkdownIt from "markdown-it"

// 外部链接正则表达式：匹配协议开头或双斜杠开头的URL
export const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

/**
 * 判断路径是否为外部链接
 * @param path 待检查的路径
 * @returns 是否为外部链接
 */
export function isExternal(path: string): boolean {
  return EXTERNAL_URL_RE.test(path)
}

/**
 * 为外部链接添加属性
 * @param token 当前token
 * @param externalAttrs 外部链接属性配置
 */
function addExternalLinkAttrs(token: any, externalAttrs: Record<string, string>): void {
  Object.entries(externalAttrs).forEach(([key, value]) => {
    token.attrSet(key, value)
  })
}

/**
 * 检查是否需要处理链接属性
 * @param token 当前token
 * @returns 是否需要处理
 */
function shouldProcessLink(token: any): boolean {
  const hasTarget = token.attrIndex("target") >= 0
  const hasDownload = token.attrIndex("download") >= 0

  // 如果已有 target 或 download 属性，则不处理
  return !hasTarget && !hasDownload
}

/**
 * 获取链接的 href 属性值
 * @param token 当前token
 * @returns href 值，如果不存在则返回空字符串
 */
function getHrefValue(token: any): string {
  const hrefIndex = token.attrIndex("href")

  if (hrefIndex < 0 || !token.attrs) {
    return ""
  }

  return token.attrs[hrefIndex]?.[1] ?? ""
}

/**
 * MarkdownIt 链接插件
 * 为外部链接自动添加指定属性（默认：target="_blank" rel="noreferrer"）
 * @param md MarkdownIt 实例
 * @param externalAttrs 外部链接属性配置，默认 { target: '_blank', rel: 'noreferrer' }
 */
export const linkPlugin = (
  md: MarkdownIt,
  externalAttrs: Record<string, string> = { target: "_blank", rel: "noopener noreferrer" }
) => {
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    try {
      const token = tokens[idx]

      // 检查是否需要处理该链接
      if (!shouldProcessLink(token)) {
        return self.renderToken(tokens, idx, options)
      }

      // 获取链接地址
      const href = getHrefValue(token)

      // 如果是外部链接，添加外部链接属性
      if (href && isExternal(href)) {
        addExternalLinkAttrs(token, externalAttrs)
      }

      return self.renderToken(tokens, idx, options)
    } catch (error) {
      console.warn("linkPlugin 处理链接时出错:", error)
      return self.renderToken(tokens, idx, options)
    }
  }
}
