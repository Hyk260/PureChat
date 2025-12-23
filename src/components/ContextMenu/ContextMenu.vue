<template>
  <Teleport to="body">
    <Transition name="context-menu">
      <div v-if="isMenuVisible" ref="menuContainerRef" class="context-menu-wrapper" :style="menuStyle">
        <Menu>
          <template v-for="item in items" :key="item.key">
            <SubMenu v-if="item.children && item.children.length">
              <template #title>
                <div class="flex gap-4 items-center text-[12px]">
                  <component :is="item.icon" v-if="item.icon" :size="12" />
                  <span>{{ item.label }}</span>
                </div>
              </template>
              <template v-for="(child, i) in item.children" :key="child.key">
                <MenuItem @click.stop="handleMenuItemClick(item, i)">
                  <div class="flex gap-4 items-center text-[12px]">
                    <component :is="child.icon" v-if="child.icon" :size="12" />
                    <span>{{ child.label }}</span>
                  </div>
                </MenuItem>
              </template>
            </SubMenu>
            <MenuItem v-else :danger="item.danger ?? false" @click.stop="handleMenuItemClick(item)">
              <div class="flex gap-4 items-center text-[12px]">
                <component :is="item.icon" v-if="item.icon" :size="12" />
                <span>{{ item.label }}</span>
              </div>
            </MenuItem>
          </template>
        </Menu>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Menu, MenuItem, SubMenu } from "ant-design-vue"
import { onKeyStroke, useEventListener } from "@vueuse/core"
import type { CSSProperties } from "vue"

import type { MenuItem as MenuItemType } from "@purechat/types"

defineOptions({
  name: "ContextMenu",
})

interface Props {
  items: MenuItemType[]
}

interface Emits {
  (e: "menuClick", item: MenuItemType, index?: number): void
  (e: "close"): void
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const isMenuVisible = ref<boolean>(false)
const menuPosition = ref({ x: 0, y: 0 })
const menuDimensions = ref({ width: 0, height: 0 })
const openEventRef = ref<MouseEvent | null>(null)

const menuContainerRef = useTemplateRef("menuContainerRef")

const menuStyle = computed<CSSProperties>(() => ({
  position: "fixed",
  left: `${menuPosition.value.x}px`,
  top: `${menuPosition.value.y}px`,
  zIndex: 9999,
}))

const DEFAULT_MENU_WIDTH = 200
const DEFAULT_MENU_HEIGHT = 300
const MARGIN = 20
const MIN_POSITION = 10

const calculatePosition = (x: number, y: number) => {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window
  const menuWidth = menuDimensions.value.width || DEFAULT_MENU_WIDTH
  const menuHeight = menuDimensions.value.height || DEFAULT_MENU_HEIGHT

  let finalX = x
  let finalY = y

  // 水平方向调整
  if (x + menuWidth > viewportWidth) {
    finalX = viewportWidth - menuWidth - MARGIN
  }
  if (finalX < 0) {
    finalX = MIN_POSITION
  }

  // 垂直方向调整
  if (y + menuHeight > viewportHeight) {
    finalY = viewportHeight - menuHeight - MARGIN
  }
  if (finalY < 0) {
    finalY = MIN_POSITION
  }

  return { x: finalX, y: finalY }
}

const handleMenuItemClick = (item: MenuItemType, index?: number) => {
  emit("menuClick", item, index)
  close()
}

const open = async (event?: MouseEvent) => {
  if (event) {
    openEventRef.value = event
    const pos = calculatePosition(event.clientX, event.clientY)
    menuPosition.value = pos
  }

  isMenuVisible.value = true

  await nextTick()

  if (menuContainerRef.value && event) {
    const rect = menuContainerRef.value.getBoundingClientRect()
    menuDimensions.value = { width: rect.width, height: rect.height + 10 }

    const adjustedPos = calculatePosition(event.clientX, event.clientY)
    menuPosition.value = adjustedPos
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (openEventRef.value === event) {
    openEventRef.value = null
    return
  }

  if (isMenuVisible.value && menuContainerRef.value && !menuContainerRef.value.contains(event.target as Node)) {
    close()
  }
}

const close = () => {
  isMenuVisible.value = false
  openEventRef.value = null
  emit("close")
}

let clickCleanup: (() => void) | null = null
let contextMenuCleanup: (() => void) | null = null

watch(isMenuVisible, (visible) => {
  if (visible) {
    clickCleanup?.()
    contextMenuCleanup?.()

    nextTick(() => {
      const clickStop = useEventListener(document, "click", handleClickOutside, { once: false })
      const contextMenuStop = useEventListener(document, "contextmenu", handleClickOutside, { once: false })
      clickCleanup = clickStop
      contextMenuCleanup = contextMenuStop
    })
  } else {
    clickCleanup?.()
    contextMenuCleanup?.()
    clickCleanup = null
    contextMenuCleanup = null
  }
})

onKeyStroke("Escape", () => {
  if (isMenuVisible.value) {
    close()
  }
})

onUnmounted(() => {
  clickCleanup?.()
  contextMenuCleanup?.()
})

defineExpose({
  open,
  close,
  visible: isMenuVisible,
})
</script>
<style>
.ant-menu-item-only-child {
  height: 28px !important;
  line-height: 28px !important;
  padding-inline: 8px;
  border-radius: 4px;
}
</style>
<style lang="scss" scoped>
:deep(.ant-menu-item) {
  height: 28px !important;
  line-height: 28px !important;
  padding-inline: 8px;
  border-radius: 4px;
}

:deep(.ant-menu-submenu) {
  height: 28px;
  line-height: 28px;
}

:deep(.ant-menu-submenu-title) {
  height: 28px !important;
  line-height: 28px !important;
  padding: 0 8px;
}

:deep(.ant-menu) {
  border-inline-end: none !important;
}

.context-menu-wrapper {
  isolation: isolate;
  min-width: 120px;
  background: white;
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.03),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05) !important;
  overflow: hidden;

  .menu-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
}

.context-menu-enter-active,
.context-menu-leave-active {
  transition: all 0.2s ease;
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
