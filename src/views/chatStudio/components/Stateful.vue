<template>
  <div v-if="isShowState(item)" class="flex-c">
    <!-- 发送中 -->
    <div v-show="isShow('unSend')" class="iconify-icon svg-spinners"></div>
    <!-- 发送失败 -->
    <div v-show="isShow('fail')" class="iconify-icon fluent-error"></div>
  </div>
</template>

<script setup>
defineOptions({
  name: "Stateful",
});

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  // unSend(未发送)fail(发送失败)success(发送成功)
  status: {
    type: String,
    default: "success",
  },
});

const isShow = (value) => {
  // return true
  return props.status === value;
};

const isShowState = (item) => {
  return (
    !item.isRevoked &&
    item.type !== "TIMGroupTipElem" &&
    item.payload?.description !== "dithering" &&
    (isShow("unSend") || isShow("fail"))
  );
};
</script>
