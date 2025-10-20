<script setup lang="ts">
import { Popover } from "ant-design-vue"
import { ChevronDown, ChevronUp } from "lucide-vue-next"

import type { DB_Message } from "@/types"

const props = defineProps<{
  messages: DB_Message[]
  messageRefMap: Map<string, HTMLElement>
  messageView: any
}>()

const emit = defineEmits<{
  navigate: [index: number]
}>()

const activeIndex = ref<number>(0)
const intersectionObserver = ref<IntersectionObserver | null>(null)

const scrollToMessage = (messageId: string, i: number) => {
  const el = props.messageRefMap.get(messageId)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    activeIndex.value = i
    emit("navigate", i)
  }
}

const messagesList = computed(() => props.messages.filter((t) => !t?.isTimeDivider))

const getScrollContainer = (): HTMLElement | null => {
  const mv = props.messageView as any
  if (!mv) {
    return document.querySelector(".message-info-view-content")
  }
  if (mv instanceof HTMLElement) return mv
  if (mv.$el instanceof HTMLElement) return mv.$el
  if (mv.el instanceof HTMLElement) return mv.el
  return null
}

const initIntersectionObserver = async () => {
  if (!messagesList.value.length) return

  const rootEl = getScrollContainer()

  if (intersectionObserver.value) {
    intersectionObserver.value.disconnect()
  }

  intersectionObserver.value = new IntersectionObserver(
    (entries) => {
      // 找到最接近视口顶部的可见元素
      let best: { entry: IntersectionObserverEntry; distance: number } | null = null

      for (const entry of entries) {
        if (!entry.isIntersecting) continue // 只处理可见的元素

        const rect = entry.boundingClientRect
        const distance = Math.abs(rect.top) // 距离视口顶部绝对距离

        if (!best || distance < best.distance) {
          best = { entry, distance }
        }
      }

      if (best) {
        const msgId = (best.entry.target as HTMLElement).getAttribute("data-message-id")
        if (msgId) {
          const idx = messagesList.value.findIndex((msg) => msg.ID === msgId)
          if (idx !== -1 && idx !== activeIndex.value) {
            activeIndex.value = idx
            emit("navigate", idx)
          }
        }
      }
    },
    {
      root: rootEl,
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.1, 0.5, 1],
    }
  )

  messagesList.value.forEach((message) => {
    const element = props.messageRefMap.get(message.ID)
    if (element) {
      element.setAttribute("data-message-id", message.ID)
      intersectionObserver.value?.observe(element)
    }
  })
}

const navigatePrev = () => {
  if (activeIndex.value > 0) {
    const prevIndex = activeIndex.value - 1
    const prevMessage = messagesList.value[prevIndex]
    if (prevMessage) {
      scrollToMessage(prevMessage.ID, prevIndex)
    }
  }
}

const navigateNext = () => {
  if (activeIndex.value < messagesList.value.length - 1) {
    const nextIndex = activeIndex.value + 1
    const nextMessage = messagesList.value[nextIndex]
    if (nextMessage) {
      scrollToMessage(nextMessage.ID, nextIndex)
    }
  }
}

watch(
  () => [props.messages, props.messageRefMap],
  () => {
    nextTick(() => {
      initIntersectionObserver()
    })
  },
  { deep: true }
)

onMounted(() => {
  nextTick(() => {
    initIntersectionObserver()
  })
})

onUnmounted(() => {
  if (intersectionObserver.value) {
    intersectionObserver.value.disconnect()
  }
})
</script>

<template>
  <div class="message-nav">
    <div class="message-nav__panel">
      <button
        aria-label="上一条消息"
        class="message-nav__btn"
        type="button"
        :disabled="activeIndex === 0"
        @click="navigatePrev"
      >
        <ChevronUp :size="16" :color="activeIndex === 0 ? '#999999' : ''" />
      </button>
      <div class="message-nav__dots">
        <template v-for="(item, index) in messagesList" :key="item.ID">
          <Popover placement="left">
            <template #content>
              <span class="max-w-200 max-h-120 multi-truncate-5">
                {{ item.payload.text }}
              </span>
            </template>
            <button
              :aria-label="`跳转至第 ${index + 1} 条消息`"
              class="message-nav__dot-btn"
              type="button"
              :aria-current="activeIndex === index ? true : false"
              @click="scrollToMessage(item.ID, index)"
            >
              <span
                :class="activeIndex === index ? 'message-nav__dot message-nav__dot--active' : 'message-nav__dot'"
              ></span>
            </button>
          </Popover>
        </template>
      </div>
      <button
        aria-label="下一条消息"
        class="message-nav__btn"
        type="button"
        :disabled="activeIndex === messagesList.length - 1"
        @click="navigateNext"
      >
        <ChevronDown :size="16" :color="activeIndex === messagesList.length - 1 ? '#999999' : ''" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.message-nav {
  width: 32px;
  position: absolute;
  right: 3px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
.message-nav__panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 8px;
  padding: 4px 0;
  align-items: center;
}
.message-nav__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0;
}
.message-nav__btn:hover:not(:disabled) {
  background-color: #f0f2f5;
}
.message-nav__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.message-nav__dots {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 100px;
  overflow-y: hidden;
  /* padding: 4px; */
  align-items: center;
}
.message-nav__dot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  /* transition: background-color 0.2s; */
  padding: 4px;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}
.message-nav__dot-btn:hover {
  background-color: #f0f2f5;
}
.message-nav__dot-btn[aria-current="true"] {
  background-color: #f0f2f5;
}
.message-nav__dot {
  width: 22px;
  height: 4px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  display: inline-block;
}
.message-nav__dot--active {
  background-color: #222222;
  box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.15);
}
</style>
