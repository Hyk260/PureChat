<script setup lang="ts">
import { Popover } from "ant-design-vue"
import { ChevronDown, ChevronUp } from "lucide-vue-next"
import { useIntersectionObserver } from "@vueuse/core"
import { useState } from "@/hooks/useState"
import { useChatStore } from "@/stores/modules/chat"

import type { DB_Message } from "@/types"

interface MessageCache {
  width: number
  previewText: string
  senderLabel: string
}
type ScrollEl = HTMLElement & { wrapRef?: HTMLElement }

const MIN_WIDTH = 12
const MAX_WIDTH = 24
const MAX_CONTENT_LENGTH = 320
const MIN_MESSAGES = 5
const PREVIEW_MAX_LEN = 100

interface Props {
  scrollbarRef: Ref<ScrollEl | null>
}

const props = defineProps<Props>()

const activeIndex = ref<number>(-1)
const [isHovered, setIsHovered] = useState(false)

const chatStore = useChatStore()

const { currentMessageList } = storeToRefs(chatStore)

const messagesList = computed(() => currentMessageList.value.filter((t) => !t?.isTimeDivider))

const showNavigator = computed(() => messagesList.value.length > MIN_MESSAGES && __LOCAL_MODE__)

const idToIndexMap = computed<Map<string, number>>(() => new Map(messagesList.value.map((m, i) => [m.ID, i])))

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

const getRootEl = (): HTMLElement | null => {
  const val = props.scrollbarRef as any
  return val?.wrapRef ?? val ?? null
}

const buildMsgElId = (id: string) => `choice-${id}`
const getMessageElement = (id: string): HTMLElement | null => document.getElementById(buildMsgElId(id))

const scrollToMessage = (messageId: string, i: number) => {
  const el = getMessageElement(messageId)
  if (!el) return
  activeIndex.value = i
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

const scrollToMessageByIndex = (i: number) => {
  const navEl = document.getElementById(`message-nav__dot-btn-${i}`)
  if (!navEl) return
  navEl.scrollIntoView({ behavior: "smooth", block: "center" })
}

const getIndicatorWidth = (content: string | undefined): number => {
  if (!content) return MIN_WIDTH
  const ratio = Math.min(content.length / MAX_CONTENT_LENGTH, 1)
  return MIN_WIDTH + (MAX_WIDTH - MIN_WIDTH) * ratio
}

const getPreviewText = (content: string | undefined): string => {
  if (!content) return ""
  const normalized = content.replace(/\s+/g, " ").trim()
  if (!normalized) return ""
  return normalized.length > PREVIEW_MAX_LEN ? normalized.slice(0, PREVIEW_MAX_LEN) + "…" : normalized
}

const messagesWithCache = computed<Array<{ message: DB_Message; cache: MessageCache }>>(() => {
  return messagesList.value.map((message) => {
    const content = message.payload?.text
    return {
      message,
      cache: {
        senderLabel: message.flow === "out" ? "你" : "Agent",
        width: getIndicatorWidth(content),
        previewText: getPreviewText(content),
      },
    }
  })
})

const handleStep = (direction: "prev" | "next") => {
  const delta = direction === "prev" ? -1 : 1
  const nextIndex = clamp(activeIndex.value + delta, 0, messagesList.value.length - 1)
  const nextMessage = messagesList.value[nextIndex]
  if (nextMessage) scrollToMessage(nextMessage.ID, nextIndex)
}

// 使用 requestAnimationFrame 节流 IntersectionObserver 回调
let rafId: number | null = null
const pendingElements = new Set<HTMLElement>()

const scheduleActiveIndexUpdate = () => {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    const rootEl = getRootEl()
    if (!rootEl) {
      pendingElements.clear()
      rafId = null
      return
    }
    const rootTop = rootEl.getBoundingClientRect().top

    let bestIndex = -1
    let bestDistance = Infinity

    pendingElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const distance = Math.abs(rect.top - rootTop)

      const msgId = el.id?.startsWith("choice-") ? el.id.slice(7) : el.id
      const idx = idToIndexMap.value.get(msgId)

      if (idx !== undefined && distance < bestDistance) {
        bestIndex = idx
        bestDistance = distance
      }
    })

    if (bestIndex !== -1 && bestIndex !== activeIndex.value) {
      activeIndex.value = bestIndex
    }

    pendingElements.clear()
    rafId = null
  })
}

