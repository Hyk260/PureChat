import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import python from "highlight.js/lib/languages/python"
import json from "highlight.js/lib/languages/json"
import java from "highlight.js/lib/languages/java"
import html from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"
import markdown from "highlight.js/lib/languages/markdown"

import "../style/highlight.scss"
import "highlight.js/styles/base16/default-light.css"

// 注册 highlight.js 语言
hljs.registerLanguage("markdown", markdown)
hljs.registerLanguage("html", html)
hljs.registerLanguage("css", css)
hljs.registerLanguage("json", json)
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("vue", javascript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("java", java)

// hljs.configure({ ignoreUnescapedHTML: true })

/**
 * 转义 html
 * @param html html
 * @returns 转义后的 html
 */
export function escapeHtml(html: string): string {
  return html.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

/**
 * 高亮code函数
 * @param {string} str - 要高亮的代码字符串。
 * @param {string} lang - 代码的语言。
 * @returns {string} 高亮后的 HTML 字符串。
 */
export const highlight = (str: string, lang: string): string => {
  const clipboard = "nextElementSibling && (window.copyToClipboard(nextElementSibling.innerText))"
  const CopyIcon = `<div class='icon-copy'></div>`

  const copyButtonHtml = `<button class="copy-code-button" onclick="${clipboard}" title="copy">${CopyIcon}</button>`

  const langHtml = `<span class="hljs-language">${lang}</span>`

  if (str && hljs.getLanguage(lang)) {
    const codeContent = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
    return `<pre class="hljs language-${lang ? lang : ""}">${langHtml}${copyButtonHtml}<code>${codeContent}</code></pre>`
  } else {
    // 对于未知语言或无高亮的情况：转义 HTML 并用 pre/code 包装
    return `<pre class="hljs">${copyButtonHtml}<code>${escapeHtml(str)}</code></pre>`
  }
}

export const highlightCode = (str: string, lang: string): string => {
  if (str && hljs.getLanguage(lang)) {
    const codeContent = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
    return `<pre class="hljs language-${lang ? lang : ""}"><code>${codeContent}</code></pre>`
  } else {
    return `<pre class="hljs"><code>${escapeHtml(str)}</code></pre>`
  }
}
