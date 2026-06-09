<template>
  <IconAvatar
    :Icon="Mono"
    :aria-label="TITLE"
    :background="background"
    :color="AVATAR_COLOR"
    :iconMultiple="AVATAR_ICON_MULTIPLE"
    :iconStyle="iconStyle"
  />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { IconAvatar } from "../../../features"
import Mono from "./Mono.vue"
import { AVATAR_BACKGROUND, AVATAR_COLOR, AVATAR_ICON_MULTIPLE, TITLE } from "../style"

defineOptions({
  name: "MinimaxAvatar",
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

const iconStyle = computed(() => ({
  marginLeft: `${-props.size * 0.05}px`,
}))
</script>
