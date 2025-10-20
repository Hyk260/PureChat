import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import type { editor } from 'monaco-editor'

export default defineComponent({
name: 'ChineseMonacoEditor',
components: {
VueMonacoEditor
},
setup() {
const editorRef = ref<editor.IStandaloneCodeEditor | null>(null)
let mutationObserver: MutationObserver | null = null

    // 编辑器挂载处理
    const handleEditorMount = (editor: editor.IStandaloneCodeEditor) => {
      editorRef.value = editor

      // 隐藏原有英文菜单项
      hideEnglishMenuItems()

      // 添加中文菜单项
      addChineseActions(editor)
    }

    // 隐藏原有英文菜单项
    const hideEnglishMenuItems = () => {
      // 需要隐藏的菜单项标签
      const menuItemsToHide = [
        'Cut', 'Copy', 'Paste', 'Command Palette',
        'Undo', 'Redo', 'Find', 'Replace',
        'Select All', 'Format Document',
        'Toggle Line Comment', 'Toggle Block Comment'
      ]

      // 创建 MutationObserver 监听 DOM 变化
      mutationObserver = new MutationObserver(() => {
        const menuItems = document.querySelectorAll('.monaco-menu .monaco-action-bar .action-label')

        menuItems.forEach((item) => {
          const text = item.textContent?.trim()
          if (text && menuItemsToHide.includes(text)) {
            // 隐藏菜单项的父元素
            const parentElement = item.closest('.monaco-action-bar li')
            if (parentElement) {
              (parentElement as HTMLElement).style.display = 'none'
            }
          }
        })
      })

      // 开始监听 body 的变化（右键菜单会动态添加到 body）
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    // 添加中文菜单项
    const addChineseActions = (editor: editor.IStandaloneCodeEditor) => {
      // 获取 Monaco 的 KeyMod 和 KeyCode
      const monaco = (window as any).monaco
      const { KeyMod, KeyCode } = monaco

      // 剪切
      editor.addAction({
        id: 'custom.cut',
        label: '剪切',
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyX], // Ctrl/Cmd + X
        contextMenuGroupId: '9_cutcopypaste',
        contextMenuOrder: 1,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.clipboardCutAction', null)
        }
      })

      // 复制
      editor.addAction({
        id: 'custom.copy',
        label: '复制',
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyC], // Ctrl/Cmd + C
        contextMenuGroupId: '9_cutcopypaste',
        contextMenuOrder: 2,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.clipboardCopyAction', null)
        }
      })

      // 粘贴
      editor.addAction({
        id: 'custom.paste',
        label: '粘贴',
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyV], // Ctrl/Cmd + V
        contextMenuGroupId: '9_cutcopypaste',
        contextMenuOrder: 3,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.clipboardPasteAction', null)
        }
      })

      // 全选
      editor.addAction({
        id: 'custom.selectAll',
        label: '全选',
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyA], // Ctrl/Cmd + A
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 1,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.selectAll', null)
        }
      })

      // 撤销
      editor.addAction({
        id: 'custom.undo',
        label: '撤销',
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyZ], // Ctrl/Cmd + Z
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 2,
        run: (ed) => {
          ed.trigger('keyboard', 'undo', null)
        }
      })

      // 重做
      editor.addAction({
        id: 'custom.redo',
        label: '重做',
        keybindings: [
          KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyZ, // Ctrl/Cmd + Shift + Z
          KeyMod.CtrlCmd | KeyCode.KeyY // Ctrl/Cmd + Y (Windows)
        ],
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 3,
        run: (ed) => {
          ed.trigger('keyboard', 'redo', null)
        }
      })

      // 查找
      editor.addAction({
        id: 'custom.find',
        label: '查找',
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyF], // Ctrl/Cmd + F
        contextMenuGroupId: '4_search',
        contextMenuOrder: 1,
        run: (ed) => {
          ed.trigger('keyboard', 'actions.find', null)
        }
      })

      // 替换
      editor.addAction({
        id: 'custom.replace',
        label: '替换',
        keybindings: [KeyMod.CtrlCmd | KeyCode.KeyH], // Ctrl/Cmd + H
        contextMenuGroupId: '4_search',
        contextMenuOrder: 2,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.startFindReplaceAction', null)
        }
      })

      // 格式化文档
      editor.addAction({
        id: 'custom.formatDocument',
        label: '格式化文档',
        keybindings: [
          KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyF, // Ctrl/Cmd + Shift + F
          KeyMod.Alt | KeyMod.Shift | KeyCode.KeyF // Alt + Shift + F
        ],
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 10,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.formatDocument', null)
        }
      })

      // 切换行注释
      editor.addAction({
        id: 'custom.toggleLineComment',
        label: '切换行注释',
        keybindings: [KeyMod.CtrlCmd | KeyCode.Slash], // Ctrl/Cmd + /
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 11,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.commentLine', null)
        }
      })

      // 切换块注释
      editor.addAction({
        id: 'custom.toggleBlockComment',
        label: '切换块注释',
        keybindings: [
          KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyA // Ctrl/Cmd + Shift + A
        ],
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 12,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.blockComment', null)
        }
      })

      // 命令面板
      editor.addAction({
        id: 'custom.commandPalette',
        label: '命令面板',
        keybindings: [
          KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyP, // Ctrl/Cmd + Shift + P
          KeyCode.F1 // F1
        ],
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 100,
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.quickCommand', null)
        }
      })
    }

    // 获取所有可用的 Actions（用于调试）
    const getAllActions = () => {
      if (!editorRef.value) return

      // 方法1：使用 getSupportedActions (推荐)
      const supportedActions = editorRef.value.getSupportedActions()
      console.log('Supported Actions:', supportedActions)

      // 方法2：使用私有 API（不推荐在生产环境使用）
      const privateActions = (editorRef.value as any)._actions

