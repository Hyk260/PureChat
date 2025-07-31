<template>
  <el-dialog
    v-model="dialog"
    title="配置"
    width="60%"
    class="min-w-500 max-w-980"
    align-center
    destroy-on-close
    :append-to-body="true"
    :lock-scroll="false"
    :close-on-click-modal="true"
    :before-close="handleCancel"
  >
    <div class="container">
      <div class="container-box">
        <!-- prompt -->
        <DragPrompt ref="promptRef" />
        <div v-for="item in modelData" :key="item.ID" class="container-item">
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 title">
              <span> {{ item.Title }}</span>
              <el-tooltip
                v-if="item.apiKey && ['token'].includes(item.ID)"
                content="获取密钥"
                placement="top"
              >
                <span class="flex cursor-pointer">
                  <el-icon @click="toUrl(item.apiKey)"><QuestionFilled /></el-icon>
                </span>
              </el-tooltip>
            </div>
            <div class="subTitle">
              <Markdown :marked="item.SubTitle" />
            </div>
          </div>
          <!-- 模型 -->
          <div v-if="item.options">
            <div class="flex gap-8 flex-col">
              <el-select
                v-model="item.collapse"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="10"
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
                      <div class="models-name">
                        <span>
                          {{ models.displayName || models.id }}
                        </span>
                        <el-tooltip
                          v-if="models?.vision"
                          :content="ModelSelect.vision"
                          placement="top"
                        >
                          <SvgIcon class="vision" local-icon="vision" />
                        </el-tooltip>
                        <el-tooltip
                          v-if="models?.functionCall"
                          :content="ModelSelect.functionCall"
                          placement="top"
                        >
                          <SvgIcon class="function-call" local-icon="functionCall" />
                        </el-tooltip>
                        <el-tooltip
                          v-if="models?.reasoning"
                          :content="ModelSelect.reasoning"
                          placement="top"
                        >
                          <SvgIcon class="reasoning" local-icon="reasoning" />
                        </el-tooltip>
                      </div>
                      <div class="models-id">{{ models.id }}</div>
                    </div>
                  </div>
                </el-option>
              </el-select>
              <div class="flex-bc">
                <div class="text-[#999]">共 {{ modelCount(item.collapse.length) }} 个模型可用</div>
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
          <div v-else-if="isRange(item.ID)" class="range">
            <span class="break-normal min-w-18">
              {{ item.defaultValue }}
            </span>
            <input
              v-model="item.defaultValue"
              :min="item.min"
              :max="item.max"
              :step="item.step"
              type="range"
              @change="handleModelData"
            />
          </div>
          <div v-else-if="['max_tokens'].includes(item.ID)" class="number">
            <input
              v-model="item.defaultValue"
              :min="item.min"
              :max="item.max"
              type="number"
              @change="handleModelData"
            />
          </div>
          <div v-else-if="['token', 'openaiUrl'].includes(item.ID)" class="input">
            <div class="gap-5 flex-bc">
              <el-tooltip content="配置教程" placement="top">
                <!-- ollama -->
                <span v-if="item.doubt && isOllama" class="flex cursor-pointer">
                  <el-icon @click="toUrl(item.doubt)"><QuestionFilled /></el-icon>
                </span>
                <span v-else-if="item.doubt" class="flex cursor-pointer">
                  <el-icon @click="toUrl(item.doubt)"><QuestionFilled /></el-icon>
                </span>
                <span v-else class="w-14"></span>
              </el-tooltip>
              <div class="w-full flex gap-4">
                <el-input
                  :ref="(e) => inputRef(e, item.ID)"
                  v-model="item.defaultValue"
                  :class="['token'].includes(item.ID) ? '!w-310' : 'w-full'"
                  :placeholder="item.Placeholder"
                  :type="item.ID === 'token' ? 'password' : 'text'"
                  :show-password="item.ID === 'token'"
                  clearable
                  @change="handleModelData"
                >
                </el-input>
                <el-tooltip
                  v-if="['token'].includes(item.ID)"
                  content="测试 Api Key 与代理地址是否正确填写"
                  placement="top"
                >
                  <el-button class="check-token-btn" :loading="loading" @click="onCheckToken(item)">
                    <template #loading>
                      <div class="iconify-icon svg-spinners mr-8"></div>
                    </template>
                    <span>检查</span>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
            <div v-if="item?.apiHost" class="text-[#999] pt-8 ml-20">
              {{ item?.apiHost }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div>
        <el-button v-if="isDev" @click="handleCache"> 清除缓存 </el-button>
        <el-button @click="handleReset"> 重置 </el-button>
        <el-button @click="handleCancel">{{ $t("common.cancel") }}</el-button>
        <el-button type="primary" @click="handleConfirm()">
          {{ $t("common.confirm") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { QuestionFilled } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ModelSelect } from "@/ai/resources";
import { useAccessStore, getModelSvg } from "@/ai/utils";
import { useState } from "@/utils/hooks/index";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { ClientApi } from "@/ai/api";
import { modelValue, modelConfig } from "@/ai/constant";
import { useRobotStore, useChatStore, useAppStore } from "@/stores/index";
import { debounce } from "lodash-es";
import { isRange } from "./utils";
import { openWindow } from "@/utils/common";
import DragPrompt from "./DragPrompt.vue";
import OllamaAI from "@/ai/platforms/ollama/ollama";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "RobotOptions",
});

