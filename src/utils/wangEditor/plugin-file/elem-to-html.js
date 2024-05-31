/**
 * 生成 附件 元素的 HTML
 * @param elem 附件元素，即上文的 myResume
 * @param childrenHtml 子节点的 HTML 代码，void 元素可忽略
 * @returns “附件”元素的 HTML 字符串
 */
function mentionToHtml(elem, childrenHtml) {
  const { link = "", fileName = "" } = elem;
  const html = `<span data-w-e-type="attachment" data-w-e-is-inline data-w-e-is-void data-link="${link}" data-fileName="${fileName}">${fileName}</span>`;
  return html;
}
const config = {
  type: "attachment",
  elemToHtml: mentionToHtml,
};

export default config;
