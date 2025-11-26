<template>
  <div class="code-block-wrapper code-block-container" :class="{ 'with-header': showHeader }">
    <div v-if="showHeader" class="code-header">
      <div class="header-left">
        <div class="collapse-button flex-c" @click.stop="toggleCollapse">
          <ChevronRight v-if="isCollapsed" :size="14" />
          <ChevronDown v-else :size="14" />
        </div>
      </div>
      <div class="header-center" @click.stop="handleCenterClick">
        <span class="icon-slot" v-html="languageIcon" />
        <span class="code-language">{{ displayLanguage }}</span>
      </div>
      <div class="header-right flex justify-end">
        <ElTooltip
          :disabled="!shouldShowChevrons && isCollapsed"
          :content="isChevrons ? '收起' : '展开'"
          :showArrow="false"
          :offset="8"
          placement="top"
          transition="slide-fade"
        >
          <div
            class="copy-button flex-c"
            :class="{ invisible: !shouldShowChevrons || isCollapsed }"
            @click.stop="toggleChevrons"
          >
            <ChevronsDownUp v-if="isChevrons" :size="14" />
            <ChevronsUpDown v-else :size="14" />
          </div>
        </ElTooltip>

        <ElTooltip
          v-if="showDownload"
          content="下载代码"
          placement="top"
          :showArrow="false"
          :offset="8"
          transition="slide-fade"
        >
          <div class="download-button flex-c" @click.stop="downloadCode">
            <Download :size="14" />
          </div>
        </ElTooltip>

        <div v-if="showMaximize" class="maximize-button flex-c" title="最大化" @click.stop="handleMaximizeCode">
          <Maximize :size="14" />
        </div>

        <ElTooltip
          v-if="isPreviewable && showPreviewButton"
          content="预览代码"
          placement="top"
          :showArrow="false"
          :offset="8"
          transition="slide-fade"
        >
          <div class="code-action-btn flex-c" @click.stop="handlePreviewCode">
            <Eye :size="14" />
          </div>
        </ElTooltip>

        <ElTooltip content="复制代码" placement="top" :showArrow="false" :offset="8" transition="slide-fade">
          <div class="copy-button flex-c" @click.stop="handleCopyCode">
            <Check v-if="isCopied" :size="14" />
            <Copy v-else :size="14" />
          </div>
        </ElTooltip>
      </div>
    </div>
    <div
      ref="codeContainerRef"
      class="code-container"
      :class="{ collapsed: isCollapsed, 'shiki-scroller': !isChevrons }"
    >
      <template v-if="!showHeader">
        <span class="hljs-language">{{ language }}</span>
        <button class="copy-code-button" title="copy" @click.stop="handleCopyCode">
          <div class="icon-copy"></div>
        </button>
      </template>
      <template v-if="highlightedCode">
        <div ref="codeBlockRef" class="code-block" v-html="highlightedCode"></div>
      </template>
      <div v-else ref="codeBlockRef" class="code-block code-skeleton-wrapper">
        <!-- 骨架屏占位，在代码未高亮时显示 -->
        <div class="code-skeleton">
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-line-short"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    </div>
    <!-- <HighlighterComp
        ref="highlighterRef"
        :show-header="showHeader"
        :language="language"
        :highlighted-code="highlightedCode"
        :is-chevrons="isChevrons"
        :is-collapsed="isCollapsed"
        @copy="handleCopyCode"
      /> -->
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
  // SquareTerminal,
  Eye,
  Maximize,
} from "lucide-vue-next"
import { usePreferredColorScheme, useIntersectionObserver } from "@vueuse/core"
// import {
//   registerHighlight,
//   disposeHighlighter,
//   getHighlighter,
//   isHighlighterInitialized,
// } from "../../utils/highlightShiki"
// import HtmlArtifactsPopup from "@/components/CodeBlockView/HtmlArtifactsPopup.vue"
import { useCodeBlock } from "@/composables/useCodeBlock"
import { useHeightCheck } from "@/composables/useHeightCheck"
import { getLanguageIcon, languageMap, languageMapValues } from "@/utils/languageIcon"
import { useThemeStore } from "@/stores/modules/theme"
import emitter from "@/utils/mitt-bus"

import { highlightCode } from "../../utils/highlight"

import type { Highlighter } from "shiki"
// import HighlighterComp from "@/components/Highlighter/index.vue"

import "../../style/iconify.scss"
import "../../style/line-numbers-wrapper.css"

interface Props {
  code: string
  language?: string
  showPreviewButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: "plaintext",
  showPreviewButton: true,
})

const { isCopied, copyCode, downloadCode: downloadCodeFile } = useCodeBlock()
const { shouldShowChevrons, heightCheck } = useHeightCheck()

const highlighter = ref<Highlighter | null>(null)

