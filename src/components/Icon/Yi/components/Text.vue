<template>
  <ZeroOneText v-bind="$attrs" />
</template>

<script setup lang="ts">
import ZeroOneText from "@/components/Icon/ZeroOne/components/Text.vue"

defineOptions({
  name: "YiText",
  inheritAttrs: false,
})

interface Props {
  size?: string | number
  style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  size: "1em",
  style: () => ({}),
})
</script>
