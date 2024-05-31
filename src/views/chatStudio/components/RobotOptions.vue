<template>
  <el-dialog
    v-model="state"
    title="配置"
    :append-to-body="true"
    width="750px"
    align-center
    :before-close="handleClose"
  >
    <div>
      <ul class="container">
        <!-- prompt -->
        <div class="prompt" v-for="item in maskData" :key="item.id">
          <template v-for="(m, i) in item.prompt" :key="i">
            <svg-icon v-show="false" iconClass="drag" class="dragIcon" />
            <el-select class="prompt-select" v-model="m.role">
              <el-option v-for="item in ROLES" :key="item.id" :label="item" :value="item" />
            </el-select>
            <el-input
              class="prompt-input"
              v-model="m.content"
              :autosize="{ minRows: 1, maxRows: 4 }"
              type="textarea"
              placeholder="prompt"
            />
            <el-icon v-show="false" @click="onClose"><CircleCloseFilled /></el-icon>
          </template>
        </div>
        <li class="list-item" v-for="item in modelData" :key="item.ID">
          <div>
            <div class="title">{{ item.Title }}</div>
            <div class="subTitle">{{ item.SubTitle }}</div>
          </div>
          <!-- 模型 -->
          <el-select v-if="item.options" v-model="item.defaultValue">
            <el-option
              v-for="item in item.options"
              :key="item.name"
              :label="item.name + `(${item.provider.providerName})`"
              :value="item.name"
            />
          </el-select>
          <div class="range" v-else-if="item.Range">
            {{ item.defaultValue }}
            <input
              v-model="item.defaultValue"
              :min="item.min"
              :max="item.max"
              :step="item.step"
              type="range"
            />
          </div>
          <div class="number" v-else-if="['max_tokens'].includes(item.ID)">
            <input v-model="item.defaultValue" :min="item.min" :max="item.max" type="number" />
          </div>
          <div class="input" v-else-if="['token', 'openaiUrl'].includes(item.ID)">
            <el-input
              v-model="item.defaultValue"
              :placeholder="item.Placeholder"
              :type="item.ID === 'token' ? 'password' : 'text'"
              :show-password="item.ID === 'token'"
            />
          </div>
        </li>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel()"> 重置 </el-button>
        <el-button type="primary" @click="handleConfirm()"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ROLES, StoreKey, modelConfig, modelValue } from "@/ai/constant";
import { getModelType, useAccessStore, usePromptStore } from "@/ai/utils";
import { useBoolean } from "@/utils/hooks/index";
import { useGetters } from "@/utils/hooks/useMapper";
import storage from "@/utils/localforage/index";
import emitter from "@/utils/mitt-bus";
import { cloneDeep } from "lodash-es";
import { ref } from "vue";
import { useStore } from "vuex";

const modelData = ref(null);
const maskData = ref([]);

const { commit } = useStore();
const [state, setState] = useBoolean();
const { toAccount } = useGetters(["toAccount"]);

function initModel() {
  const model = getModelType(toAccount.value);
  const value = cloneDeep(modelValue[model]);
  Object.values(value).map((v) => {
    return (v.defaultValue = useAccessStore(model)[v.ID]);
  });
  if (model === "GPT") {
    maskData.value = cloneDeep(usePromptStore(model));
  } else {
    maskData.value = [];
  }
  modelData.value = value;
}

function handleClose(done) {
  done();
}

function storeRobotModel(model) {
  const access = storage.get(StoreKey.Access);
  const account = getModelType(toAccount.value);
  if (access) {
    storage.set(StoreKey.Access, { ...access, [account]: { ...model } });
  } else {
    storage.set(StoreKey.Access, { [account]: { ...model } });
  }
  commit("setRobotModel", model.model);
}

function storeRobotMask(model) {
  const access = storage.get(StoreKey.Prompt);
  const account = getModelType(toAccount.value);
  if (access) {
    storage.set(StoreKey.Prompt, { ...access, [account]: { ...model } });
  } else {
    storage.set(StoreKey.Prompt, { [account]: { ...model } });
  }
}

function resetRobotModel() {
  const access = storage.get(StoreKey.Access);
  if (!access) return;
  const account = getModelType(toAccount.value);
  const filteredConfig = Object.fromEntries(
    Object.entries(access).filter(([key, _]) => !key.includes(account))
  );
  storage.set(StoreKey.Access, filteredConfig);
  commit("setRobotModel", modelConfig[account].model);
}
// 重置
function handleCancel() {
  resetRobotModel();
  storage.remove(StoreKey.Prompt);
  setState(false);
}
// 保存
function handleConfirm() {
  setState(false);
  const model = {};
  Object.values(modelData.value).map((t) => {
    model[t.ID] = t.defaultValue;
  });
  storeRobotModel(model);
  if (model === "GPT") storeRobotMask(maskData.value);
}

function onClose() {}

emitter.on("onRobotBox", (state) => {
  initModel();
  setState(state);
});
</script>

<style lang="scss" scoped>
.el-input {
  width: 200px;
}
@mixin thumb() {
  appearance: none;
  height: 8px;
  width: 20px;
  background-color: rgb(29, 147, 171);
  border-radius: 10px;
  cursor: pointer;
  transition: all ease 0.3s;
  margin-left: 5px;
  border: none;
}
@mixin thumbHover() {
  transform: scaleY(1.2);
  width: 24px;
}
input[type="range"]::-webkit-slider-thumb {
  @include thumb();
}
input[type="range"]::-moz-range-thumb {
  @include thumb();
}
input[type="range"]::-ms-thumb {
  @include thumb();
}
input[type="range"]::-webkit-slider-thumb:hover {
  @include thumbHover();
}
input[type="range"]::-moz-range-thumb:hover {
  @include thumbHover();
}
input[type="range"]::-ms-thumb:hover {
  @include thumbHover();
}
.prompt {
  padding: 20px;
  @include flex-center;
  .el-icon {
    margin: 0 10px;
    color: #4498ef;
    font-size: 15px;
    cursor: pointer;
  }
  .prompt-select {
    width: 125px;
    margin-right: 10px;
  }
  .dragIcon {
    margin-right: 5px;
    cursor: grab;
  }
  .prompt-input {
    // width: 430px;
  }
}

.container {
  .list-item {
    color-scheme: light;
    user-select: none;
    color: var(--color-text-default);
    justify-content: space-between;
    min-height: 40px;
    border-bottom: 1px solid #dedede;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    .title {
      font-size: 14px;
      font-weight: bolder;
    }
    .subTitle {
      font-size: 12px;
      font-weight: 400;
    }
    .el-select {
      max-width: 197px;
    }
  }
}
.range {
  border: 1px solid #dedede;
  max-width: 40%;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--color-range);
  color: #303030;
  margin: 2px;
}

input[type="number"],
input[type="text"],
input[type="password"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 10px;
  border: 1px solid #dedede;
  min-height: 36px;
  box-sizing: border-box;
  background: #fff;
  color: #303030;
  padding: 0 10px;
  max-width: 100%;
  font-family: inherit;
}
</style>
