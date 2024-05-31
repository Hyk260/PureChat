const duration = 5 * 60;

const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

const isInFiveTime = (curTime, baseTime) => {
  return Math.abs(curTime - baseTime) <= duration;
};

export const getBaseTime = (list) => {
  return list?.length > 0 ? list.find((t) => t.isTimeDivider).time : 0;
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
