<template>
  <template v-for="item in decodeText(text)" :key="item">
    <span v-if="item.name === 'text'">
      <!-- 链接 -->
      <AnalysisUrl v-if="link" :text="item.text" :atUserList="atUserList" />
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
      :src="getEmojiAssetUrl(item.localSrc)"
      alt="表情包"
    />
  </template>
</template>

<script setup>
import { getEmojiAssetUrl } from "@/utils/common";
import { decodeText } from "@/utils/chat/index";
import AnalysisUrl from "../components/AnalysisUrl.vue";

defineOptions({
  name: "DynamicContent",
});

const link = true;

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  // @用户列表
  atUserList: {
    type: Array,
    default: () => [],
  },
});
</script>
