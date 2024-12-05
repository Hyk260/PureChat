<template>
  <div @click="onClick()">
    <VueDraggableNext class="w-full" :list="promptData">
      <div class="prompt py-10 flex-c" v-for="(item, i) in promptData" :key="item.id">
        <svg-icon iconClass="drag" class="drag-icon" />
        <el-select class="prompt-select" v-model="item.role">
          <el-option v-for="item in ROLES" :key="item" :label="item" :value="item" />
        </el-select>
        <el-input
          v-model="item.content"
          :autosize="{ minRows: 1, maxRows: 1 }"
          @blur="onBlur"
          @focus="onFocus"
          type="textarea"
          placeholder="prompt"
        />
        <el-icon @click="onClose(i)"><CircleCloseFilled /></el-icon>
      </div>
    </VueDraggableNext>
    <div v-if="promptData.length < MAXNUM">
      <el-button class="w-full" @click="addPrompt">
        <el-icon><CirclePlusFilled /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ROLES } from "@/ai/constant";
import { nanoid } from "@/ai/platforms/ollama/protocol";
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
const promptData = ref(null);

const emit = defineEmits(["handlePrompt"]);

function initPromptData() {
  promptData.value = props.prompt;
  promptData.value.map((item) => {
    item.ID = nanoid();
  });
}

function onClick() {
  console.log("onClick", promptData.value);
}

function onBlur() {
  emit("handlePrompt", promptData);
}

function onFocus() {
  console.log("onFocus", promptData.value);
}

function onClose(i) {
  promptData.value.splice(i, 1);
}

function addPrompt() {
  if (promptData.value.length >= MAXNUM) return;
  promptData.value.push({
    id: nanoid(),
    role: ROLES[0],
    content: "",
  });
}

initPromptData()
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
