<template>
  <div class="code-block-wrapper">
    <div class="code-header">
      <span class="code-language">{{ language }}</span>
      <el-button class="copy-button" :class="{ copied: isCopied }" @click="copyCode">
        <svg v-if="!isCopied" class="copy-icon" viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
          />
        </svg>
        <svg v-else class="check-icon" viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </el-button>
    </div>
    <div class="code-content" v-html="highlightedCode"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"

import { ElButton } from "element-plus"
import hljs from "highlight.js"

interface Props {
  code: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: "plaintext",
})

const isCopied = ref(false)

const highlightedCode = computed(() => {
  if (props.code && hljs.getLanguage(props.language)) {
    const result = hljs.highlight(props.code, {
      language: props.language,
      ignoreIllegals: true,
    })
    return `<pre class="hljs language-${props.language}"><code>${result.value}</code></pre>`
  } else {
    const escapedCode = props.code
    return `<pre class="hljs"><code>${escapedCode}</code></pre>`
  }
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

<style scoped></style>
