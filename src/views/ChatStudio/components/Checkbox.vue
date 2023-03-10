<template>
  <label class="container input-check" v-show="isShowCheck">
    <input type="checkbox" class="check-btn" />
    <div class="checkmark"></div>
  </label>
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
      showCheckbox: (state) => state.conversation.showCheckbox,
    }),
    isShowCheck() {
      return (
        this.showCheckbox &&
        !this.item.isRevoked &&
        this.item.type !== "TIMGroupTipElem"
      );
    },
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  methods: {},
  setup(props, { attrs, emit, expose, slots }) {
    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {};
  },
});
</script>

<style lang="scss" scoped>
.input-check {
  font-size: 12px;
  margin: 0 10px;
  position: absolute;
  left: 0;
  height: 100%;
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  cursor: pointer;
  user-select: none;
}

.checkmark {
  position: relative;
  top: 0;
  left: 0;
  height: 1.3em;
  width: 1.3em;
  background-color: #ccc;
  border-radius: 25px;
  transition: 0.15s;
}

.container input:checked ~ .checkmark {
  background-color: limegreen;
  border-radius: 25px;
  transition: 0.15s;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 0.45em;
  top: 0.25em;
  width: 0.25em;
  height: 0.5em;
  border: solid white;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}
</style>
