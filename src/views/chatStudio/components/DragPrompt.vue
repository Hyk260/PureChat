<template>
  <VueDraggableNext class="w-full" :list="promptData">
    <div class="prompt py-10 flex-c" v-for="(item, i) in promptData" :key="item.id">
      <svg-icon iconClass="drag" class="drag-icon" />
      <el-select class="prompt-select" v-model="item.role">
        <el-option v-for="item in ROLES" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input
        v-model="item.content"
        :autosize="{ minRows: 1, maxRows: 4 }"
        @blur="onBlur"
        type="textarea"
        placeholder="prompt"
      />
      <el-icon @click="onClose(i)"><CircleCloseFilled /></el-icon>
    </div>
    <div v-if="promptData.length < MAXNUM">
      <el-button class="w-full" @click="addPrompt">
        <el-icon><CirclePlusFilled /></el-icon>
      </el-button>
    </div>
  </VueDraggableNext>
</template>

<script setup>
import { ref } from "vue";
import { ROLES } from "@/ai/constant";
import { VueDraggableNext } from "vue-draggable-next";

defineOptions({
  name: "DragPrompt",
});

const props = defineProps({
  prompt: {
    type: Object,
    default: () => {},
  },
});

const MAXNUM = 4;
const promptData = ref(props.prompt);

const emit = defineEmits(["handlePrompt"]);

function onBlur() {
  emit("handlePrompt", promptData);
}

function onClose(i) {
  promptData.value.splice(i, 1);
}

function addPrompt() {
  if (promptData.value.length >= MAXNUM) return;
  promptData.value.push({
    role: ROLES[0],
    content: "",
  });
}
</script>

<style lang="scss" scoped>
.prompt {
  .el-icon {
    margin-left: 5px;
    font-size: 15px;
    cursor: pointer;
  }
  .prompt-select {
    width: 125px;
    margin-right: 10px;
  }
  .drag-icon {
    margin-right: 5px;
    cursor: grab;
  }
}
</style>
