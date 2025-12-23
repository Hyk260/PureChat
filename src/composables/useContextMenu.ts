import { useTemplateRef, shallowRef } from "vue"
import type { MenuItem } from "@pure/types"
import type ContextMenu from "@/components/ContextMenu/ContextMenu.vue"

interface ContextMenuInstance {
  close: () => void
  open: (event?: MouseEvent) => Promise<void>
}

const globalMenuInstances = new Set<ContextMenuInstance>()

export interface UseContextMenuOptions {
  onBeforeShow?: (event: MouseEvent, data?: any) => boolean | void
  onAfterShow?: () => void
  onBeforeHide?: () => boolean | void
  onAfterHide?: () => void
}

export function useContextMenu(options?: UseContextMenuOptions) {
  const contextMenuRef = useTemplateRef<typeof ContextMenu>("contextMenuRef")
  const currentData = shallowRef<any>(null)

  const showContextMenu = (event: MouseEvent, data?: any) => {
    event.preventDefault()
    event.stopPropagation()

    const currentInstance = contextMenuRef.value as unknown as ContextMenuInstance

    globalMenuInstances.forEach((instance) => {
      if (instance !== currentInstance) {
        instance.close()
      }
    })

    const shouldShow = options?.onBeforeShow?.(event, data)
    if (shouldShow === false) return

    currentData.value = data
    const menuInstance = contextMenuRef.value as unknown as ContextMenuInstance
    menuInstance?.open(event)

    if (menuInstance) {
      globalMenuInstances.add(menuInstance)
    }

    options?.onAfterShow?.()
  }

  const hideContextMenu = () => {
    const shouldHide = options?.onBeforeHide?.()
    if (shouldHide === false) return

    const menuInstance = contextMenuRef.value as unknown as ContextMenuInstance
    menuInstance?.close()
    currentData.value = null

    if (menuInstance) {
      globalMenuInstances.delete(menuInstance)
    }

    options?.onAfterHide?.()
  }

  const updateMenuItem = (_key: string, _updates: Partial<MenuItem>) => {}

  return {
    contextMenuRef,
    currentData,
    showContextMenu,
    hideContextMenu,
    updateMenuItem,
  }
}
