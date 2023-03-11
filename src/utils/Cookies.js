import Cookies from "js-cookie";

export function getCookies(key) {
  return Cookies.get(key);
}

export function removeCookies(key) {
  Cookies.remove(key);
}
/**
 * 设置具有给定键和值以及到期时间的cookie（以秒为单位）
 * @param {string} key - 要设置的cookie的名称
 * @param {string} value - 要设置的cookie的值
 * @param {number} [seconds=86400] - cookie到期时间（默认86400秒）1天
 * 60 * 60 * 24 = 86400
 */
export function setCookies(key, value, seconds = 86400) {
  const expires = new Date(new Date() * 1 + seconds * 1000);
  Cookies.set(key, value, { expires: expires, path: "" });
}
