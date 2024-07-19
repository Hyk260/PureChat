import { h, nextTick } from "vue";
import store from "@/store/index";
import markdownit from 'markdown-it'
import hljs from "highlight.js";
import "highlight.js/styles/base16/default-light.css";

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    store.commit("showMessage", { message: "复制成功" });
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      store.commit("showMessage", { message: "复制成功" });
    } catch (error) {
      store.commit("showMessage", { message: "您的浏览器不支持剪贴板API" });
    }
    document.body.removeChild(textArea);
  }
}

// 添加复制功能
export function addCopyButton() {
  nextTick(() => {
    const buttons = document.querySelectorAll(".copy-code-button");
    buttons.forEach((button) => {
      button.onclick = function (e) {
        const code = e.target.nextElementSibling.innerText;
        copyToClipboard(code);
      };
    });
  });
}

export const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><button class="copy-code-button">Copy</button><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

export function Markdown(props) {
  const { marked } = props
  const mark = h("div", {
    innerHTML: md.render(marked),
    class: 'markdown-body'
  });
  return mark
}