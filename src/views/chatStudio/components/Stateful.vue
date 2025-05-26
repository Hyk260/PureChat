<template>
  <div v-if="isShowState(item)" class="flex-c mt-auto">
    <!-- 发送中 -->
    <div v-show="isShow('unSend')" class="iconify-icon svg-spinners"></div>
    <!-- 发送失败 -->
    <div v-show="isShow('fail')" class="iconify-icon fluent-error"></div>
  </div>
</template>

<script setup>
import { isSelf } from "../utils/utils";

defineOptions({
  name: "Stateful",
});

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  // unSend(未发送)fail(发送失败)success(发送成功)sending(发送中)
  status: {
    type: String,
    default: "unSend",
  },
});

const isShow = (value) => {
  // return true
  return props.status === value;
};

const isShowState = (item) => {
  return (
    isSelf(item) &&
    !item.isRevoked &&
    item.type !== "TIMTextElem" &&
    item.type !== "TIMGroupTipElem" &&
    (isShow("unSend") || isShow("fail"))
  );
};
</script>
