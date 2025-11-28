<template>
  <div class="zeroone-combine gap-4 flex-c" :aria-label="TITLE" v-bind="$attrs">
    <Mono :size="size" />
    <Text :size="textSize" />
  </div>
</template>

<script setup lang="ts">
import Text from "./Text.vue"
import Mono from "./Mono.vue"
import { COMBINE_TEXT_MULTIPLE, TITLE } from "../style"

defineOptions({
  name: "ZeroOneCombine",
  inheritAttrs: false,
})

interface Props {
  size?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  size: "1em",
})

const textSize = computed(() => {
  const sizeValue = typeof props.size === "string" ? props.size : `${props.size}px`
  const numericSize = typeof props.size === "number" ? props.size : parseFloat(sizeValue) || 16
  return `${numericSize * COMBINE_TEXT_MULTIPLE}px`
})
</script>
