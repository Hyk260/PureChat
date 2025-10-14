<template>
  <div class="code-block-wrapper code-block-container" :class="{ 'with-header': showHeader }">
    <div v-if="showHeader" class="code-header">
      <div class="header-left">
        <div class="collapse-button flex-c" @click.stop="isCollapsed = !isCollapsed">
          <ChevronRight v-if="isCollapsed" :size="14" />
          <ChevronDown v-else :size="14" />
        </div>
      </div>
      <div class="header-center" @click.stop="handleCenterClick">
        <span class="icon-slot" v-html="languageIcon" />
        <span class="code-language">{{ displayLanguage }}</span>
      </div>
      <div class="header-right flex-c">
        <div
          v-if="shouldShowChevrons"
          class="chevrons-button flex-c"
          :title="isChevrons ? '展开' : '收起'"
          @click.stop="toggleChevrons"
        >
          <ChevronsUpDown v-if="isChevrons" :size="14" />
          <ChevronsDownUp v-else :size="14" />
        </div>
        <div class="copy-button flex-c" :class="{ copied: isCopied }" title="复制代码" @click.stop="handleCopyCode">
          <Check v-if="isCopied" :size="14" />
          <Copy v-else :size="14" />
        </div>
        <div v-if="showDownload" class="download-button flex-c" title="下载代码" @click.stop="downloadCode">
          <Download :size="14" />
        </div>
        <div v-if="showMaximize" class="maximize-button flex-c" title="最大化" @click.stop="handleMaximizeCode">
          <Maximize :size="14" />
        </div>
        <div
          v-if="isPreviewable"
          title="preview"
          class="code-action-btn flex-c"
          :aria-label="'Preview'"
          @click.stop="handlePreviewCode"
        >
          <SquareTerminal :size="14" />
        </div>
      </div>
    </div>
    <!-- <div
      ref="codeContainerRef"
      class="code-container"
      :class="{ collapsed: isCollapsed, 'shiki-scroller': !isChevrons }"
      v-html="highlightedCode"
    ></div> -->
    <div
      ref="codeContainerRef"
      class="code-container"
      :class="{ collapsed: isCollapsed, 'shiki-scroller': !isChevrons }"
    >
      <span v-if="!showHeader" class="hljs-language">{{ language }}</span>
      <button v-if="!showHeader" class="copy-code-button" title="copy" @click.stop="handleCopyCode">
        <div class="icon-copy"></div>
      </button>
      <div v-html="highlightedCode"></div>
    </div>
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

import { debounce } from "lodash-es"

import { getLanguageIcon, languageMap, languageMapValues } from "@/utils/languageIcon"

// import { getHighlighter } from "./utils/highlightShiki"
import { highlightCode } from "./utils/highlight"

import "./style/iconify.scss"
import "./style/line-numbers-wrapper.css"

interface Props {
  code: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: "plaintext",
})

const isCopied = ref(false)
const shouldShowChevrons = ref(false)
const isChevrons = ref(false)
const isPreviewable = ref(false)
const isCollapsed = ref(false)
const codeContainerRef = ref<HTMLElement>()
// const showDownload = ref(false)
const showMaximize = ref(false)

const highlightedCode = ref<string>("")
const languageList = ["js", "ts"].concat(languageMapValues)
const excludeList = ["json", "bash"]
// const showHeader = ref(false)
const showHeader = computed(() => languageList.includes(props.language) && !excludeList.includes(props.language))

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

const toggleChevrons = () => {
  isChevrons.value = !isChevrons.value
}

const checkContainerHeight = (element: HTMLElement | undefined) => {
  return element ? element.scrollHeight >= 350 : false
}

const debouncedHeightCheck = debounce(() => {
  shouldShowChevrons.value = checkContainerHeight(codeContainerRef.value)
}, 180)

let resizeObserver: ResizeObserver | null = null
const initResizeObserver = () => {
  if (typeof ResizeObserver === "undefined") {
    window.addEventListener("resize", debouncedHeightCheck)
    return
  }
  resizeObserver = new ResizeObserver(debouncedHeightCheck)
  codeContainerRef.value && resizeObserver.observe(codeContainerRef.value)
}

const cleanupResizeObserver = () => {
  if (resizeObserver && codeContainerRef.value) {
    try {
      resizeObserver.unobserve(codeContainerRef.value)
      resizeObserver.disconnect()
    } catch {
      // 忽略清理错误
    }
    resizeObserver = null
  }
  window.removeEventListener("resize", debouncedHeightCheck)
}

const handleCopyCode = async () => {
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

const handleCenterClick = () => {
  console.log("code block center clicked", props)
}

const handleMaximizeCode = () => {
  // emits('handleMaximizeCode', {
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
const handlePreviewCode = () => {
  if (!isPreviewable.value) return
  // emits('handlePreviewCode', {
  //   node: props.node,
  //   artifactType,
  //   artifactTitle,
  //   id: `temp-${lowerLang}-${Date.now()}`,
  // })
}

onMounted(() => {
  nextTick(() => {
    debouncedHeightCheck()
    initResizeObserver()
  })
})

onBeforeUnmount(() => {
  cleanupResizeObserver()
  debouncedHeightCheck.cancel()
})

watch(highlightedCode, () => {
  nextTick(debouncedHeightCheck)
})

watch(
  () => props.code,
  async () => {
    highlightedCode.value = highlightCode(props.code, props.language)
    // const highlighter = await getHighlighter()
    // const lang = props.language
    // const theme = "one-light"
    // highlightedCode.value = highlighter!.codeToHtml(props.code, {
    //   lang,
    //   theme,
    // })
  },
  { immediate: true }
)
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
    position: relative;
    background: transparent !important;
    transition:
      height 180ms ease,
      max-height 180ms ease;
  }

  .collapsed {
    height: 0px;
  }
}

.hljs-language {
  z-index: 2;
  user-select: none;
  color: #929295;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  top: 2px;
  right: 8px;
  transition:
    color 0.4s,
    opacity 0.4s;
}

.code-block-wrapper :hover .copy-code-button {
  pointer-events: all;
  transform: translateX(0);
  opacity: 0.5;
  background-color: var(--black);
}

.copy-code-button {
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 1em;
  cursor: pointer;
  padding: 0 5px;
  z-index: 10;
  color: var(--white);
  border: var(--color-border-in-light);
  transform: translateX(10px);
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 5px;
  height: 24px;
  width: 24px;
}

.code-block-container {
  contain: content;
  /* 新增：显著减少离屏 codeblock 的布局/绘制与样式计算 */
  content-visibility: auto;
  contain-intrinsic-size: 320px 180px;
}
</style>
