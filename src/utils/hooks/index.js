import { ref, onMounted, onUnmounted } from "vue";

/**
 * @description: 切换状态的可组合函数
 * @param {*}
 * @return {*}
 * const [state, toggle] = useToggle()
 */
export function useToggle(flag = false) {
  const state = ref(flag);
  const toggle = () => {
    state.value = !state.value;
  };
  return [state, toggle];
}

/**
 * @description: 事件监听器
 * @param {*}
 * @return {*}
 * 
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
