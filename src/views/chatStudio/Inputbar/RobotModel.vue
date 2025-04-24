<template>
  <div v-show="flag" class="robot-model-box" v-click-outside="onClickOutside">
    <el-scrollbar>
      <div class="robot-model">
        <div class="item-group-title">
          <svg-icon :local-icon="model.icon || robotIcon" />
          <span>{{ model.name }}</span>
        </div>
        <div
          class="model flex"
          :class="item.id == useRobotStore()?.model?.id ? 'active' : ''"
          v-for="item in model.chatModels"
          :key="item"
          @click="storeRobotModel(item)"
        >
          <div :class="['icon', robotIcon]">
            <div v-if="['ollama', 'github'].includes(model.id)" :class="['icon', item.icon]">
              <svg-icon class="align-text-bottom" :local-icon="item.icon || robotIcon" />
            </div>
            <span v-else>
              <svg-icon class="align-text-bottom" :local-icon="robotIcon" />
            </span>
          </div>
          <div class="list flex-bc w-full">
            <span>{{ item.displayName || item.id }}</span>
            <span class="box">
              <el-tooltip v-if="item.vision" :content="ModelSelect.vision" placement="right">
                <svg-icon class="vision" local-icon="vision" />
              </el-tooltip>
              <el-tooltip
                v-if="item.functionCall"
                :content="ModelSelect.functionCall"
                placement="right"
              >
                <svg-icon class="function-call" local-icon="functionCall" />
              </el-tooltip>
              <el-tooltip v-if="item.reasoning" :content="ModelSelect.reasoning" placement="right">
                <svg-icon class="reasoning" local-icon="reasoning" />
              </el-tooltip>
              <span v-if="item.tokens" class="tokens flex-c">
                {{ formatSizeStrict(item.tokens) }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/index";
import { ClickOutside as vClickOutside } from "element-plus";
import { getModelSvg, useAccessStore, formatSizeStrict } from "@/ai/utils";
import { StoreKey, modelValue } from "@/ai/constant";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { useRobotStore, useChatStore } from "@/stores/index";
import { ModelSelect } from "@/ai/resources";
import { storeToRefs } from "pinia";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "RobotModel",
});

const robotIcon = ref("");
const model = ref({});
const [flag, setFlag] = useState();
const chatStore = useChatStore();
const robotStore = useRobotStore();
const { toAccount } = storeToRefs(chatStore);
const { modelProvider } = storeToRefs(robotStore);

function onClickOutside() {
  setFlag(false);
}

function storeRobotModel(data) {
  const access = localStg.get(StoreKey.Access);
  const provider = modelProvider.value;
  const config = useAccessStore(provider);
  const modelConfig = { ...config, model: data.id };
  if (access) {
    localStg.set(StoreKey.Access, { ...access, [provider]: { ...modelConfig } });
  } else {
    localStg.set(StoreKey.Access, { [provider]: { ...modelConfig } });
  }
  robotStore.setModel(data);
  robotStore.updataBotToolsFlag(data);
  setFlag(false);
}

function initModel() {
  const provider = modelProvider.value;
  robotIcon.value = getModelSvg(toAccount.value);
  const selectModel = localStg.get(`${provider}-Select-Model`);
  model.value = cloneDeep(modelValue[provider].Model.options);
  if (selectModel && model.value) {
    const chatModels = cloneDeep(model.value.chatModels);
    const collapse = selectModel.Model.collapse || [];
    const filteredData = chatModels.filter((item) => collapse.includes(item.id));
    model.value.chatModels = filteredData;
  }
  setFlag(true);
}

emitter.on("openModeList", () => {
  initModel();
});
</script>

<style lang="scss" scoped>
.robot-model-box {
  position: absolute;
  z-index: 1;
  border-radius: 5px;
  bottom: 46px;
  background: var(--color-robot-model);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .robot-model {
    padding: 5px;
    max-height: 300px;
    .item-group-title {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      color: #999999;
      transition: all 0.2s;
      .svg-icon {
        font-size: 20px;
      }
    }
  }
}

.model {
  padding: 7px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 3px;
  .list {
    .tokens {
      width: 36px;
      height: 18px;
      font-size: 11px;
      color: #666666;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 4px;
    }
    .function-call {
      color: #369eff;
    }
    .vision {
      color: #55b467;
    }
    .reasoning {
      color: #bd54c6;
    }
    .box {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 4px;
      margin-left: 15px;
      svg {
        height: 15px;
        width: 15px;
      }
    }
  }
  .icon {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: rgb(255, 255, 255);
    height: 20px;
    width: 20px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}

.active {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
