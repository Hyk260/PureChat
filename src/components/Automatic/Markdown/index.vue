<template>
  <!-- <div class="markdown-body" @click="handleMarkdownClick" v-html="renderedContent"></div> -->
  <div class="markdown-body" @click="handleMarkdownClick">
    <MarkdownNodeRenderer v-for="(node, index) in renderedContent" :key="index" :node="node" />
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

// const renderedContent = ref("")

const webSearchResult = computed(() => {
  return props.cloudCustomData?.messageReply?.webSearchResult || []
})

const renderer = new MarkdownRenderer({
  webSearchResults: webSearchResult.value,
})

const renderContent = async () => {
  // const html = renderer.render(props.content, webSearchResult.value)
  // renderedContent.value = html
}

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
      }
      // else if (node.type === "tag" && node.tagName === "pre") {
      //   console.log("node:", node)
      //   debugger
      //   return h(
      //     CodeBlock,
      //     { ...node.attribs },
      //     node.children.map((child, index) => h(MarkdownNodeRenderer, { node: child, key: index }))
      //   )
      // }
      else {
        return h(
          node.tagName,
          { ...node.attribs },
          node.children.map((child, index) => h(MarkdownNodeRenderer, { node: child, key: index }))
        )
      }
    }
  },
})

// onMounted(() => {
//   renderContent()
// })

// watch([() => props.content], renderContent, { immediate: true })
</script>

<style lang="scss" scoped>
.markdown-body {
  user-select: text;
  -webkit-user-select: text;
  contain: layout style paint;
  will-change: contents;

  &.streaming {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 8px;
      height: 20px;
      background: #007acc;
      animation: blink 1s infinite;
    }
  }
}

.markdown-chunk {
  user-select: text;
  -webkit-user-select: text;
  display: contents;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.markdown-body :deep(pre),
.markdown-body :deep(code),
.markdown-body :deep(table),
.markdown-body :deep(p),
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  user-select: text;
  -webkit-user-select: text;
}
</style>
