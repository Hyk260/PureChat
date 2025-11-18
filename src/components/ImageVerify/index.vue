<template>
  <canvas ref="domRef" width="120" height="40" class="cursor-pointer" @click="getImgCode" />
</template>

<script setup lang="ts">
import { watch } from "vue"

import { useImageVerify } from "@/hooks/useImageVerify"

defineOptions({
  name: "ImageVerify",
})

interface Props {
  code?: string
}

interface Emits {
  (e: "update:code", code: string): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  code: "",
})

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify()

watch(
  () => props.code,
  (value) => {
    setImgCode(value)
  }
)

watch(imgCode, (value) => {
  emit("update:code", value)
})

defineExpose({ getImgCode })
</script>
