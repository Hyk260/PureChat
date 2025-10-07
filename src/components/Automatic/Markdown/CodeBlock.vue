<template>
  <div class="code-block-wrapper" :class="{ 'with-header': showHeader }">
    <div v-if="showHeader" class="code-header">
      <div class="collapse-button flex-c" @click.stop="isCollapsed = !isCollapsed">
        <ChevronRight v-if="isCollapsed" :size="14" />
        <ChevronDown v-else :size="14" />
      </div>
      <div>
        <span class="icon-slot" v-html="languageIcon" />
        <span class="code-language">{{ language }}</span>
      </div>
      <div class="copy-button flex-c" :class="{ copied: isCopied }" title="copy" @click.stop="copyCode">
        <Check v-if="isCopied" :size="14" />
        <Copy v-else :size="14" />
      </div>
    </div>
    <div class="code-content" :class="{ collapsed: isCollapsed }" v-html="highlightedCode"></div>
  </div>
</template>

<script setup lang="ts">
import { Check, ChevronDown, ChevronRight, Copy } from "lucide-vue-next"

import { getLanguageIcon, languageMapValues } from "@/utils/languageIcon"

import { MarkdownRenderer } from "./markdown-renderer"

interface Props {
  code: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: "plaintext",
})

const isCopied = ref(false)
const isCollapsed = ref(false)
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
  .code-content {
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

    .copy-button,
    .collapse-button {
      cursor: pointer;
      border-radius: 4px;
      width: 24px;
      height: 24px;

      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }

  .code-content {
    background: transparent !important;
  }

  .collapsed {
    height: 0px;
  }
}
</style>
