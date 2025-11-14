<template>
  <div
    class="zhipu-combine flex-c"
    :style="{
      gap: `${space}px`,
      flex: 'none',
      lineHeight: 1,
      fontWeight: 600,
      ...extraStyle,
    }"
    :aria-label="TITLE"
    v-bind="$attrs"
  >
    <Mono :size="iconSize" />
    <Text :size="textSize" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Mono from "./Mono.vue"
import Text from "./Text.vue"
import { COMBINE_SPACE_MULTIPLE, COMBINE_TEXT_MULTIPLE, TITLE } from "../style"

defineOptions({
  name: "ZhipuCombine",
  inheritAttrs: false,
})

interface Props {
  type?: "color" | "mono"
  size?: string | number
  extraStyle?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  type: "mono",
  size: "1em",
  extraStyle: () => ({}),
})

const iconSize = computed(() => props.size)
const textSize = computed(() => {
  const sizeValue = typeof props.size === "string" ? props.size : `${props.size}px`
  const numericSize = typeof props.size === "number" ? props.size : parseFloat(sizeValue) || 16
  return `${numericSize * COMBINE_TEXT_MULTIPLE}px`
})

const space = computed(() => {
  const sizeValue = typeof props.size === "string" ? props.size : `${props.size}px`
  const numericSize = typeof props.size === "number" ? props.size : parseFloat(sizeValue) || 16
  return numericSize * COMBINE_SPACE_MULTIPLE
})
</script>
