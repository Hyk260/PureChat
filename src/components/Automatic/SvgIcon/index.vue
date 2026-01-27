<template>
  <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue"
import { Icon } from "@iconify/vue"

defineOptions({ name: "SvgIcon", inheritAttrs: false })

interface Props {
  icon?: string
  color?: "currentColor"
}

const props = withDefaults(defineProps<Props>(), {
  color: "currentColor",
  icon: "",
})

const attrs = useAttrs()

const bindAttrs = computed(() => ({
  class: attrs.class || "",
  style: attrs.style || "",
}))
</script>

<style lang="scss" scoped></style>
