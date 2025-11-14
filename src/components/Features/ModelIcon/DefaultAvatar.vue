<template>
  <div
    class="flex-c"
    :style="{
      flex: 'none',
      background: background || themeColor,
      borderRadius: shape === 'circle' ? '50%' : `${Math.floor(size * 0.1)}px`,
      color,
      height: `${size}px`,
      width: `${size}px`,
      ...style,
    }"
    v-bind="$attrs"
  >
    <DefaultIcon :color="color" :class="iconClassName" :size="Math.floor(size * iconMultiple)" :style="iconStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useThemeStore } from "@/stores/modules/theme"
import { usePreferredColorScheme } from "@vueuse/core"
import DefaultIcon from "./DefaultIcon.vue"

defineOptions({
  name: "DefaultAvatar",
  inheritAttrs: false,
})

interface Props {
  shape?: "circle" | "square"
  color?: string
  background?: string
  size?: number
  style?: Record<string, any>
  iconMultiple?: number
  iconStyle?: Record<string, any>
  iconClassName?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconClassName: "",
  color: "",
  background: "",
  shape: "circle",
  size: 12,
  iconMultiple: 0.6,
  style: () => ({}),
  iconStyle: () => ({}),
})

const themeStore = useThemeStore()
const osTheme = usePreferredColorScheme()

const themeColor = computed(() => {
  const isDark = themeStore.themeScheme === "auto" ? osTheme.value === "dark" : themeStore.themeScheme === "dark"
  return isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"
})
</script>
