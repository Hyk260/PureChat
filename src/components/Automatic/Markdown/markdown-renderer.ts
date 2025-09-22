import hljs from "highlight.js"
import javascript from "highlight.js/lib/languages/javascript"
import markdownit from "markdown-it"
import markdownItFootnote from "markdown-it-footnote"

import { prettyObject } from "@/ai/utils"

import {
  applyEpubRules,
  applyFenceRules,
  applyLinkOpenRules,
  configureFootnoteRules,
  renderCodeBlocks,
} from "./markdown"
import { convertToMarkdownFootnotes, CopyIcon } from "./utils"

import "@/styles/highlight.scss"
import "highlight.js/styles/base16/default-light.css"

// 注册 highlight.js 语言
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("vue", javascript)

// 定义构造函数选项接口
interface MarkdownRendererOptions {
  webSearchResults?: any[]
}

// 定义网页搜索结果接口
interface WebSearchResult {
  title?: string
  url?: string
  snippet?: string
  [key: string]: any
}

class MarkdownRenderer {
  private readonly md: markdownit

  constructor(options: MarkdownRendererOptions = {}) {
    const { webSearchResults = [] } = options

    const clipboard = "nextElementSibling && (window.copyToClipboard(nextElementSibling.innerText))"

    /**
     * markdown-it 使用的高亮函数。
     * @param {string} str - 要高亮的代码字符串。
     * @param {string} lang - 代码的语言。
     * @returns {string} 高亮后的 HTML 字符串。
     */
    const highlight = (str: string, lang: string): string => {
      const copyButtonHtml = `<button class="copy-code-button" onclick="${clipboard}" title="copy">${CopyIcon}</button>`
      const langHtml = lang ? `<span class="hljs-language">${lang}</span>` : ""

      if (str && hljs.getLanguage(lang)) {
        // 如果指定了语言且 highlight.js 支持，则高亮代码
        const codeContent = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        return `<pre class="hljs language-${lang ? lang : ""}">${langHtml}${copyButtonHtml}<code>${codeContent}</code></pre>`
      } else {
        // 对于未知语言或无高亮的情况：转义 HTML 并用 pre/code 包装
        // 使用 markdown-it 的工具函数来安全地转义 HTML
        return `<pre class="hljs">${copyButtonHtml}<code>${this.md.utils.escapeHtml(str)}</code></pre>`
      }
    }

    this.md = markdownit({
      html: true, // 在 Markdown 源中启用 HTML 标签
      breaks: true, // 将段落中的 '\n'（换行符）转换为 <br> 标签
      langPrefix: "language-", // 围栏代码块的 CSS 语言前缀（例如，"language-js"）
      typographer: true, // 启用智能引号、破折号和其他排版替换
      highlight: highlight, // 为代码块分配自定义高亮函数
    })

    this.md.use(markdownItFootnote) // 添加对 Markdown 脚注的支持

    configureFootnoteRules(this.md, webSearchResults) // 自定义脚注的渲染方式（例如，链接到来源）
    // applyFenceRules(this.md) // 自定义围栏代码块的渲染方式
    applyLinkOpenRules(this.md) // 修改链接以在新标签页中打开并添加 noopener/noreferrer
    applyEpubRules(this.md) // 将 EPUB 特定属性应用于某些 HTML 元素
  }

  /**
   * 将给定的 Markdown 内容渲染为 HTML 字符串。
   * 此方法处理输入内容，可选地附加脚注，然后进行渲染。
   * @param {string | object} content - 要渲染的 Markdown 字符串。如果是一个对象，它将在渲染前被转换为美化打印的 JSON 字符串。
   * @param {Array<WebSearchResult>} [additionalWebSearchResults=[]] - 可选的网页搜索结果，将作为 Markdown 脚注
   * @returns {string} 渲染后的 HTML 字符串。
   */
  render(content: string | object, additionalWebSearchResults: WebSearchResult[] = []): string {
    let contentToRender: string = content as string

    if (typeof contentToRender !== "string") {
      contentToRender = prettyObject(contentToRender)
    }

    if (additionalWebSearchResults?.length) {
      const footnotes = convertToMarkdownFootnotes(additionalWebSearchResults)
      contentToRender = `${contentToRender}${footnotes}`
    }

    return this.md.render(contentToRender)
  }

  renderWithCodeBlocks(content: string | object, additionalWebSearchResults: WebSearchResult[] = []): string {
    const html = this.render(content, additionalWebSearchResults)

    setTimeout(() => {
      renderCodeBlocks()
    }, 0)

    return html
  }
}

export default MarkdownRenderer
