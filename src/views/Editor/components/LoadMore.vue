<template>
  <div class="viewref">
    <div :class="`showMore no-more ${noMore ? '' : 'loading-more'}`">
      {{ noMore ? "没有更多了" : "" }}
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  noMore: {
    type: Boolean,
    default: true,
  }
});
const { noMore } = props

</script>

<style lang="scss" scoped>
.viewref {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 100%;
  overflow: hidden;
  .showMore {
    padding-top: 12px;
    text-align: center;
    color: #00f;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.45);
  }
}
.loading-more {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background: url("../../../assets/images/loading.png");
  animation: load 1.1s infinite linear;
  background-size: 32px;
}

@keyframes load {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
