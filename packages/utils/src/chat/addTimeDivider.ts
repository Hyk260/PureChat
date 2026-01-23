import type { DB_Message } from "@pure/database/schemas"

const duration = 5 * 60 // 5分钟，单位：秒

/**
 * 检查两个时间戳之间的间隔是否在5分钟内
 * @param {number} curTime - 当前时间戳
 * @param {number} baseTime - 基准时间戳
 * @returns {boolean} 是否在5分钟内
 */
const isInFiveTime = (curTime: number, baseTime: number): boolean => {
  return Math.abs(curTime - baseTime) <= duration
}

/**
 * 获取列表中第一个或最后一个时间分隔符的时间戳
 * @param {DB_Message[]} list - 消息列表
 * @param {"start" | "last"} type - 查找类型："start" 或 "last"
 * @returns {number} 时间戳
 */
export const getBaseTime = (list: DB_Message[], type: "start" | "last" = "start"): number => {
  if (!list.length) return 0

  if (type === "start") {
    for (const item of list) {
      if (item.isTimeDivider) {
        return item.time || 0
      }
    }
  } else {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i]?.isTimeDivider) {
        return list[i]?.time || 0
      }
    }
  }

  return 0
}

/**
 * 根据指定的持续时间向列表中添加时间分隔符。
 * 当列表中连续项目之间的时间间隔超过指定的持续时间时，将添加时间分隔符。
 */
export const addTimeDivider = ({
  list,
  baseTime = 0,
  type = "start",
  timeline = true,
}: {
  list: DB_Message[]
  baseTime?: number
  type?: "start" | "last"
  timeline?: boolean
}): DB_Message[] => {
  if (!timeline) return list

  if (!Array.isArray(list)) {
    throw new Error("list must be an array")
  }

  const validMessages = list.filter((t) => !t.isTimeDivider && !t.isDeleted)

  if (!validMessages.length) return []

  let _baseTime = baseTime
  const result: DB_Message[] = []

  if (type === "start") {
    for (const message of validMessages) {
      const curTime = message.clientTime
      if (!isInFiveTime(curTime, _baseTime)) {
        result.push({ isTimeDivider: true, time: curTime } as DB_Message)
        _baseTime = curTime
      }
      result.push(message)
    }
  } else {
    for (let i = validMessages.length - 1; i >= 0; i--) {
      const message = validMessages[i]!
      const curTime = message?.clientTime || 0
      if (!isInFiveTime(curTime, _baseTime)) {
        result.unshift({ isTimeDivider: true, time: curTime } as DB_Message)
        _baseTime = curTime
      }

      result.unshift(message)
    }
  }

  return result
}
