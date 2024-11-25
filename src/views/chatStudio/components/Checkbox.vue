<template>
  <label class="input-check fade-slide-fade-in" v-show="isShowCheck">
    <input type="checkbox" class="check-btn" />
    <div class="check-mark"></div>
    <div class="mask wh-full" v-show="isMask"></div>
  </label>
</template>

<script setup>
import { MULTIPLE_CHOICE_MAX } from "@/constants/index";
import { useState } from "@/utils/hooks/useMapper";
import { computed } from "vue";

const { item, isRevoked } = defineProps({
  item: {
    type: Object,
    default: null,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
});

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
    !isRevoked &&
    item.type !== "TIMGroupTipElem" &&
    item.payload?.description !== "dithering"
  );
});
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
}

.input-check {
  user-select: none;
  font-size: 12px;
  padding: 0 10px;
  position: absolute;
  left: 0;
  height: 100%;
}

.check-mark {
  position: relative;
  top: 0;
  left: 0;
  height: 1.3em;
  width: 1.3em;
  background-color: #ccc;
  border-radius: 25px;
  transition: 0.15s;
  cursor: pointer;
}

.check-mark:after {
  content: "";
  position: absolute;
  display: none;
}

.check-mark:after {
  left: 0.45em;
  top: 0.25em;
  width: 0.25em;
  height: 0.5em;
  border: solid white;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}

input {
  cursor: pointer;
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

input:checked ~ .check-mark {
  background-color: limegreen;
  border-radius: 25px;
  transition: 0.15s;
}

input:checked ~ .check-mark:after {
  display: block;
}
</style>
