import { DomEditor } from "@wangeditor/editor"

import type { IDomEditor } from "@wangeditor/editor"

export const withCtrlEnter = (editor: IDomEditor) => {
  const { insertBreak } = editor

  setTimeout(() => {
    const { $textArea } = DomEditor.getTextarea(editor)
    if ($textArea === null) return

    $textArea.on("keydown", (event: KeyboardEvent) => {
      const isCtrl = event.ctrlKey || event.metaKey
      if (event.key === "Enter" && isCtrl) {
        editor.insertBreak()
      }
    })
  })

  editor.insertBreak = () => {
    const event = window.event as KeyboardEvent
    const isCtrl = event.ctrlKey || event.metaKey
    if (isCtrl) {
      insertBreak()
    }
  }

  return editor
}

export default {
  editorPlugin: withCtrlEnter,
}
