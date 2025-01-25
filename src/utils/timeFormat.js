
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday.js";
import isYesterday from "dayjs/plugin/isYesterday.js";
import "dayjs/locale/zh-cn.js"; // 引入中文语言包

// 设置 dayjs 的 locale 为中文
dayjs.locale("zh-cn");
dayjs.extend(isToday);
dayjs.extend(isYesterday);


export function timeFormat(timestamp, includeTime = false) {
  const now = dayjs(); // 当前时间
  const date = dayjs(timestamp); // 输入时间

  // 辅助函数：根据是否需要时间格式，返回包含时间或不包含时间的字符串
  const formatWithTime = (format) => includeTime ? `${format} ${date.format("H:mm")}` : format;

  if (date.isToday()) {
    // 如果是今天，返回具体时间（小时:分钟）
    return date.format("H:mm");
  }

  if (date.isYesterday()) {
    // 如果是昨天，返回"昨天"字符串，视需求是否附加时间
    return formatWithTime("昨天");
  }

  if (date.isAfter(now.subtract(7, "day"))) {
    // 如果是在过去 7 天内（不包括昨天），以星期表示
    return formatWithTime(date.format("dddd")); // "dddd" 自动根据语言环境返回星期几
  }

  if (date.isSame(now, "year")) {
    // 如果是今年内的日期，返回 "月日" 格式，视需求是否附加时间
    return formatWithTime(date.format("M月D日"));
  }

  // 如果是更早的年份，返回完整的日期（年/月/日），视需求是否附加时间
  return formatWithTime(date.format("YYYY年M月D日"));
}

/**
 * 将时间戳格式化为指定格式。
 * 根据年份是否为当年以及是否为当天，调整日期显示格式：
 * - 当天：只显示 "时:分:秒"
 * - 当年：显示 "月/日 时:分:秒"
 * - 跨年：显示 "年/月/日 时:分:秒"
 * @param {number} timestamp - 时间戳（毫秒）
 * @returns {string} 格式化的日期字符串
 */
export function formatTimestamp(timestamp) {
  const now = dayjs();
  const targetDate = dayjs(timestamp);

  // 根据时间差异决定输出格式
  if (targetDate.isSame(now, 'day')) {
    return targetDate.format('HH:mm:ss'); // 当天
  }
  if (targetDate.isSame(now, 'year')) {
    return targetDate.format('MM/DD HH:mm:ss'); // 当年
  }
  return targetDate.format('YYYY/MM/DD HH:mm:ss'); // 跨年
}