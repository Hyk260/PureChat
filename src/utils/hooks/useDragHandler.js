
import {
  nextTick,
  onUnmounted,
} from "vue";

const DEFAULT_MIN_HEIGHT = 200; // 默认的最小高度
const DEFAULT_OFFSET_HEIGHT = 60; // 偏移量

export function createDragHandler(config) {
  const {
    dragElement,
    chatBox,
    editor,
    container,
    dragHover,
    minHeight = DEFAULT_MIN_HEIGHT,
    offsetHeight = DEFAULT_OFFSET_HEIGHT,
    scrollBar,
  } = config;

  let animationFrameId = null;
  let startY = 0;
  let startTop = 0;

  const updateSizes = (clientY) => {
    const moveLen = startTop + (clientY - startY);
    const containerHeight = container.clientHeight;

    // 限制高度范围
    const clampedHeight = Math.max(
      minHeight,
      Math.min(moveLen, containerHeight - minHeight)
    );

    // 更新高度样式
    chatBox.style.height = `${clampedHeight - offsetHeight}px`;
    if (editor) {
      editor.style.height = `${containerHeight - clampedHeight}px`;
    }
  };

  const handleMouseMove = (event) => {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        updateSizes(event.clientY);
      });
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // 恢复初始状态
    document.body.style.cursor = "";
    if (dragHover) dragHover.style.background = "none";

    // 更新滚动条
    scrollBar?.updateScrollbar();

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const handleMouseDown = (event) => {
    startY = event.clientY;
    startTop = dragElement.offsetTop;

    document.body.style.cursor = "n-resize";
    if (dragHover) dragHover.style.background = "#409EFF";

    // 绑定事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    event.preventDefault();
  };

  const initialize = () => {
    dragElement.addEventListener("mousedown", handleMouseDown);
  };

  const destroy = () => {
    dragElement.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // 恢复样式
    document.body.style.cursor = "";
    if (dragHover) dragHover.style.background = "none";
  };

  return { initialize, destroy };
}

export function useDragHandler(chatRef) {
  let destroyHandler = null;

  onUnmounted(() => {
    // 解绑事件
    destroyHandler?.();
  });

  nextTick(() => {
    const dragElement = document.getElementById("drag");
    const chatBox = document.getElementById("chat-box");
    const editor = document.getElementById("editor");
    const container = document.getElementById("container");
    const dragHover = document.querySelector(".resize-hover");

    const missingElements = [
      [dragElement, "drag"],
      [chatBox, "chat-box"],
      [editor, "editor"],
      [container, "container"],
      [dragHover, ".resize-hover"],
    ].filter(([el]) => !el);

    if (missingElements.length > 0) {
      console.warn(
        "Required DOM elements are missing:",
        missingElements.map(([, name]) => name).join(", ")
      );
      return;
    }

    // 配置拖动参数
    const dragConfig = {
      dragElement: dragElement,
      chatBox: chatBox,
      editor: editor,
      container: container,
      dragHover: dragHover,
      minHeight: DEFAULT_MIN_HEIGHT,
      offsetHeight: DEFAULT_OFFSET_HEIGHT,
      scrollBar: chatRef,
    };

    // 初始化拖拽逻辑
    const { initialize, destroy } = createDragHandler(dragConfig);
    initialize();
    destroyHandler = destroy;
  });
}