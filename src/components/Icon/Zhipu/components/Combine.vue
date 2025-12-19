<template>
  <div class="zhipu-combine flex-c gap-4" :aria-label="TITLE">
    <Mono :size="size" />
    <Text :size="textSize" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Mono from "./Mono.vue"
import Text from "./Text.vue"
import { COMBINE_TEXT_MULTIPLE, TITLE } from "../style"

defineOptions({
  name: "ZhipuCombine",
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
