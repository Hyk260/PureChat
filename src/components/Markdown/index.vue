<template>
  <MarkdownRender />
</template>

<script setup>
import { useClipboard } from "@vueuse/core";
import { useAppStore } from "@/stores/index";
import { convertToMarkdownFootnotes } from "./utils";
// import { mapWebSearchResults } from '@/config/prompts';
import markdownit from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// import bash from "highlight.js/lib/languages/bash";
// import references from '@/ai/webSearchProvider/test.json';
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
const copyButton = `<button class="copy-code-button" onclick="${clipboard}" title="copy"><span class="cuida--copy-outline"></span></button>`;

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

// const webSearch = mapWebSearchResults(
//   // props.cloudCustomData
//   references.results
// );

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

const createMarkdownParser = () => {
  const md = markdownit({
    breaks: true, // 转换段落里的 '\n' 到 <br>。
    langPrefix: "language-", // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
    typographer: true, // 启用一些语言中立的替换 + 引号美化
    highlight: highlight,
  });

  md.use(markdownItFootnote);

  // ======== 自定义脚注规则 ========
  // 脚注引用样式 (正文中的 [^1] 样式)
  md.renderer.rules.footnote_ref = (tokens, idx) => {
    const n = Number(tokens[idx].meta.id + 1).toString();
    const data = webSearchResult.value?.find((t) => t.id == n);
    if (data?.sourceUrl) {
      return `<sup class="footnote-ref"><a href="${data.sourceUrl}">[${n}]</a></sup>`;
    } else {
      return `<sup class="footnote-ref">[${n}]</sup>`;
    }
  };

  // 脚注容器 (底部脚注列表)
  md.renderer.rules.footnote_block_open = () => `
    <section class="footnotes">
      <h2 class="footnotes-title">
        参考文献
      </h2>
      <ol class="footnotes-list">
  `;
  md.renderer.rules.footnote_block_close = () => `</ol></section> `;

  // 单个脚注项
  md.renderer.rules.footnote_open = () => `<li class="footnote-item">`;

  md.renderer.rules.footnote_close = () => "</li>\n";

  md.renderer.rules.footnote_anchor = (tokens, idx) => {
    return ''
    // const n = Number(tokens[idx].meta.id + 1).toString();
    // const data = webSearchResult.value?.find((t) => t.id == n);
    // if (data?.sourceUrl) {
    //   // \u21a9\ufe0e
    //   return `<a href="${data.sourceUrl}" target="_blank" rel="noopener noreferrer" class="footnote-backref"></a>`;
    // } else {
    //   return "";
    // }
  };

  md.renderer.rules.link_open = (tokens, idx) => {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
    return md.renderer.renderToken(tokens, idx);
  };

  const backrefLabel = "back to url";

  const epubRules = {
    footnote_ref: ["<a", '<a epub:type="noteref" target="_blank" rel="noopener noreferrer"'],
    footnote_open: ["<li", '<li epub:type="footnote"'],
    footnote_anchor: ["<a", `<a aria-label="${backrefLabel}"`],
  };

  Object.keys(epubRules).map((rule) => {
    let defaultRender = md.renderer.rules[rule];
    md.renderer.rules[rule] = (tokens, idx, options, env, self) => {
      return defaultRender(tokens, idx, options, env, self).replace(...epubRules[rule]);
    };
  });

  return md;
};

if (typeof window !== "undefined") {
  window.copyToClipboard = copyToClipboard;
}

function MarkdownRender() {
  const md = createMarkdownParser();

  let marked = props.marked;
  if (marked && webSearchResult.value?.length) {
    marked += convertToMarkdownFootnotes(webSearchResult.value);
  }
  const mark = h("div", {
    innerHTML: md.render(marked),
    class: "markdown-body",
    onclick: () => {
      console.log("webSearchResult:", webSearchResult.value);
    },
  });

  return mark;
}
</script>

<style lang="scss" scoped></style>
