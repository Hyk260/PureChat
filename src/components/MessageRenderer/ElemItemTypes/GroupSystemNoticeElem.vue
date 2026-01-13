<template>
  <div class="message-item-group-notice">
    {{ groupSystemNotice(message) }}
  </div>
</template>

<script setup lang="ts">
import { groupSystemNotice } from "@/utils/chat"

import type { DB_Message } from "@pure/database/schemas"

interface Props {
  message: DB_Message
}

defineProps<Props>()
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
