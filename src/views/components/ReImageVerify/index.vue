<template>
  <canvas
    ref="domRef"
    width="120"
    height="40"
    class="cursor-pointer"
    @click="getImgCode"
  />
</template>

<script setup>
import { watch, defineComponent, defineEmits } from 'vue'
import { useImageVerify } from '@/utils/hooks'

const emit = defineEmits()
// defineOptions({
//   name: "ReImageVerify"
// });

const props = defineProps({
  code: '',
})

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify()

watch(
  () => props.code,
  (newValue) => {
    setImgCode(newValue)
  }
)
watch(imgCode, (newValue) => {
  emit('update:code', newValue)
})

defineExpose({ getImgCode })
</script>


