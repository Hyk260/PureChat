import markdownit from "markdown-it"
import attrsPlugin from "markdown-it-attrs"
import markdownItContainer from "markdown-it-container"
import markdownItFootnote from "markdown-it-footnote"

// import markdownItMark from "markdown-it-mark"
import { applyEpubRules, applyFenceRules, applyLinkOpenRules, configureFootnoteRules } from "./markdown"
import { highlightLinePlugin } from "./plugins/highlightLines"
import { imagePlugin, type Options as ImageOptions } from "./plugins/image"
import { lineNumberPlugin } from "./plugins/lineNumbers"
// import { applyMath } from "./plugins/math"
import { preWrapperPlugin } from "./plugins/preWrapper"
import { highlight, highlightCode } from "./utils/highlight"
import { convertToMarkdownFootnotes } from "./utils/utils"

import type { MarkdownToken } from "./types"

// 定义构造函数选项接口
interface MarkdownRendererOptions {
  webSearchResults?: any[]
  /**
   * 代码块中复制按钮的提示文本
   * @default 'Copy Code'
   */
  codeCopyButtonTitle?: string
  /**
   * 用于显示的自定义语言标签。
   * 覆盖代码块中显示的默认语言标签。
   * 键不区分大小写。
   *
   * @example { 'vue': 'Vue SFC' }
   */
  languageLabel?: Record<string, string>
  /**
   * 是否为代码块启用行号
   * @default false
   */
  lineNumbers?: boolean
  image?: ImageOptions
  /**
   * Options for `markdown-it-attrs`
   * @see https://github.com/arve0/markdown-it-attrs
   */
  attrs?: {
    leftDelimiter?: string
    rightDelimiter?: string
    allowedAttributes?: Array<string | RegExp>
    disable?: boolean
  }
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
  private readonly highlightOptions: HighlightOptions

  constructor(options: MarkdownRendererOptions & { highlightOptions?: HighlightOptions } = {}) {
    const { webSearchResults = [], highlightOptions = {} } = options

    this.highlightOptions = {
      showLang: highlightOptions.showLang ?? false,
      // showCopy: highlightOptions.showCopy ?? false,
    }

    const codeCopyButtonTitle = options.codeCopyButtonTitle || "Copy Code"

    this.md = markdownit({
      html: true, // 在 Markdown 源中启用 HTML 标签
      // xhtmlOut: false, // 使用 '/' 来闭合单标签 （比如 <br />）
      breaks: true, // 将段落中的 '\n'（换行符）转换为 <br> 标签
      langPrefix: "language-", // 围栏代码块的 CSS 语言前缀（例如，"language-js"）
      typographer: true, // 启用智能引号、破折号和其他排版替换
      highlight: this.highlightOptions.showLang ? highlight : highlightCode, // 为代码块分配自定义高亮函数
    })

    // this.md.use(preWrapperPlugin, {
    //   codeCopyButtonTitle,
    //   languageLabel: options.languageLabel,
    // })
    this.md.use(imagePlugin, options.image)
    this.md.use(highlightLinePlugin)
    // this.md.use(markdownItMark) // 添加对 mark 的支持
    this.md.use(lineNumberPlugin, options.lineNumbers) // 为代码块添加行号
    // third party plugins
    if (!options.attrs?.disable) {
      this.md.use(attrsPlugin, options.attrs)
    }
    this.md.use(markdownItFootnote) // 添加对 Markdown 脚注的支持
    this.md.use(markdownItContainer) // 添加对 Markdown 容器的支持

    // applyMath(this.md) // 为数学公式添加支持
    configureFootnoteRules(this.md, webSearchResults) // 自定义脚注的渲染方式（例如，链接到来源）
    applyFenceRules(this.md, false) // 自定义围栏代码块的渲染方式
    applyLinkOpenRules(this.md) // 修改链接以在新标签页中打开并添加 noopener/noreferrer
    applyEpubRules(this.md) // 将 EPUB 特定属性应用于某些 HTML 元素
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
