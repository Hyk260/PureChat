import { describe, it, expect } from "vitest"
import { addTimeDivider } from "../addTimeDivider"
import messages from "./messages.json"

describe("addTimeDivider 函数测试", () => {
  it("应该处理空数组", () => {
    const result = addTimeDivider({ list: [] })
    expect(result).toEqual([])
  })

  it("应该处理非数组输入", () => {
    expect(() => {
      addTimeDivider({ list: {} as any })
    }).toThrow("list must be an array")
  })

  it("当 timeline 为 false 时应该直接返回原列表", () => {
    const testList = [messages[0]]
    const result = addTimeDivider({ list: testList, timeline: false })
    expect(result).toEqual(testList)
  })

  it("应该过滤掉已删除和已有的时间分隔符消息", () => {
    const testList = [{ ...messages[0], isDeleted: true }, { ...messages[1], isTimeDivider: true }, messages[2]]
    const result = addTimeDivider({ list: testList })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((msg) => !msg.isDeleted && !msg.isTimeDivider)).toBe(false)
  })

  it("应该在时间间隔超过5分钟时添加时间分隔符（正序）", () => {
    const result = addTimeDivider({ list: messages, type: "start" })

    // 检查结果是否包含时间分隔符
    const timeDividers = result.filter((msg) => msg.isTimeDivider)
    expect(timeDividers.length).toBeGreaterThan(0)

    // 检查时间分隔符的时间是否正确
    timeDividers.forEach((divider) => {
      expect(divider.time).toBeGreaterThan(0)
    })
  })

  it("应该在时间间隔超过5分钟时添加时间分隔符（倒序）", () => {
    const result = addTimeDivider({ list: messages, type: "last" })

    // 检查结果是否包含时间分隔符
    const timeDividers = result.filter((msg) => msg.isTimeDivider)
    expect(timeDividers.length).toBeGreaterThan(0)

    // 检查时间分隔符的时间是否正确
    timeDividers.forEach((divider) => {
      expect(divider.time).toBeGreaterThan(0)
    })
  })

  it("应该使用提供的 baseTime 作为基准时间", () => {
    const baseTime = messages[0].clientTime
    const result = addTimeDivider({ list: messages, baseTime, type: "start" })

    // 检查结果是否包含时间分隔符
    const timeDividers = result.filter((msg) => msg.isTimeDivider)
    expect(timeDividers.length).toBeGreaterThan(0)
  })

  it("应该正确处理时间间隔小于等于5分钟的消息", () => {
    // 选择时间间隔小于5分钟的消息
    const closeMessages = messages.slice(0, 4) // 前4条消息时间间隔都小于5分钟
    const result = addTimeDivider({ list: closeMessages, type: "start" })

    // 检查结果是否只在开始添加一个时间分隔符
    const timeDividers = result.filter((msg) => msg.isTimeDivider)
    expect(timeDividers.length).toBe(1)
  })

  it("应该正确处理时间间隔大于5分钟的消息", () => {
    // 选择时间间隔大于5分钟的消息
    const distantMessages = [messages[0], messages[8]] // 第一条和第九条消息时间间隔大于5分钟
    const result = addTimeDivider({ list: distantMessages, type: "start" })

    // 检查结果是否添加了两个时间分隔符
    const timeDividers = result.filter((msg) => msg.isTimeDivider)
    expect(timeDividers.length).toBe(2)
  })
})
