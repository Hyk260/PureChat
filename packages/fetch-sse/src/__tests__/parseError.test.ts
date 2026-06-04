import { afterEach, describe, expect, it, vi } from "vitest"
import { getMessageError } from "../parseError"

// 模拟 Response
const createMockResponse = (body: any, ok: boolean, status: number = 200) => ({
  ok,
  status,
  json: vi.fn(async () => body),
  clone: vi.fn(function () {
    return this
  }),
  text: vi.fn(async () => JSON.stringify(body)),
  body: {
    getReader: () => {
      let done = false
      return {
        read: () => {
          if (!done) {
            done = true
            return Promise.resolve({
              value: new TextEncoder().encode(JSON.stringify(body)),
              done: false,
            })
          } else {
            return Promise.resolve({ done: true })
          }
        },
      }
    },
  },
})

// 在每次测试后清理所有模拟
afterEach(() => {
  vi.restoreAllMocks()
})

describe("getMessageError", () => {
  it("should handle regular error correctly", async () => {
    const mockResponse = createMockResponse({}, false, 500)
    mockResponse.json.mockImplementationOnce(() => {
      throw new Error("Failed to parse")
    })

    const error = await getMessageError(mockResponse as any)

    expect(error).toEqual({
      message: "response_500",
      type: 500,
    })
    expect(mockResponse.json).toHaveBeenCalled()
  })

  it("should handle timeout error correctly", async () => {
    const mockResponse = createMockResponse(undefined, false, 504)
    const error = await getMessageError(mockResponse as any)

    expect(error).toEqual({
      message: "response_504",
      type: 504,
    })
  })
})
