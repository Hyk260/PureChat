import { parseFenceToken } from "../markdown-parser/inline-parsers/fence-parser"

import type { MarkdownToken, ParsedNode } from "../types"
import type { KnowledgeReference } from "@/types"
import type MarkdownIt from "markdown-it"

const TRUNCATE_LENGTH = 100
const ELLIPSIS = "..."

const truncateContent = (t: string) => {
  return t.length > TRUNCATE_LENGTH ? `${t.substring(0, TRUNCATE_LENGTH)}${ELLIPSIS}` : t
}

/**
 * 将数据转换为 Markdown 脚注格式
 * @param data 脚注数据数组
 * @returns 格式化后的 Markdown 脚注字符串
 */
export function convertToMarkdownFootnotes(data: KnowledgeReference[]) {
  if (!data?.length) return ""
  const footnotes = data.map(({ id, content, sourceUrl }) => {
    const truncatedContent = truncateContent(content?.trim() || "")
    return `[^${id}]: [${truncatedContent.replace(/\s+/g, " ").trim()}](${sourceUrl || "#"})`
  })
  return `\n\n${footnotes.join("\n\n")}\n\n`
}

// Function to parse markdown into a structured representation
export function parseMarkdownToStructure(markdown: string, md: MarkdownIt): ParsedNode[] {
  // Ensure markdown is a string — guard against null/undefined inputs from callers
  const safeMarkdown = (markdown ?? "").toString()
  // Get tokens from markdown-it
  const tokens = md.parse(safeMarkdown, {}) as MarkdownToken[]
  // Defensive: ensure tokens is an array
  if (!tokens || !Array.isArray(tokens)) return []

  // Process the tokens into our structured format
  const result = processTokens(tokens)
  return result
}

// Process markdown-it tokens into our structured format
export function processTokens(tokens: MarkdownToken[]): ParsedNode[] {
  // Defensive: ensure tokens is an array
  if (!tokens || !Array.isArray(tokens)) return []

  const result: ParsedNode[] = []
  let i = 0

  while (i < tokens.length) {
    const token = tokens[i]
    switch (token.type) {
      case "fence":
        result.push(parseFenceToken(tokens[i]))
        i += 1
        break
      default:
        // Handle other token types or skip them
        i += 1
        break
    }
  }

  return result
}
