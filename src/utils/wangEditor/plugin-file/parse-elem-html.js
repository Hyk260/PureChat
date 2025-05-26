const parseHtml = (domElem, children, editor) => ({
  type: "attachment",
  link: domElem.getAttribute("data-link") || "",
  fileName: domElem.getAttribute("data-fileName") || "",
  children: [{ text: "" }],
})

export default {
  selector: 'span[data-w-e-type="attachment"]',
  parseElemHtml: parseHtml,
};
