import { describe, it, expect, vi, beforeEach } from "vitest"
import { transformContent } from "../transformContent"
import { convertBlobUrlToDataUrl, safeParseJSON } from "@pure/utils"
import type { DB_Message } from "@pure/database/schemas"

vi.mock("@pure/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@pure/utils")>()
  return {
    ...actual,
    convertBlobUrlToDataUrl: vi.fn(),
    safeParseJSON: vi.fn(),
  }
})

const mockedConvertBlobUrlToDataUrl = convertBlobUrlToDataUrl as vi.Mock
const mockedSafeParseJSON = safeParseJSON as vi.Mock

describe("transformContent", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedConvertBlobUrlToDataUrl.mockResolvedValue("data:image/jpeg;base64,test")
    mockedSafeParseJSON.mockImplementation((input) => {
      try {
        return JSON.parse(input)
      } catch {
        return undefined
      }
    })
  })

  it("应该对空数组返回空数组", async () => {
    const result = await transformContent([])
    expect(result).toEqual([])
  })

  it("应该对 null 或 undefined 输入返回空数组", async () => {
    // @ts-expect-error 测试无效输入
    expect(await transformContent(null)).toEqual([])
    // @ts-expect-error 测试无效输入
    expect(await transformContent(undefined)).toEqual([])
    // @ts-expect-error 测试无效输入
    expect(await transformContent("not an array")).toEqual([])
  })

  it("应该排除带有 isTimeDivider、isDeleted、isRevoked 标志的消息", async () => {
    const messages: DB_Message[] = [
      { type: "TIMTextElem", isTimeDivider: true, isDeleted: false, isRevoked: false } as DB_Message,
      { type: "TIMTextElem", isTimeDivider: false, isDeleted: true, isRevoked: false } as DB_Message,
      { type: "TIMTextElem", isTimeDivider: false, isDeleted: false, isRevoked: true } as DB_Message,
      { type: "TIMTextElem", isTimeDivider: false, isDeleted: false, isRevoked: false, payload: { text: "valid" } } as DB_Message,
    ]

    const result = await transformContent(messages)
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({ content: "valid" })
  })

  describe("文本消息转换", () => {
    it("应该正确转换文本消息", async () => {
      const message: DB_Message = {
        type: "TIMTextElem",
        flow: "out",
        payload: { text: "Hello" },
        cloudCustomData: "",
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([
        { role: "user", content: "Hello" },
      ])
    })

    it("应该使用 cloudCustomData 中的 messageAbstract（如果存在）", async () => {
      const message: DB_Message = {
        type: "TIMTextElem",
        flow: "out",
        payload: { text: "Original" },
        cloudCustomData: JSON.stringify({ webSearch: { messageAbstract: "Abstract" } }),
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([
        { role: "user", content: "Abstract" },
      ])
    })

    it("应该将 flow: 'in' 映射为 assistant 角色", async () => {
      const message: DB_Message = {
        type: "TIMTextElem",
        flow: "in",
        payload: { text: "Hi" },
        cloudCustomData: "",
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([
        { role: "assistant", content: "Hi" },
      ])
    })
  })

  describe("自定义消息转换", () => {
    it("应该忽略 description 不是 'tool_call' 的自定义消息", async () => {
      const message: DB_Message = {
        type: "TIMCustomElem",
        payload: { description: "other", data: "", extension: "" },
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([])
    })

    it("应该转换 tool_call 自定义消息", async () => {
      const toolCallData = {
        data: {
          message: {
            choices: [{
              message: {
                tool_calls: [
                  { id: "call_123", function: { name: "get_weather" } },
                ],
              },
            }],
          },
        },
      }
      const message: DB_Message = {
        type: "TIMCustomElem",
        payload: {
          description: "tool_call",
          data: JSON.stringify(toolCallData),
          extension: "Weather is sunny",
        },
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([
        { content: "", role: "assistant", tool_calls: toolCallData.data.message.choices[0].message.tool_calls },
        { role: "tool", name: "get_weather", content: "Weather is sunny", tool_call_id: "call_123" },
      ])
    })

    it("应该处理无效的 tool_call 数据", async () => {
      const message: DB_Message = {
        type: "TIMCustomElem",
        payload: {
          description: "tool_call",
          data: "invalid json",
          extension: "",
        },
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([])
    })
  })

  describe("图像消息转换", () => {
    it("应该转换图像消息", async () => {
      const message: DB_Message = {
        type: "TIMImageElem",
        flow: "out",
        payload: {
          imageInfoArray: [{ url: "blob:http://example.com/image" }],
        },
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([
        {
          role: "user",
          content: [
            { text: "", type: "text" },
            { image_url: { detail: "auto", url: "data:image/jpeg;base64,test" }, type: "image_url" },
          ],
        },
      ])
      expect(mockedConvertBlobUrlToDataUrl).toHaveBeenCalledWith("blob:http://example.com/image")
    })

    it("应该忽略没有图像 URL 的图像消息", async () => {
      const message: DB_Message = {
        type: "TIMImageElem",
        payload: { imageInfoArray: [] },
        isTimeDivider: false,
        isDeleted: false,
        isRevoked: false,
      } as DB_Message

      const result = await transformContent([message])
      expect(result).toEqual([])
    })
  })

  it("应该忽略未知消息类型", async () => {
    const message: DB_Message = {
      type: "TIMFileElem" as any,
      payload: {},
      isTimeDivider: false,
      isDeleted: false,
      isRevoked: false,
    } as DB_Message

    const result = await transformContent([message])
    expect(result).toEqual([])
  })

  it("应该处理混合消息类型", async () => {
    const messages: DB_Message[] = [
      { type: "TIMTextElem", flow: "out", payload: { text: "Hello" }, isTimeDivider: false, isDeleted: false, isRevoked: false } as DB_Message,
      { type: "TIMImageElem", flow: "in", payload: { imageInfoArray: [{ url: "blob:test" }] }, isTimeDivider: false, isDeleted: false, isRevoked: false } as DB_Message,
      { type: "TIMCustomElem", payload: { description: "other" }, isTimeDivider: false, isDeleted: false, isRevoked: false } as DB_Message,
    ]

    const result = await transformContent(messages)
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({ role: "user", content: "Hello" })
    expect(result[1]).toMatchObject({ role: "assistant" })
  })
})