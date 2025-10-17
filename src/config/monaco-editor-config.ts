import type { editor } from "monaco-editor"

export const MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  fontSize: 14,
  fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
  fontLigatures: true,
  lineNumbers: "on",
  folding: true,
  foldingStrategy: "indentation",
  minimap: { enabled: false },
  scrollbar: {
    vertical: "visible",
    horizontal: "visible",
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  },
  wordWrap: "on",
  tabSize: 2,
  insertSpaces: true,
  detectIndentation: true,
  quickSuggestions: {
    other: true,
    comments: false,
    strings: false,
  },
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  matchBrackets: "always",
  bracketPairColorization: { enabled: true },
  renderWhitespace: "selection",
  renderControlCharacters: false,
  renderLineHighlight: "line",
  contextmenu: true,
  mouseWheelZoom: true,
  smoothScrolling: true,
}

export const setupCustomContextMenu = (editor: editor.IStandaloneCodeEditor) => {
  import("monaco-editor").then((monaco) => {
    const { KeyMod, KeyCode } = monaco

    editor.addAction({
      id: "custom.copy",
      label: "复制",
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyC],
      contextMenuGroupId: "9_cutcopypaste",
      contextMenuOrder: 2,
      run: (ed) => {
        ed.getAction("editor.action.clipboardCopyAction")?.run()
      },
    })

    editor.addAction({
      id: "custom.cut",
      label: "剪切",
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyX],
      contextMenuGroupId: "9_cutcopypaste",
      contextMenuOrder: 1,
      run: (ed) => {
        ed.getAction("editor.action.clipboardCutAction")?.run()
      },
    })

    editor.addAction({
      id: "custom.paste",
      label: "粘贴",
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyV],
      contextMenuGroupId: "9_cutcopypaste",
      contextMenuOrder: 3,
      run: (ed) => {
        ed.getAction("editor.action.clipboardPasteAction")?.run()
      },
    })

    editor.addAction({
      id: "custom.selectAll",
      label: "全选",
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyA],
      contextMenuGroupId: "9_cutcopypaste",
      contextMenuOrder: 4,
      run: (ed) => {
        ed.getAction("editor.action.selectAll")?.run()
      },
    })

    editor.addAction({
      id: "custom.undo",
      label: "撤销",
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyZ],
      contextMenuGroupId: "1_modification",
      contextMenuOrder: 1,
      run: (ed) => {
        ed.getAction("undo")?.run()
      },
    })

    editor.addAction({
      id: "custom.redo",
      label: "重做",
      keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyZ],
      contextMenuGroupId: "1_modification",
      contextMenuOrder: 2,
      run: (ed) => {
        ed.getAction("redo")?.run()
      },
    })

    editor.addAction({
      id: "custom.find",
      label: "查找",
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyF],
      contextMenuGroupId: "4_search",
      contextMenuOrder: 1,
      run: (ed) => {
        ed.getAction("actions.find")?.run()
      },
    })

    editor.addAction({
      id: "custom.replace",
      label: "替换",
      keybindings: [KeyMod.CtrlCmd | KeyCode.KeyH],
      contextMenuGroupId: "4_search",
      contextMenuOrder: 2,
      run: (ed) => {
        ed.getAction("editor.action.startFindReplaceAction")?.run()
      },
    })

    editor.addAction({
      id: "custom.format",
      label: "格式化文档",
      keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyF],
      contextMenuGroupId: "1_modification",
      contextMenuOrder: 3,
      run: (ed) => {
        ed.getAction("editor.action.formatDocument")?.run()
      },
    })

    editor.addAction({
      id: "custom.commentLine",
      label: "切换行注释",
      keybindings: [KeyMod.CtrlCmd | KeyCode.Slash],
      contextMenuGroupId: "1_modification",
      contextMenuOrder: 4,
      run: (ed) => {
        ed.getAction("editor.action.commentLine")?.run()
      },
    })

    hideBuiltInContextMenuItems()
  })
}

export const hideBuiltInContextMenuItems = () => {
  const actionsToHide = [
    "editor.action.clipboardCopyAction",
    "editor.action.clipboardCutAction",
    "editor.action.clipboardPasteAction",
    "editor.action.selectAll",
    "undo",
    "redo",
    "actions.find",
    "editor.action.startFindReplaceAction",
    "editor.action.formatDocument",
    "editor.action.commentLine",
  ]

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.classList.contains("monaco-menu-container")) {
          const menuItems = node.querySelectorAll(".monaco-action")
          menuItems.forEach((item) => {
            const actionId = item.getAttribute("data-command")
            if (actionId && actionsToHide.includes(actionId)) {
              ;(item as HTMLElement).style.display = "none"
            }
          })
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}
