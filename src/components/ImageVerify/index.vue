<template>
  <canvas ref="domRef" width="120" height="40" class="cursor-pointer" @click="getImgCode" />
</template>

<script setup>
import { watch } from "vue";
import { useImageVerify } from "@/utils/hooks/useImageVerify";

defineOptions({
  name: "ImageVerify",
});

const emit = defineEmits();

const props = defineProps({
  code: {
    type: [String, Boolean],
    required: true,
  },
});

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();

watch(
  () => props.code,
  (value) => {
    setImgCode(value);
  }
);

watch(imgCode, (value) => {
  emit("update:code", value);
});

defineExpose({ getImgCode });
</script>
