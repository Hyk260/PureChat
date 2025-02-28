/**
 * 自定义 Hook，用于在 Vue 3 中管理组件状态，类似于 React 的 useState。
 *
 * @param {any|function} initial - 初始状态值，可以是任何类型 
 *                                  - 如果是一个函数，调用该函数以获取初始状态值。
 * 
 * @returns {[Ref<any>, function]} 返回一个数组，包括：
 *    - Ref<any>: 包含当前状态的响应式引用，状态值通过 `value` 属性访问。
 *    - function: 更新当前状态的函数，可以接受新的状态值或基于当前状态的更新函数。
 */
export function useState(initial) {
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