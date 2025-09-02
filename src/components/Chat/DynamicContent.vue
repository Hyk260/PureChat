<template>
  <template v-for="(item, index) in parsedContent" :key="index">
    <!-- 文本内容 -->
    <span v-if="isTextContent(item)">
      <AnalysisUrl v-if="enableLink" :text="item.text || ''" :at-user-list="atUserList" />
      <span v-else>{{ item.text }}</span>
    </span>
    <!-- 表情包 -->
    <img
      v-else-if="isEmojiContent(item)"
      draggable="false"
      class="h-23 w-23 align-sub"
      :src="getEmojiAssetUrl(item.localSrc || '')"
      alt="表情包"
    />
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue"

import AnalysisUrl from "@/components/Chat/AnalysisUrl.vue"
import { decodeText } from "@/utils/chat"
import { getEmojiAssetUrl } from "@/utils/common"

interface ContentItem {
  name: "text" | "img"
  text?: string
  localSrc?: string
}

defineOptions({
  name: "DynamicContent",
})

const props = withDefaults(
  defineProps<{
    text?: string
    enableLink?: boolean
    atUserList?: string[]
  }>(),
  {
    text: "",
    enableLink: true,
    // @用户列表
    atUserList: () => [],
  }
)

const isTextContent = (item: ContentItem): boolean => item.name === "text"
const isEmojiContent = (item: ContentItem): boolean => item.name === "img"

const parsedContent = computed<ContentItem[]>(() => {
  try {
    return decodeText(props.text)
  } catch (error) {
    console.error("Failed to parse content:", error)
    return [{ name: "text", text: props.text }]
  }
})
</script>
