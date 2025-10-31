import type { KnowledgeReference } from "@/types"

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
