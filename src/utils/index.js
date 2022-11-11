import { customRef } from "vue";
/**
 * @description: 生成UUID
 * @param {*}
 * @return {*}
 * @author:
 */
export function generateUUID() {
  let result = "";
  const code = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  result = code.replace(/[xy]/gu, (item) => {
    const random = (Math.random() * 16) | 0;
    const value = item === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
  return result;
}

/**
 * @description: 生成随机数
 * @param {*}
 * @return {*}
 */
export function randomNum(min = 0, max = 100) {
  return Math.floor(Math.random() * (min - max) + max);
}

/**
 * @description: 判断是否为空
 * @param {*}
 * @return {*}
 */
export function empty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value) return true;
      break;
    case "number":
      if (value === 0 || isNaN(value)) return true;
      break;
    case "object":
      if (value === null || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * @description: 判断数据类型
 * @param {*}
 * @return {*}
 * 示例 typOf({}) === "object";
 */
export function typeOf(operand) {
  const toString = Object.prototype.toString;
  let type = toString.call(operand).split(" ")[1];
  type = type.substring(0, type.length - 1).toLowerCase();
  return type;
}

/**
 * @description: 防抖ref
 * @param {*}
 * @return {*}
 * 示例 const text = useDebouncedRef('hello')
 */
export function useDebouncedRef(value, delay = 200) {
  let timer;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(val) {
        if (timer) return;
        timer = setTimeout(() => {
          timer = null;
          value = val;
          trigger();
        }, delay);
      },
    };
  });
}
