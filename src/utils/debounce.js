/**
 * 防抖函数
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @returns {Function} 返回一个防抖后的函数
 * const debouncedFunc = debounce(fn, 250);
 */
export function debounce(func, wait = 300, immediate = false) {
  let timer;
  return function debounced(...args) {
    const context = this;
    const later = function () {
      timer = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * call()方法接受的是参数列表  call(thisArg, arg1, arg2, ...);
 * apply()方法接受的是一个参数数组。 apply(thisArg, [arg...]);
 */

// 延迟函数
export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const debounceCopy = (fn, timeout = 300) => {
  let timmer;
  return (function () {
    timmer ? clearTimeout(timmer) : null;
    timmer = setTimeout(fn, timeout);
  })();
};
