/**
 * 解析 HTML 字符串，生成附件元素
 * @param domElem HTML 对应的 DOM Element
 * @param children 子节点
 * @param editor editor 实例
 * @returns 附件元素
 */
function parseHtml(domElem, children, editor) {
  const attachment = {
    type: "attachment",
    link: domElem.getAttribute("data-link") || "",
    fileName: domElem.getAttribute("data-fileName") || "",
    children: [{ text: "" }],
  };
  return attachment;
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="attachment"]',
  parseElemHtml: parseHtml,
};

export default parseHtmlConf;
