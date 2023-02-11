<template>
  <div class="viewref">
    <!-- ${noMore ? 'no-more' : 'loading-more'} -->
    <div class="showMore">
      {{ noMore ? "没有更多了" : "" }}
    </div>
    <div class="showMore bouncing-loader" v-show="!noMore">
      <div v-for="item in 3" :key="item"></div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  noMore: {
    type: Boolean,
    default: true,
  },
});
const { noMore } = toRefs(props);
</script>

<style lang="scss" scoped>
.viewref {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  overflow: hidden;
}
.showMore {
  padding-top: 12px;
  text-align: center;
  color: #00f;
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
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

.bouncing-loader {
  display: flex;
  justify-content: center;
}
@keyframes bouncing-loader {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
}
.bouncing-loader > div {
  width: 8px;
  height: 8px;
  margin: 0 3px;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
