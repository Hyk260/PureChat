import { h, nextTick } from "vue";
import store from "@/store/index";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// import bash from "highlight.js/lib/languages/bash";

import "highlight.js/styles/base16/default-light.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("vue", javascript);

const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>';

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
export function handleCopyClick() {
  nextTick(() => {
    const buttons = document.querySelectorAll(".copy-code-button");
    buttons.forEach((button) => {
      button.onclick = function (e) {
        const codeElement = e.currentTarget.nextElementSibling;
        // 检查 codeElement 是否存在
        if (codeElement) {
          const code = codeElement.innerText;
          copyToClipboard(code);
        } else {
          console.error("Code element not found");
        }
      };
    });
  });
}

const copyButton = `<button class="copy-code-button" title="copy">${svg}</button>`;

function highlight(str, lang) {
  // const hljsAuto = hljs.highlightAuto(code, []);
  // console.log(hljsAuto);
  if (str && hljs.getLanguage(lang)) {
    let codeContent = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
    return `<pre class="hljs language-${lang ? lang : ""}">${copyButton}<code>${codeContent}</code></pre>`;
  } else {
    return `<pre class="hljs">${copyButton}<code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
}

const md = markdownit({
  breaks: true, // 转换段落里的 '\n' 到 <br>。
  langPrefix: "language-", // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  typographer: true, // 启用一些语言中立的替换 + 引号美化
  highlight: highlight,
});

// 自定义插件
function newWindowLinksPlugin(md) {
  // 重写链接的渲染
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // 获取链接的目标
    const target = tokens[idx].attrGet("href");
    // 添加 target="_blank" 属性
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer"); // 安全性考虑
    return self.renderToken(tokens, idx, options);
  };
}

md.use(newWindowLinksPlugin);

export function Markdown(props) {
  const { marked } = props;
  if (typeof marked !== 'string') {
    console.warn('The "marked" prop should be a string');
    return null;
  }
  const mark = h("div", {
    innerHTML: md.render(marked),
    class: "markdown-body",
  });

  return mark;
}
