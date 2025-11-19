import { defineComponent, h } from "vue"

import CodeBlock from "../components/CodeBlockNode"
import Table from "../components/TableNode"
// import PreCodeNode from "../components/PreCodeNode"

// 异步按需加载 CodeBlock 组件
// const CodeBlockNodeAsync = defineAsyncComponent(async () => {
//   try {
//     const mod = await import("../components/CodeBlockNode")
//     return mod.default
//   } catch {
//     return PreCodeNode
//   }
// })

// const TableNodeAsync = defineAsyncComponent(async () => {
//   const mod = await import("../components/TableNode")
//   return mod.default
// })

// 递归收集文本节点内容
const collectText = (childNode: any): string => {
  if (!childNode) return ""
  if (childNode.type === "text") return childNode.data || ""
  if (childNode.children?.length) return childNode.children.map((t: any) => collectText(t)).join("")
  return ""
}

const renderPreNode = (node: any) => {
  const codeChild = (node.children || []).find((t: any) => t.type === "tag" && t.tagName === "code")

  let codeText = ""
  let language = "plaintext"

  if (codeChild) {
    codeText = collectText(codeChild)
    const classAttr = codeChild.attribs?.class || node.attribs?.class || ""
    const match = /(?:language|lang)-([\w-]+)/.exec(classAttr)
    language = match?.[1] ?? language
  } else {
    codeText = collectText(node)
  }

  if (!codeText.trim()) return null
  return h(CodeBlock, { code: codeText, language })
}

const renderTableNode = (node: any) => {
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

  return h(Table, { data, columns })
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
    const renderNode = (node: any) => {
      if (node.type === "text") {
        return node.data
      } else if (node.type === "tag" && node.tagName === "pre" && props.showCustompPre) {
        return renderPreNode(node)
      } else if (node.type === "tag" && node.tagName === "table" && props.showCustomTable) {
        return renderTableNode(node)
      } else {
        return h(
          node.tagName,
          { ...node.attribs },
          node.children?.map((child: any, index: number) => h(MarkdownNodeRender, { node: child, key: index }))
        )
      }
    }

    return () => renderNode(props.node)
  },
})

export default MarkdownNodeRender
