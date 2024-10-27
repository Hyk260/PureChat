<template>
  <template v-for="item in decodeText(text)" :key="item">
    <span v-if="item.name === 'text'">
      <!-- 链接 -->
      <AnalysisUrl v-if="link" :text="item.text" />
      <!-- 文本 -->
      <template v-else>
        {{ item.text }}
      </template>
    </span>
    <!-- 表情包 -->
    <img
      v-else-if="item.name === 'img'"
      draggable="false"
      class="emoji"
      :src="getAssetsFile(item.localSrc)"
      alt="表情包"
    />
  </template>
</template>

<script setup>
import { getAssetsFile } from "../utils/utils";
import { decodeText } from "@/utils/chat/index";
import AnalysisUrl from "../components/AnalysisUrl.vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  // @用户列表
  atUserList: {
    type: Array,
    default: () => []
  },
  link: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.emoji {
  width: 23px;
  vertical-align: sub;
}
</style>
