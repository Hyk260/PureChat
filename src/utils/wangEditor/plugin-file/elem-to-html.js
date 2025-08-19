import { encodeHTML } from "@/utils/common";

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
      ${encodeHTML(fileName)}
    </span>
  `.replace(/\s+/g, ' ').trim();

  return html;
};

export default {
  type: "attachment",
  elemToHtml: convertAttachmentToHtml,
};
