import { ref } from "vue";

/**
 * 弹窗状态管理组合式函数
 * @param {boolean} initialVisible - 初始显示状态
 * @returns {Object} 弹窗状态和方法
 */
export function usePopup(initialVisible = false) {
  const visible = ref(initialVisible);
  
  const show = () => {
    visible.value = true;
  };
  
  const hide = () => {
    visible.value = false;
  };
  
  const toggle = () => {
    visible.value = !visible.value;
  };
  
  return {
    visible,
    show,
    hide,
    toggle
  };
}

/**
 * 带回调的弹窗状态管理
 * @param {Function} onShow - 显示时的回调
 * @param {Function} onHide - 隐藏时的回调
 * @returns {Object} 弹窗状态和方法
 */
export function usePopupWithCallbacks(onShow, onHide) {
  const { visible, show, hide, toggle } = usePopup();
  
  const showWithCallback = () => {
    show();
    onShow?.();
  };
  
  const hideWithCallback = () => {
    hide();
    onHide?.();
  };
  
  return {
    visible,
    show: showWithCallback,
    hide: hideWithCallback,
    toggle
  };
} 