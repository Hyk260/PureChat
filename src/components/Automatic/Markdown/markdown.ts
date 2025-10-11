import type Markdownit from "markdown-it"
// import type { Options } from "markdown-it"

export const EPUB_RULES = {
  footnote_ref: ["<a", '<a epub:type="noteref" target="_blank" rel="noopener noreferrer"'],
  footnote_open: ["<li", '<li epub:type="footnote"'],
  footnote_anchor: ["<a", '<a aria-label="back to url"'],
}

/**
 *自定义脚注规则
 */
export const configureFootnoteRules = (md: Markdownit, results: any[] = []) => {
  // 脚注引用样式 (正文中的 [^1] 样式)
  md.renderer.rules.footnote_ref = (tokens: any, id: number) => {
    const n = Number(tokens[id].meta.id + 1).toString()
    const data = results?.find((t) => t.id === n)
    if (data?.sourceUrl) {
      return `<sup class="footnote-ref"><a href="${data.sourceUrl}">[${n}]</a></sup>`
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
    const n = Number(tokens[id].meta.id + 1).toString()
    const data = results?.find((t) => t.id === n)
    if (data?.sourceUrl) {
      return ""
      // return `<a href="${data.sourceUrl}" target="_blank" rel="noopener noreferrer" class="footnote-backref">\u21a9\ufe0e</a>`;
    } else {
      return ""
    }
  }
}

// 链接添加 target="_blank"
export const applyLinkOpenRules = (md: Markdownit) => {
  md.renderer.rules.link_open = (tokens: any, id: number) => {
    tokens[id].attrSet("target", "_blank")
    tokens[id].attrSet("rel", "noopener noreferrer")
    return md.renderer.renderToken(tokens, id, {})
  }
}

export const applyEpubRules = (md: Markdownit) => {
  Object.keys(EPUB_RULES).map((rule) => {
    const defaultRender = md.renderer.rules[rule] as any
    md.renderer.rules[rule] = (tokens: any, id: number, options: any, env: any, self: any) => {
      return defaultRender(tokens, id, options, env, self).replace(...EPUB_RULES[rule as keyof typeof EPUB_RULES])
    }
  })
}

export const applyFenceRules = (md: Markdownit, switcher: boolean = true) => {
  if (!switcher) return
  // md.renderer.rules.fence = (tokens: any, idx: number) => {
  //   const token = tokens[idx]
  //   const lang = token.info.trim() || "plaintext"
  //   const code = token.content

  //   return `
  //     <div class="code-block-wrapper" data-lang="${lang}">
  //       <div class="code-header">
  //         <span class="lang-label">${lang}</span>
  //         <button class="copy-btn">复制代码</button>
  //       </div>
  //       <div class="code-content">${md.options.highlight(code, lang)}</div>
  //     </div>
  //   `
  // }
  // const fence = md.renderer.rules.fence as any
  // md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  //   const { localeIndex = "root" } = env
  //   const codeCopyButtonTitle = (() => {
  //     switch (localeIndex) {
  //       case "zh":
  //         return "复制代码"
  //       default:
  //         return "Copy code"
  //     }
  //   })()
  //   return fence(tokens, idx, options, env, self).replace(
  //     '<button title="Copy Code" class="copy"></button>',
  //     `<button title="${codeCopyButtonTitle}" class="copy"></button>`
  //   )
  // }
}
