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
 * 判断是否为空
 */
export function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (value === 0 || isNaN(value)) return true
      break
    case 'object':
      if (value === null || value.length === 0) return true
      for (var i in value) {
        return false
      }
      return true
  }
  return false
}
