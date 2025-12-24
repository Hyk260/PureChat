<template>
  <Radar :size="size" :color="computedColor" :style="style" :class="className" />
</template>

<script setup lang="ts">
import { Radar } from "lucide-vue-next"
import { useThemeStore } from "@/stores/modules/theme"
import { usePreferredColorScheme } from "@vueuse/core"

defineOptions({
  name: "ProviderDefaultIcon",
  inheritAttrs: false,
})

interface Props {
  className?: string
  color?: string
  size?: number
  style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  color: "",
  className: "",
  size: 12,
  style: () => ({}),
})

const themeStore = useThemeStore()
const osTheme = usePreferredColorScheme()

const computedColor = computed(() => {
  if (props.color) return props.color
  const isDark = themeStore.themeScheme === "auto" ? osTheme.value === "dark" : themeStore.themeScheme === "dark"
  return isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.45)"
})
</script>
