<template>
  <div
    v-if="
      !item.isRevoked &&
      item.type !== 'TIMGroupTipElem' &&
      item.payload?.description !== 'dithering' &&
      (isShow('unSend') || isShow('fail'))
    "
    :class="{
      'status-style': true,
      'isown-style': !isown,
      'single-style': item.conversationType === 'C2C',
    }"
  >
    <!-- 发送中 -->
    <FontIcon class="is-loading" iconName="Loading" v-show="isShow('unSend')" />
    <!-- 发送失败 -->
    <FontIcon class="is-error" iconName="WarningFilled" v-show="isShow('fail')" />
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
</script>

<style lang="scss" scoped>
:deep(.is-error) {
  color: #f44336;
  cursor: pointer;
}

.status-style {
  margin: 0 8px 0 0;
  display: flex;
  align-items: center;
}

.isown-style {
  padding-top: 18.79px;
  margin: 0 0 0 8px;
}

.single-style {
  padding-top: 0px;
}
</style>
