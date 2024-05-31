<template>
  <label class="container input-check" v-show="isShowCheck">
    <input type="checkbox" class="check-btn" />
    <div class="checkmark"></div>
    <div class="mask" v-show="isMask"></div>
  </label>
</template>

<script setup>
import { MULTIPLE_CHOICE_MAX } from "@/constants/index";
import { useState } from "@/utils/hooks/useMapper";
import { computed, toRefs } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
});
const { item, isRevoked } = toRefs(props);
const { showCheckbox, forwardData } = useState({
  forwardData: (state) => state.conversation.forwardData,
  showCheckbox: (state) => state.conversation.showCheckbox,
});
const isMask = computed(() => {
  return forwardData.value.size >= MULTIPLE_CHOICE_MAX;
});

const isShowCheck = computed(() => {
  return (
    showCheckbox.value &&
    !isRevoked.value &&
    item.value.type !== "TIMGroupTipElem" &&
    item.value.payload?.description !== "dithering"
  );
});
</script>

<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.input-check {
  pointer-events: none;
  font-size: 12px;
  margin: 0 10px;
  position: absolute;
  left: 0;
  height: 100%;
}

.container {
  cursor: pointer;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
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
