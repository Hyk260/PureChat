import markdownItContainer from "markdown-it-container"

import type MarkdownIt from "markdown-it"

export function applyContainers(md: MarkdownIt) {
  ;["admonition", "info", "warning", "error", "tip", "danger", "note", "caution"].forEach((name) => {
    md.use(markdownItContainer, name, {
      render(tokens: any, idx: number) {
        const token = tokens[idx]
        if (token.nesting === 1) {
          return `<div class="vmr-container vmr-container-${name}">`
        } else {
          return "</div>\n"
        }
      },
    })
  })
}
