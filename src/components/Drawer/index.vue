<template>
  <el-drawer
    ref="drawerRef"
    class="demo-drawer"
    v-model="visible"
    :title="title"
    :size="size"
    :modal="modal"
    :class="className"
    :modal-class="classModal"
    :before-close="handleClose"
    :close-on-press-escape="true"
    :append-to-body="false"
    :show-close="true"
    :with-header="true"
  >
    <!-- :title="title" :with-header="true" :show-close="true" -->
    <!-- <template #header></template> -->
    <!-- <template #default> </template> -->
    <slot name="center"></slot>
  </el-drawer>
</template>

<script>
import { defineComponent, ref, toRefs, reactive, onMounted, onBeforeUnmount } from "vue";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default defineComponent({
  name: "Drawer",
  components: {},
  computed: {},
  props: {
    // drawer: {
    //   type: Boolean,
    //   default: false,
    // },
    size: {
      type: String,
      default: "285px",
    },
    className: {
      type: String,
      default: "tool-drawer",
    },
    classModal: {
      type: String,
      default: "tool-modal",
    },
    modal: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "title",
    },
  },
  data() {
    return {};
  },
  methods: {},
  setup(props, { attrs, emit, expose, slots }) {
    const drawerRef = ref();
    // const state = reactive({ visible: false });
    const visible = ref(false);
    // 打开
    const handleOpen = () => {
      visible.value = true;
    };
    // 关闭
    const handleClose = done => {
      done();
    };
    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {
      // drawerRef,
      handleOpen,
      handleClose,
      visible,
      // ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
