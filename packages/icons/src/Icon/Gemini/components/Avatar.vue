<template>
  <IconAvatar
    :Icon="Color"
    :aria-label="TITLE"
    :background="background"
    :color="AVATAR_COLOR"
    :iconMultiple="AVATAR_ICON_MULTIPLE"
  />
</template>

<script setup lang="ts">
import { IconAvatar } from "../../../features"
// import Mono from "./Mono.vue"
import Color from "./Color.vue"
import { AVATAR_BACKGROUND, AVATAR_COLOR, AVATAR_ICON_MULTIPLE, TITLE } from "../style"

defineOptions({
  name: "GeminiAvatar",
  inheritAttrs: false,
})

interface Props {
  background?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  background: AVATAR_BACKGROUND,
  size: 24,
})
</script>
