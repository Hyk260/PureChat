/**
 * 生成 附件 元素的 HTML
 * @param elem 附件元素
 * @returns 附件元素的 HTML 字符串
 */
function mentionToHtml(elem) {
  const { link = "", fileName = "" } = elem;
  const html = `<span data-w-e-type="attachment" data-w-e-is-inline data-w-e-is-void data-link="${link}" data-fileName="${fileName}">${fileName}</span>`;
  return html;
}

const config = {
  type: "attachment",
  elemToHtml: mentionToHtml,
};

export default config;
