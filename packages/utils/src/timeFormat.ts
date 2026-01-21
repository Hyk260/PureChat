import dayjs, { Dayjs } from "dayjs"
import isToday from "dayjs/plugin/isToday.js"
import isYesterday from "dayjs/plugin/isYesterday.js"

dayjs.extend(isToday)
dayjs.extend(isYesterday)

/**
 * 时间格式化配置
 */
const TIME_FORMAT = "H:mm" as const
const DATE_FORMATS = {
  monthDay: "M月D日",
  fullDate: "YYYY年M月D日",
  weekday: "dddd",
  fullDateTime: "HH:mm:ss",
  monthDayTime: "MM/DD HH:mm:ss",
  fullDateTimeWithYear: "YYYY/MM/DD HH:mm:ss",
} as const

/**
 * 辅助函数：根据需要附加时间
 * @param dateStr - 日期字符串
 * @param date - dayjs 对象
 * @param includeTime - 是否包含时间
 * @returns 格式化后的字符串
 */
function appendTime(dateStr: string, date: Dayjs, includeTime: boolean): string {
  return includeTime ? `${dateStr} ${date.format(TIME_FORMAT)}` : dateStr
}

export function timeFormat(timestamp: number, includeTime = false): string {
  const now = dayjs()
  const date = dayjs(timestamp)

  // 今天（小时:分钟）
  if (date.isToday()) {
    return date.format(TIME_FORMAT)
  }

  // 昨天
  if (date.isYesterday()) {
    return appendTime("昨天", date, includeTime)
  }

  // 过去 7 天内（不包括昨天 使用星期显示）
  if (date.isAfter(now.subtract(7, "day"))) {
    return appendTime(date.format(DATE_FORMATS.weekday), date, includeTime)
  }

  // 今年内（显示月日）
  if (date.isSame(now, "year")) {
    return appendTime(date.format(DATE_FORMATS.monthDay), date, includeTime)
  }

  // 跨年（显示完整日期）
  return appendTime(date.format(DATE_FORMATS.fullDate), date, includeTime)
}

/**
 * 将时间戳格式化为标准格式
 * @param timestamp - 时间戳（毫秒）
 * @returns 格式化后的时间字符串
 *
 * 格式规则：
 * - 当天：HH:mm:ss
 * - 当年：MM/DD HH:mm:ss
 * - 跨年：YYYY/MM/DD HH:mm:ss
 *
 * @example
 * formatTimestamp(Date.now()) // "15:30:45"
 */
export function formatTimestamp(timestamp: number) {
  const now = dayjs()
  const targetDate = dayjs(timestamp)

  // 当天
  if (targetDate.isSame(now, "day")) {
    return targetDate.format("HH:mm:ss")
  }

  // 当年
  if (targetDate.isSame(now, "year")) {
    return targetDate.format("MM/DD HH:mm:ss")
  }

  // 跨年
  return targetDate.format("YYYY/MM/DD HH:mm:ss")
}
