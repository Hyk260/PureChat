<template>
  <div class="card">
    {{ agents.meta.title }}
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, computed, watch, nextTick } from "vue";

defineProps({
  agents: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
