<template>
  <div @click="onClick()">
    <VueDraggableNext class="w-full" :list="promptData">
      <div class="prompt py-10 flex-c gap-5" v-for="(item, i) in promptData" :key="item.id">
        <SvgIcon v-if="promptData.length > 1" local-icon="drag" class="drag-icon" />
        <el-select class="prompt-select" v-model="item.role">
          <el-option v-for="item in ROLES" :key="item" :label="item" :value="item" />
        </el-select>
        <el-input
          v-model="item.content"
          :autosize="{ minRows: 1, maxRows: 4 }"
          @blur="onBlur"
          @focus="onFocus"
          type="textarea"
          placeholder="prompt"
        />
        <el-button class="flex-c w-31 h-31" @click="onClose(i)">
          <el-icon><CircleCloseFilled /></el-icon>
        </el-button>
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
import { nanoid } from "@/utils/uuid";
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

const MAXNUM = 1;
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

initPromptData();
</script>

<style lang="scss" scoped>
.prompt {
  .prompt-select {
    width: 125px;
  }
  .drag-icon {
    cursor: grab;
  }
}
</style>
