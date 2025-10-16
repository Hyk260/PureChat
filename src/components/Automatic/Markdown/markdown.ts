import type { KnowledgeReference } from "@/types"
import type Markdownit from "markdown-it"

/**
 *自定义脚注规则
 */
export const configureFootnoteRules = (md: Markdownit, results: KnowledgeReference[] = []) => {
  // 脚注引用样式 (正文中的 [^1] 样式)
  md.renderer.rules.footnote_ref = (tokens: any, id: number) => {
    const n = Number(tokens[id].meta.id + 1)
    const data = results?.find((t) => t.id === n)
    if (data?.sourceUrl) {
      return `<sup class="footnote-ref"><a target="_blank" rel="noopener noreferrer" href="${data.sourceUrl}">[${n}]</a></sup>`
    } else {
      return `<sup class="footnote-ref">[${n}]</sup>`
    }
  }

  // 脚注容器 (底部脚注列表)
  md.renderer.rules.footnote_block_open = () => `
    <section class="footnotes">
      <h2 class="footnotes-title">
        参考文献
      </h2>
      <ol class="footnotes-list">
  `

  md.renderer.rules.footnote_block_close = () => `</ol></section> `

  md.renderer.rules.footnote_open = () => `<li class="footnote-item">`

  md.renderer.rules.footnote_close = () => "</li>\n"

  md.renderer.rules.footnote_anchor = (tokens: any, id: number) => {
    const n = Number(tokens[id].meta.id + 1)
    const data = results?.find((t) => t.id === n)
    if (data?.sourceUrl) {
      return ""
      // return `<a href="${data.sourceUrl}" aria-label="back to url" target="_blank" rel="noopener noreferrer" class="footnote-backref">\u21a9\ufe0e</a>`
    } else {
      return ""
    }
  }
}
