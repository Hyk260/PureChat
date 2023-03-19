import { ref, onMounted, onUnmounted } from "vue";

/**
 * useToggle - 一个提供布尔类型状态和一些辅助函数以用于切换状态的钩子函数。
 * @param {Boolean} initialState - 初始状态。默认值为false。
 * @returns {Array} - 返回一个数组
 */
export function useToggle(flag = false) {
  const state = ref(flag);
  function setState(value) {
    state.value = value;
  }
  function setTrue() {
    setState(true);
  }
  function setFalse() {
    setState(false);
  }
  function toggle() {
    setState(!state.value);
  }
  return [state, setState, setTrue, setFalse, toggle];
}

/**
 * useEventListener - 一个钩子函数，用于将事件监听器添加到给定的目标元素，并在组件卸载时将其移除。
 * @param {EventTarget} target - 要添加事件监听器的目标元素。
 * @param {String} event - 要监听的事件名称。
 * @param {Function} callback - 事件回调函数。
 */
export function useEventListener(target, event, callback) {
  onMounted(() => {
    target.addEventListener(event, callback, false);
  });
  onUnmounted(() => {
    target.removeEventListener(event, callback, false);
  });
}

/**
 * useMouse - 一个钩子函数，用于获取鼠标的位置坐标。
 * @return {Object} - 包含当前鼠标 x 和 y 坐标的对象。
 */
export function useMouse() {
  // 创建 x 和 y 两个响应式变量
  const x = ref(0);
  const y = ref(0);
  // 在组件加载时添加鼠标移动事件的监听器
  useEventListener(window, "mousemove", (e) => {
    x.value = e.clientX;
    y.value = e.clientY;
  });
  // 返回包含 x 和 y 变量的对象
  return { x, y };
}

export function useResizeListener() {
  function addResizeListener(target, callback) {
    window.addEventListener("resize", callback, false);
  }
  function removeResizeListener(target, callback) {
    window.removeEventListener("resize", callback, false);
  }
  return {
    addResizeListener,
    removeResizeListener,
  };
}
