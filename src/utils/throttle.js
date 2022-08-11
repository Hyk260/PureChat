let timer = null;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} fn 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function throttle(fn, wait = 300) {
  return (function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      }, wait);
    }
  })();
}

/**
 * 节流函数 时间戳版
 */
export function throttleCopy(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}
