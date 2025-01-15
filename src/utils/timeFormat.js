
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday.js";
import isYesterday from "dayjs/plugin/isYesterday.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import weekday from "dayjs/plugin/weekday.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import localeData from "dayjs/plugin/localeData.js";
import "dayjs/locale/zh-cn.js"; // 引入中文语言包

// 设置 dayjs 的 locale 为中文
dayjs.locale("zh-cn");
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);

// 显示规则
// 今天
// 时 + 分。
// 示例：8:30
// 昨天
// 昨天 + 时 + 分。
// 示例：昨天 8:30
// 一周内（7天，以天为单位计算）
// 星期 + 时 + 分。
// 示例：星期一 8:30
// 超过一周，在本年内
// 月/日 + 时 + 分。
// 示例：9/1  8:30
// 不在本年
// 年/月/日 + 时 + 分。
// 示例：2024/9/1  8:30
export function timeFormat(timestamp, includeTime = false) {
  const now = dayjs();
  const date = dayjs(timestamp);

  if (date.isToday()) {
    return date.format("H:mm");
  } else if (date.isYesterday()) {
    if (includeTime) {
      return `昨天 ${date.format("H:mm")}`;
    }
    return "昨天";
  } else if (date.isAfter(now.subtract(7, "day"))) {
    if (includeTime) {
      return `${date.format("dddd")} ${date.format("H:mm")}`;
    }
    return date.format("dddd");
  } else if (date.isSame(now, "year")) {
    if (includeTime) {
      return date.format("M月D日 H:mm");
    }
    return date.format("M月D日");
  } else {
    if (includeTime) {
      return date.format("YYYY年M月D日 H:mm");
    }
    return date.format("YYYY年M月D日");
  }
}

/**
 * 将时间戳格式化为 "年/月/日 时:分:秒" 的格式
 * 如果年份为当年则不显示年，只显示 "月/日 时:分:秒"
 * @param {number} timestamp - 时间戳（毫秒）
 * @returns {string} 格式化的日期字符串
 */
export function formatTimestamp(timestamp) {
  const now = dayjs();
  const date = dayjs(timestamp);

  if (date.isSame(now, 'year')) {
    // 如果是当年，则根据具体情况显示或不显示月
    if (date.isSame(now, 'day')) {
      return date.format("HH:mm:ss");
    } else {
      return date.format("MM/DD HH:mm:ss");
    }
  } else {
    return date.format("YYYY/MM/DD HH:mm:ss");
  }
}