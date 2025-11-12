<script setup lang="ts">
import { Popover } from "ant-design-vue"
import { ChevronDown, ChevronUp } from "lucide-vue-next"
import { useIntersectionObserver } from "@vueuse/core"
import { useState } from "@/hooks/useState"

import type { DB_Message } from "@/types"

const MIN_WIDTH = 16
const MAX_WIDTH = 30
const MAX_CONTENT_LENGTH = 320
const MIN_MESSAGES = 4

const props = defineProps<{
  messages: DB_Message[]
  scrollbarRef: Ref<HTMLElement | null>
}>()

const activeIndex = ref<number>(0)
const [isHovered, setIsHovered] = useState(false)

const scrollToMessage = (messageId: string, i: number) => {
  const el = document.getElementById(`choice-${messageId}`)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
  activeIndex.value = i
}

const messagesList = computed(() => props.messages.filter((t) => !t?.isTimeDivider))

const showNavigator = computed(() => messagesList.value.length > MIN_MESSAGES)

// const initIntersectionObserver = async () => {
//   if (!messagesList.value.length) return

//   const rootEl = getScrollContainer()

//   if (intersectionObserver.value) {
//     intersectionObserver.value.disconnect()
//   }

//   intersectionObserver.value = new IntersectionObserver(
//     (entries) => {
//       // 找到最接近视口顶部的可见元素
//       let best: { entry: IntersectionObserverEntry; distance: number } | null = null

//       for (const entry of entries) {
//         if (!entry.isIntersecting) continue // 只处理可见的元素

//         const rect = entry.boundingClientRect
//         const distance = Math.abs(rect.top) // 距离视口顶部绝对距离

//         if (!best || distance < best.distance) {
//           best = { entry, distance }
//         }
//       }

//       if (best) {
//         const msgId = (best.entry.target as HTMLElement).getAttribute("data-message-id")
//         if (msgId) {
//           const idx = messagesList.value.findIndex((msg) => msg.ID === msgId)
//           if (idx !== -1 && idx !== activeIndex.value) {
//             activeIndex.value = idx
//           }
//         }
//       }
//     },
//     {
//       root: rootEl,
//       // rootMargin: "-20% 0px -20% 0px",
//       rootMargin: "-20% 0px -70% 0px",
//       threshold: [0, 0.1, 0.5, 1],
//     }
//   )

//   // messagesList.value.forEach((message) => {
//   //   const element = props.messageRefMap.get(message.ID)
//   //   if (element) {
//   //     element.setAttribute("data-message-id", message.ID)
//   //     intersectionObserver.value?.observe(element)
//   //   }
//   // })
// }

const getIndicatorWidth = (content: string | undefined) => {
  if (!content) return MIN_WIDTH

  const ratio = Math.min(content.length / MAX_CONTENT_LENGTH, 1)

  return MIN_WIDTH + (MAX_WIDTH - MIN_WIDTH) * ratio
}

const getPreviewText = (content: string | undefined) => {
  if (!content) return ""

  const normalized = content.replaceAll(/\s+/g, " ").trim()
  if (!normalized) return ""

  return normalized.slice(0, 100) + (normalized.length > 100 ? "…" : "")
}

const handleStep = (direction: "prev" | "next") => {
  if (direction === "prev") {
    if (activeIndex.value > 0) {
      const prevIndex = activeIndex.value - 1
      const prevMessage = messagesList.value[prevIndex]
      if (prevMessage) {
        scrollToMessage(prevMessage.ID, prevIndex)
      }
    }
  } else {
    if (activeIndex.value > 0) {
      const prevIndex = activeIndex.value - 1
      const prevMessage = messagesList.value[prevIndex]
      if (prevMessage) {
        scrollToMessage(prevMessage.ID, prevIndex)
      }
    }
  }
}

const initIntersectionObserver = () => {
  messagesList.value.forEach((message) => {
    const el = document.getElementById(message.ID)
    if (el) {
      useIntersectionObserver(
        el,
        ([entry]) => {
          if (!entry) return
          // debugger
          const msgId = entry.target.getAttribute("id")

          // console.log("msgId", entry.target?.innerText)
          if (msgId) {
            const idx = messagesList.value.findIndex((msg) => msg.ID === msgId)
            if (idx !== -1 && idx !== activeIndex.value) {
              activeIndex.value = idx
            }
          }

          const isVisible = entry?.isIntersecting || false
          console.log("isVisible", isVisible)
        },
        {
          root: props.scrollbarRef?.wrapRef,
          rootMargin: "0px 0px 10px 0px",
          threshold: 1.0,
        }
      )
    }
  })
}

watch(
  () => [props.messages],
  () => {
    nextTick(() => {
      initIntersectionObserver()
    })
  },
  { deep: true }
)

onMounted(async () => {
  await nextTick()
  initIntersectionObserver()
})

onUnmounted(() => {})
</script>

<template>
  <div v-if="showNavigator" class="message-nav">
    <div class="message-nav__panel" @mouseenter="setIsHovered(true)" @mouseleave="setIsHovered(false)">
      <button
        v-show="isHovered"
        aria-label="上一条消息"
        class="message-nav__btn"
        type="button"
        :disabled="activeIndex === 0"
        @click="handleStep('prev')"
      >
        <ChevronUp :size="16" :color="activeIndex === 0 ? '#999999' : ''" />
      </button>
      <div class="message-nav__dots">
        <template v-for="(item, index) in messagesList" :key="item.ID">
          <Popover placement="left">
            <template #content>
              <span class="max-w-200 max-h-120 multi-truncate-3">
                {{ getPreviewText(item.payload?.text) }}
              </span>
            </template>
            <button
              class="message-nav__dot-btn"
              type="button"
              :aria-label="`跳转至第 ${index + 1} 条消息`"
              :aria-current="activeIndex === index ? true : false"
              @click="scrollToMessage(item.ID, index)"
            >
              <div
                :style="{ width: `${getIndicatorWidth(item.payload?.text)}px` }"
                :class="activeIndex === index ? 'message-nav__dot message-nav__dot--active' : 'message-nav__dot'"
              ></div>
            </button>
          </Popover>
        </template>
      </div>
      <button
        v-show="isHovered"
        aria-label="下一条消息"
        class="message-nav__btn"
        type="button"
        :disabled="activeIndex === messagesList.length - 1"
        @click="handleStep('next')"
      >
        <ChevronDown :size="16" :color="activeIndex === messagesList.length - 1 ? '#999999' : ''" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  // background: rgba(0, 0, 0, 0.12);
  background-color: #222222;
  box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.15);
}
</style>
