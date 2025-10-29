<template>
  <el-dialog
    v-model="dialog"
    title="配置"
    width="70%"
    class="min-w-500 max-w-980"
    align-center
    destroy-on-close
    :append-to-body="true"
    :lock-scroll="false"
    :close-on-click-modal="true"
    @close="handleCancel"
  >
    <div class="container">
      <div class="container-box">
        <!-- prompt -->
        <DragPrompt ref="promptRef" />
        <div v-for="item in modelData" :key="item.ID" class="container-item">
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 title">
              <span> {{ item.Title }}</span>
              <el-tooltip v-if="item.apiKey && ['token'].includes(item.ID)" content="获取密钥" placement="top">
                <span class="flex cursor-pointer">
                  <el-icon @click="openExternalUrl(item.apiKey)">
                    <QuestionFilled />
                  </el-icon>
                </span>
              </el-tooltip>
            </div>
            <div class="subTitle">
              <Markdown :content="item.SubTitle" />
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
                append-to-body
                @change="onModelDataChanged"
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
                      :class="shouldUseModelIcon(item, models) ? models.icon : robotIcon"
                    >
                      <SvgIcon v-if="shouldUseModelIcon(item, models)" :local-icon="models.icon" />
                      <SvgIcon v-else :local-icon="robotIcon" />
                    </div>
                    <div class="flex flex-col h-full gap-4">
                      <div class="models-name">
                        <span>
                          {{ models.displayName || models.id }}
                        </span>
                        <el-tooltip
                          v-if="models?.vision"
                          :show-arrow="false"
                          :enterable="false"
                          :content="ModelSelect.vision"
                          placement="top"
                        >
                          <Eye :size="16" color="#55b467" />
                        </el-tooltip>
                        <el-tooltip
                          v-if="models?.functionCall"
                          :show-arrow="false"
                          :enterable="false"
                          :content="ModelSelect.functionCall"
                          placement="top"
                        >
                          <ToyBrick :size="16" color="#369eff" />
                        </el-tooltip>
                        <el-tooltip
                          v-if="models?.reasoning"
                          :show-arrow="false"
                          :enterable="false"
                          :content="ModelSelect.reasoning"
                          placement="top"
                        >
                          <Atom :size="16" color="#bd54c6" />
                        </el-tooltip>
                      </div>
                      <div class="models-id">{{ models.id }}</div>
                    </div>
                  </div>
                </el-option>
              </el-select>
              <div class="flex-bc">
                <div class="text-[#999]">
                  <span>共 {{ toDisplayCount(item?.options?.chatModels?.length) }} 个模型可用</span>
                  <span>已选择 {{ toDisplayCount(item?.collapse?.length) }} 个</span>
                </div>
                <div>
                  <el-tooltip v-if="item?.options?.id === 'openai'" :content="modelTooltipLabel" placement="top">
                    <el-icon class="refresh" @click="onRefresh">
                      <Refresh />
                    </el-icon>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="isRange(item.ID)" class="range">
            <span class="break-normal min-w-18">
              {{ item.defaultValue }}
            </span>
            <input
              v-model="item.defaultValue"
              :min="item.min ?? 0"
              :max="item.max ?? 100"
              :step="item.step ?? 1"
              type="range"
              @change="onModelDataChanged"
            />
          </div>
          <div v-else-if="['max_tokens'].includes(item.ID)" class="number">
            <input
              v-model="item.defaultValue"
              :min="item.min ?? 0"
              :max="item.max ?? 1000000"
              type="number"
              @change="onModelDataChanged"
            />
          </div>
          <div v-else-if="['token', 'openaiUrl'].includes(item.ID)" class="input">
            <div class="gap-5 flex-bc">
              <el-tooltip content="配置教程" placement="top">
                <!-- ollama -->
                <span v-if="item.doubt && isOllama" class="flex cursor-pointer">
                  <el-icon @click="openExternalUrl(item.doubt)">
                    <QuestionFilled />
                  </el-icon>
                </span>
                <span v-else-if="item.doubt" class="flex cursor-pointer">
                  <el-icon @click="openExternalUrl(item.doubt)">
                    <QuestionFilled />
                  </el-icon>
                </span>
                <span v-else class="w-14"></span>
              </el-tooltip>
              <div class="w-full flex gap-4">
                <el-input
                  :ref="(e) => inputRef(e as HTMLInputElement | null, item.ID)"
                  v-model="item.defaultValue"
                  :placeholder="item.Placeholder ?? ''"
                  :type="item.ID === 'token' ? 'password' : 'text'"
                  :show-password="item.ID === 'token'"
                  clearable
                  @change="onModelDataChanged"
                >
                </el-input>
              </div>
            </div>
            <div v-if="item?.apiHost" class="text-[#999] pt-8 ml-20 max-w-400">
              {{ item?.defaultValue ? hostPreview(item?.defaultValue) : item?.apiHost }}
            </div>
            <div v-if="item?.apiHost" class="text-[#999] pt-8 ml-20">/ 结尾忽略 v1 版本，# 结尾强制使用输入地址</div>
          </div>
          <!-- 连通性检查 -->
          <div v-else-if="['checkPoint'].includes(item.ID)">
            <div class="flex">
              <el-select
                v-model="item.defaultValue"
                placeholder="选择测试模型"
                class="!w-300"
                append-to-body
                @change="onModelDataChanged"
              >
                <el-option
                  v-for="models in modelData['Model']?.options?.chatModels"
                  :key="models.id"
                  :label="models.displayName"
                  :value="models.id"
                >
                  <div class="bot-model-option">
                    <div
                      class="bot-avatar flex-c h-full"
                      :class="shouldUseModelIcon(item, models) ? models.icon : robotIcon"
                    >
                      <SvgIcon v-if="shouldUseModelIcon(item, models)" :local-icon="models.icon" />
                      <SvgIcon v-else :local-icon="robotIcon" />
                    </div>
                    <div class="flex flex-col h-full gap-4">
                      <div class="models-name">
                        <span>
                          {{ models.displayName || models.id }}
                        </span>
                      </div>
                    </div>
                  </div>
                </el-option>
              </el-select>
              <ElButton class="check-token-btn" :loading="loading" @click="onCheckToken(item)">
                <template #loading>
                  <div class="iconify-icon svg-spinners mr-8"></div>
                </template>
                <span>检查</span>
              </ElButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <ElButton v-if="isDev" @click="clearRobotCache"> 清除缓存 </ElButton>
      <ElButton @click="handleReset"> 重置 </ElButton>
      <ElButton @click="handleCancel">{{ $t("common.cancel") }}</ElButton>
      <ElButton type="primary" @click="handleConfirm">
        {{ $t("common.confirm") }}
      </ElButton>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Atom, Eye, ToyBrick, CircleQuestionMark as QuestionFilled, RefreshCcw as Refresh } from "lucide-vue-next"

