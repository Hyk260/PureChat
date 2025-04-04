<template>
  <el-dialog
    v-model="dialog"
    title="配置"
    width="60%"
    class="min-w-500 max-w-980"
    align-center
    destroy-on-close
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="container">
      <el-scrollbar>
        <div class="px-10">
          <!-- prompt -->
          <DragPrompt :prompt="maskData.prompt" @handlePrompt="handlePrompt" />
          <div class="container-item py-10 flex-bc" v-for="item in modelData" :key="item.ID">
            <div class="flex flex-col gap-5">
              <div class="title">{{ item.Title }}</div>
              <div class="subTitle">
                <Markdown :marked="item.SubTitle" />
                <!-- <small>{{ item.SubTitle }} </small> -->
              </div>
            </div>
            <!-- 模型 -->
            <div v-if="item.options">
              <div class="flex gap-8 flex-col">
                <el-select
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="10"
                  v-model="item.collapse"
                  append-to="body"
                  @clear="handleClear"
                  @remove-tag="handleRemoveTag"
                >
                  <el-option
                    v-for="models in item.options.chatModels"
                    :key="models.id"
                    :label="models.displayName"
                    :value="models.id"
                  >
                    <div class="bot-model-option">
                      <div
                        class="bot-avatar flex-c h-full"
                        :class="reIcon(item, models) ? models.icon : robotIcon"
                      >
                        <svg-icon v-if="reIcon(item, models)" :local-icon="models.icon" />
                        <svg-icon v-else :local-icon="robotIcon" />
                      </div>
                      <div class="flex flex-col h-full gap-4">
                        <span>{{ models.displayName || models.id }}</span>
                        <span class="text-models">{{ models.id }}</span>
                      </div>
                    </div>
                  </el-option>
                </el-select>
                <div class="flex-bc">
                  <div class="text-[#999]">
                    共 {{ modelCount(item.collapse.length) }} 个模型可用
                  </div>
                  <!-- <div>
                  <el-tooltip :content="modelTooltipText()" placement="top" v-if="isOllama()">
                    <el-icon class="refresh" @click="onRefresh()">
                      <Refresh />
                    </el-icon>
                  </el-tooltip>
                </div> -->
                </div>
              </div>
            </div>
            <div class="range" v-else-if="isRange(item.ID)">
              <span class="break-normal min-w-18">
                {{ item.defaultValue }}
              </span>
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
            <div class="input flex-ac" v-else-if="['token', 'openaiUrl'].includes(item.ID)">
              <el-tooltip content="配置教程" placement="top">
                <span
                  v-if="item.doubt && ['token'].includes(item.ID)"
                  class="flex mr-5 cursor-pointer"
                >
                  <el-icon @click="toUrl(item.doubt)"><QuestionFilled /></el-icon>
                </span>
                <!-- ollama -->
                <span v-else-if="item.doubt && isOllama" class="flex mr-5 cursor-pointer">
                  <el-icon @click="toUrl(item.doubt)"><QuestionFilled /></el-icon>
                </span>
                <span v-else> </span>
              </el-tooltip>
              <el-input
                v-model="item.defaultValue"
                :ref="(e) => inputRef(e, item.ID)"
                :placeholder="item.Placeholder"
                :type="item.ID === 'token' ? 'password' : 'text'"
                :show-password="item.ID === 'token'"
              />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <span>
        <el-button @click="handleCancel()"> 重置 </el-button>
        <el-button @click="handleClose()"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm()"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { getModelType, useAccessStore, usePromptStore, getModelSvg } from "@/ai/utils";
import { useState } from "@/utils/hooks/index";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { ClientApi } from "@/ai/api";
import { Markdown } from "@/utils/markdown/index";
import { StoreKey, modelConfig, modelValue, ModelProvider } from "@/ai/constant";
import { useRobotStore, useChatStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import DragPrompt from "./DragPrompt.vue";
import OllamaAI from "@/ai/platforms/ollama/ollama";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "RobotOptions",
});

const robotIcon = ref("");
const modelData = ref(null);
const maskData = ref([]);
const inputRefs = ref({ token: null, openaiUrl: null });

const chatStore = useChatStore();
const robotStore = useRobotStore();
const [dialog, setDialog] = useState();
const { toAccount } = storeToRefs(chatStore);
const { isOllama, modelProvider } = storeToRefs(robotStore);

const handleClear = (data) => {
  console.log("clear", data);
};

const inputRef = (el, id) => {
  if (el) inputRefs.value[id] = el;
};

const handleRemoveTag = (data) => {
  console.log("remove", data);
};

function isRange(id) {
  return [
    "temperature",
    "top_p",
    "presence_penalty",
    "frequency_penalty",
    "historyMessageCount",
  ].includes(id);
}

function handlePrompt(prompt) {
  maskData.value.prompt = prompt;
}

function reIcon(item, models) {
  return item.options?.id === "ollama" || models.icon;
}

function modelCount(count) {
  return count;
  // const olamaModelList = localStg.get("olama-local-model-list") || [];
  // return olamaModelList.length ?? count;
}
function modelTooltipText() {
  // const olamaModelList = localStg.get("olama-local-model-list") || [];
  return "获取模型列表";
}

