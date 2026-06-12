import { DomEditor, type IDomEditor } from "@wangeditor/editor"

/**
 * Ctrl/Meta + Enter 换行插件
 * 阻止默认发送行为，改为插入换行
 */
const withCtrlEnter = (editor: IDomEditor): IDomEditor => {
  const { insertBreak } = editor

  setTimeout(() => {
    const { $textArea } = DomEditor.getTextarea(editor)
    if ($textArea === null) return

    $textArea.on("keydown", (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      const isCtrl = keyboardEvent.ctrlKey || keyboardEvent.metaKey
      if (keyboardEvent.key === "Enter" && isCtrl) {
        editor.insertBreak()
      }
    })
  })

  editor.insertBreak = () => {
    const event = window.event as KeyboardEvent | undefined
    const isCtrl = event ? event.ctrlKey || event.metaKey : false
    if (isCtrl) {
      insertBreak()
    }
  }

  return editor
}

const ctrlEnterModule = {
  editorPlugin: withCtrlEnter,
}

export default ctrlEnterModule
