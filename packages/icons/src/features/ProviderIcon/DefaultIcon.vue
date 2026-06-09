<template>
  <Radar :size="size" :color="computedColor" :style="style" :class="className" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Radar } from "@lucide/vue"
import { useIsDarkMode } from "../composables/useIsDarkMode"

defineOptions({
  name: "ProviderDefaultIcon",
  inheritAttrs: false,
})

interface Props {
  className?: string
  color?: string
  size?: number
  style?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  color: "",
  className: "",
  size: 12,
  style: () => ({}),
})

const isDarkMode = useIsDarkMode()

const computedColor = computed(() => {
  if (props.color) return props.color
  return isDarkMode.value ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.45)"
})
</script>
