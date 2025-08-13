import { ref } from "vue";

/**
 * 弹窗状态管理组合式函数
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
 */
export function usePopupWithCallbacks(onShow: () => void, onHide: () => void) {
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