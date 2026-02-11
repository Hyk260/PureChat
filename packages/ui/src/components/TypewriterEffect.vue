<template>
  <div ref="containerRef" class="inline-flex items-baseline" :class="[containerClass]" :style="containerStyle">
    <span class="whitespace-pre-wrap">
      <span
        v-for="(char, index) in displayedCharacters"
        :key="`${currentTextIndex}-${index}`"
        class="inline-block animate-fade-in"
        :style="{ animationDelay: `${index * 10}ms` }"
      >
        {{ char === " " ? "\u00A0" : char }}
      </span>
    </span>
    <span
      v-if="showCursor"
      class="inline-block ml-[1px] translate-y-[1px]"
      :class="[cursorHidden ? 'opacity-0' : '', cursorStyleClass, cursorClass]"
      :style="cursorColorStyle"
    >
      <template v-if="cursorCharacter">{{ cursorCharacter }}</template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, toRefs, type PropType } from "vue"

export type CursorStyle = "pipe" | "block" | "underscore" | "dot"
export type AnimationStatus = "idle" | "typing" | "paused" | "deleting"

const props = defineProps({
  /** 循环显示的句子 */
  sentences: {
    type: [String, Array] as PropType<string | string[]>,
    required: true,
  },
  /** 打字间隔 */
  typingSpeed: {
    type: Number,
    default: 80,
  },
  /** 删除间隔 */
  deletingSpeed: {
    type: Number,
    default: 40,
  },
  /** 动画开始前的延迟 */
  initialDelay: {
    type: Number,
    default: 0,
  },
  /** 每次打完一句后的停顿时间 */
  pauseDuration: {
    type: Number,
    default: 2000,
  },
  /** 删除完一句后、下次打字前的延迟 */
  deletePauseDuration: {
    type: Number,
    default: 300,
  },
  /** 是否循环所有句子 */
  loop: {
    type: Boolean,
    default: true,
  },
  /** 是否显示光标 */
  showCursor: {
    type: Boolean,
    default: true,
  },
  /** 是否在打字时隐藏光标 */
  hideCursorWhileTyping: {
    type: [Boolean, String] as PropType<boolean | "typing" | "afterTyping">,
    default: false,
  },
  // 自定义光标字符
  cursorCharacter: {
    type: String,
    default: "",
  },
  /** 光标样式 */
  cursorStyle: {
    type: String as PropType<CursorStyle>,
    default: "pipe",
  },
  /** 光标颜色 */
  cursorColor: {
    type: String,
    default: "",
  },
  /** 文字颜色 */
  color: {
    type: String,
    default: "",
  },
  /** 每句文字的自定义颜色 */
  textColors: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /** 随机速度设置 */
  variableSpeed: {
    type: Object as PropType<{ min: number; max: number } | null>,
    default: null,
  },
  /** 外部控制动画暂停 */
  paused: {
    type: Boolean,
    default: false,
  },
  /** 外层容器类名 */
  containerClass: {
    type: String,
    default: "",
  },
  /** 光标类名 */
  cursorClass: {
    type: String,
    default: "",
  },
  /** 元素可见时才开始动画 */
  startOnVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: "sentenceComplete", sentence: string, index: number): void
  (e: "update:status", status: AnimationStatus): void
  (e: "complete"): void
}>()

const {
  sentences,
  typingSpeed,
  deletingSpeed,
  initialDelay,
  pauseDuration,
  deletePauseDuration,
  loop,
  showCursor,
  hideCursorWhileTyping,
  cursorCharacter,
  cursorStyle,
  cursorColor,
  color,
  textColors,
  variableSpeed,
  paused,
  startOnVisible,
} = toRefs(props)

// ---- State ----
const displayedText = ref("")
const currentCharIndex = ref(0)
const currentTextIndex = ref(0)
const isDeleting = ref(false)
const isVisible = ref(!startOnVisible.value)
const animationStatus = ref<AnimationStatus>("idle")
const containerRef = ref<HTMLElement | null>(null)

let timer: ReturnType<typeof setTimeout> | null = null
let observer: IntersectionObserver | null = null

// ---- Computed ----
const textArray = computed<string[]>(() => (Array.isArray(sentences.value) ? sentences.value : [sentences.value]))

const displayedCharacters = computed(() => splitText(displayedText.value))

const currentTextSegments = computed(() => splitText(textArray.value[currentTextIndex.value] ?? ""))

const containerStyle = computed(() => {
  const textColor =
    textColors.value.length > 0 ? textColors.value[currentTextIndex.value % textColors.value.length] : color.value
  return textColor ? { color: textColor } : {}
})

