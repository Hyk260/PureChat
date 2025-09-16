import { DomEditor, IDomEditor } from "@wangeditor/editor"
import { h } from "snabbdom"

const MENTION_TYPE = "mention"
const MENTION_SELECTOR = `span[data-w-e-type="${MENTION_TYPE}"]`

interface MentionInfo {
  [key: string]: any
}

interface MentionElement {
  type: string
  value: string
  info: MentionInfo
  children: [{ text: string }]
}

interface MentionConfig {
  showModal?: (editor: IDomEditor) => void
  hideModal?: (editor: IDomEditor) => void
  pinyinSearch?: boolean
}

/**
 * 获取提及功能的配置项
 * @param {Object} editor 编辑器实例
 * @returns {Object} 提及功能配置
 */
function getMentionConfig(editor: IDomEditor): MentionConfig {
  return editor.getConfig().EXTEND_CONF?.mentionConfig || {}
}

function withMention(editor: IDomEditor) {
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
    return DomEditor.getNodeType(elem) === "mention" || isInline(elem)
  }

  editor.isVoid = (elem) => {
    return DomEditor.getNodeType(elem) === "mention" || isVoid(elem)
  }

  return editor
}

const mentionToHtml = (elem: MentionElement): string => {
  const { value = "", info = {} } = elem

  const infoStr = encodeURIComponent(JSON.stringify(info))

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
  `
    .replace(/\n\s*/g, " ")
    .trim()

  return html
}

const safeJsonParse = (str: string): MentionInfo | string => {
  try {
    return JSON.parse(str)
  } catch {
    return str
  }
}

function parseHtml(elem: Element): MentionElement {
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

const mentionStyles = {
  base: {
    borderRadius: "3px",
    padding: "0 3px",
    color: "#54b4ef",
  },
  selected: {
    border: "2px solid var(--w-e-textarea-selected-border-color)",
  },
  unselected: {
    border: "2px solid transparent",
  },
}

const getMentionStyles = (isSelected: boolean) => ({
  ...mentionStyles.base,
  ...(isSelected ? mentionStyles.selected : mentionStyles.unselected),
})

function renderMention(elem: MentionElement, _children: null, editor: IDomEditor) {
  const isSelected = DomEditor.isNodeSelected(editor, elem)
  const value = elem.value?.trim() ?? ""

  const vnode = h(
    "span",
    {
      props: {
        contentEditable: false,
      },
      style: getMentionStyles(isSelected),
    },
    `@${value}`
  )

  return vnode
}

const module = {
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

export default module
