// https://github.com/egoist/markdown-it-highlight-lines
import type MarkdownIt from "markdown-it"

// 行号匹配正则：匹配 {1,2-5,8} 格式
const LINE_RANGE_RE = /{([\d,-]+)}/
// 纯行号验证正则
const LINE_NUMBERS_RE = /^[\d,-]+$/

/**
 * 从 token 中提取行号信息
 * @param token - markdown token
 * @returns 行号字符串或 null
 */
const extractLineNumbers = (token: any): string | null => {
  // 优先从 attrs 中获取（markdown-it-attrs 插件处理后的结果）
  const attrValue = token?.attrs?.[0]?.[0]
  if (attrValue && LINE_NUMBERS_RE.test(attrValue)) {
    return attrValue
  }

  // 从原始 info 中提取（markdown-it-attrs 被禁用的情况）
  const rawInfo = token.info
  if (!rawInfo) return null

  const match = LINE_RANGE_RE.exec(rawInfo)
  if (!match) return null

  // 清理 token.info，移除行号部分
  token.info = rawInfo.replace(LINE_RANGE_RE, "").trim()

  return match?.[1] || null
}

/**
 * Markdown-it 插件：处理代码块行高亮语法
 * 支持两种语法：
 * 1. ```js {1,3-5}
 * 2. ```js {.line-numbers}
 */
export const highlightLinePlugin = (md: MarkdownIt): void => {
  const originalFence = md.renderer.rules.fence as any

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx] as any

    // 提取行号信息
    const lineNumbers = extractLineNumbers(token)

    // 如果没有行号信息，使用原始渲染
    if (!lineNumbers) {
      return originalFence(...args)
    }

    // 将行号信息附加到 token.info，供后续插件使用
    token.info = `${token.info} ${lineNumbers}`.trim()

    return originalFence(...args)
  }
}
