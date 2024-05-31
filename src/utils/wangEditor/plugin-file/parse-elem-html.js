/**
 * 解析 HTML 字符串，生成“附件”元素
 * @param domElem HTML 对应的 DOM Element
 * @param children 子节点
 * @param editor editor 实例
 * @returns “附件”元素，如上文的 myResume
 */
function parseHtml(domElem, children, editor) {
  const myResume = {
    type: "attachment",
    link: domElem.getAttribute("data-link") || "",
    fileName: domElem.getAttribute("data-fileName") || "",
    children: [{ text: "" }],
  };
  console.log(myResume);
  return myResume;
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="attachment"]',
  parseElemHtml: parseHtml,
};

export default parseHtmlConf;
