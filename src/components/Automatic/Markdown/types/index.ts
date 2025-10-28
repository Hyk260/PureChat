// Define markdown-it token type
export interface MarkdownToken {
  type: string
  /**
   * 对应 HTML 标签：h1-h6, p, ul, ol, li, a, img, strong, em 等
   */
  tag?: string
  /**
   * 文本内容
   */
  content?: string
  info?: string
  loading?: boolean
  nesting?: 1 | -1 | 0
  hidden?: boolean
  children?: MarkdownToken[]
  attrs?: [string, string][]
  markup?: string
  meta?: any
  map?: [number, number]
}

export interface BaseNode {
  type: string
  raw: string
  loading?: boolean
  code?: string
  diff?: boolean
}

export interface TextNode extends BaseNode {
  type: "text"
  content: string
}

export interface HeadingNode extends BaseNode {
  type: "heading"
  level: number
  text: string
  children: ParsedNode[]
}

export interface CodeBlockNode extends BaseNode {
  type: "code_block"
  language: string
  code: string
  // Optional: source line range [start, end) from markdown-it token.map
  startLine?: number
  endLine?: number
  // Whether this block is still incomplete (e.g., missing closing fence)
  loading?: boolean
  // Whether this code block represents a diff
  diff?: boolean
  // If diff is true, original and updated code versions
  originalCode?: string
  updatedCode?: string
  raw: string
}

export type ParsedNode = TextNode | CodeBlockNode
