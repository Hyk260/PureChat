/**
 * scrollIntoView 的简单包装器，带有通用默认选项。
 * 提供统一的接口和合理的默认值。
 *
 * @param element - 要滚动到视图中的目标元素
 * @param options - 滚动选项。如果未提供，使用 { behavior: 'smooth', block: 'center', inline: 'nearest' }
 */
export function scrollIntoView(element: HTMLElement, options?: ScrollIntoViewOptions): void {
  const defaultOptions: ScrollIntoViewOptions = {
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  }
  element.scrollIntoView(options ?? defaultOptions)
}

/**
 * 智能地将元素滚动到视图中心位置。
 * 优先在指定容器内滚动，避免滚动整个页面。
 *
 * @param element - 要滚动到视图中的目标元素
 * @param scrollContainer - 可选的滚动容器。如果提供且可滚动，则在其中滚动；否则使用浏览器默认滚动
 * @param behavior - 滚动行为，默认为 'smooth'
 */
export function scrollElementIntoView(
  element: HTMLElement,
  scrollContainer?: HTMLElement | null,
  behavior: ScrollBehavior = "smooth"
): void {
  if (!scrollContainer) {
    // 未指定容器，使用浏览器默认滚动
    scrollIntoView(element, { behavior, block: "center", inline: "nearest" })
    return
  }

  // 检查容器是否可滚动
  const canScroll =
    scrollContainer.scrollHeight > scrollContainer.clientHeight ||
    scrollContainer.scrollWidth > scrollContainer.clientWidth

  if (canScroll) {
    // 容器可滚动，在容器内滚动
    const containerRect = scrollContainer.getBoundingClientRect()
    const elRect = element.getBoundingClientRect()

    // 计算元素相对于容器的可滚动偏移位置
    const elementTopWithinContainer = elRect.top - containerRect.top + scrollContainer.scrollTop
    const desiredTop = elementTopWithinContainer - Math.max(0, scrollContainer.clientHeight - elRect.height) / 2

    scrollContainer.scrollTo({ top: Math.max(0, desiredTop), behavior })
  } else {
    // 容器不可滚动，回退到浏览器默认滚动
    scrollIntoView(element, { behavior, block: "center", inline: "nearest" })
  }
}
