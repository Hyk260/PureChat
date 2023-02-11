<template>
  <div>application</div>
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
  name: "application",
  components: {},
  computed: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
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

<style lang="scss" scoped></style>
