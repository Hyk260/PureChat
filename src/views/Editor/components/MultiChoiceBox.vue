<template>
  <div class="Checkbox-style" id="svgDown" v-if="showCheckbox">
    <el-button type="primary" @click="shutdown">关闭</el-button>
    <el-button type="primary" @click="test">测试</el-button>
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
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default defineComponent({
  name: "Componentname",
  components: {},
  computed: {
    ...mapState({
      showMsgBox: (state) => state.conversation.showMsgBox,
      forwardData: (state) => state.conversation.forwardData,
      showCheckbox: (state) => state.conversation.showCheckbox,
    }),
  },
  props: {},
  data() {},
  methods: {
    ...mapMutations(["SET_CHEC_BOX"]),
    shutdown() {
      this.SET_CHEC_BOX(false);
      const el = document.getElementsByClassName("check-btn");
      for (let i = 0; i < el.length; i++) {
        el[i].checked = false;
      }
    },
    test() {
      console.log(this.forwardData);
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
.Checkbox-style {
  position: relative;
  z-index: 1;
  background: #fff;
  height: 206px;
}
</style>
