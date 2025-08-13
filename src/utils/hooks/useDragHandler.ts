import {
  nextTick,
  onUnmounted,
} from "vue";
import { debounce } from "lodash-es";

// 常量配置
const DRAG_CONFIG = {
  MIN_HEIGHT: 200,
  OFFSET_HEIGHT: 60,
  CURSOR_STYLE: "n-resize",
  HOVER_COLOR: "#409EFF",
  DEFAULT_COLOR: "none",
  DEBOUNCE_DELAY: 100,
};

/**
 * 验证拖拽所需的DOM元素
 * @param {Object} elements - 需要验证的DOM元素集合
 * @throws {Error} 当缺少必要元素时抛出错误
 */
function validateElements(elements) {
  const requiredElements = [
    ["dragElement", "拖拽元素"],
    ["chatBox", "聊天框"],
    ["container", "容器"],
  ];

  const missingElements = requiredElements.filter(
    ([key]) => !elements[key]
  );

  if (missingElements.length > 0) {
    throw new Error(
      `缺少必要的DOM元素: ${missingElements.map(([, name]) => name).join(", ")}`
    );
  }
}

/**
 * 创建样式更新器
 * @param {HTMLElement} chatBox - 聊天框元素
 * @param {HTMLElement} editor - 编辑器元素
 * @returns {Function} 更新样式的函数
 */
function createStyleUpdater(chatBox, editor) {
  return (chatBoxHeight, editorHeight) => {
    chatBox.style.height = `${chatBoxHeight}px`;
    if (editor) {
      editor.style.height = `${editorHeight}px`;
    }
  };
}

/**
 * 创建拖拽处理器
 * @param {Object} config - 拖拽配置
 * @returns {Object} 包含初始化和销毁方法的对象
 */
export function createDragHandler(config) {
  // 参数验证
  if (!config || typeof config !== "object") {
    throw new Error("配置参数不能为空");
  }

  const {
    dragElement,
    chatBox,
    editor,
    container,
    dragHover,
    minHeight = DRAG_CONFIG.MIN_HEIGHT,
    offsetHeight = DRAG_CONFIG.OFFSET_HEIGHT,
    scrollBar,
  } = config;

  validateElements({ dragElement, chatBox, container });

  // 状态变量
  let animationFrameId = null;
  let startY = 0;
  let startTop = 0;
  let lastClientY = 0;

  // 创建样式更新器
  const updateStyles = createStyleUpdater(chatBox, editor);

  // 防抖的滚动条更新
  const debouncedScrollBarUpdate = debounce(
    () => scrollBar?.updateScrollbar?.(),
    DRAG_CONFIG.DEBOUNCE_DELAY
  );

  /**
   * 更新元素尺寸
   * @param {number} clientY - 鼠标Y坐标
   */
  const updateSizes = (clientY) => {
    const moveLen = startTop + (clientY - startY);
    const containerHeight = container.clientHeight;
    const clampedHeight = Math.max(
      minHeight,
      Math.min(moveLen, containerHeight - minHeight)
    );

    updateStyles(clampedHeight - offsetHeight, containerHeight - clampedHeight);
  };

  /**
   * 鼠标移动处理
   * @param {MouseEvent} event - 鼠标事件对象
   */
  const handleMouseMove = (event) => {
    lastClientY = event.clientY;
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        updateSizes(lastClientY);
      });
    }
  };

  /**
   * 鼠标抬起处理
   */
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // 重置样式
    document.body.style.cursor = "";
    if (dragHover) {
      dragHover.style.background = DRAG_CONFIG.DEFAULT_COLOR;
    }

    // 更新滚动条
    debouncedScrollBarUpdate();

    // 清理动画帧
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  /**
   * 鼠标按下处理
   * @param {MouseEvent} event - 鼠标事件对象
   */
  const handleMouseDown = (event) => {
    startY = event.clientY;
    startTop = dragElement.offsetTop;

    // 设置样式
    document.body.style.cursor = DRAG_CONFIG.CURSOR_STYLE;
    if (dragHover) {
      dragHover.style.background = DRAG_CONFIG.HOVER_COLOR;
    }

    // 绑定事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    event.preventDefault();
  };

  /**
   * 初始化拖拽功能
   */
  const initialize = () => {
    dragElement.addEventListener("mousedown", handleMouseDown);
  };

  /**
   * 清理拖拽功能
   */
  const destroy = () => {
    // 移除事件监听
    dragElement.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // 清理动画帧
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    // 重置样式
    document.body.style.cursor = "";
    if (dragHover) {
      dragHover.style.background = DRAG_CONFIG.DEFAULT_COLOR;
    }

    // 取消防抖函数
    debouncedScrollBarUpdate.cancel();
  };

  return { initialize, destroy };
}

/**
 * Vue组合式API钩子 - 拖拽处理
 * @param {Object} chatRef - 聊天组件引用
 */
export function useDragHandler(chatRef) {
  // 将 destroyHandler 移到 setup 函数内部
  const setupDrag = () => {
    let destroyHandler = null;

    // 组件卸载时清理
    onUnmounted(() => {
      destroyHandler?.();
    });

    // 等待DOM更新后初始化
    nextTick(() => {
      // 获取必要的DOM元素
      const elements = {
        dragElement: document.getElementById("drag"),
        chatBox: document.getElementById("chat-box"),
        editor: document.getElementById("editor"),
        container: document.getElementById("container"),
        dragHover: document.querySelector(".resize-hover"),
      };

      // 检查必要元素是否存在
      const missingElements = Object.entries(elements)
        .filter(([, el]) => !el)
        .map(([name]) => name);

      if (missingElements.length > 0) {
        console.warn(
          "Required DOM elements are missing:",
          missingElements.join(", ")
        );
        return;
      }

      // 配置拖拽参数
      const dragConfig = {
        ...elements,
        minHeight: DRAG_CONFIG.MIN_HEIGHT,
        offsetHeight: DRAG_CONFIG.OFFSET_HEIGHT,
        scrollBar: chatRef,
      };

      // 初始化拖拽逻辑
      const { initialize, destroy } = createDragHandler(dragConfig);
      initialize();
      destroyHandler = destroy;
    });
  };

  // 确保在组件 setup 阶段调用
  setupDrag();
}