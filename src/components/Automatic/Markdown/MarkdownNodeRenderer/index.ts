import { defineComponent, h } from "vue"

import CodeBlock from "../CodeBlock.vue"
import Tables from "../Tables.vue"

const renderPreNode = (node: any) => {
  // console.log("Rendering <pre> node:", node)
  // 找到 <code> 子节点并提取其中的文本内容作为 code prop，同时尝试解析语言类名
  const codeChild = (node.children || []).find((c: any) => c.type === "tag" && c.tagName === "code")

  // 递归收集文本节点内容
  const collectText = (childNode: any): string => {
    if (!childNode) return ""
    if (childNode.type === "text") return childNode.data || ""
    if (childNode.children?.length) return childNode.children.map((ch: any) => collectText(ch)).join("")
    return ""
  }

  let codeText = ""
  let language = "plaintext"

  if (codeChild) {
    codeText = collectText(codeChild)
    const classAttr =
      (codeChild.attribs && (codeChild.attribs.class || codeChild.attribs["className"])) ||
      (node.attribs && (node.attribs.class || node.attribs["className"])) ||
      ""
    const m = /(?:language|lang)-([\w-]+)/.exec(classAttr)
    language = m?.[1] ?? language
  } else {
    codeText = collectText(node)
  }
  // console.log("Rendering code block:", { language, codeText })
  if (!codeText.trim()) return null
  return h(CodeBlock, { code: codeText, language })
}

const MarkdownNodeRender = defineComponent({
  name: "MarkdownNodeRender",
  props: {
    node: {
      type: Object,
      required: true,
    },
    showCustomTable: {
      type: Boolean,
      default: false,
    },
    showCustompPre: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return () => {
      const { node } = props
      if (node.type === "text") {
        return node.data
      } else if (node.type === "tag" && node.tagName === "pre" && props.showCustompPre) {
        return renderPreNode(node)
      } else if (node.type === "tag" && node.tagName === "table" && props.showCustomTable) {
        // Tables 组件：把 table AST 转为 columns + data 传给 Tables 组件渲染
        // 辅助：递归收集文本内容
        const collectText = (childNode: any): string => {
          if (!childNode) return ""
          if (childNode.type === "text") return childNode.data || ""
          if (childNode.children?.length) return childNode.children.map((ch: any) => collectText(ch)).join("")
          return ""
        }

        // 收集所有 tr 节点（thead/tbody 里面也会被找到）
        const trs: any[] = []
        const collectTrs = (n: any) => {
          if (!n) return
          if (n.type === "tag" && n.tagName === "tr") {
            trs.push(n)
            return
          }
          if (n.children?.length) n.children.forEach((c: any) => collectTrs(c))
        }
        collectTrs(node)

        if (!trs.length) return h("table", { ...node.attribs })

        // 解析头部：优先使用 th，否则用第一行 td 当作头
        const headerCells = (trs[0].children || []).filter(
          (c: any) => c.type === "tag" && (c.tagName === "th" || c.tagName === "td")
        )
        let headers = headerCells.map((c: any) => collectText(c).trim())

        // 若没有 headerCells，则构建占位 header（并把第一行作为数据）
        let bodyStartIndex = 1
        if (!headers.length) {
          const firstRowCells = (trs[0].children || []).filter(
            (c: any) => c.type === "tag" && (c.tagName === "td" || c.tagName === "th")
          )
          const colCount = firstRowCells.length
          headers = Array.from({ length: colCount }).map((_, i) => `col${i}`)
          bodyStartIndex = 0
        }

        // 生成安全的 prop key（去掉空格和特殊字符）
        const sanitizeKey = (s: string, i: number) => {
          if (!s) return `col${i}`
          const k = String(s)
            .replace(/\s+/g, "_")
            .replace(/[^\w$]/g, "")
          return k || `col${i}`
        }

        const keys = headers.map((h: string, i: number) => sanitizeKey(h, i))

        // 解析数据行
        const data = trs.slice(bodyStartIndex).map((row) => {
          const cells = (row.children || []).filter(
            (c: any) => c.type === "tag" && (c.tagName === "td" || c.tagName === "th")
          )
          const obj: Record<string, any> = {}
          keys.forEach((k, i) => {
            obj[k] = cells[i] ? collectText(cells[i]).trim() : ""
          })
          return obj
        })

        const columns = keys.map((k, i) => ({ prop: k, label: headers[i] || k, width: 180 }))

        return h(Tables, { data, columns })
      } else {
        return h(
          node.tagName,
          { ...node.attribs },
          node.children.map((child: any, index: number) => h(MarkdownNodeRender, { node: child, key: index }))
        )
      }
    }
  },
})

export default MarkdownNodeRender
