<template>
  <IconAvatar
    :Icon="Mono"
    :aria-label="TITLE"
    :background="background"
    :color="AVATAR_COLOR"
    :iconMultiple="AVATAR_ICON_MULTIPLE"
  />
</template>

<script setup lang="ts">
import IconAvatar from "@/components/Features/IconAvatar/index.vue"
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
  type?: "normal" | "platform" | "gpt3" | "gpt4" | "gpt5" | "o1" | "o3" | "oss"
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
</script>
