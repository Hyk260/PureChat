<template>
  <div class="message-item-group-notice">
    {{ groupSystemNotice(message) }}
  </div>
</template>

<script setup>
import { groupSystemNotice } from "../utils/utils";

const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.message-item-group-notice {
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
  background: var(--other-msg-color);
}
</style>
