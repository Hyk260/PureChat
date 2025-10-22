import { useAppStore } from "@/stores/modules/app"

import type { DB_Message } from "@/database/schemas/message"

const duration = 5 * 60

// 若当前消息与上一条消息间隔超过5分钟，会进行新的时间戳展示，否则归为上一个聊天单元。
const isInFiveTime = (curTime: number, baseTime: number) => {
  return Math.abs(curTime - baseTime) <= duration
}

// start last
export const getBaseTime = (list: DB_Message[], type = "start") => {
  if (!list.length) return 0
  let time = 0
  if (type === "start") {
    time = list.find((t) => t.isTimeDivider)?.time || 0
  } else {
    time = list.findLast((t) => t.isTimeDivider)?.time || 0
  }
  return time
}

/**
 * 根据指定的持续时间向列表中添加时间分隔符。
 * 当列表中连续项目之间的时间间隔超过指定的持续时间时，将添加时间分隔符。
 * @param {DB_Message[]} list - 要添加时间分隔符的项目列表。
 * @param {number} [baseTime=0] - 用于计算时间间隔的基准时间。如果未提供，则默认为0。
 * @param {string} [type="start"] - 时间分隔符的位置。可以是"start"或"last"。默认为"start"。
 */
export const addTimeDivider = (list: DB_Message[], baseTime: number = 0, type: string = "start"): DB_Message[] => {
  if (!useAppStore().timeline) return list
  if (!Array.isArray(list)) {
    throw new Error("list must be an array")
  }

  let _baseTime = baseTime

  const validMessages = list.filter((t) => !t.isTimeDivider && !t.isDeleted)

  if (!validMessages.length) return []

  const reducer = (acc: DB_Message[], cur: DB_Message) => {
    const curTime = cur.clientTime
    if (isInFiveTime(curTime, _baseTime)) {
      return [...acc, cur]
    } else {
      _baseTime = curTime
      return [...acc, { isTimeDivider: true, time: curTime }, cur]
    }
  }

  return type === "start" ? validMessages.reduce(reducer, []) : validMessages.reduceRight(reducer, [])
}
