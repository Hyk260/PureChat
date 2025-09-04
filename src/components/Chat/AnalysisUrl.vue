<template>
  <span @click="handleClick" v-html="processedText" />
</template>

<script setup lang="ts">
import { computed } from "vue"

import { encodeHTML } from "@/utils/common"
import { linkifyUrls } from "@/utils/linkifyUrls"

interface Props {
  text?: string
  atUserList?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  atUserList: () => [],
})

const processedText = computed(() => {
  const escapedText = encodeHTML(props.text)
  return linkifyUrls(escapedText)
})

const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.tagName === "A") {
    console.log("Link clicked:", target?.href)
  }
}
</script>

<style lang="scss">
.linkUrl {
  cursor: pointer;
  text-decoration: underline;
  word-wrap: break-word;
  color: var(--el-color-primary);

  &:hover {
    opacity: 0.8;
  }
}
</style>
