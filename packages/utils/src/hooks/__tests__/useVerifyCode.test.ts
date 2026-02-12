import { describe, it, expect, beforeEach, vi } from "vitest"
import { useVerifyCode } from "../useVerifyCode"

// 模拟 setInterval 和 clearInterval
vi.useFakeTimers()

describe("useVerifyCode", () => {
  let formEl: any
  let { start, end, isDisabled, text, timer } = useVerifyCode()

  beforeEach(() => {
    // 重置状态
    ;({ start, end, isDisabled, text, timer } = useVerifyCode())
    // 清除所有计时器
    vi.clearAllTimers()
    // 模拟表单实例
    formEl = {
      validateField: vi.fn(),
    }
  })

  it("should return early when formEl is undefined", async () => {
    await start(undefined, "phone")
    expect(isDisabled.value).toBe(false)
    expect(text.value).toBe("")
  })

  it("should not start timer when form validation fails", async () => {
    // 模拟表单验证失败
    formEl.validateField.mockImplementation((prop: string, callback: (error: string) => void) => {
      callback("Validation failed")
    })

    await start(formEl, "phone")
    expect(isDisabled.value).toBe(false)
    expect(text.value).toBe("")
    expect(timer.value).toBe(null)
  })

  it("should start timer when form validation passes", async () => {
    // 模拟表单验证通过
    formEl.validateField.mockImplementation((prop: string, callback: (error: string) => void) => {
      callback("")
    })

    await start(formEl, "phone", 5)
    expect(isDisabled.value).toBe(true)
    expect(text.value).toBe("5")
    expect(timer.value).not.toBe(null)
  })

  it("should update timer text correctly", async () => {
    // 模拟表单验证通过
    formEl.validateField.mockImplementation((prop: string, callback: (error: string) => void) => {
      callback("")
    })

    await start(formEl, "phone", 3)

    // 前进 1 秒
    vi.advanceTimersByTime(1000)
    expect(text.value).toBe("2")

    // 再前进 1 秒
    vi.advanceTimersByTime(1000)
    expect(text.value).toBe("1")

    // 再前进 1 秒
    vi.advanceTimersByTime(1000)
    expect(text.value).toBe("")
    expect(isDisabled.value).toBe(false)
    expect(timer.value).toBe(null)
  })

  it("should reset timer when start is called again", async () => {
    // 模拟表单验证通过
    formEl.validateField.mockImplementation((prop: string, callback: (error: string) => void) => {
      callback("")
    })

    // 第一次调用
    await start(formEl, "phone", 5)
    expect(text.value).toBe("5")

    // 前进 2 秒
    vi.advanceTimersByTime(2000)
    expect(text.value).toBe("3")

    // 第二次调用，重置计时器
    await start(formEl, "phone", 5)
    expect(text.value).toBe("5")
  })

  it("should clear timer when end is called", async () => {
    // 模拟表单验证通过
    formEl.validateField.mockImplementation((prop: string, callback: (error: string) => void) => {
      callback("")
    })

    await start(formEl, "phone", 5)
    expect(isDisabled.value).toBe(true)
    expect(text.value).toBe("5")

    // 调用 end 函数
    end()
    expect(isDisabled.value).toBe(false)
    expect(text.value).toBe("")
    expect(timer.value).toBe(null)
  })

  it("should use default time of 60 seconds when not specified", async () => {
    // 模拟表单验证通过
    formEl.validateField.mockImplementation((prop: string, callback: (error: string) => void) => {
      callback("")
    })

    await start(formEl, "phone")
    expect(text.value).toBe("60")
  })
})
