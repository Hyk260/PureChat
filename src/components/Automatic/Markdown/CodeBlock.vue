<template>
  <div class="code-block-wrapper code-block-container" :class="{ 'with-header': showHeader }">
    <div v-if="showHeader" class="code-header">
      <div class="header-left">
        <div class="collapse-button flex-c" @click.stop="isCollapsed = !isCollapsed">
          <ChevronRight v-if="isCollapsed" :size="14" />
          <ChevronDown v-else :size="14" />
        </div>
      </div>
      <div>
        <span class="icon-slot" v-html="languageIcon" />
        <span class="code-language">{{ language }}</span>
      </div>
      <div class="header-right flex-c">
        <div class="copy-button flex-c" :class="{ copied: isCopied }" title="copy" @click.stop="copyCode">
          <Check v-if="isCopied" :size="14" />
          <Copy v-else :size="14" />
        </div>
        <div v-if="showDownload" class="download-button flex-c" title="download" @click.stop="downloadCode">
          <Download :size="14" />
        </div>
        <div v-if="showMaximize" class="maximize-button flex-c" title="maximize" @click.stop="maximizeCode">
          <Maximize :size="14" />
        </div>
        <div
          v-if="isPreviewable"
          title="preview"
          class="code-action-btn flex-c"
          :aria-label="'Preview'"
          @click.stop="previewCode"
        >
          <SquareTerminal :size="14" />
        </div>
      </div>
    </div>
    <div class="code-editor-container" :class="{ collapsed: isCollapsed }" v-html="highlightedCode"></div>
  </div>
</template>

<script setup lang="ts">
import { Check, ChevronDown, ChevronRight, Copy, Download, Maximize, SquareTerminal } from "lucide-vue-next"

import { getLanguageIcon, languageMapValues } from "@/utils/languageIcon"

// import { disposeHighlighter, registerHighlight } from "./highlight"
import { MarkdownRenderer } from "./markdown-renderer"

// import type { Highlighter } from "shiki"

interface Props {
  code: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: "plaintext",
})

const isCopied = ref(false)
const isPreviewable = ref(false)
const isCollapsed = ref(false)
const showDownload = ref(false)
const showMaximize = ref(false)

// const highlighter = ref<Highlighter | null>(null)
// const highlightedCode = ref<string>("")

const showHeader = computed(() => languageMapValues.includes(props.language))

const highlight = new MarkdownRenderer().highlight

const highlightedCode = computed(() => {
  return highlight(props.code, props.language, {
    showLang: !showHeader.value,
    showCopy: !showHeader.value,
  })
})

// Computed property for language icon
const languageIcon = computed(() => {
  const lang = props.language.trim().toLowerCase()
  return getLanguageIcon(lang.split(":")[0] || "")
})

const copyCode = async () => {
  try {
    window.copyToClipboard(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error("Failed to copy code:", err)
  }
}

const maximizeCode = () => {
  // emits('maximizeCode', {
  //   node: props.node,
  //   artifactType,
  //   artifactTitle,
  //   id: `temp-${lowerLang}-${Date.now()}`,
  // })
}

const downloadCode = () => {
  const blob = new Blob([props.code], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  const lang = props.language.trim().toLowerCase()
  const lowerLang = lang.split(":")[0] || "txt"
  link.href = url
  link.download = `code.${lowerLang}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// 预览HTML代码
const previewCode = () => {
  if (!isPreviewable.value) return
  // emits('previewCode', {
  //   node: props.node,
  //   artifactType,
  //   artifactTitle,
  //   id: `temp-${lowerLang}-${Date.now()}`,
  // })
}

// watch(
//   () => props.code,
//   async () => {
//     disposeHighlighter()
//     highlighter.value = await registerHighlight()
//     const lang = props.language
//     const theme = "one-light"
//     highlightedCode.value = highlighter.value.codeToHtml(props.code, { lang, theme })
//   },
//   { immediate: true }
// )
</script>
<style lang="scss">
:root {
  --markdown-border-radius: 4;
  --markdown-font-size: 14px;
  --markdown-header-multiple: 0.25;
  --markdown-line-height: 1.6;
  --markdown-margin-multiple: 1;
}
.with-header {
  .code-editor-container {
    background: transparent !important;
    border-block-start: 1px solid rgba(0, 0, 0, 0.015);
  }
  pre {
    border-radius: 0 0 4px 4px !important;
  }
}
</style>
<style lang="scss" scoped>
.code-block-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 200px;
  -webkit-transition: background-color 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: background-color 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  background: rgba(0, 0, 0, 0.03);
  margin-block: calc(var(--markdown-margin-multiple) * 0.5em);
  border-radius: calc(var(--markdown-border-radius) * 1px);
  box-shadow: 0 0 0 1px var(--markdown-border-color) inset;

  .code-header {
    background: rgba(0, 0, 0, 0.015);
    position: relative;
    padding: 4px;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    .icon-slot {
      // display: inline-flex;
      // align-items: center;
      // justify-content: center;
    }
    .header-left,
    .header-right {
      & > div {
        cursor: pointer;
        border-radius: 4px;
        width: 24px;
        height: 24px;
      }
    }

    .copy-button,
    .code-action-btn,
    .download-button,
    .maximize-button,
    .collapse-button {
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }

  .code-editor-container {
    background: transparent !important;
    transition:
      height 180ms ease,
      max-height 180ms ease;
  }

  .collapsed {
    height: 0px;
  }
}

.code-block-container {
  contain: content;
  /* 新增：显著减少离屏 codeblock 的布局/绘制与样式计算 */
  content-visibility: auto;
  contain-intrinsic-size: 320px 180px;
}
</style>
