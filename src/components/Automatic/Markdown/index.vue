<template>
  <div class="markdown-body" @click="handleMarkdownClick" v-html="renderedMarkdown"></div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import MarkdownRenderer from "./markdown-renderer";

defineOptions({ name: "Markdown" });

const props = defineProps({
  marked: {
    type: [String, Object],
    default: "",
  },
  cloudCustomData: {
    type: Object,
    default: () => ({}),
  },
});

const webSearchResult = computed(() => {
  return props.cloudCustomData?.messageReply?.webSearchResult || [];
});

const renderedMarkdown = ref("");

const renderMarkdownContent = () => {
  const renderer = new MarkdownRenderer({
    webSearchResults: webSearchResult.value,
  });
  renderedMarkdown.value = renderer.render(props.marked, webSearchResult.value);
};

watch([() => props.marked, webSearchResult], renderMarkdownContent, { immediate: true });

function handleMarkdownClick() {
  console.log("webSearchResult:", webSearchResult.value);
  console.log("marked:", props.marked);
}
</script>

<style lang="scss" scoped></style>
