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
    <div>
      <ul class="container max-h-600 px-10">
        <!-- prompt -->
        <DragPrompt :prompt="maskData.prompt" @handlePrompt="handlePrompt" />
        <li class="container-item py-10 flex-bc" v-for="item in modelData" :key="item.ID">
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
                      :class="item.options?.id === 'ollama' ? models.icon : robotIcon"
                    >
                      <svg-icon v-if="item.options?.id === 'ollama'" :iconClass="models.icon" />
                      <svg-icon v-else :iconClass="robotIcon" />
                    </div>
                    <div class="flex flex-col h-full gap-4">
                      <span>{{ models.displayName || models.id }}</span>
                      <span class="text-models">{{ models.id }}</span>
                    </div>
                  </div>
                </el-option>
              </el-select>
              <div v-if="false" class="flex-bc">
                <div>共 {{ modelCount(item.collapse.length) }} 个模型可用</div>
                <div>
                  <el-tooltip :content="modelTooltipText()" placement="top" v-if="isOllama()">
                    <el-icon class="refresh" @click="onRefresh()">
                      <Refresh />
                    </el-icon>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="range" v-else-if="isRange(item.ID)">
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
          <div class="input flex-ac" v-else-if="['token', 'openaiUrl'].includes(item.ID)">
            <el-tooltip content="配置教程" placement="top">
              <span
                v-if="item.doubt && ['token'].includes(item.ID)"
                class="flex mr-5 cursor-pointer"
              >
                <el-icon @click="toUrl(item.doubt)"><QuestionFilled /></el-icon>
              </span>
              <!-- ollama -->
              <span v-else-if="item.doubt && isOllama()" class="flex mr-5 cursor-pointer">
                <el-icon @click="toUrl(item.doubt)"><QuestionFilled /></el-icon>
              </span>
              <span v-else> </span>
            </el-tooltip>
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
      <span>
        <el-button @click="handleCancel()"> 重置 </el-button>
        <el-button type="primary" @click="handleConfirm()"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { getModelType, useAccessStore, usePromptStore, getModelSvg } from "@/ai/utils";
import { useBoolean } from "@/utils/hooks/index";
import { useGetters } from "@/utils/hooks/useMapper";
import { localStg } from "@/utils/storage";
import emitter from "@/utils/mitt-bus";
import { cloneDeep } from "lodash-es";
import { useStore } from "vuex";
import { ClientApi } from "@/ai/api";
import DragPrompt from "./DragPrompt.vue";
import { Markdown } from "@/utils/markdown/index";
import { StoreKey, modelConfig, modelValue, ModelProvider } from "@/ai/constant";
import OllamaAI from "@/ai/platforms/ollama/ollama";

const robotIcon = ref("");
const modelData = ref(null);
const maskData = ref([]);

const { commit } = useStore();
const [dialog, setDialog] = useBoolean();
const { toAccount } = useGetters(["toAccount"]);

const handleClear = (data) => {
  console.log("clear", data);
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

function isOllama() {
  const model = getModelType(toAccount.value);
  return [ModelProvider.Ollama].includes(model);
}

function handlePrompt(prompt) {
  maskData.value.prompt = prompt;
}
function modelCount(count) {
  const olamaModelList = localStg.get("olama-local-model-list") || [];
  return olamaModelList.length ?? count;
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
  const model = getModelType(toAccount.value);
  const value = cloneDeep(modelValue[model]);
  const account = getModelType(toAccount.value);
  const collapse = localStg.get(`${account}-Select-Model`)?.Model?.collapse;
  const olamaModelList = localStg.get("olama-local-model-list") || [];
  robotIcon.value = getModelSvg(toAccount.value);
  Object.values(value).map((v) => {
    if (v.ID === "model" && collapse) v.collapse = collapse;
    // if (v.ID === "model" && olamaModelList.at(0)) v.options.chatModels = olamaModelList;
    v.defaultValue = useAccessStore(model)[v.ID];
    return v;
  });
  maskData.value = cloneDeep(usePromptStore(model));
  modelData.value = value;
}

function storeRobotModel(model) {
  const access = localStg.get(StoreKey.Access);
  const account = getModelType(toAccount.value);
  if (access) {
    localStg.set(StoreKey.Access, { ...access, [account]: { ...model } });
  } else {
    localStg.set(StoreKey.Access, { [account]: { ...model } });
  }
  localStg.set(`${account}-Select-Model`, modelData.value);
}

function storeRobotMask(model) {
  const access = localStg.get(StoreKey.Prompt);
  const account = getModelType(toAccount.value);
  if (access) {
    localStg.set(StoreKey.Prompt, { ...access, [account]: { ...model } });
  } else {
    localStg.set(StoreKey.Prompt, { [account]: { ...model } });
  }
}

function resetRobotModel() {
  const access = localStg.get(StoreKey.Access);
  if (!access) return;
  const account = getModelType(toAccount.value);
  const filteredConfig = Object.fromEntries(
    Object.entries(access).filter(([key, _]) => !key.includes(account))
  );
  localStg.set(StoreKey.Access, filteredConfig);
  // 重置选中模型
  const model = useAccessStore(account)?.model;
  const data = cloneDeep(modelValue[account].Model.options.chatModels);
  const checkModel = data.find((item) => item.id === model);
  commit("setRobotModel", checkModel);
}

function resetRobotMask() {
  const prompt = localStg.get(StoreKey.Prompt);
  if (!prompt) return;
  const account = getModelType(toAccount.value);
  const filteredConfig = Object.fromEntries(
    Object.entries(prompt).filter(([key, _]) => !key.includes(account))
  );
  localStg.set(StoreKey.Prompt, filteredConfig);
}

function handleClose(done) {
  done && done();
}
// 重置
function handleCancel() {
  localStg.remove(`${getModelType(toAccount.value)}-Select-Model`);
  commit("setPromptConfig", "");
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
    const _maskData = usePromptStore(getModelType(toAccount.value), true);
    storeRobotMask(_maskData);
    commit("setPromptConfig", "");
  } else {
    storeRobotMask(maskData.value);
  }
  setDialog(false);
}

function toUrl(url) {
  window.open(url, "_blank");
}

emitter.on("onRobotBox", () => {
  setDialog(true);
  initModel();
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
  overflow-y: auto;
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
      input[type="range"] {
        width: 100% !important;
      }
      max-width: 100% !important;
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
