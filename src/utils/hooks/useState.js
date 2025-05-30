import { ref } from "vue";
/**
 * 自定义 Hook，用于在 Vue 3 中管理组件状态，类似于 React 的 useState。
 * @param {any|function} initial - 初始状态值，可以是任何类型 或返回初始状态的函数。
 * @returns {[ref<any>, function]} 返回一个数组，包含状态值和更新状态的函数。
 */
export function useState(initial = false) {
  const state = ref(typeof initial === 'function' ? initial() : initial)

  const setState = (newValue) => {
    if (typeof newValue === 'function') {
      state.value = newValue(state.value);
    } else {
      state.value = newValue;
    }
  };

  return [state, setState]
}