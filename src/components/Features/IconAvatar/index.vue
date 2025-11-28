<template>
  <div
    class="flex-c"
    v-bind="$attrs"
    :style="{
      flex: 'none',
      color,
      background,
      borderRadius: shape === 'circle' ? '50%' : `${Math.floor(size * 0.1)}px`,
      boxShadow: avatarShadow,
      height: `${size}px`,
      width: `${size}px`,
      ...style,
    }"
  >
    <template v-if="Icon">
      <component
        :is="Icon"
        :class="iconClassName"
        :color="color"
        :size="roundToEven(size * iconMultiple)"
        :style="iconStyle"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/modules/theme"
import { usePreferredColorScheme } from "@vueuse/core"
import { getAvatarShadow, roundToEven } from "./util"

defineOptions({
  name: "IconAvatar",
  inheritAttrs: false,
})

interface Props {
  // eslint-disable-next-line vue/prop-name-casing
  Icon: Component | undefined
  background?: string
  color?: string
  iconClassName?: string
  iconMultiple?: number
  iconStyle?: Record<string, any>
  shape?: "circle" | "square"
  size?: number
  style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  shape: "circle",
  color: "#fff",
  background: "",
  iconClassName: "",
  iconMultiple: 0.75,
  style: () => ({}),
  iconStyle: () => ({}),
})

const themeStore = useThemeStore()
const osTheme = usePreferredColorScheme()

const isDarkMode = computed(() => {
  return themeStore.themeScheme === "auto" ? osTheme.value === "dark" : themeStore.themeScheme === "dark"
})

const avatarShadow = computed(() => {
  return getAvatarShadow(isDarkMode.value, props.background)
})
</script>
