import DOMPurify from "dompurify"

/**
 * 清理 SVG 内容以防止 XSS 攻击，同时保留安全的 SVG 元素和属性
 * @param content - 需要清理的 SVG 内容
 * @returns 安全可渲染的清理后 SVG 内容
 */
export const sanitizeSVGContent = (content: string): string => {
  return DOMPurify.sanitize(content, {
    FORBID_ATTR: [
      "onblur",
      "onchange",
      "onclick",
      "onerror",
      "onfocus",
      "onkeydown",
      "onkeypress",
      "onkeyup",
      "onload",
      "onmousedown",
      "onmouseout",
      "onmouseover",
      "onmouseup",
      "onreset",
      "onselect",
      "onsubmit",
      "onunload",
    ],
    FORBID_TAGS: ["embed", "link", "object", "script", "style"],
    KEEP_CONTENT: false,
    USE_PROFILES: { svg: true, svgFilters: true },
  })
}

/**
 * 清理 HTML 内容以防止 XSS 攻击
 * @param content - 需要清理的 HTML 内容
 * @returns 安全可渲染的清理后 HTML 内容
 */
export const sanitizeHTMLContent = (content: string): string => {
  return DOMPurify.sanitize(content, { ADD_ATTR: ["target"] })
}
