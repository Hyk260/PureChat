import type { HeadingNode, MarkdownToken } from "../../types"
import { parseInlineTokens } from "../inline-parsers"

export function parseHeading(tokens: MarkdownToken[], index: number): HeadingNode {
  const token = tokens[index]
  const headingLevel = Number.parseInt(token.tag?.substring(1) || "1")
  const headingContentToken = tokens[index + 1]
  const headingContent = headingContentToken.content || ""

  return {
    type: "heading",
    level: headingLevel,
    text: headingContent,
    children: parseInlineTokens(headingContentToken.children || []),
    raw: headingContent,
  }
}