let stopObservers: Array<() => void> = []

const cleanupObservers = () => {
  stopObservers.forEach((stop) => stop())
  stopObservers = []
}

const initIntersectionObserver = () => {
  cleanupObservers()
  const rootEl = getRootEl()
  if (!rootEl) return

  messagesList.value.forEach((m) => {
    const el = getMessageElement(m.ID)
    if (!el) return
    const { stop } = useIntersectionObserver(
      el,
      (entries) => {
        // 只要进入/离开视口都尝试刷新
        entries.forEach((e) => {
          if (e?.target instanceof HTMLElement) {
            pendingElements.add(e.target)
          }
        })
        scheduleActiveIndexUpdate()
      },
      {
        root: rootEl,
        // rootMargin: "0px 0px 10px 0px",
        rootMargin: "0px 0px -60% 0px",
        // threshold: 1.0,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )
    stopObservers.push(stop)
  })
}

// watch(
//   () => messagesList.value.map((m) => m.ID).join("|"),
//   async () => {
//     await nextTick()
//     initIntersectionObserver()
//   }
// )

watch(activeIndex, (val) => {
  scrollToMessageByIndex(val)
})

onMounted(async () => {
  await nextTick()
  // initIntersectionObserver()
})

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  pendingElements.clear()
  cleanupObservers()
})
</script>

<template>
  <div v-if="showNavigator" class="message-nav">
    <div class="message-nav__panel scroll-hidden" @mouseenter="setIsHovered(true)" @mouseleave="setIsHovered(false)">
      <button
        aria-label="上一条消息"
        class="message-nav__btn cursor-pointer"
        :class="{ 'opacity-0': !isHovered }"
        type="button"
        :disabled="activeIndex === 0"
        @click="handleStep('prev')"
      >
        <ChevronUp :size="16" :color="activeIndex === 0 ? '#999999' : ''" />
      </button>
      <div class="message-nav__dots scroll-hidden">
        <template v-for="(item, index) in messagesWithCache" :key="item.message.ID">
          <Popover placement="left">
            <template #content>
              <span class="max-w-200 max-h-120 multi-truncate-3">
                <p>{{ item.cache.senderLabel }}</p>
                <p>{{ item.cache.previewText }}</p>
              </span>
            </template>
            <button
              :id="`message-nav__dot-btn-${index}`"
              class="message-nav__dot-btn"
              type="button"
              :aria-label="`跳转至第 ${index + 1} 条消息`"
              :aria-current="activeIndex === index ? true : false"
              @click="scrollToMessage(item.message.ID, index)"
            >
              <div
                :style="{ width: `${item.cache.width}px` }"
                :class="activeIndex === index ? 'message-nav__dot message-nav__dot--active' : 'message-nav__dot'"
              ></div>
            </button>
          </Popover>
        </template>
      </div>
      <button
        aria-label="下一条消息"
        class="message-nav__btn cursor-pointer"
        :class="{ 'opacity-0': !isHovered }"
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
  position: absolute;
  right: 4px;
  // height: 100%;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  top: 50%;
}
.message-nav__panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 8px;
  align-items: center;
  overflow-y: auto;
}
.message-nav__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
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
  cursor: not-allowed;
}
.message-nav__dots {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-height: 100px;
  overflow-y: hidden;
}
.message-nav__dot-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  // width: 30px;
  // height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  // transition: background-color 0.2s;
  padding: 4px;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}
.message-nav__dot-btn:hover {
  transform: scaleX(1.05);
  background: rgba(0, 0, 0, 0.12);
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
}
</style>
