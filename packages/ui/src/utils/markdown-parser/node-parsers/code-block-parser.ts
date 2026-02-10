export function parseCodeBlock(token: MarkdownToken): CodeBlockNode {
  // If this code block is actually a diff (some markdown-it backends
  // classify fences vs code_block differently), delegate to the
  // fence parser to preserve original/updated fields.
  if (token.info?.startsWith("diff")) {
    return parseFenceToken(token)
  }

  const match = token.content.match(/ type="application\/vnd\.ant\.([^"]+)"/)
  if (match?.[1]) {
    // 需要把 <antArtifact> 标签去掉
    token.content = token.content.replace(/<antArtifact[^>]*>/g, "").replace(/<\/antArtifact>/g, "")
  }
  const hasMap = Array.isArray(token.map) && token.map.length === 2
  return {
    type: "code_block",
    language: match ? match[1] : token.info || "",
    code: token.content || "",
    raw: token.content || "",
    loading: !hasMap,
  }
}
