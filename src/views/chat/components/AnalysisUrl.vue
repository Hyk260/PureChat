<template>
  <AnalysisUrl :text="text" />
</template>

<script setup lang="ts">
import { h } from "vue"

import { encodeHTML } from "@/utils/common"
import linkifyUrls from "@/utils/linkifyUrls"

const { atUserList } = defineProps({
  text: {
    type: String,
    default: "",
  },
  atUserList: {
    type: Array,
    default: () => [],
  },
})

function AnalysisUrl(props) {
  const { text } = props
  const escapedUrl = encodeHTML(text)
  const linkStr = linkifyUrls(escapedUrl)
  return h("span", {
    innerHTML: linkStr,
    onClick: () => {
      console.log("onClick")
    },
  })
}
</script>

<style lang="scss" scoped>
:deep(.linkUrl) {
  cursor: pointer;
  text-decoration: underline;
  word-wrap: break-word;
  color: var(--el-color-primary);
}
</style>
