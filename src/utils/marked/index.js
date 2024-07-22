import { h, nextTick } from "vue";
import store from "@/store/index";
import markdownit from 'markdown-it'
import hljs from "highlight.js";
import "highlight.js/styles/base16/default-light.css";

const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>'

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
        console.log(e.target.nextElementSibling)
        copyToClipboard(code);
      };
    });
  });
}

export const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // <button class="copy-code-button">Copy</button>
        return '<pre class="hljs">' +
          '<button class="copy-code-button">' + svg + '</button>' +
          '<code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  },
});

// 自定义插件
function newWindowLinksPlugin(md) {
  // 重写链接的渲染
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // 获取链接的目标
    const target = tokens[idx].attrGet('href');
    // 添加 target="_blank" 属性
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener noreferrer'); // 安全性考虑
    return self.renderToken(tokens, idx, options);
  };
}

md.use(newWindowLinksPlugin);

export function Markdown(props) {
  const { marked } = props
  const mark = h("div", {
    innerHTML: md.render(marked),
    class: 'markdown-body'
  });
  return mark
}