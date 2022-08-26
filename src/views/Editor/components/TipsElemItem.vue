<template>
    <div
      class="message-view__item--text text right-menu-item"
      v-for="(item, index) in getChangeType(msgRow)"
      :key="index"
    >
      <div>{{item}}</div>
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
const getChangeType = () => {
  const { group_tips_elem_tip_type, tips_elem_group_info_array } = msgRow.value
  const { tips_info_value: value } = tips_elem_group_info_array[0]
  let res = ['未适配']
  switch (group_tips_elem_tip_type) {
    case 5:
      res = tips_5(value)
      break
    case 6:
      res = tips_6(value)
      break
  }
  return res
}
const tips_5 = (value) => {
  let res = [];
  res.push(`${value}离开群聊`)
  return res;
}
const tips_6 = (value) => {
  let res = [];
  res.push(`${value}进入群聊`)
  return res;
}


</script>

<style lang="scss" scoped>
.message-view__item--text {
    font-size: 12px;
    border-radius: 3px;
    background: rgba(0,0,0,0.05);
    vertical-align: middle;
    word-wrap: normal;
    word-break: break-all;
    color: rgba(0,0,0,0.45);
    margin-top: 5px;
    padding: 4px 6px;
    line-height: 16px;
}
</style>