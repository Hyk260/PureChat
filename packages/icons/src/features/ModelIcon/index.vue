<template>
  <Component :is="renderComponent" v-bind="finalComponentProps" />
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
  model: string
  className?: string
  shape?: "circle" | "square"
  size?: number
  style?: Record<string, string>
  type?: "avatar" | "mono" | "color"
}

const props = withDefaults(defineProps<Props>(), {
  size: 12,
  className: "",
  type: "avatar",
  shape: "circle",
  style: () => ({}),
})

interface ComponentProps {
  size?: number
  style?: Record<string, string>
  [key: string]: unknown
}

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
      return Icon.Color || DefaultIcon
    }
    default: {
      return DefaultIcon
    }
  }
})

const finalComponentProps = computed<ComponentProps>(() => {
  return {
    size: props.size,
    ...(matchedIcon.value?.props as ComponentProps | undefined),
    ...props.style,
  }
})
</script>
