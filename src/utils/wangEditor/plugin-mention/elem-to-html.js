// 生成 html 的函数
function mentionToHtml(elem, childrenHtml) {
  const { value = "", info = {} } = elem;
  const infoStr = encodeURIComponent(JSON.stringify(info));
  return `<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="${value}" data-info="${infoStr}">@${value}</span>`;
}

const config = {
  type: "mention",
  elemToHtml: mentionToHtml,
};

export default config;
