<template>
  <div class="code-block-wrapper code-block-container" :class="{ 'with-header': showHeader, collapsed: isCollapsed }">
    <div v-if="showHeader" class="code-header">
      <div class="header-left">
        <div class="collapse-button flex-c" @click.stop="isCollapsed = !isCollapsed">
          <ChevronRight v-if="isCollapsed" :size="14" />
          <ChevronDown v-else :size="14" />
        </div>
      </div>
      <div class="header-center" @click.stop="centerClick">
        <span class="icon-slot" v-html="languageIcon" />
        <span class="code-language">{{ displayLanguage }}</span>
      </div>
      <div class="header-right flex-c">
        <div v-if="showChevrons" class="chevrons-button flex-c" @click.stop="onChevronsClick">
          <ChevronsUpDown v-if="isChevrons" :size="14" title="UpDown" />
          <ChevronsDownUp v-else :size="14" title="DownUp" />
        </div>
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
    <div
      class="code-container"
      :class="{ collapsed: isCollapsed, 'shiki-scroller': !isChevrons }"
      v-html="highlightedCode"
    ></div>
    <!-- <div class="code-container" :class="{ collapsed: isCollapsed }">
      <pre class="hljs" :class="`language-${language}`">
        <span v-if="showHeader" class="hljs-language">{{ language }}</span>
        <button v-if="showHeader" class="copy-code-button" title="copy" @click="copyCode">
          <div class='icon-copy'></div>
        </button>
        <code v-html="highlightedCode"></code>
      </pre>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Copy,
  Download,
  Maximize,
  SquareTerminal,
} from "lucide-vue-next"

import { getLanguageIcon, languageMap, languageMapValues } from "@/utils/languageIcon"

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
const showChevrons = ref(false)
const isChevrons = ref(false)
const isPreviewable = ref(false)
const isCollapsed = ref(false)
// const showDownload = ref(false)
const showMaximize = ref(false)

// const highlighter = ref<Highlighter | null>(null)
// const highlightedCode = ref<string>("")
const languageList = ["js", "ts"].concat(languageMapValues)
const excludeList = ["json"]
// const showHeader = ref(false)
const showHeader = computed(() => languageList.includes(props.language) && !excludeList.includes(props.language))

const highlight = new MarkdownRenderer().highlight
// const highlightApi = new MarkdownRenderer().highlightApi

const highlightedCode = computed(() => {
  return highlight(props.code, props.language, {
    showLang: !showHeader.value,
    showCopy: !showHeader.value,
  })
})

// const highlightedCodeCopy = computed(() => {
//   return highlightApi(props.code, props.language)
// })

const showDownload = computed(() => {
  const lang = props.language.trim().toLowerCase()
  return ["js", "ts"].includes(lang)
})

const languageIcon = computed(() => {
  const lang = props.language.trim().toLowerCase()
  return getLanguageIcon(lang)
})

const displayLanguage = computed(() => {
  const lang = props.language.trim().toLowerCase()
  if (languageMap[lang]) {
    return languageMap[lang].toLowerCase()
  } else {
    return lang
  }
})

const onChevronsClick = () => {
  isChevrons.value = !isChevrons.value
}

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

const centerClick = () => {
  console.log("code block center clicked", props)
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
  const lowerLang = lang || "txt"
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
  .code-container {
    background: transparent !important;
    border-block-start: 1px solid rgba(0, 0, 0, 0.015);
  }
  pre {
    border-radius: 0 0 4px 4px !important;
  }
  .shiki-scroller code {
    overflow-y: auto;
    max-height: 350px;
  }
}
.code-block-wrapper {
  code {
    overflow-y: auto;
    max-height: 350px;
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
    // .icon-slot {
    //   display: inline-flex;
    //   align-items: center;
    //   justify-content: center;
    // }
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
    .chevrons-button,
    .maximize-button,
    .collapse-button {
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }

  .code-container {
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
