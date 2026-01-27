import { describe, it, expect } from "vitest"
import { decodeText } from "../decodeText"

describe("decodeText 函数测试", () => {
  // 测试用的表情映射
  const emojiMap = {
    "[smile]": "smile.png",
    "[laugh]": "laugh.png",
    "[sad]": "sad.png",
  }

  it("应该正确处理纯文本输入", () => {
    const text = "Hello, world!"
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([
      {
        name: "text",
        text: "Hello, world!",
      },
    ])
  })

  it("应该正确处理单个已知表情", () => {
    const text = "[smile]"
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([
      {
        name: "img",
        localSrc: "smile.png",
      },
    ])
  })

  it("应该正确处理单个未知表情", () => {
    const text = "[unknown]"
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([
      {
        name: "text",
        text: "[",
      },
      {
        name: "text",
        text: "unknown]",
      },
    ])
  })

  it("应该正确处理文本和表情的混合输入", () => {
    const text = "Hello [smile] world [laugh]"
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([
      {
        name: "text",
        text: "Hello ",
      },
      {
        name: "img",
        localSrc: "smile.png",
      },
      {
        name: "text",
        text: " world ",
      },
      {
        name: "img",
        localSrc: "laugh.png",
      },
    ])
  })

  it("应该正确处理连续表情", () => {
    const text = "[smile][laugh][sad]"
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([
      {
        name: "img",
        localSrc: "smile.png",
      },
      {
        name: "img",
        localSrc: "laugh.png",
      },
      {
        name: "img",
        localSrc: "sad.png",
      },
    ])
  })

  it("应该正确处理左括号不匹配的情况", () => {
    const text = "Hello [smile world"
    const result = decodeText({ text, emojiMap })
    expect(result).toEqual([
      {
        name: "text",
        text: "Hello ",
      },
      {
        name: "text",
        text: "[smile world",
      },
    ])
  })

  it("应该正确处理右括号不匹配的情况", () => {
    const text = "Hello smile] world"
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([
      {
        name: "text",
        text: "Hello smile] world",
      },
    ])
  })

  it("应该正确处理空字符串输入", () => {
    const text = ""
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([])
  })

  it("应该正确处理以表情开头和结尾的输入", () => {
    const text = "[smile]Hello[world][laugh]"
    const result = decodeText({ text, emojiMap })

    expect(result).toEqual([
      {
        name: "img",
        localSrc: "smile.png",
      },
      {
        name: "text",
        text: "Hello",
      },
      {
        name: "text",
        text: "[",
      },
      {
        name: "text",
        text: "world]",
      },
      {
        name: "img",
        localSrc: "laugh.png",
      },
    ])
  })

  it("应该正确处理空值 text 参数", () => {
    const result = decodeText({ text: null, emojiMap })

    expect(result).toEqual([])
  })

  it("应该正确处理非字符串 text 参数", () => {
    const result = decodeText({ text: 123 as any, emojiMap })

    expect(result).toEqual([])
  })

  it("应该正确处理空值 emojiMap 参数", () => {
    const text = "Hello [smile] world"
    const result = decodeText({ text, emojiMap: null })

    expect(result).toEqual([
      {
        name: "text",
        text: "Hello [smile] world",
      },
    ])
  })

  it("应该正确处理非对象 emojiMap 参数", () => {
    const text = "Hello [smile] world"
    const result = decodeText({ text, emojiMap: "invalid" as any })

    expect(result).toEqual([
      {
        name: "text",
        text: "Hello [smile] world",
      },
    ])
  })
})
