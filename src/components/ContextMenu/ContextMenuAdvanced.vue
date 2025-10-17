<template>
  <!-- 内容区域 -->
  <div @contextmenu.prevent="handleContextMenu">
    <slot />
  </div>

  <!-- 使用 Teleport 将菜单渲染到 body -->
  <Teleport to="body">
    <Transition name="context-menu" @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
      <div v-if="visible" ref="menuRef" class="context-menu-wrapper" :style="menuStyle" @click.stop>
        <a-menu @click="handleMenuClick" mode="vertical">
          <template v-for="item in items" :key="item.key">
            <!-- 分割线 -->
            <a-menu-divider v-if="item.divider" />

            <!-- 子菜单 -->
            <a-sub-menu v-else-if="item.children && item.children.length" :key="item.key" :disabled="item.disabled">
              <template #icon v-if="item.icon">
                <component :is="item.icon" />
              </template>
              <template #title>{{ item.label }}</template>

              <!-- 递归渲染子菜单项 -->
              <template v-for="child in item.children" :key="child.key">
                <a-menu-item :key="child.key" :disabled="child.disabled" :danger="child.danger">
                  <template #icon v-if="child.icon">
                    <component :is="child.icon" />
                  </template>
                  {{ child.label }}
                </a-menu-item>
              </template>
            </a-sub-menu>

            <!-- 普通菜单项 -->
            <a-menu-item v-else :key="item.key" :disabled="item.disabled" :danger="item.danger">
              <template #icon v-if="item.icon">
                <component :is="item.icon" />
              </template>
              {{ item.label }}
            </a-menu-item>
          </template>
        </a-menu>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from "vue"
import type { MenuItem, ContextMenuProps } from "@/types/contextMenu"
import type { MenuProps } from "ant-design-vue"

// 定义 props
const props = withDefaults(defineProps<ContextMenuProps>(), {
  items: () => [],
  triggerData: null,
})

// 定义 emits
const emit = defineEmits<{
  "menu-click": [item: MenuItem, data?: any]
  "open-change": [open: boolean]
}>()

// 菜单状态
const visible = ref<boolean>(false)
const menuRef = ref<HTMLElement>()
const mousePosition = ref({ x: 0, y: 0 })

// 计算菜单样式
const menuStyle = computed(() => {
  const { x, y } = mousePosition.value
  return {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    zIndex: 1050,
    minWidth: "200px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow:
      "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
  }
})

// 处理右键点击事件
const handleContextMenu = async (event: MouseEvent): Promise<void> => {
  event.preventDefault()
  event.stopPropagation()

  // 先关闭已有菜单
  visible.value = false

  await nextTick()

  // 获取鼠标位置
  let { clientX, clientY } = event

  // 预估菜单尺寸（可以根据实际情况调整）
  const menuWidth = 200
  const menuHeight = 300 // 预估高度

  // 获取视窗尺寸
  const { innerWidth, innerHeight } = window

  // 调整位置，确保菜单不超出视窗
  if (clientX + menuWidth > innerWidth) {
    clientX = innerWidth - menuWidth - 10 // 留出10px边距
  }

  if (clientY + menuHeight > innerHeight) {
    clientY = clientY - menuHeight < 0 ? 10 : clientY - menuHeight
  }

  // 设置位置
  mousePosition.value = { x: clientX, y: clientY }

  // 显示菜单
  visible.value = true

  // 确保菜单显示后再次调整位置
  await nextTick()
  if (menuRef.value) {
    const rect = menuRef.value.getBoundingClientRect()

    // 如果实际高度超出底部，向上调整
    if (rect.bottom > innerHeight) {
      mousePosition.value.y = Math.max(10, clientY - rect.height)
    }

    // 如果实际宽度超出右边，向左调整
    if (rect.right > innerWidth) {
      mousePosition.value.x = Math.max(10, innerWidth - rect.width - 10)
    }
  }

  // 添加全局监听
  document.addEventListener("click", handleGlobalClick)
  document.addEventListener("contextmenu", handleGlobalContextMenu)
  document.addEventListener("scroll", handleGlobalScroll, true)
  window.addEventListener("resize", handleWindowResize)
}

// 处理全局点击
const handleGlobalClick = (): void => {
  closeMenu()
}

// 处理全局右键
const handleGlobalContextMenu = (e: MouseEvent): void => {
  if (!e.defaultPrevented) {
    closeMenu()
  }
}

// 处理滚动
const handleGlobalScroll = (): void => {
  closeMenu()
}

// 处理窗口大小改变
const handleWindowResize = (): void => {
  closeMenu()
}

// 关闭菜单
const closeMenu = (): void => {
  visible.value = false
  removeGlobalListeners()
}

// 移除全局监听
const removeGlobalListeners = (): void => {
  document.removeEventListener("click", handleGlobalClick)
  document.removeEventListener("contextmenu", handleGlobalContextMenu)
  document.removeEventListener("scroll", handleGlobalScroll, true)
  window.removeEventListener("resize", handleWindowResize)
}

// 处理菜单项点击
const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
  // 查找点击的菜单项
  const findMenuItem = (items: MenuItem[], targetKey: string): MenuItem | null => {
    for (const item of items) {
      if (item.key === targetKey) return item
      if (item.children) {
        const found = findMenuItem(item.children, targetKey)
        if (found) return found
      }
    }
    return null
  }

  const clickedItem = findMenuItem(props.items, key as string)

  if (clickedItem) {
    // 执行菜单项的 action
    clickedItem.action?.(clickedItem, props.triggerData)
    // 触发组件事件
    emit("menu-click", clickedItem, props.triggerData)
  }

  // 关闭菜单
  closeMenu()
}

// 动画钩子
const onBeforeEnter = (): void => {
  emit("open-change", true)
}

const onAfterLeave = (): void => {
  emit("open-change", false)
}

// 组件销毁时清理
onUnmounted(() => {
  removeGlobalListeners()
})

// 暴露方法供外部使用
defineExpose({
  open: (x: number, y: number) => {
    mousePosition.value = { x, y }
    visible.value = true
  },
  close: closeMenu,
})
</script>

<style scoped>
/* 菜单过渡动画 */
.context-menu-enter-active,
.context-menu-leave-active {
  transition: all 0.2s ease;
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.context-menu-wrapper {
  /* 确保菜单在最上层 */
  isolation: isolate;
}

/* 覆盖 ant-design-vue 的一些默认样式 */
:deep(.ant-menu) {
  border: none;
  box-shadow: none;
}

:deep(.ant-menu-item),
:deep(.ant-menu-submenu-title) {
  margin: 0;
}
</style>
