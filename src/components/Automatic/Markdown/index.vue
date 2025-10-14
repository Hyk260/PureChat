<template>
  <div v-if="content" class="markdown-body" @click="handleMarkdownClick">
    <MarkdownNodeRender v-for="(item, index) in renderedContent" :key="index" :node="item" />
  </div>
</template>

<script setup lang="ts">
import DOMPurify from "dompurify"
import { parseDocument } from "htmlparser2"

// import { throttle } from "lodash-es"
import { prettyObject } from "@/ai/utils"

import MarkdownRenderer from "./markdown-renderer"
import MarkdownNodeRender from "./MarkdownNodeRenderer"

// import { parseMarkdownToStructure } from "./utils"
// import type { BaseNode } from "./types"
import "./style/markdown.scss"

defineOptions({ name: "Markdown" })

interface Props {
  content: string | undefined
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
  lineNumbers: false,
})

function handleMarkdownClick() {
  console.log("webSearchResult:", webSearchResult.value)
  console.log("marked:", props.content)
  console.log("renderedContent:", renderedContent.value)
}

// html转ast
const renderedContent = computed(() => {
  let contentToRender: string = props.content || ""
  if (!contentToRender) return []
  if (typeof contentToRender !== "string") {
    contentToRender = prettyObject(contentToRender)
  }
  // Markdown模式添加安全过滤和样式类 并处理成dom ast
  // return parseDocument(renderer.render(contentToRender, webSearchResult.value)).children
  return parseDocument(DOMPurify.sanitize(renderer.render(contentToRender, webSearchResult.value))).children
})

// const parsedNodes = computed<BaseNode[]>(() => {
//   // 解析 content 字符串为节点数组
//   return props.content ? parseMarkdownToStructure(props.content, renderer.getMarkdown()) : []
// })
</script>

<style lang="scss" scoped></style>
