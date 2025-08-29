<template>
  <template v-for="item in decodeText(text)" :key="item">
    <span v-if="item.name === 'text'">
      <!-- 链接 -->
      <AnalysisUrl v-if="link" :text="item.text || ''" :at-user-list="atUserList" />
      <!-- 文本 -->
      <template v-else>
        {{ item.text }}
      </template>
    </span>
    <!-- 表情包 -->
    <img
      v-else-if="item.name === 'img'"
      draggable="false"
      class="h-23 w-23 align-sub"
      :src="getEmojiAssetUrl(item.localSrc || '')"
      alt="表情包"
    />
  </template>
</template>

<script setup lang="ts">
import type { PropType } from "vue"

import { decodeText } from "@/utils/chat"
import { getEmojiAssetUrl } from "@/utils/common"

import AnalysisUrl from "./AnalysisUrl.vue"

defineOptions({
  name: "DynamicContent",
})

const link = true

defineProps({
  text: {
    type: String,
    default: "",
  },
  // @用户列表
  atUserList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
</script>
