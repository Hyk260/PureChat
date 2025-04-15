<template>
  <div @click="onClick()">
    <div class="prompt" v-for="(item, i) in promptData" :key="item.id">
      <!-- <SvgIcon v-if="promptData.length > 1" local-icon="drag" class="drag-icon" />
        <el-select class="prompt-select" v-model="item.role">
          <el-option v-for="item in ROLES" :key="item" :label="item" :value="item" />
        </el-select> -->
      <!-- {{item}} -->
      <div class="flex gap-5">
        <el-button class="relative" @click="setFlag(true)">
          <span> {{ item.meta.avatar }} </span>
          <EmojiMart
            v-show="flag"
            class="absolute z-10 top-35 left-0"
            @onClose="setFlag(false)"
            @onEmoji="
              (e) => {
                emojiSelect(e, i);
              }
            "
          />
        </el-button>
        <el-input v-model="item.meta.title" maxlength="30" @input="onBlur" placeholder="name" />
      </div>
      <div class="prompt-content">
        <el-input
          v-model="item.prompt[0].content"
          :autosize="{ minRows: 2, maxRows: 6 }"
          @blur="onBlur"
          @focus="onFocus"
          type="textarea"
          placeholder="prompt"
        />
        <el-button v-if="false" class="flex-c w-31 h-31" @click="onClose(i)">
          <el-icon><CircleCloseFilled /></el-icon>
        </el-button>
      </div>
    </div>
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
import { useState } from "@/utils/hooks/index";
import { nanoid } from "@/utils/uuid";
import { useRobotStore } from "@/stores/index";
import { cloneDeep, isEmpty } from "lodash-es";
import { prompt } from "@/ai/constant";
import EmojiMart from "./EmojiMart.vue";

defineOptions({
  name: "DragPrompt",
});

const MAXNUM = 1;
const promptData = ref([]);
const robotStore = useRobotStore();
const [flag, setFlag] = useState(false);
const { promptStore, modelProvider } = storeToRefs(robotStore);

const emit = defineEmits(["handlePrompt"]);

function initPromptData() {
  const _promptStore = promptStore.value?.[modelProvider.value] || [];
  if (isEmpty(_promptStore)) {
    promptData.value = cloneDeep(prompt);
    promptData.value.map((item) => (item.ID = nanoid()));
  } else {
    promptData.value = cloneDeep(_promptStore);
  }
}

function onClick() {
  console.log("onClick", promptData.value);
}

function onBlur() {
  robotStore.setPromptStore(promptData.value, modelProvider.value);
  robotStore.setPromptConfig(promptData.value[0]);
}

function emojiSelect(emoji, i) {
  console.log("emojiSelect", emoji);
  promptData.value[i].meta.avatar = emoji.native;
  onBlur()
}

function onFocus() {
  console.log("onFocus", promptData.value);
}

function onClose(i) {
  promptData.value.splice(i, 1);
  robotStore.setPromptConfig("");
  robotStore.setPromptStore([], modelProvider.value);
}

function addPrompt() {
  if (promptData.value.length >= MAXNUM) return;
  const newPrompt = cloneDeep(prompt);
  console.log("newPrompt", newPrompt);
  newPrompt.map((t) => (t.id = nanoid()));
  promptData.value = newPrompt;
}

initPromptData();
</script>

<style lang="scss" scoped>
.prompt {
  display: flex;
  flex-direction: column;
  gap: 5px;
  .prompt-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .prompt-select {
    width: 125px;
  }
  .drag-icon {
    cursor: grab;
  }
}
</style>
