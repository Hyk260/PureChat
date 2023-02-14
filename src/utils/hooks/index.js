import { ref, onMounted, onUnmounted } from "vue";
/**
 * @description: 切换状态的可组合函数
 * @param { boolean } [flag]
 * @return { Array } [boolean,Function]
 * @author hyk <2607881950@qq.com>
 * @example
 * const [ sate, toggle ] = useToggle()
 */
export function useToggle(flag = false) {
  const state = ref(flag);
  function setBool(value) {
    state.value = value;
  }
  function setTrue() {
    setBool(true);
  }
  function setFalse() {
    setBool(false);
  }
  function toggle() {
    setBool(!state.value);
  }
  return [
    state,
    setBool,
    setTrue,
    setFalse,
    toggle,
  ];
}
/**
 * @description: 事件监听器
 * @param { DOM } target dom节点
 * @param { String } event 事件
 * @param { Functin } callback 回调函数
 * @return {*}
 * @example
 * useEventListener(window, "click", () => {});
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
 * @description: 鼠标坐标
 * @param {*}
 * @return {x,y}
 * @example
 * const { x, y } = useMouse()
 */
export function useMouse() {
  let x = ref(0);
  let y = ref(0);
  useEventListener(window, "mousemove", (e) => {
    x.value = e.clientX;
    y.value = e.clientY;
  });
  return {
    x,
    y,
  };
}

/**
 * @description:
 * @param { DOM }
 * @param { String }
 * @param { Functin }
 * @return {*}
 * @example
 *
 */
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
