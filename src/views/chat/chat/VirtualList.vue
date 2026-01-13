<template>
  <RecycleScroller v-slot="{ item }" class="scroller" :items="items" :itemSize="64" keyField="conversationID">
    <div class="item">
      {{ item._displayName }}
    </div>
  </RecycleScroller>
</template>

<script setup lang="ts">
import { RecycleScroller } from "vue-virtual-scroller"
import type { DB_Session } from "@pure/database/schemas"

interface Props {
  list: DB_Session[]
}

const props = defineProps<Props>()

const items = computed(() =>
  props.list.length > 0
    ? props.list
    : Array.from({ length: 999 }, (_, i) => ({
        conversationID: i,
        name: `Item ${i + 1}`,
        height: 32,
      }))
)
</script>

<style lang="scss" scoped>
.scroller {
  height: 100%;
  // overflow-y: auto;
}

.item {
  height: 64px;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
