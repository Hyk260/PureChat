import { timeFormat } from "@/utils/timeFormat";
import { cloneDeep } from "lodash-es";

const timeline = true;
const duration = 5 * 60;

const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

// 若当前消息与上一条消息间隔超过5分钟，会进行新的时间戳展示，否则归为上一个聊天单元。
const isInFiveTime = (curTime, baseTime) => {
  return Math.abs(curTime - baseTime) <= duration;
};

// start last
export const getBaseTime = (list, type = "start") => {
  if (!list.length) return 0;
  let time = 0;
  if (type === "start") {
    time = list.find((t) => t.isTimeDivider)?.time || 0;
  } else {
    time = list.findLast((t) => t.isTimeDivider)?.time || 0;
  }
  return time;
};

/**
 * 根据指定的持续时间向列表中添加时间分隔符。
 * 当列表中连续项目之间的时间间隔超过指定的持续时间时，将添加时间分隔符。
 * @param {Array} list - 要添加时间分隔符的项目列表。
 * @param {number} [baseTime=0] - 用于计算时间间隔的基准时间。如果未提供，则默认为0。
 * @returns {Array} - 添加时间分隔符后的修改后的列表。
 */
export const addTimeDivider = (list, baseTime = 0, type = "start") => {
  if (!timeline) return list;
  if (!isArray(list)) return;
  let _baseTime = baseTime;

  const reducer = (acc, cur) => {
    const curTime = cur.clientTime;
    if (isInFiveTime(curTime, _baseTime)) {
      return [...acc, cur];
    } else {
      _baseTime = curTime;
      return [...acc, { isTimeDivider: true, time: curTime }, cur];
    }
  };

  return type === "last" ? list.reduceRight(reducer, []) : list.reduce(reducer, []);
};
