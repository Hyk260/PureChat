<template>
  <div v-show="flag" class="robot-model-box" v-click-outside="onClickOutside">
    <el-scrollbar>
      <div class="robot-model">
        <div class="item-group-title">
          <svg-icon :iconClass="robotIcon" />
          <span>{{ model.name }}</span>
        </div>
        <div
          class="model flex"
          :class="item.id == currentModel?.id ? 'active' : ''"
          v-for="item in model.chatModels"
          :key="item"
          @click="storeRobotModel(item)"
        >
          <div :class="['icon', robotIcon]">
            <div v-if="model.id === 'ollama'" :class="['icon', item.icon]">
              <svg-icon :iconClass="item.icon" />
            </div>
            <span v-else>
              <svg-icon :iconClass="robotIcon" />
            </span>
          </div>
          <div class="list flex-bc w-full">
            <span>{{ item.displayName || item.id }}</span>
            <span class="box">
              <el-tooltip v-if="item.vision" content="该模型支持视觉识别" placement="right-start">
                <svg-icon class="vision" iconClass="vision" />
              </el-tooltip>
              <el-tooltip
                v-if="item.functionCall"
                content="该模型支持函数调用（Function Call）"
                placement="right-start"
              >
                <svg-icon class="function-call" iconClass="functionCall" />
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
import { ref } from "vue";
import { useBoolean } from "@/utils/hooks/index";
import emitter from "@/utils/mitt-bus";
import { ClickOutside as vClickOutside } from "element-plus";
import { getModelType, getModelSvg, useAccessStore, formatSizeStrict } from "@/ai/utils";
import { StoreKey, modelValue, ModelProvider } from "@/ai/constant";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { useStore } from "vuex";

defineOptions({
  name: "RobotModel",
});

const robotIcon = ref("");
const model = ref({});
const [flag, setFlag] = useBoolean();
const { commit } = useStore();
const { toAccount } = useGetters(["toAccount"]);

const { currentModel } = useState({
  currentModel: (state) => state.robot.model,
});

function onClickOutside() {
  setFlag(false);
}

function storeRobotModel(data) {
  const access = localStg.get(StoreKey.Access);
  const account = getModelType(toAccount.value);
  const config = useAccessStore(account);
  const modelConfig = { ...config, model: data.id };
  if (access) {
    localStg.set(StoreKey.Access, { ...access, [account]: { ...modelConfig } });
  } else {
    localStg.set(StoreKey.Access, { [account]: { ...modelConfig } });
  }
  emitter.emit("updataBotToolsFlag", data?.functionCall || false);
  commit("setRobotModel", data);
  setFlag(false);
}

function initModel() {
  const mode = getModelType(toAccount.value);
  // const list = localStg.get("olama-local-model-list");
  robotIcon.value = getModelSvg(toAccount.value);
  const account = getModelType(toAccount.value);
  const selectModel = localStg.get(`${account}-Select-Model`);
  model.value = cloneDeep(modelValue[mode].Model.options);
  // if (list && [ModelProvider.Ollama].includes(mode)) {
  //   model.value.chatModels = list;
  // }
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
      font-family:
        Hack,
        ui-monospace,
        SFMono-Regular,
        SF Mono,
        Menlo,
        Consolas,
        Liberation Mono,
        monospace,
        "HarmonyOS Sans SC",
        "PingFang SC",
        "Hiragino Sans GB",
        "Microsoft Yahei UI",
        "Microsoft Yahei",
        "Source Han Sans CN",
        sans-serif,
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Apple Color Emoji",
        "Twemoji Mozilla",
        "Noto Color Emoji",
        "Android Emoji";
      font-size: 11px;
      color: #666666;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 4px;
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
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
.active {
  background-color: rgba(0, 0, 0, 0.03);
}
.function-call {
  color: #369eff;
}
.vision {
  color: #55b467;
}
.item-group-title {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 12px;
  color: #999999;
  transition: all 0.2s;
  .svg-icon {
    font-size: 20px;
  }
}
</style>