async function onRefresh() {
  const list = await new OllamaAI().models();
  modelData.value.Model.options.chatModels = list;
  localStg.set("olama-local-model-list", list);

  // const api = new ClientApi();
  // const list = await api.llm.models()
  // modelData.value.Model.options.chatModels = list;
  // console.log(list)
}

function initModel() {
  const provider = modelProvider.value;
  const value = cloneDeep(modelValue[provider]);
  const collapse = localStg.get(`${provider}-Select-Model`)?.Model?.collapse;
  robotIcon.value = getModelSvg(toAccount.value);
  Object.values(value).map((v) => {
    if (v.ID === "model" && collapse) v.collapse = collapse;
    v.defaultValue = useAccessStore(provider)[v.ID];
    return v;
  });
  maskData.value = cloneDeep(usePromptStore(provider));
  modelData.value = value;
}

function storeRobotModel(model) {
  const access = localStg.get(StoreKey.Access);
  const provider = modelProvider.value;
  if (access) {
    localStg.set(StoreKey.Access, { ...access, [provider]: { ...model } });
  } else {
    localStg.set(StoreKey.Access, { [provider]: { ...model } });
  }
  localStg.set(`${provider}-Select-Model`, modelData.value);
}

function storeRobotMask(model) {
  const prompt = localStg.get(StoreKey.Prompt);
  const provider = modelProvider.value;
  if (prompt) {
    localStg.set(StoreKey.Prompt, { ...prompt, [provider]: { ...model } });
  } else {
    localStg.set(StoreKey.Prompt, { [provider]: { ...model } });
  }
}

function resetRobotModel() {
  const access = localStg.get(StoreKey.Access);
  if (!access) return;
  const provider = modelProvider.value;
  const filteredConfig = Object.fromEntries(
    Object.entries(access).filter(([key, _]) => !key.includes(provider))
  );
  localStg.set(StoreKey.Access, filteredConfig);
  // 重置选中模型
  const model = useAccessStore(provider)?.model;
  const data = cloneDeep(modelValue[provider].Model.options.chatModels);
  const checkModel = data.find((item) => item.id === model);
  robotStore.setRobotModel(checkModel);
}

function resetRobotMask() {
  const prompt = localStg.get(StoreKey.Prompt);
  if (!prompt) return;
  const provider = modelProvider.value;
  const filteredConfig = Object.fromEntries(
    Object.entries(prompt).filter(([key, _]) => !key.includes(provider))
  );
  localStg.set(StoreKey.Prompt, filteredConfig);
}

function handleClose(done) {
  done && done();
  setDialog(false);
}
// 重置
function handleCancel() {
  localStg.remove(`${modelProvider.value}-Select-Model`);
  robotStore.setPromptConfig("");
  resetRobotModel();
  resetRobotMask();
  setDialog(false);
}
// 保存
function handleConfirm() {
  const model = {};
  Object.values(modelData.value).map((t) => {
    if (isRange(t.ID)) {
      model[t.ID] = Number(t.defaultValue);
    } else {
      model[t.ID] = t.defaultValue;
    }
  });
  storeRobotModel(model);
  if (!maskData.value.prompt.length || !maskData.value.meta.title) {
    const _maskData = usePromptStore(modelProvider.value, true);
    storeRobotMask(_maskData);
    robotStore.setPromptConfig("");
  } else {
    storeRobotMask(maskData.value);
  }
  setDialog(false);
}

function toUrl(url) {
  window.open(url, "_blank");
}

emitter.on("onRobotBox", (data) => {
  const { ApiKeyFocus = false } = data || {};
  setDialog(true);
  initModel();
  if (ApiKeyFocus) {
    setTimeout(() => {
      const tokenRef = inputRefs.value["token"];
      tokenRef && tokenRef.focus();
    }, 100);
  }
});
</script>

<style lang="scss" scoped>
:global(body .bot-model-option) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
}
:global(body .el-select-dropdown__list) {
  padding: 3px 3px;
}
.bot-avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  color: rgb(255, 255, 255);
  svg {
    width: 1.5em;
    height: 1.5em;
  }
}
.el-select-dropdown__item {
  height: auto;
  padding: 0 15px 0 15px;
  line-height: normal;
  .text-models {
    font-size: 12px;
    color: #999;
  }
}
.el-input {
  width: 200px;
}
.refresh {
  cursor: pointer;
  margin-left: auto;
  margin-right: 5px;
}
.container {
  overflow: hidden;
  // height: 480px;
  height: 68vh;
  .container-item {
    color-scheme: light;
    user-select: none;
    color: var(--color-text-default);
    min-height: 40px;
    border-bottom: 1px solid #dedede;
    .title {
      font-size: 14px;
      font-weight: bolder;
    }
    .subTitle {
      :deep(.markdown-body) {
        font-size: 12px;
        color: #999999;
      }
    }
    .el-input,
    .el-select {
      width: 400px;
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
  appearance: none;
  background-color: var(--color-range);
  color: #303030;
  margin: 2px;
}
input[type="number"],
input[type="text"],
input[type="password"] {
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

@media (max-width: 991px) {
  .container-item {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    .range {
      max-width: 100% !important;
      input[type="range"] {
        width: 100% !important;
      }
    }
    .el-input {
      width: 100% !important;
    }
    .el-select {
      width: 100% !important;
    }
  }
}
</style>
