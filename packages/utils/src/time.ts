import dayjs, { Dayjs } from "dayjs"

const getQuarterStart = (date: Dayjs) => {
  const month = date.month()
  const quarterStartMonth = Math.floor(month / 3) * 3
  return date.month(quarterStartMonth).startOf("month")
}

export const today = () => dayjs().startOf("day")
export const thisWeek = () => dayjs().startOf("week")
export const thisMonth = () => dayjs().startOf("month")
export const thisQuarter = () => getQuarterStart(today())
export const thisYear = () => dayjs().startOf("year")

export const hoursAgo = (hours: number) => dayjs().subtract(hours, "hours").startOf("hours")

export const daysAgo = (days: number) => dayjs().subtract(days, "days").startOf("day")

export const weeksAgo = (weeks: number) => dayjs().subtract(weeks, "week").startOf("week")

export const monthsAgo = (months: number) => dayjs().subtract(months, "month").startOf("month")

export const lastMonth = () => monthsAgo(1).endOf("month")

/**
 * 获取 YYYYMMdd_HHmmss 格式的日期，例如 20240101_235959
 *
 * @example
 *
 * ```ts
 * getYYYYmmddHHMMss(new Date('2024-01-01 23:59:59')); // 返回 '20240101_235959'
 * getYYYYmmddHHMMss(new Date('2024-12-31 00:00:00')); // 返回 '20241231_000000'
 * ```
 *
 * @param date - 要格式化的日期
 * @returns 返回 YYYYMMdd_HHmmss 格式的字符串，日期和时间之间用下划线分隔
 * @see https://day.js.org/docs/en/display/format
 */
export function getYYYYmmddHHMMss(date: Date) {
  return dayjs(date).format("YYYYMMDD_HHmmss")
}
