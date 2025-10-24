import { DomEditor } from "@wangeditor/editor"
import { h } from "snabbdom"

import { getFileType, renderFileIcon } from "@/utils/chat"
import { encodeHTML } from "@/utils/common"
import emitter from "@/utils/mitt-bus"

import type { AttachmentElement } from "@/types"
import type { IDomEditor } from "@wangeditor/editor"

/**
 * 扩展编辑器，定义附件为inline和void元素
 * @param editor 编辑器实例
 * @returns 扩展后的编辑器
 */
const withAttachment = (editor: IDomEditor) => {
  const { isInline, isVoid } = editor

  // 定义附件为inline元素
  editor.isInline = (elem) => {
    return DomEditor.getNodeType(elem) === "attachment" || isInline(elem)
  }

  // 定义附件为void元素（无children）
  editor.isVoid = (elem) => {
    return DomEditor.getNodeType(elem) === "attachment" || isVoid(elem)
  }

  return editor
}

/**
 * 从HTML解析附件元素
 * @param domElem DOM元素
 * @returns 附件元素对象
 */
const parseHtml = (domElem: HTMLElement): AttachmentElement => {
  return {
    type: "attachment",
    link: domElem.getAttribute("data-link") || "",
    fileName: domElem.getAttribute("data-fileName") || "",
    children: [{ text: "" }],
  }
}

const parseHtmlConf = [
  {
    selector: 'span[data-w-e-type="attachment"]',
    parseElemHtml: parseHtml,
  },
]

/**
 * 将附件元素转换为HTML字符串
 * @param elem 附件元素
 * @returns HTML字符串
 */
const convertAttachmentToHtml = (elem: AttachmentElement): string => {
  const { link = "", fileName = "" } = elem

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
  `
    .replace(/\s+/g, " ")
    .trim()

  return html
}

const elemToHtmlConf = [
  {
    type: "attachment",
    elemToHtml: convertAttachmentToHtml,
  },
]

const FILE_ICON_STYLE = {
  width: "40px",
  height: "40px",
  marginLeft: "12px",
}

const FILE_NAME_STYLE = {
  color: "rgba(0, 0, 0, 0.68)",
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  width: "120px",
  textOverflow: "ellipsis",
}

const FILE_SIZE_STYLE = {
  fontWeight: "400",
  color: "#999999",
  lineHeight: "18px",
  fontSize: "12px",
}

const FILE_INFO_CONTAINER_STYLE = {
  marginLeft: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "40px",
}

const getContainerStyle = (selected: boolean) => ({
  width: "200px",
  height: "60px",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  borderRadius: "3px",
  // css var https://www.wangeditor.com/v5/theme.html
  border: selected ? "1px solid var(--w-e-textarea-selected-border-color)" : "1px solid rgb(0 0 0 / 20%)",
  userSelect: "none",
})

/**
 * 处理附件点击事件
 * @param data 附件数据
 */
const handleClick = (data: { elem: AttachmentElement }) => {
  emitter.emit("handleFileViewer", data.elem)
}

/**
 * 渲染文件附件UI
 * @param data 附件渲染所需数据
 * @returns VNode
 */
const renderFileAttachment = (data: {
  elem: AttachmentElement
  fileName: string
  fileType: string
  fileSize: string
  selected: boolean
}) => {
  const { fileName, fileType, fileSize, selected, elem } = data

  return h(
    "div",
    {
      props: { contentEditable: false },
      style: getContainerStyle(selected),
      on: { click: () => handleClick({ elem }) },
    },
    [
      h("img", {
        props: {
          src: renderFileIcon(fileType),
          alt: `${fileType}文件图标`,
        },
        style: FILE_ICON_STYLE,
      }),
      h("div", { style: FILE_INFO_CONTAINER_STYLE }, [
        h("div", { style: FILE_NAME_STYLE }, fileName),
        h("div", { style: FILE_SIZE_STYLE }, [h("span", fileSize)]),
      ]),
    ]
  )
}

/**
 * 渲染附件元素
 * @param elem 附件元素
 * @param _children 子元素（void元素无实际子元素）
 * @param editor 编辑器实例
 * @returns VNode
 */
const renderMention = (elem: AttachmentElement, _children: any, editor: IDomEditor) => {
  const { fileName = "", fileSize = "" } = elem
  const fileType = getFileType(fileName)
  const selected = DomEditor.isNodeSelected(editor, elem)

  return renderFileAttachment({ elem, fileName, fileType, fileSize, selected })
}

const renderElemConf = [
  {
    type: "attachment",
    renderElem: renderMention,
  },
]

const attachmentModule = {
  editorPlugin: withAttachment,
  renderElems: renderElemConf,
  elemsToHtml: elemToHtmlConf,
  parseElemsHtml: parseHtmlConf,
}

export default attachmentModule
