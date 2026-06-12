import { describe, it, expect, vi } from "vitest"

// Mock @wangeditor/editor
vi.mock("@wangeditor/editor", () => ({
  DomEditor: {
    isNodeSelected: vi.fn(() => false),
  },
}))

import mentionModule from "../src/plugin-mention"

import type { MentionElement } from "../src/types"

describe("plugin-mention", () => {
  it("should export correct module shape", () => {
    expect(mentionModule.editorPlugin).toBeDefined()
    expect(mentionModule.renderElems).toHaveLength(1)
    expect(mentionModule.elemsToHtml).toHaveLength(1)
    expect(mentionModule.parseElemsHtml).toHaveLength(1)
  })

  describe("parseHtml", () => {
    it("should parse mention element from HTML", () => {
      const { parseElemHtml } = mentionModule.parseElemsHtml[0]

      const div = document.createElement("span")
      div.setAttribute("data-w-e-type", "mention")
      div.setAttribute("data-value", "testuser")
      div.setAttribute("data-info", encodeURIComponent(JSON.stringify({ id: "123" })))

      const result = parseElemHtml(div)

      expect(result.type).toBe("mention")
      expect(result.value).toBe("testuser")
      expect(result.info).toEqual({ id: "123" })
      expect(result.children).toEqual([{ text: "" }])
    })

    it("should handle missing attributes", () => {
      const { parseElemHtml } = mentionModule.parseElemsHtml[0]

      const div = document.createElement("span")
      const result = parseElemHtml(div)

      expect(result.type).toBe("mention")
      expect(result.value).toBe("")
      expect(result.info).toBe("")
    })

    it("should handle malformed JSON in data-info", () => {
      const { parseElemHtml } = mentionModule.parseElemsHtml[0]

      const div = document.createElement("span")
      div.setAttribute("data-w-e-type", "mention")
      div.setAttribute("data-value", "user")
      div.setAttribute("data-info", encodeURIComponent("{invalid json"))

      const result = parseElemHtml(div)

      expect(result.type).toBe("mention")
      expect(result.value).toBe("user")
      expect(typeof result.info).toBe("string")
    })
  })

  describe("elemToHtml", () => {
    it("should convert mention element to HTML string", () => {
      const { elemToHtml } = mentionModule.elemsToHtml[0]

      const elem: MentionElement = {
        type: "mention",
        value: "testuser",
        info: { id: "123" },
        children: [{ text: "" }],
      }

      const html = elemToHtml(elem)

      expect(html).toContain('data-w-e-type="mention"')
      expect(html).toContain("testuser")
      expect(html).toContain('data-value="testuser"')
    })
  })

  describe("renderElem", () => {
    it("should render mention element to VNode", () => {
      const { renderElem } = mentionModule.renderElems[0]

      const mockEditor = {
        getConfig: () => ({ EXTEND_CONF: { mentionConfig: {} } }),
      } as any

      const elem: MentionElement = {
        type: "mention",
        value: "testuser",
        info: { id: "123" },
        children: [{ text: "" }],
      }

      const vnode = renderElem(elem, null, mockEditor)

      expect(vnode).toBeDefined()
      expect(vnode.sel).toBe("span")
      expect(vnode.data?.props?.contentEditable).toBe(false)
      expect(vnode.text).toBe("@testuser")
    })
  })
})
