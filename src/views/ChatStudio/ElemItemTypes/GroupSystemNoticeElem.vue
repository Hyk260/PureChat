<template>
  <div class="message-view__item--text">
    <!-- {{ message.from }} -->
    待开发
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "vue";
// import { GroupSystemNotice } from "../utils/utils";
export default defineComponent({
  name: "GroupSystemNoticeElem",
  components: {},
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
  setup(props, { attrs, emit, expose, slots }) {
    const state = reactive({ text: "wewe" });

    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.message-view__item--text {
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
