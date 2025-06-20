<template>
  <MarkdownRender />
</template>

<script setup>
import { useClipboard } from "@vueuse/core";
import { useAppStore } from "@/stores/index";
import { prettyObject } from "@/ai/utils";
import { convertToMarkdownFootnotes, copySvg } from "./utils";
import { configureFootnoteRules, applyLinkOpenRules, applyEpubRules } from "./markdown";
import markdownit from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// import bash from "highlight.js/lib/languages/bash";
import "@/styles/highlight.scss";
import "highlight.js/styles/base16/default-light.css";

defineOptions({ name: "Markdown" });

const props = defineProps({
  marked: {
    type: String,
    default: "",
  },
  cloudCustomData: {
    type: Object,
    default: () => {},
  },
});

const appStore = useAppStore();

const webSearchResult = computed(() => {
  return props.cloudCustomData?.messageReply?.webSearchResult || [];
});

const clipboard = "nextElementSibling && (window.copyToClipboard(nextElementSibling.innerText))";
// <span class="cuida--copy-outline"></span>
const copyButton = `<button class="copy-code-button" onclick="${clipboard}" title="copy">${copySvg}</button>`;

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("vue", javascript);

const { copy, isSupported } = useClipboard();

function copyToClipboard(str) {
  if (isSupported) {
    copy(str);
    appStore.showMessage({ message: "复制成功" });
  } else {
    appStore.showMessage({ message: "您的浏览器不支持剪贴板API" });
  }
}

function highlight(str, lang) {
  // const hljsAuto = hljs.highlightAuto(code, []);
  // console.log(hljsAuto);
  if (str && hljs.getLanguage(lang)) {
    let codeContent = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
    return `<pre class="hljs language-${lang ? lang : ""}">${copyButton}<code>${codeContent}</code></pre>`;
  } else {
    return `<pre class="hljs">${copyButton}<code>${markdownit().utils.escapeHtml(str)}</code></pre>`;
  }
}

const createMarkdownParser = (options) => {
  const md = markdownit({
    breaks: true, // 转换段落里的 '\n' 到 <br>。
    langPrefix: "language-", // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
    typographer: true, // 启用一些语言中立的替换 + 引号美化
    highlight: highlight,
  });

  md.use(markdownItFootnote);
  configureFootnoteRules(md, options?.webSearchResults);
  applyLinkOpenRules(md);
  applyEpubRules(md);

  return md;
};

if (typeof window !== "undefined") {
  window.copyToClipboard = copyToClipboard;
}

function MarkdownRender() {
  const md = createMarkdownParser({
    webSearchResults: webSearchResult.value,
  });

  let content = props.marked;

  if (typeof content !== "string") {
    content = prettyObject(content);
  }

  if (content && webSearchResult.value?.length) {
    content += convertToMarkdownFootnotes(webSearchResult.value);
  }

  const mark = h("div", {
    innerHTML: md.render(content),
    class: "markdown-body",
    onclick: () => {
      console.log("webSearchResult:", webSearchResult.value);
      console.log("marked:", content);
    },
  });

  return mark;
}
</script>

<style lang="scss" scoped></style>
