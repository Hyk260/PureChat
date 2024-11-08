<template>
  <div
    v-if="isShowState(item)"
    :class="{
      'status-style': true,
      'isown-style': !isown,
      'single-style': item.conversationType === 'C2C',
    }"
  >
    <!-- 发送中 -->
    <FontIcon class="is-loading" iconName="Loading" v-show="isShow('unSend')" />
    <!-- 发送失败 -->
    <FontIcon class="text-[#f44336]" iconName="WarningFilled" v-show="isShow('fail')" />
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
  isown: {
    type: Boolean,
    default: false,
  },
  // unSend(未发送)success(发送成功)fail(发送失败)
  status: {
    type: String,
    default: "success",
  },
});

const isShow = (value) => {
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

<style lang="scss" scoped>
.status-style {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.isown-style {
  margin-left: 8px;
}

.single-style {
  padding-top: 0px;
}
</style>
