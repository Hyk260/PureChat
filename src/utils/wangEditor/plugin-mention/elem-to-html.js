const mentionToHtml = (elem) => {
  const { value = "", info = {} } = elem;

  const infoStr = encodeURIComponent(JSON.stringify(info));

  const html = `
    <span
      data-w-e-type="mention"
      data-w-e-is-void
      data-w-e-is-inline
      data-value="${encodeURIComponent(value)}"
      data-info="${infoStr}"
    >
      @${value.trim()}
    </span>
  `.replace(/\n\s*/g, ' ').trim();

  return html;
};

const config = {
  type: "mention",
  elemToHtml: mentionToHtml,
};

export default config;
