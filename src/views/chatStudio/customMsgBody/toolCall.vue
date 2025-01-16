<template>
  <div>
    {{ JSON.parse(payload.data).data.choices[0].message }}
  </div>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "ToolCall",
});

const props = defineProps({
  payload: {
    type: Object,
    default: null,
  },
});
</script>

<style lang="scss" scoped></style>
