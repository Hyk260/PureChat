<template>
  <template v-for="(item, index) in parsedContent" :key="index">
    <!-- 文本内容 -->
    <span v-if="isTextContent(item)">
      <LinkifyText v-if="enableLink" :text="item.text || ''" :atUserList="atUserList" />
      <span v-else>{{ item.text }}</span>
    </span>
    <!-- 表情包 -->
    <img
      v-else-if="isEmojiContent(item)"
      draggable="false"
      loading="lazy"
      class="lazy h-23 w-23 align-sub"
      :src="getEmojiAssetUrlSync(item.localSrc || '')"
      alt="表情包"
    />
    <!-- <img draggable="false" loading="lazy" class="h-23 w-23 align-sub" :src="item.testlocalSrc || ''" alt="表情包" /> -->
  </template>
</template>

<script setup lang="ts">
import LinkifyText from "@/components/Chat/LinkifyText.vue"
import { decodeText, type RenderDom } from "@pure/utils"
import { emojiMap } from "@/utils/emoji/emoji-map"
import { getEmojiAssetUrlSync } from "@/utils/emoji"

defineOptions({
  name: "DynamicContent",
})

interface Props {
  text?: string
  enableLink?: boolean
  atUserList?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  enableLink: true,
  // @用户列表
  atUserList: () => [],
})

const isTextContent = (item: RenderDom): boolean => item.name === "text"
const isEmojiContent = (item: RenderDom): boolean => item.name === "img"

const parsedContent = computed<RenderDom[]>(() => {
  try {
    if (__LOCAL_MODE__) return [{ name: "text", text: props.text }]
    return decodeText({ text: props.text, emojiMap })
  } catch (error) {
    console.error("Failed to parse content:", error)
    return [{ name: "text", text: props.text }]
  }
})
</script>
