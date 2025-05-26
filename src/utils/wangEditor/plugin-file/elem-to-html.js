const escapeHtml = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const convertAttachmentToHtml = (elem) => {
  const { link = "", fileName = "" } = elem;

  const html = `
    <span 
      data-w-e-type="attachment" 
      data-w-e-is-inline 
      data-w-e-is-void 
      data-link="${encodeURIComponent(link)}" 
      data-fileName="${encodeURIComponent(fileName)}"
    >
      ${escapeHtml(fileName)}
    </span>
  `.replace(/\s+/g, ' ').trim();
  
  return html;
};

export default {
  type: "attachment",
  elemToHtml: convertAttachmentToHtml,
};
