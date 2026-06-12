import { describe, it, expect, vi, beforeEach } from "vitest"

// Mock @wangeditor/editor and @pure/utils
vi.mock("@wangeditor/editor", () => ({
  DomEditor: {
    isNodeSelected: vi.fn(() => false),
    getNodeType: vi.fn((elem: any) => elem?.type || ""),
  },
}))

vi.mock("@pure/utils", () => ({
  getFileIcon: vi.fn((type: string) => `/icons/${type}.svg`),
  encodeHTML: vi.fn((str: string) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")),
  getFileType: vi.fn((name: string) => name.split(".").pop() || ""),
}))

import fileModule, { setFilePluginOptions } from "../src/plugin-file"

import type { AttachmentElement } from "../src/types"

describe("plugin-file", () => {
  beforeEach(() => {
    setFilePluginOptions({})
  })

  it("should export correct module shape", () => {
    expect(fileModule.editorPlugin).toBeDefined()
    expect(fileModule.renderElems).toHaveLength(1)
    expect(fileModule.elemsToHtml).toHaveLength(1)
    expect(fileModule.parseElemsHtml).toHaveLength(1)
  })

  describe("parseHtml", () => {
    it("should parse attachment element from HTML", () => {
      const { parseElemHtml } = fileModule.parseElemsHtml[0]

      const div = document.createElement("span")
      div.setAttribute("data-w-e-type", "attachment")
      div.setAttribute("data-link", "https://example.com/file.pdf")
      div.setAttribute("data-fileName", "document.pdf")

      const result = parseElemHtml(div)

      expect(result.type).toBe("attachment")
      expect(result.link).toBe("https://example.com/file.pdf")
      expect(result.fileName).toBe("document.pdf")
      expect(result.children).toEqual([{ text: "" }])
    })

    it("should handle missing attributes", () => {
      const { parseElemHtml } = fileModule.parseElemsHtml[0]

      const div = document.createElement("span")
      const result = parseElemHtml(div)

      expect(result.type).toBe("attachment")
      expect(result.link).toBe("")
      expect(result.fileName).toBe("")
    })
  })

  describe("elemToHtml", () => {
    it("should convert attachment element to HTML string", () => {
      const { elemToHtml } = fileModule.elemsToHtml[0]

      const elem: AttachmentElement = {
        type: "attachment",
        link: "https://example.com/file.pdf",
        fileName: "document.pdf",
        children: [{ text: "" }],
      }

      const html = elemToHtml(elem)

      expect(html).toContain('data-w-e-type="attachment"')
      expect(html).toContain("document.pdf")
    })
  })

  describe("renderElem", () => {
    it("should render attachment element to VNode", () => {
      const { renderElem } = fileModule.renderElems[0]

      const mockEditor = {} as any

      const elem: AttachmentElement = {
        type: "attachment",
        link: "https://example.com/file.pdf",
        fileName: "document.pdf",
        fileSize: "1.2MB",
        children: [{ text: "" }],
      }

      const vnode = renderElem(elem, null, mockEditor)

      expect(vnode).toBeDefined()
      expect(vnode.sel).toBe("div")
      expect(vnode.data?.props?.contentEditable).toBe(false)
      expect(vnode.data?.on?.click).toBeDefined()
    })

    it("should call onFileClick when set", () => {
      const onFileClick = vi.fn()
      setFilePluginOptions({ onFileClick })

      const { renderElem } = fileModule.renderElems[0]

      const mockEditor = {} as any

      const elem: AttachmentElement = {
        type: "attachment",
        link: "https://example.com/file.pdf",
        fileName: "document.pdf",
        children: [{ text: "" }],
      }

      const vnode = renderElem(elem, null, mockEditor)

      vnode.data?.on?.click()
      expect(onFileClick).toHaveBeenCalledWith(elem)
    })

    it("should not throw when onFileClick is not set", () => {
      setFilePluginOptions({})

      const { renderElem } = fileModule.renderElems[0]

      const mockEditor = {} as any

      const elem: AttachmentElement = {
        type: "attachment",
        link: "https://example.com/file.pdf",
        fileName: "document.pdf",
        children: [{ text: "" }],
      }

      const vnode = renderElem(elem, null, mockEditor)

      expect(() => vnode.data?.on?.click()).not.toThrow()
    })
  })

  describe("setFilePluginOptions", () => {
    it("should set onFileClick callback", () => {
      const onFileClick = vi.fn()

      setFilePluginOptions({ onFileClick })
      // Trigger through render to verify
      const { renderElem } = fileModule.renderElems[0]
      const vnode = renderElem(
        { type: "attachment", link: "", fileName: "", children: [{ text: "" }] },
        null,
        {} as any
      )
      vnode.data?.on?.click()
      expect(onFileClick).toHaveBeenCalled()
    })
  })
})
