<template>
  <template v-if="renderLocalIcon">
    <svg class="svg-icon" aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </template>
  <template v-else>
    <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
  </template>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue"
import { Icon } from "@iconify/vue"

defineOptions({ name: "SvgIcon", inheritAttrs: false })

interface Props {
  icon?: string
  localIcon?: string
  color?: "currentColor"
}

const props = withDefaults(defineProps<Props>(), {
  color: "currentColor",
  localIcon: "",
  icon: "",
})

const attrs = useAttrs()

const bindAttrs = computed(() => ({
  class: attrs.class || "",
  style: attrs.style || "",
}))

const symbolId = computed(() => {
  const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env

  const defaultLocalIcon = "no-icon"

  const icon = props.localIcon || defaultLocalIcon

  return `#${prefix}-${icon}`
})

const renderLocalIcon = computed(() => props.localIcon || !props.icon)
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 16px;
}
</style>
