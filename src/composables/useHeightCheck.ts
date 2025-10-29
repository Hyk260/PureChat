import { ref } from "vue"
import { debounce } from "lodash-es"

export function useHeightCheck() {
  const shouldShowChevrons = ref(false)

  const checkContainerHeight = (el: HTMLElement | null, threshold: number = 350): boolean => {
    return el ? el.scrollHeight >= threshold : false
  }

  const createDebouncedHeightCheck = (el: HTMLElement | null, threshold: number = 350) => {
    return debounce(() => {
      shouldShowChevrons.value = checkContainerHeight(el, threshold)
    }, 50)
  }

  const heightCheck = (el: HTMLElement | null, threshold: number = 350) => {
    createDebouncedHeightCheck(el, threshold)()
  }

  return {
    shouldShowChevrons,
    checkContainerHeight,
    heightCheck,
  }
}
