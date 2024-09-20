/**
 * 将一个Date对象格式化为指定的日期格式
 * @param {Date} date - 要格式化的Date对象
 * @param {string} format - 指定的日期格式，例如：'yyyy-MM-dd hh:mm:ss'
 * @return {string} 格式化后的日期字符串
 */
function formatDate(date, format) {
  const options = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分钟
    "s+": date.getSeconds(), // 秒钟
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  const YEAR_REGEX = /(y+)/;
  // 处理年份的情况
  if (YEAR_REGEX.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  // 根据 options 对象替换 format 中对应的部分
  for (const option in options) {
    if (new RegExp("(" + option + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? options[option]
          : ("00" + options[option]).substr(("" + options[option]).length)
      );
    }
  }
  return format;
}

/**
 * 这个函数用于将时间戳格式化为相对时间描述，可以在社交网络或聊天应用中使用。
 * 将时间戳格式化为“xx时间前”、“xx天前”等形式
 * @param {string} timestamp - 时间戳，精确到毫秒
 * @param {boolean} mustIncludeTime - 是否强制显示时间，为 true 时将在返回结果中追加“时:分”形式的时间字符串
 * @returns {string} - 格式化后的字符串
 */
export function timeFormatCopy(timestamp, mustIncludeTime = false) {
  const currentDate = new Date();
  const srcDate = new Date(parseInt(timestamp));
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDateD = currentDate.getDate();
  const srcYear = srcDate.getFullYear();
  const srcMonth = srcDate.getMonth() + 1;
  const srcDateD = srcDate.getDate();

  let ret = "";
  const timeExtraStr = mustIncludeTime ? " " + formatDate(srcDate, "hh:mm") : "";

  if (currentYear === srcYear) {
    // 同一年
    const currentTimestamp = currentDate.getTime();
    const srcTimestamp = timestamp;
    const deltaTime = currentTimestamp - srcTimestamp;

    if (currentMonth === srcMonth && currentDateD === srcDateD) {
      // 同一天
      if (deltaTime < 60 * 1000) ret = "刚刚";
      else ret = formatDate(srcDate, "hh:mm");
    } else {
      // 不同天
      const yesterdayDate = new Date(currentDate.getTime() - 24 * 3600 * 1000);
      const beforeYesterdayDate = new Date(currentDate.getTime() - 2 * 24 * 3600 * 1000);

      if (srcMonth === yesterdayDate.getMonth() + 1 && srcDateD === yesterdayDate.getDate()) {
        ret = "昨天" + timeExtraStr;
      } else if (
        srcMonth === beforeYesterdayDate.getMonth() + 1 &&
        srcDateD === beforeYesterdayDate.getDate()
      ) {
        ret = "前天" + timeExtraStr;
      } else {
        // 三天前
        const deltaHour = deltaTime / (3600 * 1000);
        if (deltaHour <= 6 * 24) {
          // 一周内，显示星期几
          const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
          const weekdayDesc = weekday[srcDate.getDay()];
          ret = weekdayDesc + timeExtraStr;
        } else ret = formatDate(srcDate, "yyyy/M/d") + timeExtraStr;
      }
    }
  } else {
    // 不同年
    ret = formatDate(srcDate, "yyyy/M/d") + timeExtraStr; // 一周以上，显示年月日
  }
  if (timestamp == 0) {
    ret = "刚刚";
  }
  return ret;
}

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
  const now = new Date();
  const date = new Date(timestamp);

  // 当前时间和传入时间的年、月、日
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth();
  const dateDate = date.getDate();

  const timeStr = includeTime
    ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    : '';

  // 判断是否是今天
  if (nowYear === dateYear && nowMonth === dateMonth && nowDate === dateDate) {
    return includeTime ? `${timeStr}` : `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  // 判断是否是昨天
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    dateYear === yesterday.getFullYear() &&
    dateMonth === yesterday.getMonth() &&
    dateDate === yesterday.getDate()
  ) {
    return includeTime ? `昨天 ${timeStr}` : `昨天`;
  }

  // 判断是否是一周内
  const dayOfWeekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const dayDiff = (now - date) / (1000 * 60 * 60 * 24);
  if (dayDiff < 7) {
    return includeTime ? `${dayOfWeekNames[date.getDay()]} ${timeStr}` : `${dayOfWeekNames[date.getDay()]}`;
  }

  // 判断是否是同一年
  if (nowYear === dateYear) {
    return includeTime
      ? `${date.getMonth() + 1}/${date.getDate()} ${timeStr}`
      : `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  // 如果是其他年份
  return includeTime
    ? `${dateYear}/${date.getMonth() + 1}/${date.getDate()} ${timeStr}`
    : `${dateYear}年${date.getMonth() + 1}月${date.getDate()}日`;
}


// // 格式化一个时间戳，不包含时间部分
// const formattedTime = timeFormat(1613687688000);
// console.log(formattedTime); // 输出：2月19日

// // 格式化一个时间戳，包含时间部分
// const formattedTimeWithTime = timeFormat(1613687688000, true);
// console.log(formattedTimeWithTime); // 输出：2月19日 08:48