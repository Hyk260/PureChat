import { ref, shallowRef } from "vue"

import type { MenuItem } from "@/types/contextMenu"
export interface UseContextMenuOptions {
  onBeforeShow?: (event: MouseEvent, data?: any) => boolean | void
  onAfterShow?: () => void
  onBeforeHide?: () => boolean | void
  onAfterHide?: () => void
}

export function useContextMenu(options?: UseContextMenuOptions) {
  const contextMenuRef = ref()
  const currentData = shallowRef<any>(null)

  const showContextMenu = (event: MouseEvent, data?: any) => {
    event.preventDefault()
    event.stopPropagation()

    const shouldShow = options?.onBeforeShow?.(event, data)
    if (shouldShow === false) return

    currentData.value = data
    contextMenuRef.value?.open(event)

    options?.onAfterShow?.()
  }

  const hideContextMenu = (): void => {
    const shouldHide = options?.onBeforeHide?.()
    if (shouldHide === false) return

    contextMenuRef.value?.close()
    currentData.value = null

    options?.onAfterHide?.()
  }

  const updateMenuItem = (key: string, updates: Partial<MenuItem>) => {}

  return {
    contextMenuRef,
    currentData,
    showContextMenu,
    hideContextMenu,
    updateMenuItem,
  }
}
