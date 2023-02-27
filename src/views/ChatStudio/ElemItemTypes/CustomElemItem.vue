<template>
  <div class="message-view__item--text">{{ payload.extension }}</div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default defineComponent({
  name: "CustomElemItem",
  components: {},
  computed: {},
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {},
  setup(props, { attrs, emit, expose, slots }) {
    const state = reactive({ text: "wewe" });
    const { message } = toRefs(props);
    const { payload } = message.value;

    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {
      payload,
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
