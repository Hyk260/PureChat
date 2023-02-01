<template>
  <label class="container">
    <!-- checked="checked" -->
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
  computed: {},
  props: {},
  data() {},
  methods: {},
  setup(props, { attrs, emit, expose, slots }) {
    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {};
  },
});
</script>

<style lang="scss" scoped>
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
}

/* Create a custom checkbox */
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

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: limegreen;
  border-radius: 25px;
  transition: 0.15s;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
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
