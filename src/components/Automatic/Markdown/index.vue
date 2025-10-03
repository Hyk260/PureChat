<template>
  <div class="markdown-body" @click="handleMarkdownClick">
    <MarkdownNodeRenderer v-for="(item, index) in renderedContent" :key="index" :node="item" />
  </div>
</template>

<script setup lang="ts">
import DOMPurify from "dompurify"
import { parseDocument } from "htmlparser2"

import CodeBlock from "./CodeBlock.vue"
// import { throttle } from "lodash-es"
import MarkdownRenderer from "./markdown-renderer"

defineOptions({ name: "Markdown" })

interface Props {
  content: string
  cloudCustomData?: Record<string, any> | null
}

const props = withDefaults(defineProps<Props>(), {
  cloudCustomData: null,
})

const webSearchResult = computed(() => {
  return props.cloudCustomData?.messageReply?.webSearchResult || []
})

const renderer = new MarkdownRenderer({
  webSearchResults: webSearchResult.value,
})

function handleMarkdownClick() {
  console.log("webSearchResult:", webSearchResult.value)
  console.log("marked:", props.content)
  console.log("renderedContent:", renderedContent.value)
}

// html转ast
const renderedContent = computed(() => {
  // Markdown模式添加安全过滤和样式类 并处理成dom ast
  return parseDocument(renderer.render(props.content, webSearchResult.value)).children
  // return parseDocument(DOMPurify.sanitize(renderer.render(props.content, webSearchResult.value))).children
})

const MarkdownNodeRenderer = defineComponent({
  name: "MarkdownNodeRenderer",
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { node } = props
      if (node.type === "text") {
        return node.data
      } else if (node.type === "tag" && node.tagName === "pre") {
        // 找到 <code> 子节点并提取其中的文本内容作为 code prop，同时尝试解析语言类名
        const codeChild = (node.children || []).find((c: any) => c.type === "tag" && c.tagName === "code")

        // 递归收集文本节点内容
        const collectText = (n: any): string => {
          if (!n) return ""
          if (n.type === "text") return n.data || ""
          if (n.children && n.children.length) return n.children.map((ch: any) => collectText(ch)).join("")
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
        return h(CodeBlock, { code: codeText, language })
      } else {
        return h(
          node.tagName,
          { ...node.attribs },
          node.children.map((child: any, index: number) => h(MarkdownNodeRenderer, { node: child, key: index }))
        )
      }
    }
  },
})
</script>

<style lang="scss" scoped></style>
