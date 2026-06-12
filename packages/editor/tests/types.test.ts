import { describe, it, expect } from "vitest"

describe("types", () => {
  it("should export MentionConfig type", async () => {
    const types = await import("../src/types")
    // Type check - these interfaces should exist
    const config: types.MentionConfig = {
      showModal: () => {},
      hideModal: () => {},
      pinyinSearch: true,
    }
    expect(config.pinyinSearch).toBe(true)
  })

  it("should export AttachmentElement type", async () => {
    const types = await import("../src/types")
    const elem: types.AttachmentElement = {
      type: "attachment",
      link: "https://example.com/file.pdf",
      fileName: "document.pdf",
      fileSize: "1.2MB",
      children: [{ text: "" }],
    }
    expect(elem.type).toBe("attachment")
  })

  it("should export MentionElement type", async () => {
    const types = await import("../src/types")
    const elem: types.MentionElement = {
      type: "mention",
      value: "testuser",
      info: { id: "123" },
      children: [{ text: "" }],
    }
    expect(elem.type).toBe("mention")
  })

  it("should export EditorConfigOptions type", async () => {
    const types = await import("../src/types")
    const opts: types.EditorConfigOptions = {
      placeholder: "test",
      mentionConfig: { pinyinSearch: false },
    }
    expect(opts.placeholder).toBe("test")
  })
})
