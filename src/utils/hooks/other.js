import { ref } from "vue";

/**
 * 创建一个布尔类型的状态变量和对应的更新函数
 * @param {boolean} initialValue - 初始值，默认为 false
 * @returns {Array} - 包含状态变量和更新函数的数组
 */
export function useBoolean(initialValue = false) {
  const state = ref(initialValue);
  function setState(value) {
    state.value = value;
  }
  return [state, setState];
}
