// 改编自 https://github.com/egoist/markdown-it-highlight-lines
// 现在此插件仅用于规范化行属性。
// 行高亮逻辑的 else 部分位于 './highlight.ts' 中。

import type MarkdownIt from "markdown-it"

const RE = /{([\d,-]+)}/

export const highlightLinePlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx] as any

    // due to use of markdown-it-attrs, the {0} syntax would have been
    // converted to attrs on the token
    const attr = token.attrs && token.attrs[0]

    let lines = null

    if (!attr) {
      // markdown-it-attrs maybe disabled
      const rawInfo = token.info

      if (!rawInfo || !RE.test(rawInfo)) {
        return fence(...args)
      }

      const langName = rawInfo.replace(RE, "").trim()

      // ensure the next plugin get the correct lang
      token.info = langName

      lines = RE.exec(rawInfo)![1]
    }

    if (!lines) {
      lines = attr![0]

      if (!lines || !/[\d,-]+/.test(lines)) {
        return fence(...args)
      }
    }

    token.info += " " + lines
    return fence(...args)
  }
}
