import { describe, it, expect, vi } from "vitest"

// vi.mock is hoisted, must define mock inline
const { getTextareaMock } = vi.hoisted(() => ({
  getTextareaMock: vi.fn(),
}))

vi.mock("@wangeditor/editor", () => ({
  DomEditor: {
    getTextarea: getTextareaMock,
  },
}))

import ctrlEnterModule from "../src/plugin-ctrl-enter"

describe("plugin-ctrl-enter", () => {
  it("should export editorPlugin", () => {
    expect(ctrlEnterModule.editorPlugin).toBeDefined()
    expect(typeof ctrlEnterModule.editorPlugin).toBe("function")
  })

  it("should preserve original insertBreak", () => {
    getTextareaMock.mockReturnValue({ $textArea: null })

    const originalInsertBreak = vi.fn()
    const editor = {
      insertBreak: originalInsertBreak,
    } as any

    ctrlEnterModule.editorPlugin(editor)

    // Without ctrl key, insertBreak should not call original (for Enter without Ctrl)
    expect(editor.insertBreak).not.toBe(originalInsertBreak)
  })

  it("should call original insertBreak with ctrlKey", () => {
    const originalInsertBreak = vi.fn()
    const editor = {
      insertBreak: originalInsertBreak,
    } as any

    // Simulate Ctrl+Enter via window.event
    ;(globalThis as any).window = {
      event: { ctrlKey: true, metaKey: false, key: "Enter" },
    }

    ctrlEnterModule.editorPlugin(editor)
    editor.insertBreak()

    expect(originalInsertBreak).toHaveBeenCalled()

    // Cleanup
    delete (globalThis as any).window
  })
})
