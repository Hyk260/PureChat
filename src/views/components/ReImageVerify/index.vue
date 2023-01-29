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
import { watch, defineComponent } from "vue";
import { useImageVerify } from "@/utils/hooks/useImageVerify";

// eslint-disable-next-line no-undef
const emit = defineEmits();
// defineOptions({
//   name: "ReImageVerify"
// });

// eslint-disable-next-line no-undef
const props = defineProps({
  code: {
    type: [String, Boolean],
    required: true,
  },
});

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();

watch(
  () => props.code,
  (newValue) => {
    setImgCode(newValue);
  }
);
watch(imgCode, (newValue) => {
  emit("update:code", newValue);
});

// eslint-disable-next-line no-undef
defineExpose({ getImgCode });
</script>
