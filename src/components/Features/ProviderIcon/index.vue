<template>
  <component :is="renderComponent" v-bind="finalComponentProps" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { providerMappings } from "../providerConfig"
import DefaultIcon from "./DefaultIcon.vue"

interface Props {
  className?: string
  provider: string
  shape?: "circle" | "square"
  size?: number
  style?: Record<string, any>
  type?: "mono" | "combine"
}

defineOptions({
  name: "ProviderIcon",
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  size: 12,
  className: "",
  type: "combine",
  shape: "circle",
  style: () => ({}),
})

const matchedProvider = computed(() => {
  if (!props.provider) return null
  const provider = props.provider.toLowerCase()

  for (const item of providerMappings) {
    if (item.keywords.some((keyword) => keyword.toLowerCase() === provider)) {
      return item
    }
  }
  return null
})

const renderComponent = computed(() => {
  const Render = matchedProvider.value
  const Icon = Render?.Icon

  switch (props.type) {
    case "mono": {
      if (!Icon) return DefaultIcon
      return Icon || DefaultIcon
    }
    case "combine": {
      if (!Icon) return DefaultIcon
      if (Icon.Combine) return Icon.Combine
      if (Icon.Text) return Icon.Text
      return Icon || DefaultIcon
    }
    default: {
      return DefaultIcon
    }
  }
})

const finalComponentProps = computed(() => {
  const baseProps: Record<string, any> = {
    size: props.size,
    ...matchedProvider.value?.props,
    ...props.style,
  }

  return baseProps
})
</script>
