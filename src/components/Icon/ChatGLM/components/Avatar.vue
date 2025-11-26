<template>
  <IconAvatar
    :Icon="Mono"
    :aria-label="TITLE"
    :background="AVATAR_BACKGROUND"
    :color="AVATAR_COLOR"
    :iconMultiple="AVATAR_ICON_MULTIPLE"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import IconAvatar from "@/components/Features/IconAvatar/index.vue"
import Mono from "./Mono.vue"
import { AVATAR_BACKGROUND, AVATAR_COLOR, AVATAR_ICON_MULTIPLE, TITLE } from "../style"

defineOptions({
  name: "ChatGLMAvatar",
  inheritAttrs: false,
})
</script>
