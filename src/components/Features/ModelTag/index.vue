<template>
  <ElTag type="info" size="small" class="ml-5">
    <div class="flex items-center">
      <slot>
        <ModelIcon :model="model" :size="14" :type="type" />
      </slot>
      <div class="ml-5">{{ model }}</div>
    </div>
  </ElTag>
</template>

<script setup lang="ts">
import ModelIcon from "../ModelIcon"

defineOptions({
  name: "ModelTag",
})

interface Props {
  model: string
  type?: "avatar" | "mono"
}

const props = withDefaults(defineProps<Props>(), {
  type: "mono",
})
</script>

<style lang="scss" scoped></style>
