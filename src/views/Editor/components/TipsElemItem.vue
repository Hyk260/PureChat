<template>
  <!-- <div
    class="message-view__item--text text right-menu-item"
    v-for="(item, index) in getChangeType(msgRow)"
    :key="index"
  >
    <div>{{ item }}</div>
  </div> -->
  <div @contextmenu.prevent.stop class="message-view__item--text">
    {{ getChangeType(msgRow) }}
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  msgRow: {
    type: Object,
    default: () => {},
  },
});

const { msgRow } = toRefs(props);

const getChangeType = (data) => {
  return "撤回一条消息";
};
</script>

<style lang="scss" scoped>
.message-view__item--text {
  font-size: 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.05);
  vertical-align: middle;
  word-wrap: normal;
  word-break: break-all;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 5px;
  padding: 4px 6px;
  line-height: 16px;
  justify-content: center;
}
</style>
