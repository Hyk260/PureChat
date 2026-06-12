import { describe, it, expect } from "vitest"
import { createEditorConfig, toolbarConfig } from "../src/config"

import type { IDomEditor } from "@wangeditor/editor"

describe("createEditorConfig", () => {
  it("should return default config when no options provided", () => {
    const { editorConfig, toolbarConfig: tb } = createEditorConfig()

    expect(editorConfig.placeholder).toBe("")
    expect(editorConfig.MENU_CONF).toEqual({ codeSelectLang: {} })
    expect(editorConfig.EXTEND_CONF).toBeDefined()
    expect(editorConfig.EXTEND_CONF!.mentionConfig).toBeDefined()
    expect(editorConfig.EXTEND_CONF!.mentionConfig!.pinyinSearch).toBe(true)
    expect(tb).toBe(toolbarConfig)
  })

  it("should set placeholder from options", () => {
    const { editorConfig } = createEditorConfig({ placeholder: "请输入..." })

    expect(editorConfig.placeholder).toBe("请输入...")
  })

  it("should merge mentionConfig options", () => {
    const showModal = (_: IDomEditor) => {}
    const hideModal = (_: IDomEditor) => {}

    const { editorConfig } = createEditorConfig({
      mentionConfig: { showModal, hideModal, pinyinSearch: false },
    })

    expect(editorConfig.EXTEND_CONF!.mentionConfig!.showModal).toBe(showModal)
    expect(editorConfig.EXTEND_CONF!.mentionConfig!.hideModal).toBe(hideModal)
    expect(editorConfig.EXTEND_CONF!.mentionConfig!.pinyinSearch).toBe(false)
  })

  it("should have correct hoverbarKeys", () => {
    const { editorConfig } = createEditorConfig()

    expect(editorConfig.hoverbarKeys).toEqual({
      link: { menuKeys: ["editLink", "unLink", "viewLink"] },
      image: { menuKeys: [] },
    })
  })
})
