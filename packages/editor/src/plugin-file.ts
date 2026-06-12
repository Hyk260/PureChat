import { DomEditor } from "@wangeditor/editor"
import { h } from "snabbdom"

import { getFileIcon, encodeHTML, getFileType } from "@pure/utils"

import type { AttachmentElement, FilePluginOptions } from "./types"
import type { IDomEditor } from "@wangeditor/editor"

const ATTACHMENT_TYPE = "attachment"
const ATTACHMENT_SELECTOR = `span[data-w-e-type="${ATTACHMENT_TYPE}"]`

const FILE_ICON_STYLE: Record<string, string> = {
  width: "40px",
  height: "40px",
  marginLeft: "12px",
}

const FILE_NAME_STYLE: Record<string, string> = {
  color: "rgba(0, 0, 0, 0.68)",
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  width: "120px",
  textOverflow: "ellipsis",
}

const FILE_SIZE_STYLE: Record<string, string> = {
  fontWeight: "400",
  color: "#999999",
  lineHeight: "18px",
  fontSize: "12px",
}

const FILE_INFO_CONTAINER_STYLE: Record<string, string> = {
  marginLeft: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "40px",
}

const FILE_CONTAINER_STYLE: Record<string, string> = {
  width: "200px",
  height: "60px",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  borderRadius: "3px",
  userSelect: "none",
}

const FILE_CONTAINER_SELECTED_BORDER = "1px solid var(--w-e-textarea-selected-border-color)"
const FILE_CONTAINER_UNSELECTED_BORDER = "1px solid rgb(0 0 0 / 20%)"

let _onFileClick: FilePluginOptions["onFileClick"]

/**
 * 设置文件附件插件选项
 */
export const setFilePluginOptions = (options: FilePluginOptions): void => {
  _onFileClick = options.onFileClick
}

/**
 * 扩展编辑器，定义附件为 inline 和 void 元素
 */
const withAttachment = (editor: IDomEditor): IDomEditor => {
  const { isInline, isVoid } = editor

  editor.isInline = (elem) => {
    return DomEditor.getNodeType(elem) === ATTACHMENT_TYPE || isInline(elem)
  }

  editor.isVoid = (elem) => {
    return DomEditor.getNodeType(elem) === ATTACHMENT_TYPE || isVoid(elem)
  }

  return editor
}

/**
 * 从 HTML 解析附件元素
 */
const parseAttachmentHtml = (domElem: HTMLElement): AttachmentElement => {
  return {
    type: ATTACHMENT_TYPE,
    link: domElem.getAttribute("data-link") || "",
    fileName: domElem.getAttribute("data-fileName") || "",
    children: [{ text: "" }],
  }
}

const parseHtmlConf = [
  {
    selector: ATTACHMENT_SELECTOR,
    parseElemHtml: parseAttachmentHtml,
  },
]

/**
 * 将附件元素转换为 HTML 字符串
 */
const convertAttachmentToHtml = (elem: AttachmentElement): string => {
  const { link = "", fileName = "" } = elem

  return `<span data-w-e-type="attachment" data-w-e-is-inline data-w-e-is-void data-link="${encodeURIComponent(link)}" data-fileName="${encodeURIComponent(fileName)}">${encodeHTML(fileName)}</span>`
}

const elemToHtmlConf = [
  {
    type: ATTACHMENT_TYPE,
    elemToHtml: convertAttachmentToHtml,
  },
]

/**
 * 获取容器样式（含选中态）
 */
const getContainerStyle = (selected: boolean): Record<string, string> => ({
  ...FILE_CONTAINER_STYLE,
  border: selected ? FILE_CONTAINER_SELECTED_BORDER : FILE_CONTAINER_UNSELECTED_BORDER,
})

/**
 * 渲染附件元素
 */
const renderAttachment = (elem: AttachmentElement, _children: unknown, editor: IDomEditor) => {
  const { fileName = "", fileSize = "" } = elem
  const fileType = getFileType(fileName)
  const selected = DomEditor.isNodeSelected(editor, elem)

  return h(
    "div",
    {
      props: { contentEditable: false },
      title: fileName,
      style: getContainerStyle(selected),
      on: {
        click: () => {
          if (_onFileClick) _onFileClick(elem)
        },
      },
    },
    [
      h("img", {
        props: {
          src: getFileIcon(fileType),
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

const renderElemConf = [
  {
    type: ATTACHMENT_TYPE,
    renderElem: renderAttachment,
  },
]

const fileModule = {
  editorPlugin: withAttachment,
  renderElems: renderElemConf,
  elemsToHtml: elemToHtmlConf,
  parseElemsHtml: parseHtmlConf,
}

export default fileModule
