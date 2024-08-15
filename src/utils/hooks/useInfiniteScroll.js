import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * 使用 IntersectionObserver 实现无限滚动
 * @param {Function} loadMore - 加载更多数据的函数
 * @param {Object} options - IntersectionObserver 的配置选项
 * @returns {Ref} - 用于观察的目标元素的 ref
 */
export function useInfiniteScroll(loadMore, options = {}) {
  const defaultOptions = {
    root: null, // 视口
    rootMargin: '0px',
    threshold: 0.5 // 交叉比例的阈值，0.5表示元素一半进入视窗时触发回调
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const callback = (entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      loadMore();
    }
  };

  const observer = new IntersectionObserver(callback, mergedOptions);
  const target = document.querySelector('.viewref')
  if (target) {
    // 关闭观察器
    observer.disconnect(target);
    // 开始观察
    observer.observe(target);
  }

}