import { cloneDeep, debounce } from "lodash-es"
import { storeToRefs } from "pinia"

import { ClientApi } from "@/ai/api"
import { modelConfig, modelValue } from "@/ai/constant"
import { ModelSelect } from "@/ai/resources"
import { getModelIcon, useAccessStore } from "@/ai/utils"
import { useState } from "@/hooks/useState"
import { useChatStore, useRobotStore } from "@/stores"
import { hostPreview } from "@/utils/api"
import { openWindow } from "@/utils/common"
// import OllamaAI from "@/ai/platforms/ollama/ollama";
import emitter from "@/utils/mitt-bus"

import DragPrompt from "./DragPrompt.vue"
import { isRange } from "./utils"

import type { Model, ModelConfigItem, ModelDataType } from "@/stores/modules/robot/types"
import type { RobotBoxEventData } from "@/types"

defineOptions({
  name: "RobotOptions",
})

const { DEV: isDev } = import.meta.env

const robotIcon = ref<string>("")
const modelData = ref<ModelDataType>({})
const promptRef = useTemplateRef("promptRef")
const inputRefs = ref<{ token: HTMLInputElement | null; openaiUrl: HTMLInputElement | null }>({
  token: null,
  openaiUrl: null,
})

const [dialog, setDialog] = useState(false)
const [loading, setLoading] = useState(false)

const chatStore = useChatStore()
const robotStore = useRobotStore()
const { toAccount } = storeToRefs(chatStore)
const { isOllama, modelProvider, modelStore } = storeToRefs(robotStore)

const inputRef = (el: HTMLInputElement | null, id: string) => {
  if (el) (inputRefs.value as any)[id] = el
}

const handleRemoveTag = (_id: string) => {
  // tag removed; persist selection changes
  onModelDataChanged()
}

function shouldUseModelIcon(item: ModelConfigItem, model: Model): boolean {
  return item.options?.id === "ollama" || Boolean(model.icon)
}

function toDisplayCount(count: number | undefined): number {
  return count ?? 0
}

const modelTooltipLabel = "获取模型列表"

function updateModelList(newModels: Model[]) {
  if (newModels.length === 0) return
  window.$message?.success("模型列表更新成功")
  if (modelData.value?.Model) {
    modelData.value.Model.collapse = []
  }
  if (modelData.value?.Model) {
    modelData.value.Model.options = modelData.value.Model.options || { id: "", chatModels: [] }
    modelData.value.Model.options.chatModels = newModels
  }
}

async function onRefresh() {
  const provider = modelProvider.value
  const api = new ClientApi(provider)
  const list = await api.llm.getModels()
  updateModelList(list)
}

