<template>
  <div
    class="openai-avatar flex-c"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: background,
      color: AVATAR_COLOR,
      flex: 'none',
      ...style,
    }"
    :aria-label="TITLE"
    v-bind="$attrs"
  >
    <Mono
      :size="iconSize"
      :style="{
        width: iconSize,
        height: iconSize,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Mono from "./Mono.vue"
import {
  AVATAR_BACKGROUND,
  AVATAR_COLOR,
  AVATAR_ICON_MULTIPLE,
  COLOR_GPT_3,
  COLOR_GPT_4,
  COLOR_GPT_5,
  COLOR_OSS,
  COLOR_O_1,
  COLOR_PLATFORM,
  TITLE,
} from "../style"

defineOptions({
  name: "OpenAIAvatar",
  inheritAttrs: false,
})

interface Props {
  type?: "normal" | "gpt3" | "gpt4" | "gpt5" | "o1" | "o3" | "oss" | "platform"
  size?: string | number
  style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  type: "normal",
  size: "1em",
  style: () => ({}),
})

const background = computed(() => {
  switch (props.type) {
    case "gpt3":
      return COLOR_GPT_3
    case "gpt4":
      return COLOR_GPT_4
    case "gpt5":
      return COLOR_GPT_5
    case "o3":
    case "o1":
      return COLOR_O_1
    case "oss":
      return COLOR_OSS
    case "platform":
      return COLOR_PLATFORM
    default:
      return AVATAR_BACKGROUND
  }
})

const iconSize = computed(() => {
  const sizeValue = typeof props.size === "string" ? props.size : `${props.size}px`
  const numericSize = typeof props.size === "number" ? props.size : parseFloat(sizeValue) || 16
  return `${numericSize * AVATAR_ICON_MULTIPLE}px`
})
</script>
