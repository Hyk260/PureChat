import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/base16/default-light.css";

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "js";
      return hljs.highlight(code, { language }).value;
    },
  })
);

export function fnMarked(markdownString) {
  return marked.parse(markdownString);
}