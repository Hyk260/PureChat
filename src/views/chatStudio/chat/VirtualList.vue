<template>
  <RecycleScroller
    class="scroller"
    :items="allItems"
    :item-size="32"
    key-field="conversationID"
    v-slot="{ item }"
  >
    <div>
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller";
const allItems = Array.from(Array(999).keys()).map((i) => ({
  conversationID: i,
  height: "10",
  name: `Item ${i}`,
}));
export default {
  name: "VirtualList",
  components: {
    RecycleScroller,
  },
  computed: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      allItems,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
