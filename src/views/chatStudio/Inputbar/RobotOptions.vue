<template>
  <el-dialog
    v-model="dialog"
    title="配置"
    width="60%"
    class="min-w-500 max-w-980"
    align-center
    destroy-on-close
    :append-to-body="true"
    :close-on-click-modal="true"
    :before-close="(done) => handleCancel(done)"
  >
    <div class="container">
      <el-scrollbar>
        <div class="px-10 py-10">
          <!-- prompt -->
          <DragPrompt ref="promptRef" />
          <div class="container-item py-10 flex-bc" v-for="item in modelData" :key="item.ID">
            <div class="flex flex-col gap-5">
              <div class="title">{{ item.Title }}</div>
              <div class="subTitle">
                <Markdown :marked="item.SubTitle" />
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
                  @change="handleModelData"
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
                        <SvgIcon v-if="reIcon(item, models)" :local-icon="models.icon" />
                        <SvgIcon v-else :local-icon="robotIcon" />
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
                @change="handleModelData"
                v-model="item.defaultValue"
                :min="item.min"
                :max="item.max"
                :step="item.step"
                type="range"
              />
            </div>
            <div class="number" v-else-if="['max_tokens'].includes(item.ID)">
              <input
                @change="handleModelData"
                v-model="item.defaultValue"
                :min="item.min"
                :max="item.max"
                type="number"
              />
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
              <div class="flex gap-4">
                <el-input
                  v-model="item.defaultValue"
                  @change="handleModelData"
                  :class="['token'].includes(item.ID) ? '!w-337' : ''"
                  :ref="(e) => inputRef(e, item.ID)"
                  :placeholder="item.Placeholder"
                  :type="item.ID === 'token' ? 'password' : 'text'"
                  :show-password="item.ID === 'token'"
                  clearable
                >
                </el-input>
                <el-button v-if="['token'].includes(item.ID)" :loading="loading" @click="handleCheckToken(item)">
                  <template #loading>
                    <div class="iconify-icon svg-spinners mr-8"></div>
                  </template>
                  <el-tooltip content="测试 Api Key 与代理地址是否正确填写" placement="top">
                    <span>检查</span>
                  </el-tooltip>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <span>
        <el-button @click="handleReset()"> 重置 </el-button>
        <el-button @click="handleCancel()">{{ $t("common.cancel") }}</el-button>
        <el-button type="primary" @click="handleConfirm()">
          {{ $t("common.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useAccessStore, getModelSvg } from "@/ai/utils";
import { useState } from "@/utils/hooks/index";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { ClientApi } from "@/ai/api";
import { StoreKey, modelValue } from "@/ai/constant";
import { useRobotStore, useChatStore, useAppStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import { isRange } from "./utils";
import { openWindow } from "@/utils/common";
import DragPrompt from "./DragPrompt.vue";
import OllamaAI from "@/ai/platforms/ollama/ollama";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "RobotOptions",
});

const promptRef = ref();
const robotIcon = ref("");
const modelData = ref(null);
const inputRefs = ref({ token: null, openaiUrl: null });

const [dialog, setDialog] = useState();
const [loading, setLoading] = useState();

const appStore = useAppStore();
const chatStore = useChatStore();
const robotStore = useRobotStore();
const { toAccount } = storeToRefs(chatStore);
const { isOllama, modelProvider } = storeToRefs(robotStore);

const handleClear = (data) => {
  console.log("clear", data);
};

const inputRef = (el, id) => {
  if (el) inputRefs.value[id] = el;
};

const handleRemoveTag = (data) => {
  console.log("handleRemoveTag:", data);
};

function reIcon(t, models) {
  return t.options?.id === "ollama" || models.icon;
}

function modelCount(count) {
  return count;
}

function modelTooltipText() {
  return "获取模型列表";
}

async function onRefresh() {
  // const list = await new OllamaAI().models();
  // modelData.value.Model.options.chatModels = list;
  // localStg.set("olama-local-model-list", list);
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
  robotStore.setModel(checkModel);
}

async function handleCheckToken(item) {
  console.log("handleCheckToken", item);
  if (item.defaultValue) {
    setLoading(true);
    const provider = modelProvider.value;
    const api = new ClientApi(provider);
    const { valid, error } = await api.llm.check();
    if (valid) {
      setLoading(false);
      appStore.showMessage({ message: "连接成功", type: "success" });
    } else {
      setLoading(false);
      appStore.showMessage({ message: error, type: "error" });
    }
  } else {
    appStore.showMessage({ message: "请输入API密钥", type: "warning" });
  }
}

function handleCancel(done) {
  done && done();
  setDialog(false);
}

function handleReset() {
  localStg.remove(`${modelProvider.value}-Select-Model`);
  resetRobotModel();
  initModel();
  // handleCancel(false);
}

function handleModelData() {
  const model = {};
  Object.values(modelData.value).forEach((t) => {
    if (isRange(t.ID)) {
      model[t.ID] = Number(t.defaultValue);
    } else {
      model[t.ID] = t.defaultValue;
    }
  });
  storeRobotModel(model);
}

function handleConfirm() {
  // handleModelData();
  setDialog(false);
}

function toUrl(url) {
  openWindow(url);
}

const handleRobotBoxEvent = (data = {}) => {
  const { ApiKeyFocus = false, promptFocus = false } = data;

  setDialog(true);
  initModel();

  if (ApiKeyFocus) {
    const tokenRef = inputRefs.value?.["token"] ?? null;

    if (tokenRef) {
      try {
        setTimeout(() => tokenRef.focus(), 100);
      } catch (error) {
        console.error("Failed to focus token input:", error);
      }
    }
  }
  if (promptFocus) {
    nextTick(() => {
      promptRef.value?.promptTitleFocus();
    });
  }
};

onMounted(() => {
  emitter.on("onRobotBox", handleRobotBoxEvent);
});

onUnmounted(() => {
  emitter.off("onRobotBox");
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
  max-height: 70vh;
  height: 70vh;
  .container-item {
    color-scheme: light;
    user-select: none;
    color: var(--color-text-default);
    min-height: 40px;
    border-bottom: 1px solid #dedede60;
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

@media (max-width: 990px) {
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
