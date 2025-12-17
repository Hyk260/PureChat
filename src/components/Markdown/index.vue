<template>
  <div v-if="content" class="markdown-body" @click="handleMarkdownClick">
    <MarkdownNodeRender v-for="(item, index) in renderedContent" :key="index" :node="item" />
  </div>
</template>

<script setup lang="ts">
// import { throttle } from "lodash-es"
import { convertToMarkdownFootnotes } from "./utils/utils"
import MarkdownRenderer from "./markdown-renderer"
import MarkdownNodeRender from "./MarkdownNodeRenderer"

import type { customDataWebSearch } from "@/types"
import "./style/markdown.scss"

defineOptions({ name: "Markdown" })

interface Props {
  content: string | undefined
  cloudCustomData?: customDataWebSearch | null
  enableDOMPurify?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  cloudCustomData: null,
  enableDOMPurify: true,
})

const webSearchResult = computed(() => {
  return props.cloudCustomData?.webSearch?.webSearchResult || []
})

const renderer = new MarkdownRenderer({
  webSearchResults: webSearchResult.value,
  lineNumbers: false,
  enablePreWrapper: false,
})

function handleMarkdownClick() {
  console.log("webSearchResult:", webSearchResult.value)
  console.log("content:", props.content)
  console.log("renderedContent:", renderedContent.value)
  console.log("renderer:", props.content + convertToMarkdownFootnotes(webSearchResult.value))
  renderer.getParseMarkdownToStructure(props.content || "")
}

// html转ast
const renderedContent = computed(() => {
  return renderer.renderParsedNodes(props.content || "", webSearchResult.value)
})

// const parsedNodes = computed<BaseNode[]>(() => {
//   return props.content ? parseMarkdownToStructure(props.content, renderer.getMarkdown()) : []
// })
</script>

<style lang="scss" scoped></style>
