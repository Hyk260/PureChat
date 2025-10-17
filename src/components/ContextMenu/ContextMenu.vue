<template>
  <Dropdown
    v-model:open="visible"
    :trigger="['contextmenu']"
    :placement="placement"
    :overlay-style="{ minWidth: '200px' }"
    @open-change="handleOpenChange"
  >
    <template #default>
      <div @contextmenu.prevent="handleContextMenu">
        <slot />
      </div>
    </template>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <template v-for="item in items" :key="item.id">
          <a-menu-item>{{ item.text }}</a-menu-item>
        </template>
      </Menu>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Dropdown, Menu, MenuDivider, MenuItem as AMenuItem, SubMenu } from "ant-design-vue"

import type { ContextMenuProps, MenuItem } from "@/types/contextMenu"
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

// 控制菜单显示隐藏
const visible = ref<boolean>(false)

// 动态计算弹出位置
const placement = ref<"bottomLeft" | "bottomRight" | "topLeft" | "topRight">("bottomLeft")

// 处理右键点击事件
const handleContextMenu = (event: MouseEvent): void => {
  // 根据鼠标位置动态调整菜单弹出位置
  const { clientX, clientY } = event
  const { innerWidth, innerHeight } = window

  if (clientX > innerWidth / 2) {
    placement.value = clientY > innerHeight / 2 ? "topRight" : "bottomRight"
  } else {
    placement.value = clientY > innerHeight / 2 ? "topLeft" : "bottomLeft"
  }

  visible.value = true
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
  visible.value = false
}

// 处理菜单打开/关闭
const handleOpenChange = (open: boolean): void => {
  emit("open-change", open)
}

defineExpose({
  open: () => {
    visible.value = true
  },
  close: () => {
    visible.value = false
  },
  handleContextMenu,
})
</script>
