import type { MarkdownToken, ParsedNode } from "../types"
import type MarkdownIt from "markdown-it"

/**
 * 将 markdown 解析为结构化表示的函数
 * @param markdown 要解析的 markdown 字符串
 * @param md markdown-it 实例
 */
export function parseMarkdownToStructure(markdown: string, md: MarkdownIt): ParsedNode[] {
  const safeMarkdown = (markdown ?? "").toString()

  const tokens = md.parse(safeMarkdown, {}) as MarkdownToken[]

  if (!tokens || !Array.isArray(tokens)) return []
  console.log(tokens)
  const result = processTokens(tokens)
  console.log(result)
  return result
}

export function processTokens(tokens: MarkdownToken[]): ParsedNode[] {
  if (!tokens || !Array.isArray(tokens)) return []

  const result: ParsedNode[] = []
  let i = 0

  while (i < tokens.length) {
    const token = tokens[i]
    switch (token.type) {
      case "fence":
        result.push(token)
        // result.push(parseFenceToken(tokens[i]))
        // result.push(token)
        i += 1
        break
      case "heading_open":
        result.push(token)
        // result.push(parseHeading(tokens, i))
        i += 3 // Skip heading_open, inline, heading_close
        break
      case "paragraph_open":
        result.push(token)
        // result.push(parseParagraph(tokens, i))
        i += 3 // Skip paragraph_open, inline, paragraph_close
        break
      default:
        result.push(token)
        // Handle other token types or skip them
        i += 1
        break
    }
  }

  return result
}
