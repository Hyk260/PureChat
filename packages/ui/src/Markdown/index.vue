<template>
  <div v-if="content" class="markdown-body" @click="handleMarkdownClick">
    <NodeRender v-for="(item, index) in renderedContent" :key="index" :node="item" @preview-code="handlePreviewCode" />
  </div>
</template>

<script setup lang="ts">
import { convertToMarkdownFootnotes } from "../utils"
import MarkdownRenderer from "../utils/markdown-renderer"
import NodeRender from "../components/NodeRenderer"

import type { customDataWebSearch } from "@pure/database/schemas"
import "../style/markdown.scss"

defineOptions({ name: "Markdown" })

interface Props {
  content: string | undefined
  cloudCustomData?: customDataWebSearch | null
  enableDOMPurify?: boolean
  lineNumbers?: boolean
  enablePreWrapper?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  cloudCustomData: null,
  enableDOMPurify: true,
  lineNumbers: false,
  enablePreWrapper: false,
})

const emit = defineEmits<{
  previewCode: [data: { code: string }]
}>()

const webSearchResult = computed(() => {
  return props.cloudCustomData?.webSearch?.webSearchResult || []
})

const renderer = new MarkdownRenderer({
  webSearchResults: webSearchResult.value,
  lineNumbers: props.lineNumbers,
  enablePreWrapper: props.enablePreWrapper,
})

function handlePreviewCode(data: { code: string }) {
  emit("previewCode", data)
}

function handleMarkdownClick() {
  console.log("webSearchResult:", webSearchResult.value)
  console.log("content:", props.content)
  console.log("renderedContent:", renderedContent.value)
  console.log("renderer:", props.content + convertToMarkdownFootnotes(webSearchResult.value))
  renderer.getParseMarkdownToStructure(props.content || "")
}

const renderedContent = computed(() => {
  return renderer.renderParsedNodes(props.content || "", webSearchResult.value)
})
</script>

<style lang="scss" scoped></style>
