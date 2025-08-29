<template>
  <RecycleScroller v-slot="{ item }" class="scroller" :items="items" :item-size="32" key-field="conversationID">
    <div class="item">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { RecycleScroller } from "vue-virtual-scroller"

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

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
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