const { DEV: isDev } = import.meta.env;

const robotIcon = ref("");
const modelData = ref({});
const promptRef = useTemplateRef("promptRef");
const inputRefs = ref({ token: null, openaiUrl: null });

const [dialog, setDialog] = useState();
const [loading, setLoading] = useState();

const appStore = useAppStore();
const chatStore = useChatStore();
const robotStore = useRobotStore();
const { toAccount } = storeToRefs(chatStore);
const { isOllama, modelProvider, modelStore } = storeToRefs(robotStore);

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
  // const list = await api.llm.getModels()
  // modelData.value.Model.options.chatModels = list;
  // console.log(list)
}

function initModel() {
  const provider = modelProvider.value;
  const modelDataValue = cloneDeep(modelValue[provider]);
  const collapse = modelStore.value[provider]?.Model?.collapse;
  robotIcon.value = getModelSvg(toAccount.value);
  Object.values(modelDataValue).map((v) => {
    if (v.ID === "model" && collapse) v.collapse = collapse;
    v.defaultValue = useAccessStore(provider)[v.ID];
    return v;
  });
  modelData.value = modelDataValue;
}

function storeRobotModel(model) {
  const provider = modelProvider.value;
  robotStore.setAccessStore(model, provider);
  robotStore.setModelStore(modelData.value, provider);
  robotStore.updateModelConfig();
}

function handleCache() {
  const provider = modelProvider.value;
  robotStore.setModelStore({}, provider);
  robotStore.setAccessStore({}, provider);
  robotStore.updateModelConfig();
  initModel();
}

function resetRobotModel() {
  const model = {};
  const provider = modelProvider.value;
  const modelDataValue = cloneDeep(modelValue[provider]);

  Object.values(modelDataValue).map((v) => {
    if (v.ID === "openaiUrl" || v.ID === "token" || v.ID === "model") {
      v.defaultValue = useAccessStore(provider)[v.ID];
    } else {
      v.defaultValue = modelConfig[provider][v.ID];
    }
    return v;
  });

  Object.values(modelDataValue).map((t) => {
    if (isRange(t.ID)) {
      model[t.ID] = Number(t.defaultValue);
    } else {
      model[t.ID] = t.defaultValue;
    }
  });
  
  modelData.value = modelDataValue;
  robotStore.setModelStore(modelDataValue, provider);
  robotStore.setAccessStore(model, provider);
  robotStore.updateModelConfig();
}

const onCheckToken = debounce(handleCheckToken, 2000, { leading: true, trailing: false });

async function handleCheckToken(item) {
  console.log("handleCheckToken", item);
  if (item.defaultValue) {
    setLoading(true);
    const provider = modelProvider.value;
    const api = new ClientApi(provider);
    const { valid, error } = await api.llm.checkConnectivity();
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

function handleCancel() {
  setDialog(false);
}

function handleReset() {
  resetRobotModel();
  initModel();
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
  setDialog(false);
}

function toUrl(url) {
  openWindow(url);
}

const handleRobotBoxEvent = async (data = {}) => {
  const { ApiKeyFocus = false, promptFocus = false } = data;

  setDialog(true);
  initModel();

  await nextTick();

  if (ApiKeyFocus) {
    const tokenRef = inputRefs.value?.["token"] ?? null;
    tokenRef?.focus();
  }

  if (promptFocus) {
    promptRef.value?.promptTitleFocus();
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
  .models-id {
    font-size: 12px;
    color: #999;
  }
  .models-name {
    display: flex;
    align-items: center;
    gap: 4px;
  }
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
  overflow: auto;
  max-height: 70vh;
  .container-box {
    padding: 10px 0 10px 0;
  }
  .container-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color-scheme: light;
    // user-select: none;
    color: var(--color-text-default);
    min-height: 40px;
    padding: 10px 0;
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
  .check-token-btn {
    min-width: 86px;
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
    align-items: stretch !important;
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
