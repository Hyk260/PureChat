<template>
  <div class="checkbox-style" id="svgDown" v-if="showCheckbox">
    <!-- 合并转发 -->
    <div class="btn" @click="mergeForward">
      <svg-icon iconClass="mergeForward" />
    </div>
    <!-- 逐条转发 -->
    <div class="btn" @click="aQuickForward">
      <svg-icon iconClass="aQuickForward" />
    </div>
    <!-- 关闭 -->
    <div class="btn" @click="shutdown">
      <svg-icon iconClass="close" />
    </div>
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
  computed: {
    ...mapState({
      showMsgBox: (state) => state.conversation.showMsgBox,
      forwardData: (state) => state.conversation.forwardData,
      showCheckbox: (state) => state.conversation.showCheckbox,
    }),
  },
  methods: {
    ...mapMutations(["SET_CHEC_BOX"]),
    mergeForward() {
      console.log(this.forwardData);
    },
    aQuickForward() {
      console.log(this.forwardData);
    },
    shutdown() {
      this.SET_CHEC_BOX(false);
      const el = document.getElementsByClassName("check-btn");
      for (let i = 0; i < el.length; i++) {
        el[i].checked = false;
      }
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
.checkbox-style {
  position: relative;
  z-index: 1;
  background: #fff;
  height: 206px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.btn {
  width: 35px;
  height: 35px;
  background: #e5e6eb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
