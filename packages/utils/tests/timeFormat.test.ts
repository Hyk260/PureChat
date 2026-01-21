import dayjs, { locale } from "dayjs"
import "dayjs/locale/zh-cn"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { formatTimestamp, timeFormat } from "../src/timeFormat"

describe("timeFormat", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 设置中文 locale
    locale("zh-cn")
    // 设置固定日期用于一致性测试: 2024-06-15 14:30:00
    vi.setSystemTime(new Date("2024-06-15T14:30:00.000"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("today", () => {
    it("should format today's time without includeTime", () => {
      const timestamp = new Date("2024-06-15T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      expect(result).toBe("10:20")
    })

    it("should format today's time with includeTime", () => {
      const timestamp = new Date("2024-06-15T10:20:00.000").getTime()
      const result = timeFormat(timestamp, true)

      expect(result).toBe("10:20")
    })

    it("should handle edge cases for today", () => {
      const morningTimestamp = new Date("2024-06-15T00:00:00.000").getTime()
      const eveningTimestamp = new Date("2024-06-15T23:59:59.999").getTime()

      expect(timeFormat(morningTimestamp)).toBe("0:00")
      expect(timeFormat(eveningTimestamp)).toBe("23:59")
    })
  })

  describe("yesterday", () => {
    it("should format yesterday's time without includeTime", () => {
      const timestamp = new Date("2024-06-14T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      expect(result).toBe("昨天")
    })

    it("should format yesterday's time with includeTime", () => {
      const timestamp = new Date("2024-06-14T10:20:00.000").getTime()
      const result = timeFormat(timestamp, true)

      expect(result).toBe("昨天 10:20")
    })
  })

  describe("within 7 days", () => {
    it("should format time within 7 days (3 days ago) without includeTime", () => {
      const timestamp = new Date("2024-06-12T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      // Should show weekday (weekday name in Chinese)
      expect(result).toMatch(/^(星期一|星期二|星期三|星期四|星期五|星期六|星期日)$/)
    })

    it("should format time within 7 days (3 days ago) with includeTime", () => {
      const timestamp = new Date("2024-06-12T10:20:00.000").getTime()
      const result = timeFormat(timestamp, true)

      // Should show weekday with time
      expect(result).toMatch(/^(星期一|星期二|星期三|星期四|星期五|星期六|星期日) 10:20$/)
    })

    it("should format time 6 days ago without includeTime", () => {
      const timestamp = new Date("2024-06-09T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      expect(result).toMatch(/^(星期一|星期二|星期三|星期四|星期五|星期六|星期日)$/)
    })
  })

  describe("within current year", () => {
    it("should format time earlier this year without includeTime", () => {
      const timestamp = new Date("2024-03-15T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      expect(result).toBe("3月15日")
    })

    it("should format time earlier this year with includeTime", () => {
      const timestamp = new Date("2024-03-15T10:20:00.000").getTime()
      const result = timeFormat(timestamp, true)

      expect(result).toBe("3月15日 10:20")
    })

    it("should handle single digit month and day", () => {
      const timestamp = new Date("2024-01-05T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      expect(result).toBe("1月5日")
    })
  })

  describe("cross year", () => {
    it("should format time from previous year without includeTime", () => {
      const timestamp = new Date("2023-12-25T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      expect(result).toBe("2023年12月25日")
    })

    it("should format time from previous year with includeTime", () => {
      const timestamp = new Date("2023-12-25T10:20:00.000").getTime()
      const result = timeFormat(timestamp, true)

      expect(result).toBe("2023年12月25日 10:20")
    })

    it("should handle dates from multiple years ago", () => {
      const timestamp = new Date("2020-01-01T10:20:00.000").getTime()
      const result = timeFormat(timestamp)

      expect(result).toBe("2020年1月1日")
    })
  })

  describe("edge cases", () => {
    it("should handle timestamp at exactly 7 days ago boundary", () => {
      // 7 days ago from 2024-06-15 is 2024-06-08
      // Since isAfter doesn't include equals, exactly 7 days ago should show month day
      const timestamp = new Date("2024-06-08T14:30:00.000").getTime()
      const result = timeFormat(timestamp)

      // Should show month day (not weekday) because isAfter excludes equals
      expect(result).toBe("6月8日")
    })

    it("should handle timestamp just before 7 days boundary", () => {
      // Just within 7 days (7 days - 1 minute ago)
      const timestamp = new Date("2024-06-08T14:31:00.000").getTime()
      const result = timeFormat(timestamp)

      // Should show weekday (within 7 days)
      expect(result).toMatch(/^(星期一|星期二|星期三|星期四|星期五|星期六|星期日)$/)
    })

    it("should handle timestamp just after 7 days boundary", () => {
      // Just over 7 days ago
      const timestamp = new Date("2024-06-08T14:29:59.999").getTime()
      const result = timeFormat(timestamp)

      // Should show month day (not weekday)
      expect(result).toBe("6月8日")
    })

    it("should handle different includeTime values", () => {
      const timestamp = new Date("2024-03-15T10:20:00.000").getTime()

      expect(timeFormat(timestamp, false)).toBe("3月15日")
      expect(timeFormat(timestamp, true)).toBe("3月15日 10:20")
    })
  })
})

describe("formatTimestamp", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 设置中文 locale
    locale("zh-cn")
    // 设置固定日期用于一致性测试: 2024-06-15 14:30:45
    vi.setSystemTime(new Date("2024-06-15T14:30:45.000"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("same day", () => {
    it("should format timestamp from today as HH:mm:ss", () => {
      const timestamp = new Date("2024-06-15T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("10:20:30")
    })

    it("should handle early morning time", () => {
      const timestamp = new Date("2024-06-15T00:00:00.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("00:00:00")
    })

    it("should handle late night time", () => {
      const timestamp = new Date("2024-06-15T23:59:59.999").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("23:59:59")
    })

    it("should handle same time as current", () => {
      const timestamp = new Date("2024-06-15T14:30:45.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("14:30:45")
    })
  })

  describe("same year but different day", () => {
    it("should format timestamp from earlier this year as MM/DD HH:mm:ss", () => {
      const timestamp = new Date("2024-03-15T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("03/15 10:20:30")
    })

    it("should handle single digit month and day", () => {
      const timestamp = new Date("2024-01-05T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("01/05 10:20:30")
    })

    it("should handle timestamp from yesterday", () => {
      const timestamp = new Date("2024-06-14T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("06/14 10:20:30")
    })

    it("should handle timestamp from tomorrow", () => {
      const timestamp = new Date("2024-06-16T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("06/16 10:20:30")
    })
  })

  describe("cross year", () => {
    it("should format timestamp from previous year as YYYY/MM/DD HH:mm:ss", () => {
      const timestamp = new Date("2023-12-25T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("2023/12/25 10:20:30")
    })

    it("should handle dates from multiple years ago", () => {
      const timestamp = new Date("2020-01-01T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("2020/01/01 10:20:30")
    })

    it("should handle dates from future years", () => {
      const timestamp = new Date("2025-01-01T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("2025/01/01 10:20:30")
    })

    it("should handle single digit month and day in previous year", () => {
      const timestamp = new Date("2023-01-05T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("2023/01/05 10:20:30")
    })
  })

  describe("edge cases", () => {
    it("should handle leap year date", () => {
      const timestamp = new Date("2024-02-29T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("02/29 10:20:30")
    })

    it("should handle end of year date", () => {
      const timestamp = new Date("2023-12-31T23:59:59.999").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("2023/12/31 23:59:59")
    })

    it("should handle beginning of year date", () => {
      const timestamp = new Date("2023-01-01T00:00:00.000").getTime()
      const result = formatTimestamp(timestamp)

      expect(result).toBe("2023/01/01 00:00:00")
    })

    it("should maintain consistency with dayjs", () => {
      const timestamp = new Date("2024-03-15T10:20:30.000").getTime()
      const result = formatTimestamp(timestamp)
      const expected = dayjs(timestamp).format("MM/DD HH:mm:ss")

      expect(result).toBe(expected)
    })
  })
})
