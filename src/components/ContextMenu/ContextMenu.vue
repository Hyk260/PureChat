<template>
  <Teleport to="body">
    <Transition name="context-menu" @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
      <div v-if="isMenuVisible" ref="menuContainerRef" class="context-menu-wrapper" :style="menuStyle">
        <Menu>
          <template v-for="item in items" :key="item.key">
            <SubMenu v-if="item.children && item.children.length">
              <template #title>
                <div class="flex gap-4 items-center">
                  <component :is="item.icon" v-if="item.icon" :size="12" />
                  <span>
                    {{ item.label }}
                  </span>
                </div>
              </template>
              <template v-for="(child, i) in item.children" :key="child.key">
                <MenuItem @click.stop="handleMenuItemClick(item.children[i])">
                  <div class="flex gap-4 items-center">
                    <component :is="child.icon" v-if="child.icon" :size="12" />
                    <span>
                      {{ child.label }}
                    </span>
                  </div>
                </MenuItem>
              </template>
            </SubMenu>
            <MenuItem v-else :danger="item.danger ?? false" @click.stop="handleMenuItemClick(item)">
              <div class="flex gap-4 text-[12px] items-center">
                <component :is="item.icon" v-if="item.icon" :size="12" />
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
import { useEventListener } from "@vueuse/core"
import type { CSSProperties } from "vue"

import type { MenuItem as MenuItemType } from "@/types/contextMenu"

defineOptions({
  name: "ContextMenu",
})

export interface Props {
  items: MenuItemType[] | []
}

defineProps<Props>()

const emit = defineEmits<{
  "menu-click": [item: MenuItemType]
  close: []
}>()

const isMenuVisible = ref<boolean>(false)
const menuPosition = ref({ x: 0, y: 0 })
const menuDimensions = ref({ width: 0, height: 0 })

const menuContainerRef = useTemplateRef("menuContainerRef")

const menuStyle = computed<CSSProperties>(() => ({
  position: "fixed",
  left: `${menuPosition.value.x}px`,
  top: `${menuPosition.value.y}px`,
  zIndex: 9999,
}))

const calculatePosition = (x: number, y: number) => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const menuWidth = menuDimensions.value.width || 200 // Default width
  const menuHeight = menuDimensions.value.height || 300 // Default height

  let finalX = x
  let finalY = y

  if (x + menuWidth > viewportWidth) {
    finalX = viewportWidth - menuWidth - 10
  }
  if (finalX < 0) {
    finalX = 10
  }
  if (y + menuHeight > viewportHeight) {
    finalY = viewportHeight - menuHeight - 10
  }
  if (finalY < 0) {
    finalY = 10
  }

  return { x: finalX, y: finalY }
}

const handleMenuItemClick = (item: MenuItemType | undefined) => {
  if (item) emit("menu-click", item)
  isMenuVisible.value = false
}

const open = async (event?: MouseEvent) => {
  if (event) {
    const pos = calculatePosition(event.clientX, event.clientY)
    menuPosition.value = pos
  }

  isMenuVisible.value = true

  await nextTick()

  if (menuContainerRef.value) {
    const rect = menuContainerRef.value.getBoundingClientRect()
    menuDimensions.value = { width: rect.width, height: rect.height + 10 }

    if (event) {
      const adjustedPos = calculatePosition(event.clientX, event.clientY)
      menuPosition.value = adjustedPos
    }
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (isMenuVisible.value && menuContainerRef.value && !menuContainerRef.value.contains(event.target as Node)) {
    close()
  }
}

const onBeforeEnter = () => {}

const onAfterLeave = () => {}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isMenuVisible.value) {
    close()
  }
}

const close = () => {
  isMenuVisible.value = false
  emit("close")
}

useEventListener(document, "click", handleClickOutside)
useEventListener(document, "contextmenu", handleClickOutside)
useEventListener(document, "keydown", handleEscape)

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
  // box-shadow:
  //   0 3px 6px -4px rgba(0, 0, 0, 0.12),
  //   0 6px 16px 0 rgba(0, 0, 0, 0.08),
  //   0 9px 28px 8px rgba(0, 0, 0, 0.05);
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