const cursorStyleClass = computed(() => {
  if (cursorCharacter.value) return ""
  switch (cursorStyle.value) {
    case "block":
      return "w-[0.6em] h-[1.1em] bg-current animate-blink"
    case "underscore":
      return "w-[0.6em] h-[2px] bg-current animate-blink self-end mb-[2px]"
    case "dot":
      return "w-[0.4em] h-[0.4em] rounded-full bg-current animate-blink self-end mb-[3px]"
    case "pipe":
    default:
      return "w-[2px] h-[1.1em] bg-current animate-blink"
  }
})

const cursorColorStyle = computed(() =>
  cursorColor.value ? { color: cursorColor.value, backgroundColor: cursorColor.value } : {}
)

const cursorHidden = computed(() => {
  const isActivelyTyping = currentCharIndex.value < currentTextSegments.value.length && !isDeleting.value
  const isAfterTyping = currentCharIndex.value === currentTextSegments.value.length && !isDeleting.value

  if (hideCursorWhileTyping.value === true) return true
  if (hideCursorWhileTyping.value === "typing") return isActivelyTyping || isDeleting.value
  if (hideCursorWhileTyping.value === "afterTyping") return isAfterTyping
  return false
})

// ---- Helpers ----
function splitText(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), (s) => s.segment)
  }
  return Array.from(text)
}

function getSpeed(): number {
  if (variableSpeed.value) {
    const { min, max } = variableSpeed.value
    return Math.random() * (max - min) + min
  }
  return isDeleting.value ? deletingSpeed.value : typingSpeed.value
}

function clearTimer() {
  if (timer !== null) {
    clearTimeout(timer)
    timer = null
  }
}

// ---- Core animation loop ----
function tick() {
  clearTimer()

  if (paused.value || !isVisible.value) return

  const currentSentence = textArray.value[currentTextIndex.value] || ""
  const segments = splitText(currentSentence)

  if (isDeleting.value) {
    // Deleting
    setStatus("deleting")

    if (displayedText.value === "") {
      // Finished deleting
      isDeleting.value = false
      emit("sentenceComplete", currentSentence, currentTextIndex.value)

      // Move to next sentence
      const nextIndex = (currentTextIndex.value + 1) % textArray.value.length

      if (!loop.value && currentTextIndex.value === textArray.value.length - 1) {
        setStatus("idle")
        emit("complete")
        return
      }

      currentTextIndex.value = nextIndex
      currentCharIndex.value = 0

      // Pause after delete before typing next
      timer = setTimeout(tick, deletePauseDuration.value)
    } else {
      timer = setTimeout(() => {
        const chars = splitText(displayedText.value)
        displayedText.value = chars.slice(0, -1).join("")
        tick()
      }, getSpeed())
    }
  } else {
    // Typing
    if (currentCharIndex.value < segments.length) {
      setStatus("typing")

      timer = setTimeout(() => {
        displayedText.value += segments[currentCharIndex.value]
        currentCharIndex.value++
        tick()
      }, getSpeed())
    } else {
      // Sentence done typing
      setStatus("paused")

      // If single sentence and no loop, stop
      if (textArray.value.length === 1 && !loop.value) {
        setStatus("idle")
        emit("complete")
        return
      }

      timer = setTimeout(() => {
        isDeleting.value = true
        tick()
      }, pauseDuration.value)
    }
  }
}

function setStatus(s: AnimationStatus) {
  if (animationStatus.value !== s) {
    animationStatus.value = s
    emit("update:status", s)
  }
}

// ---- Public methods (exposed) ----
function start() {
  clearTimer()
  isVisible.value = true
  tick()
}

function pause() {
  clearTimer()
  setStatus("paused")
}

function reset() {
  clearTimer()
  displayedText.value = ""
  currentCharIndex.value = 0
  currentTextIndex.value = 0
  isDeleting.value = false
  setStatus("idle")
}

function restart() {
  reset()
  // Use nextTick-like delay to ensure state is clean
  setTimeout(() => {
    start()
  }, 10)
}

defineExpose({ start, pause, reset, restart })

// ---- Watchers ----
watch(paused, (val) => {
  if (val) {
    pause()
  } else {
    tick()
  }
})

watch(
  () => sentences.value,
  () => {
    reset()
    setTimeout(tick, 10)
  }
)

// ---- Lifecycle ----
onMounted(() => {
  // IntersectionObserver for startOnVisible
  if (startOnVisible.value && containerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer?.disconnect()
            observer = null
            // Kick off the animation
            setTimeout(tick, initialDelay.value)
          }
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.value)
  } else {
    // Start after initial delay
    timer = setTimeout(tick, initialDelay.value)
  }
})

onUnmounted(() => {
  clearTimer()
  observer?.disconnect()
})
</script>
