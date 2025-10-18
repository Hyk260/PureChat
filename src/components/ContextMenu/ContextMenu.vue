<template>
  <Teleport to="body">
    <Transition name="context-menu" @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
      <div
        v-if="visible"
        ref="menuContainerRef"
        class="context-menu-wrapper"
        :style="menuStyle"
        @click.stop
        @contextmenu.prevent
      >
        <!-- @click="handleMenuClick" -->
        <Menu>
          <template v-for="item in items" :key="item.key">
            <!-- <SubMenu v-if="false && item.children && item.children.length">
              <template #title>
                <div class="flex gap-4 items-center">
                  <component :is="item.icon" v-if="item.icon" :size="16"></component>
                  <span>
                    {{ item.label }}
                  </span>
                </div>
              </template>
              <template v-for="child in item.children" :key="child.key">
                <MenuItem>
                  <div class="flex gap-4 items-center">
                    <component :is="child.icon" v-if="child.icon" :size="16"></component>
                    <span>
                      {{ child.label }}
                    </span>
                  </div>
                </MenuItem>
              </template>
            </SubMenu> -->
            <MenuItem @click.stop="handleMenuItemClick(item)">
              <div class="flex gap-4 items-center">
                <component :is="item.icon" v-if="item.icon" :size="16"></component>
                <span>
                  {{ item.label }}
                </span>
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

import type { MenuItem as MenuItemType } from "@/types/contextMenu"
import type { MenuProps } from "ant-design-vue"

export interface Props {
  items: MenuItemType[] | []
  triggerData?: any
}

const props = withDefaults(defineProps<Props>(), {
  triggerData: null,
})

const emit = defineEmits<{
  "menu-click": [item: MenuItemType, data?: any]
  "open-change": [open: boolean]
  close: []
}>()

const visible = ref<boolean>(false)
const menuContainerRef = ref<HTMLElement>()
const position = ref({ x: 0, y: 0 })
const menuSize = ref({ width: 0, height: 0 })

const menuStyle = computed(() => ({
  position: "fixed",
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
  zIndex: 9999,
}))

const calculatePosition = (x: number, y: number) => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const menuWidth = menuSize.value.width || 200 // Default width
  const menuHeight = menuSize.value.height || 300 // Default height

  let finalX = x
  let finalY = y

  // Adjust horizontal position
  if (x + menuWidth > viewportWidth) {
    finalX = viewportWidth - menuWidth - 10
  }
  if (finalX < 0) {
    finalX = 10
  }

  // Adjust vertical position
  if (y + menuHeight > viewportHeight) {
    finalY = viewportHeight - menuHeight - 10
  }
  if (finalY < 0) {
    finalY = 10
  }

  return { x: finalX, y: finalY }
}

const handleMenuClick: MenuProps["onClick"] = (data) => {
  const { key } = data
  const findMenuItem = (items: MenuItemType[], targetKey: string): MenuItemType | null => {
    for (const item of items) {
      if (item.key === targetKey) return item
      if (item.children) {
        const found = findMenuItem(item.children, targetKey)
        if (found) return found
      }
    }
    return null
  }

  const clickedItem = findMenuItem(props.items, key)

  if (clickedItem) {
    clickedItem.action?.(clickedItem)
    emit("menu-click", clickedItem)
  }

  visible.value = false
}

const handleMenuItemClick = (item: MenuItemType) => {
  if (item) {
    emit("menu-click", item)
  }
  visible.value = false
}

const handleOpenChange = (open: boolean): void => {
  emit("open-change", open)
}

const open = async (event?: MouseEvent) => {
  if (event) {
    const pos = calculatePosition(event.clientX, event.clientY)
    position.value = pos
  }

  visible.value = true

  await nextTick()

  if (menuContainerRef.value) {
    const rect = menuContainerRef.value.getBoundingClientRect()
    menuSize.value = { width: rect.width, height: rect.height + 10 }

    if (event) {
      const adjustedPos = calculatePosition(event.clientX, event.clientY)
      position.value = adjustedPos
    }
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (visible.value && menuContainerRef.value && !menuContainerRef.value.contains(event.target as Node)) {
    close()
  }
}

const onBeforeEnter = () => {
  emit("open-change", true)
}

const onAfterLeave = () => {
  emit("open-change", false)
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && visible.value) {
    close()
  }
}

const close = () => {
  visible.value = false
  emit("close")
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
  document.addEventListener("contextmenu", handleClickOutside)
  document.addEventListener("keydown", handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
  document.removeEventListener("contextmenu", handleClickOutside)
  document.removeEventListener("keydown", handleEscape)
})

defineExpose({
  open,
  close,
  visible,
})
</script>

<style lang="scss" scoped>
:deep(.ant-menu-item) {
  height: 32px;
  line-height: 32px;
}

:deep(.ant-menu-submenu) {
  height: 32px;
  line-height: 32px;
}
:deep(.ant-menu-submenu-title) {
  height: 32px !important;
  line-height: 32px !important;
}

.context-menu-wrapper {
  isolation: isolate;
  min-width: 120px;
  background: white;
  border-radius: 8px;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .menu-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
}

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
</style>