const isChevrons = ref(false)
const isCollapsed = ref(false)
const codeContainerRef = useTemplateRef("codeContainerRef")
const codeBlockRef = useTemplateRef("codeBlockRef")

const showMaximize = ref(false)
const highlightedCode = ref<string>("")

const languageList = ["js", "ts", ...languageMapValues]
const excludeList = new Set(["json", "bash"])

const preferredColor = usePreferredColorScheme()
const themeStore = useThemeStore()

// const isDarkMode = computed(() => {
//   if (themeStore.themeScheme === "auto") {
//     return preferredColor.value === "dark"
//   }
//   return themeStore.themeScheme === "dark"
// })

const normalizedLang = computed(() => (props.language || "plaintext").trim().toLowerCase())
const showHeader = computed(() => languageList.includes(props.language) && !excludeList.has(normalizedLang.value))
const showDownload = computed(() => ["js", "ts"].includes(normalizedLang.value))
const languageIcon = computed(() => getLanguageIcon(normalizedLang.value))
const displayLanguage = computed(() => (languageMap[normalizedLang.value] ?? normalizedLang.value).toLowerCase())

const isPreviewable = computed(() => {
  return normalizedLang.value === "html"
})

const toggleChevrons = () => {
  isChevrons.value = !isChevrons.value
}

const handleCopyCode = () => {
  copyCode(props.code)
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleCenterClick = () => {
  console.log("code block center clicked", props)
}

const handleMaximizeCode = () => {
  // emits('maximizeCode', {
  //   code: props.code,
  //   artifactType,
  //   artifactTitle,
  //   id: `temp-${lowerLang}-${Date.now()}`,
  // })
}

const downloadCode = () => {
  const lowerLang = normalizedLang.value || "txt"
  downloadCodeFile(props.code, lowerLang)
}

// 预览HTML代码
const handlePreviewCode = () => {
  if (!isPreviewable.value) return

  if (normalizedLang.value === "html") {
    emitter.emit("openHtmlArtifactsPopup", {
      code: props.code,
      visible: true,
    })
    return
  }
}

useIntersectionObserver(
  codeContainerRef,
  ([entry]) => {
    const isVisible = entry?.isIntersecting || false
    isVisible && heightCheck(codeBlockRef.value)
  },
  {
    root: document.querySelector("#message-info-view-content"),
    rootMargin: "0px 0px 0px 0px",
    threshold: 1.0,
  }
)

onMounted(async () => {
  await nextTick()
  !shouldShowChevrons.value && heightCheck(codeBlockRef.value)
  // if (!isHighlighterInitialized()) {
  //   highlighter.value = await registerHighlight()
  // }
})

onBeforeUnmount(() => {
  highlighter.value?.dispose()
})

watch(
  () => props.code,
  async () => {
    await nextTick()
    try {
      // if (highlighter.value) {
      //   highlightedCode.value = highlighter.value.codeToHtml(props.code, {
      //     lang: props.language,
      //     theme: isDarkMode.value ? "one-dark-pro" : "one-light",
      //   })
      // } else {
      //   highlightedCode.value = highlightCode(props.code, props.language)
      // }
      highlightedCode.value = highlightCode(props.code, props.language)
    } catch (err) {
      console.error("Highlight failed:", err)
      highlightedCode.value = highlightCode(props.code, props.language)
    }
  },
  { immediate: true }
)

// watch(isDarkMode, async () => {
//   disposeHighlighter()
//   highlighter.value = await registerHighlight()
//   if (highlighter.value) {
//     highlightedCode.value = highlighter.value.codeToHtml(props.code, {
//       lang: props.language,
//       theme: isDarkMode.value ? "one-dark-pro" : "one-light",
//     })
//   }
// })
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
  min-height: 32px;
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
    min-height: 32px;
    height: 32px;
    // .icon-slot {
    //   display: inline-flex;
    //   align-items: center;
    //   justify-content: center;
    // }
    .header-left,
    .header-right {
      min-width: 72px;
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
    // min-height: 40px;
    transition:
      height 180ms ease,
      max-height 180ms ease;
  }

  .collapsed {
    height: 0px;
    // display: none;
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

/* 代码块骨架屏 */
.code-skeleton-wrapper {
  min-height: 60px;
}

.code-skeleton {
  padding: 12px;
  min-height: 60px;

  .skeleton-line {
    height: 14px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0.06) 75%);
    background-size: 200% 100%;
    border-radius: 2px;
    margin-bottom: 8px;
    animation: skeleton-loading 1.5s ease-in-out infinite;

    &.skeleton-line-short {
      width: 60%;
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 优化：移除 content-visibility 以减少 CLS */
/* .code-block-container {
  contain: content;
  content-visibility: auto;
  contain-intrinsic-size: 320px 180px;
} */
</style>
