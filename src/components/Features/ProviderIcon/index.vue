<template>
  <component :is="renderComponent" v-bind="finalComponentProps" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { providerMappings } from "../providerConfig"
import DefaultAvatar from "./DefaultAvatar.vue"
import DefaultIcon from "./DefaultIcon.vue"

interface Props {
  className?: string
  forceMono?: boolean
  provider?: string
  shape?: "circle" | "square"
  size?: number
  style?: Record<string, any>
  type?: "avatar" | "mono" | "color" | "combine" | "combine-color"
}

defineOptions({
  name: "ProviderIcon",
  inheritAttrs: false,
})

const props = defineProps<Props>()

const finalProps = {
  size: props.size ?? 12,
  type: props.type ?? "avatar",
  shape: props.shape ?? "circle",
  style: props.style ?? {},
  className: props.className,
  provider: props.provider,
  forceMono: props.forceMono ?? false,
}

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

  switch (finalProps.type) {
    case "avatar": {
      if (!Icon) return DefaultAvatar
      return Icon.Avatar || DefaultAvatar
    }
    case "mono": {
      if (!Icon) return DefaultIcon
      return Icon || DefaultIcon
    }
    case "color": {
      if (!Icon) return DefaultIcon
      return Icon.Color || Icon || DefaultIcon
    }
    case "combine": {
      if (!Icon) return DefaultIcon
      if (Icon.Combine) return Icon.Combine
      if (Icon.Brand) return Icon.Brand
      if (Icon.Text) return Icon.Text
      return Icon || DefaultIcon
    }
    case "combine-color": {
      if (!Icon) return DefaultIcon
      if (Icon.Combine) return Icon.Combine
      if (Icon.BrandColor) return Icon.BrandColor
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
    size: finalProps.size,
    ...matchedProvider.value?.props,
    ...finalProps.style,
  }

  if (finalProps.type === "avatar") {
    baseProps.shape = finalProps.shape
  }

  if (finalProps.type === "combine" && renderComponent.value) {
    const componentName = renderComponent.value.name || renderComponent.value.__name
    if (componentName === "OpenAICombine" || componentName === "QwenCombine") {
      baseProps.type = "mono"
    }
  }

  if (finalProps.type === "combine-color" && renderComponent.value) {
    const componentName = renderComponent.value.name || renderComponent.value.__name
    if (componentName === "OpenAICombine" || componentName === "QwenCombine") {
      baseProps.type = "color"
    }
  }

  return baseProps
})
</script>
