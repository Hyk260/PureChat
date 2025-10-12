import hljs from "highlight.js"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import markdownit from "markdown-it"
import markdownItContainer from "markdown-it-container"
import markdownItFootnote from "markdown-it-footnote"

// import markdownItMark from "markdown-it-mark"
import { applyEpubRules, applyFenceRules, applyLinkOpenRules, configureFootnoteRules } from "./markdown"
import { lineNumberPlugin } from "./plugins/lineNumbers"
// import { applyMath } from "./plugins/math"
// import { preWrapperPlugin } from "./plugins/preWrapper"
import { convertToMarkdownFootnotes } from "./utils"

import type { MarkdownToken } from "./types"

import "./style/iconify.scss"
import "@/styles/highlight.scss"
import "highlight.js/styles/base16/default-light.css"

// 注册 highlight.js 语言
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("vue", javascript)
hljs.registerLanguage("python", python)

// hljs.configure({ ignoreUnescapedHTML: true })

// 定义构造函数选项接口
interface MarkdownRendererOptions {
  webSearchResults?: any[]
  /**
   * 是否为代码块启用行号
   * @default false
   */
  lineNumbers?: boolean
}

// 高亮显示的可选项：是否显示语言标签和复制按钮
interface HighlightOptions {
  showLang?: boolean
  showCopy?: boolean
}

// 定义网页搜索结果接口
interface WebSearchResult {
  title?: string
  url?: string
  snippet?: string
  [key: string]: any
}

export class MarkdownRenderer {
  private readonly md: markdownit
  private readonly defaultHighlightOptions: HighlightOptions

  constructor(options: MarkdownRendererOptions & { highlightOptions?: HighlightOptions } = {}) {
    const { webSearchResults = [], highlightOptions = {} } = options

    // 默认都显示，除非构造时显式关闭
    this.defaultHighlightOptions = {
      showLang: highlightOptions.showLang ?? true,
      showCopy: highlightOptions.showCopy ?? true,
    }

    this.md = markdownit({
      html: true, // 在 Markdown 源中启用 HTML 标签
      breaks: true, // 将段落中的 '\n'（换行符）转换为 <br> 标签
      langPrefix: "language-", // 围栏代码块的 CSS 语言前缀（例如，"language-js"）
      typographer: true, // 启用智能引号、破折号和其他排版替换
      highlight: this.highlight, // 为代码块分配自定义高亮函数
    })

    this.md.use(markdownItFootnote) // 添加对 Markdown 脚注的支持
    this.md.use(markdownItContainer) // 添加对 Markdown 容器的支持
    this.md.use(lineNumberPlugin, options.lineNumbers) // 为代码块添加行号
    // this.md.use(markdownItMark) // 添加对 mark 的支持
    // applyMath(this.md) // 为数学公式添加支持

    // this.md.use(preWrapperPlugin, {
    //   codeCopyButtonTitle: "复制代码",
    //   languageLabel: options.languageLabel
    // })

    configureFootnoteRules(this.md, webSearchResults) // 自定义脚注的渲染方式（例如，链接到来源）
    applyFenceRules(this.md, false) // 自定义围栏代码块的渲染方式
    applyLinkOpenRules(this.md) // 修改链接以在新标签页中打开并添加 noopener/noreferrer
    applyEpubRules(this.md) // 将 EPUB 特定属性应用于某些 HTML 元素
  }

  /**
   * markdown-it 使用的高亮函数。
   * @param {string} str - 要高亮的代码字符串。
   * @param {string} lang - 代码的语言。
   * @param {{showLang?: boolean, showCopy?: boolean}} [opts] - 覆盖显示选项（可选）。
   * @returns {string} 高亮后的 HTML 字符串。
   */
  highlight = (str: string, lang: string, attrs?: any): string => {
    // markdown-it 调用 highlight 时第三个参数通常是 attrs: string
    // 我们同时支持传入一个对象作为 opts，用来临时覆盖是否显示语言标签和复制按钮
    const opts: HighlightOptions | undefined =
      attrs && typeof attrs === "object" ? (attrs as HighlightOptions) : undefined
    const options = opts
      ? {
          showLang: opts.showLang ?? this.defaultHighlightOptions.showLang,
          showCopy: opts.showCopy ?? this.defaultHighlightOptions.showCopy,
        }
      : this.defaultHighlightOptions

    const clipboard = "nextElementSibling && (window.copyToClipboard(nextElementSibling.innerText))"
    const CopyIcon = `<div class='icon-copy'></div>`

    const copyButtonHtml = options.showCopy
      ? `<button class="copy-code-button" onclick="${clipboard}" title="copy">${CopyIcon}</button>`
      : ""
    const langHtml = options.showLang && lang ? `<span class="hljs-language">${lang}</span>` : ""

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

  highlightApi(str: string, lang: string): string {
    if (str && hljs.getLanguage(lang)) {
      const codeContent = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
      return codeContent
    } else {
      return this.md.utils.escapeHtml(str)
    }
  }

  getMarkdown() {
    return this.md
  }

  parse(content: string): MarkdownToken[] {
    const safeMarkdown = (content ?? "").toString()
    // Get tokens from markdown-it
    const tokens = this.md.parse(safeMarkdown, {}) as MarkdownToken[]
    return tokens
  }

  /**
   * 将给定的 Markdown 内容渲染为 HTML 字符串。
   * 此方法处理输入内容，可选地附加脚注，然后进行渲染。
   * @param {string} content - 要渲染的 Markdown 字符串
   * @param {Array<WebSearchResult>} [additionalWebSearchResults=[]] - 可选的网页搜索结果，将作为 Markdown 脚注
   * @returns {string} 渲染后的 HTML 字符串。
   */
  render(content: string, additionalWebSearchResults: WebSearchResult[] = []): string {
    let contentToRender = content

    if (!contentToRender) {
      throw new Error("内容不能为空")
    }

    if (additionalWebSearchResults?.length) {
      const footnotes = convertToMarkdownFootnotes(additionalWebSearchResults)
      contentToRender = `${contentToRender}${footnotes}`
    }

    return this.md.render(contentToRender)
  }
}

export default MarkdownRenderer
