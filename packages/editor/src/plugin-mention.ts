import { DomEditor } from "@wangeditor/editor"
import { h } from "snabbdom"

import type { MentionConfig, MentionElement, MentionInfo } from "./types"
import type { IDomEditor } from "@wangeditor/editor"

const MENTION_TYPE = "mention"
const MENTION_SELECTOR = `span[data-w-e-type="${MENTION_TYPE}"]`

/**
 * 获取提及功能的配置项
 */
const getMentionConfig = (editor: IDomEditor): MentionConfig => {
  return editor.getConfig().EXTEND_CONF?.mentionConfig || {}
}

const withMention = (editor: IDomEditor): IDomEditor => {
  const { insertText, isInline, isVoid } = editor
  const { showModal, hideModal, pinyinSearch } = getMentionConfig(editor)

  const hide = () => {
    if (hideModal && !pinyinSearch) {
      hideModal(editor)
    }
  }

  const hideOnChange = () => {
    if (editor.selection !== null) {
      hide()
      editor.off("change", hideOnChange)
    }
  }

  const setupHideListeners = () => {
    const events = ["fullScreen", "unFullScreen", "scroll", "modalOrPanelShow", "modalOrPanelHide"]

    events.forEach((event) => editor.once(event, hide))
    editor.on("change", hideOnChange)
  }

  editor.insertText = (text: string) => {
    const elems = DomEditor.getSelectedElems(editor)
    const isSelectedVoidElem = elems.some((elem) => editor.isVoid(elem))

    if (isSelectedVoidElem) {
      insertText(text)
      return
    }

    if (text === "@") {
      setTimeout(() => {
        if (showModal) showModal(editor)
        setTimeout(setupHideListeners)
      })
    }

    insertText(text)
  }

  editor.isInline = (elem) => {
    return DomEditor.getNodeType(elem) === MENTION_TYPE || isInline(elem)
  }

  editor.isVoid = (elem) => {
    return DomEditor.getNodeType(elem) === MENTION_TYPE || isVoid(elem)
  }

  return editor
}

/** 将 MentionElement 转换为 HTML 字符串 */
const mentionToHtml = (elem: MentionElement): string => {
  const { value = "", info = {} } = elem

  const infoStr = encodeURIComponent(JSON.stringify(info))

  return `<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="${encodeURIComponent(value)}" data-info="${infoStr}">@${value.trim()}</span>`
}

/** 安全 JSON 解析 */
const safeJsonParse = (str: string): MentionInfo | string => {
  try {
    return JSON.parse(str) as MentionInfo
  } catch {
    return str
  }
}

/** 从 HTML 元素解析 MentionElement */
const parseHtml = (elem: Element): MentionElement => {
  const value = elem.getAttribute("data-value") || ""
  const rawInfo = decodeURIComponent(elem.getAttribute("data-info") || "")

  const info = safeJsonParse(rawInfo) as MentionInfo

  return {
    type: "mention",
    value,
    info,
    children: [{ text: "" }],
  }
}

/** 渲染 mention 元素 */
const renderMention = (elem: MentionElement, _children: null, editor: IDomEditor) => {
  const isSelected = DomEditor.isNodeSelected(editor, elem)
  const value = elem.value?.trim() ?? ""

  return h(
    "span",
    {
      props: {
        contentEditable: false,
      },
      style: {
        borderRadius: "3px",
        padding: "0 3px",
        color: "#54b4ef",
        border: isSelected ? "2px solid var(--w-e-textarea-selected-border-color)" : "2px solid transparent",
      },
    },
    `@${value}`
  )
}

const mentionModule = {
  editorPlugin: withMention,
  renderElems: [
    {
      type: MENTION_TYPE,
      renderElem: renderMention,
    },
  ],
  elemsToHtml: [
    {
      type: MENTION_TYPE,
      elemToHtml: mentionToHtml,
    },
  ],
  parseElemsHtml: [
    {
      selector: MENTION_SELECTOR,
      parseElemHtml: parseHtml,
    },
  ],
}

export default mentionModule