function initializeModelOptions() {
  const provider = modelProvider.value
  const modelDataValue = cloneDeep(modelValue[provider])
  const currentModelConfig = modelStore.value[provider]
  robotIcon.value = getModelIcon(toAccount.value)
  Object.values(modelDataValue).forEach((configItem: ModelConfigItem) => {
    if (configItem.ID === "model" && currentModelConfig?.Model?.collapse) {
      configItem.collapse = currentModelConfig?.Model?.collapse || []
      configItem.options = configItem.options || { id: "", chatModels: [] }
      configItem.options.chatModels = currentModelConfig?.Model?.options?.chatModels || []
    }
    if (configItem.ID === "checkPoint") {
      configItem.defaultValue = currentModelConfig?.CheckPoint?.defaultValue || ""
    } else {
      configItem.defaultValue = useAccessStore(provider)[configItem.ID] ?? ""
    }
  })
  // if (modelDataValue?.Model) {
  //   modelDataValue.Model.collapse = modelDataValue.Model.collapse || []
  //   modelDataValue.Model.options = modelDataValue.Model.options || { id: "", chatModels: [] }
  //   modelDataValue.Model.options.chatModels = modelDataValue.Model.options.chatModels || []
  // }
  modelData.value = modelDataValue
}

function persistRobotModel(model: ModelDataType) {
  const provider = modelProvider.value
  robotStore.setAccessStore(model, provider)
  robotStore.setModelStore(modelData.value, provider)
  robotStore.updateModelConfig()
}

function clearRobotCache() {
  const provider = modelProvider.value
  robotStore.setModelStore({}, provider)
  robotStore.setAccessStore({}, provider)
  robotStore.updateModelConfig()
  initializeModelOptions()
}

function resetRobotModelConfig() {
  const model: Record<string, any> = {}
  const provider = modelProvider.value
  const modelDataValue = cloneDeep(modelValue[provider])

  Object.values(modelDataValue).forEach((configItem: ModelConfigItem) => {
    if (configItem.ID === "openaiUrl" || configItem.ID === "token" || configItem.ID === "model") {
      configItem.defaultValue = useAccessStore(provider)[configItem.ID]
    } else {
      configItem.defaultValue = modelConfig[provider][configItem.ID]
    }
  })

  Object.values(modelDataValue).forEach((configItem: ModelConfigItem) => {
    if (isRange(configItem.ID)) {
      model[configItem.ID] = Number(configItem.defaultValue)
    } else {
      model[configItem.ID] = configItem.defaultValue
    }
  })

  // if (modelDataValue?.Model) {
  //   modelDataValue.Model.collapse = modelDataValue.Model.collapse || []
  //   modelDataValue.Model.options = modelDataValue.Model.options || { id: "", chatModels: [] }
  //   modelDataValue.Model.options.chatModels = modelDataValue.Model.options.chatModels || []
  // }
  modelData.value = modelDataValue
  robotStore.setModelStore(modelDataValue, provider)
  robotStore.setAccessStore(model, provider)
  robotStore.updateModelConfig()
}

const onCheckToken = debounce(handleCheckToken, 2000, { leading: true, trailing: false })

async function handleCheckToken(item: ModelConfigItem) {
  if (modelData.value?.Token?.defaultValue) {
    setLoading(true)
    const provider = modelProvider.value
    const api = new ClientApi(provider)
    const { valid, error } = await api.llm.checkConnectivity({ model: item?.defaultValue ?? "" })
    if (valid) {
      setLoading(false)
      window.$message?.success("连接成功")
    } else {
      setLoading(false)
      window.$message?.error(error)
    }
  } else {
    window.$message?.warning("请输入API密钥")
  }
}

function handleCancel() {
  setDialog(false)
}

function handleBeforeClose(done: () => void) {
  handleCancel()
  done()
}

function handleReset() {
  resetRobotModelConfig()
  initializeModelOptions()
}

function onModelDataChanged() {
  const model: Record<string, any> = {}
  Object.values(modelData.value).forEach((item) => {
    if (isRange(item.ID)) {
      model[item.ID] = Number(item.defaultValue)
    } else {
      model[item.ID] = item.defaultValue
    }
  })
  persistRobotModel(model as unknown as ModelDataType)
}

function handleConfirm() {
  setDialog(false)
}

function openExternalUrl(url: string) {
  openWindow(url)
}

const handleRobotBoxEvent = async (data: RobotBoxEventData = {}) => {
  const { apiKeyFocus = false, promptFocus = false } = data

  setDialog(true)
  await nextTick()
  initializeModelOptions()

  if (apiKeyFocus) {
    const tokenRef = inputRefs.value?.["token"] ?? null
    tokenRef?.focus()
  }

  if (promptFocus) {
    promptRef.value?.promptTitleFocus()
  }
}

onMounted(() => {
  emitter.on("onRobotBox", handleRobotBoxEvent)
})

onUnmounted(() => {
  emitter.off("onRobotBox")
})
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
    margin-left: 5px;
    min-width: 96px;
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
