import { h, onMounted, nextTick, ref, watch } from "vue";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// import bash from "highlight.js/lib/languages/bash";
import { useAppStore } from '@/stores/index';

import "highlight.js/styles/base16/default-light.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("vue", javascript);

export async function copyToClipboard(text) {
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

// 添加复制功能
export function handleCopyClick() {
  // nextTick(() => {
  //   const buttons = document.querySelectorAll(".copy-code-button");
  //   buttons.forEach((button) => {
  //     button.onclick = function (e) {
  //       const codeElement = e.currentTarget.nextElementSibling;
  //       // 检查 codeElement 是否存在
  //       if (codeElement) {
  //         const code = codeElement.innerText;
  //         copyToClipboard(code);
  //       } else {
  //         console.error("Code element not found");
  //       }
  //     };
  //   });
  // });
}
const clipboard = "nextElementSibling && (window.copyToClipboard(nextElementSibling.innerText))"
const copyButton = `<button class="copy-code-button" onclick="${clipboard}" title="copy"><span class="cuida--copy-outline"></span></button>`;

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

if (typeof window !== 'undefined') {
  window.copyToClipboard = copyToClipboard;
}

const md = markdownit({
  breaks: true, // 转换段落里的 '\n' 到 <br>。
  langPrefix: "language-", // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  typographer: true, // 启用一些语言中立的替换 + 引号美化
  highlight: highlight,
});

function newWindowLinksPlugin(md) {
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
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

// export function Markdown(props) {
//   const renderCodeBlock = (code, lang) => {
//     const codeContent = lang && hljs.getLanguage(lang)
//       ? hljs.highlight(code, { language: lang }).value
//       : markdownit().utils.escapeHtml(code);

//     return h('div', [
//       h('button', {
//         class: 'copy-code-button',
//         onClick: () => copyToClipboard(code)
//       }, [h('span', { class: 'cuida--copy-outline' })]),
//       h('pre', { class: `hljs language-${lang || ''}` }, [
//         h('code', { innerHTML: codeContent })
//       ])
//     ]);
//   };
//   // 使用 markdown-it 的 renderer 重写
//   md.renderer.rules.fence = (tokens, idx) => {
//     debugger
//     const token = tokens[idx];
//     return renderCodeBlock(token.content, token.info).el;
//   };

//   return h('div', {
//     innerHTML: md.render(props.marked),
//     class: 'markdown-body'
//   });
// }


