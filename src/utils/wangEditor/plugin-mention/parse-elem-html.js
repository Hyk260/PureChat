function parseHtml(elem, children, editor) {
  const value = elem.getAttribute("data-value") || "";
  const rawInfo = decodeURIComponent(elem.getAttribute("data-info") || "");
  let info;
  try {
    info = JSON.parse(rawInfo);
  } catch (ex) {
    info = rawInfo;
  }
  return {
    type: "mention",
    value,
    info,
    children: [{ text: "" }],
  };
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="mention"]',
  parseElemHtml: parseHtml,
};

export default parseHtmlConf;
