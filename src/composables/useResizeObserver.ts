import { onBeforeUnmount, ref } from "vue"

import { debounce } from "lodash-es"

export function useResizeObserver() {
  const shouldShowChevrons = ref(false)
  let resizeObserver: ResizeObserver | null = null

  const checkContainerHeight = (el: HTMLElement | null, threshold: number = 350): boolean => {
    return el ? el.scrollHeight >= threshold : false
  }

  const createDebouncedHeightCheck = (threshold: number = 350) => {
    return debounce((el: HTMLElement | null) => {
      shouldShowChevrons.value = checkContainerHeight(el, threshold)
    }, 180)
  }

  const initResizeObserver = (element: HTMLElement | null, threshold: number = 350) => {
    if (!element) return

    const debouncedHeightCheck = createDebouncedHeightCheck(threshold)

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", () => debouncedHeightCheck(element))
      return debouncedHeightCheck
    }

    resizeObserver = new ResizeObserver(() => debouncedHeightCheck(element))
    resizeObserver.observe(element)
    return debouncedHeightCheck
  }

  const cleanupResizeObserver = (debouncedHeightCheck?: ReturnType<typeof createDebouncedHeightCheck>) => {
    if (resizeObserver) {
      try {
        resizeObserver.disconnect()
      } catch {
        // ignore
      }
      resizeObserver = null
    }

    if (debouncedHeightCheck) {
      debouncedHeightCheck.cancel()
    }

    if (typeof ResizeObserver === "undefined") {
      window.removeEventListener("resize", () => {})
    }
  }

  onBeforeUnmount(() => {
    cleanupResizeObserver()
  })

  return {
    shouldShowChevrons,
    checkContainerHeight,
    createDebouncedHeightCheck,
    initResizeObserver,
    cleanupResizeObserver,
  }
}
