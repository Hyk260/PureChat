<template>
  <transition :name="transitionName">
    <div
      v-show="visible"
      :style="customStyle"
      class="back-to-ceiling"
      @click="backToTop"
    >
      <!-- <svg
        class="icon"
        aria-hidden="true"
        font-size="20px"
      >
        <use xlink:href="#iconbacktotop" />
      </svg> -->
    </div>
  </transition>
</template>

<script>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
} from "vue";

export default defineComponent({
  props: {
    customStyle: Object,
    visibilityHeight: {
      type: Number,
      default: 400,
    },
    transitionName: {
      type: String,
      default: "fade",
    },
    backPosition: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const state = reactive({
      visible: false,
      isMoving: false,
      interval: 0,
    });
    const handleScroll = () => {
      state.visible = window.pageYOffset > props.visibilityHeight;
    };

    const easeInOutQuad = (t, b, c, d) => {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    };

    const backToTop = () => {
      if (state.isMoving) return;
      const start = window.pageYOffset;
      let i = 0;
      state.isMoving = true;
      const interval = setInterval(() => {
        const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500));
        if (next <= props.backPosition) {
          window.scrollTo(0, props.backPosition);
          clearInterval(interval);
          state.isMoving = false;
        } else {
          window.scrollTo(0, next);
        }
        i++;
      }, 16.7);
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      backToTop,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  :hover {
    background: #d5dbe7;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.back-to-ceiling .backTopIcon {
  fill: #9aaabf;
  background: none;
}
</style>
