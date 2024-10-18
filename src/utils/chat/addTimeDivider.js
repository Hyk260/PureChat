const duration = 5 * 60;

const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

// 若当前消息与上一条消息间隔超过5分钟，会进行新的时间戳展示，否则归为上一个聊天单元。
const isInFiveTime = (curTime, baseTime) => {
  return Math.abs(curTime - baseTime) <= duration;
};

export const getBaseTime = (list) => {
  return list.length ? list.find((t) => t.isTimeDivider)?.time || 0 : 0;
};

/**
 * 根据指定的持续时间向列表中添加时间分隔符。
 * 当列表中连续项目之间的时间间隔超过指定的持续时间时，将添加时间分隔符。
 * @param {Array} list - 要添加时间分隔符的项目列表。
 * @param {number} [baseTime=0] - 用于计算时间间隔的基准时间。如果未提供，则默认为0。
 * @returns {Array} - 添加时间分隔符后的修改后的列表。
 */
export const addTimeDivider = (list, baseTime = 0) => {
  if (!isArray(list)) return;
  const item = list.filter((t) => !t.isTimeDivider && !t.isDeleted);
  return item.reduce((acc, cur) => {
    const curTime = cur.clientTime;
    if (isInFiveTime(curTime, baseTime)) {
      return [...acc, cur];
    } else {
      baseTime = curTime;
      return [...acc, { isTimeDivider: true, time: curTime }, cur];
    }
  }, []);
};

export function deduplicateAndPreserveOrder(data) {
  return data

  const seenTimes = new Set();
  const result = [];

  for (const item of data) {
    if (item.time !== undefined && !seenTimes.has(item.time)) {
      result.push(item);
      seenTimes.add(item.time);
    } else if (item.ID !== undefined) {
      result.push(item);
    }
  }

  return result;
}