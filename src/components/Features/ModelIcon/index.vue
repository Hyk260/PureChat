<template>
  <component :is="renderComponent" v-bind="finalComponentProps" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { modelMappings } from "../modelConfig"
import DefaultAvatar from "./DefaultAvatar.vue"
import DefaultIcon from "./DefaultIcon.vue"

defineOptions({
  name: "ModelIcon",
  inheritAttrs: false,
})

interface Props {
  className?: string
  model: string
  shape?: "circle" | "square"
  size?: number
  style?: Record<string, any>
  type?: "avatar" | "mono" | "color" | "combine" | "combine-color"
}

const props = withDefaults(defineProps<Props>(), {
  size: 12,
  className: "",
  type: "avatar",
  shape: "circle",
  style: () => ({}),
})

const matchedIcon = computed(() => {
  if (!props.model) return null
  const model = props.model.toLowerCase()
  for (const item of modelMappings) {
    if (item.keywords.some((keyword) => new RegExp(keyword, "i").test(model))) {
      return item
    }
  }
  return null
})

const renderComponent = computed(() => {
  const Render = matchedIcon.value
  const Icon = Render?.Icon

  switch (props.type) {
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
    size: props.size,
    ...matchedIcon.value?.props,
    ...props.style,
  }

  if (props.type === "avatar") {
    baseProps.shape = props.shape
  }

  if (props.type === "combine" && renderComponent.value) {
    const componentName = renderComponent.value.name
    if (componentName === "OpenAICombine") {
      baseProps.type = "mono"
    }
  }

  if (props.type === "combine-color" && renderComponent.value) {
    const componentName = renderComponent.value.name
    if (componentName === "OpenAICombine") {
      baseProps.type = "color"
    }
  }

  return baseProps
})
</script>
