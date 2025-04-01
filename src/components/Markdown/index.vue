<template>
  <div class="markdown-body">
    <MarkdownRender />
  </div>
</template>

<script setup>
import { h, onMounted, nextTick, ref, watch } from "vue";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// import bash from "highlight.js/lib/languages/bash";
import { useAppStore } from '@/stores/index';
import "highlight.js/styles/base16/default-light.css";

defineOptions({ name: "Markdown" });

const props = defineProps({
  marked: {
    type: String,
    default: "",
  }, 
})

const clipboard = "nextElementSibling && (window.copyToClipboard(nextElementSibling.innerText))"
const copyButton = `<button class="copy-code-button" onclick="${clipboard}" title="copy"><span class="cuida--copy-outline"></span></button>`;

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("vue", javascript);

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    useAppStore().showMessage({ message: "复制成功" });
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      useAppStore().showMessage({ message: "复制成功" });
    } catch (error) {
      useAppStore().showMessage({ message: "您的浏览器不支持剪贴板API" });
    }
    document.body.removeChild(textArea);
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

function newWindowLinksPlugin(md) {
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
    return self.renderToken(tokens, idx, options);
  };
}

const md = markdownit({
  breaks: true, // 转换段落里的 '\n' 到 <br>。
  langPrefix: "language-", // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  typographer: true, // 启用一些语言中立的替换 + 引号美化
  highlight: highlight,
});

md.use(newWindowLinksPlugin);

function MarkdownRender() {
  const mark = h("div", {
    innerHTML: md.render(props.marked)
  });

  return mark;
}

if (typeof window !== 'undefined') {
  window.copyToClipboard = copyToClipboard;
}
</script>

<style lang='scss' scoped>

</style>
