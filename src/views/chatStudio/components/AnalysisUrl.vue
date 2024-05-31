<template>
  <AnalysisUrl :text="text" />
</template>
<!-- <AnalysisUrlCopy :text="text" /> -->
<script setup>
import { h } from "vue";
import { html2Escape } from "../utils/utils";
import linkifyUrls from "@/utils/linkifyUrls";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});

function AnalysisUrl(props) {
  const { text } = props;
  const escapedUrl = html2Escape(text);
  const linkStr = linkifyUrls(escapedUrl);
  return h("span", { innerHTML: linkStr, onClick: () => {} });
}

function AnalysisUrlCopy(props) {
  const { text } = props;
  const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|,|:|;|\+|%|#)+)/g;
  const urls = text.match(reg);
  if (!urls) return text;
  const htmlStr = urls.reduce((acc, url) => {
    const escapedUrl = html2Escape(url);
    const link = `<a data-link="${escapedUrl}" href="${escapedUrl}" class="linkUrl" target="_blank">${escapedUrl}</a>`;
    return acc.replace(url, link);
  }, text);
  return h("span", { innerHTML: htmlStr, onClick: () => {} });
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
