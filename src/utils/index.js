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
