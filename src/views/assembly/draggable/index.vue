<template>
  <div>
    <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
      <div ref="innerRef">
        <p v-for="item in 24" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </div>
    </el-scrollbar>

    <el-slider
      v-model="value"
      :max="max"
      :format-tooltip="formatTooltip"
      @input="inputSlider"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElScrollbar } from "element-plus";

const max = ref(0);
const value = ref(0);
const innerRef = ref();
const scrollbarRef = ref(null);

onMounted(() => {
  max.value = innerRef.value.clientHeight - 380;

  scrollbarRef.value.setScrollTop(max.value);
});

const inputSlider = (value) => {
  console.log(value);
  scrollbarRef.value.setScrollTop(387);
};
const scroll = ({ scrollTop }) => {
  console.log(scrollTop);
  value.value = scrollTop;
};
const formatTooltip = (value) => {
  return `${value} px`;
};
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.el-slider {
  margin-top: 20px;
}
</style>
