<template>
  <ElDialog
    v-model="dialog"
    :title="$t('settingModel.dialog.title')"
    width="70%"
    class="min-w-500 max-w-980"
    alignCenter
    destroyOnClose
    :appendToBody="true"
    :lockScroll="false"
    :closeOnClickModal="true"
    @close="handleCancel"
  >
    <div class="container">
      <div class="container-box">
        <!-- prompt -->
        <DragPrompt ref="promptRef" />
        <div v-for="item in configItems" :key="item.ID" class="container-item">
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 title">
              <span>{{ getItemLabel(item) }}</span>
              <ElTooltip
                v-if="isApiKeyHelpVisible(item)"
                :content="$t('settingModel.dialog.getApiKey')"
                placement="top"
              >
                <span class="flex cursor-pointer">
                  <ElIcon @click="openExternalUrl(item.apiKey)">
                    <QuestionFilled />
                  </ElIcon>
                </span>
              </ElTooltip>
            </div>
            <div class="subTitle">
              <Markdown :content="getItemDesc(item)" />
            </div>
          </div>
          <!-- 模型列表 -->
          <div v-if="isModelListItem(item)">
            <div class="flex gap-8 flex-col">
              <ElSelect
                v-model="item.collapse"
                multiple
                collapseTags
                collapseTagsTooltip
                :maxCollapseTags="10"
                appendToBody
                @change="onModelDataChanged"
                @removeTag="handleRemoveTag"
              >
                <ElOption
                  v-for="models in getModelOptions(item)"
                  :key="models.id"
                  :label="getBaseModelName(models.displayName || models.id)"
                  :value="models.id"
                >
                  <div class="bot-model-option">
                    <div class="bot-avatar flex-c h-full">
                      <ModelIcon :model="models.id" :size="26" type="avatar" />
                    </div>
                    <div class="flex flex-col h-full gap-4">
                      <div class="models-name">
                        <span>
                          {{ getBaseModelName(models.displayName || models.id) }}
                        </span>
                        <ElTooltip
                          v-if="models?.vision"
                          :showArrow="false"
                          :enterable="false"
                          :content="$t('ModelSelect.featureTag.vision')"
                          placement="top"
                        >
                          <Eye :size="16" color="#55b467" />
                        </ElTooltip>
                        <ElTooltip
                          v-if="models?.functionCall"
                          :showArrow="false"
                          :enterable="false"
                          :content="$t('ModelSelect.featureTag.functionCall')"
                          placement="top"
                        >
                          <ToyBrick :size="16" color="#369eff" />
                        </ElTooltip>
                        <ElTooltip
                          v-if="models?.reasoning"
                          :showArrow="false"
                          :enterable="false"
                          :content="$t('ModelSelect.featureTag.reasoning')"
                          placement="top"
                        >
                          <Atom :size="16" color="#bd54c6" />
                        </ElTooltip>
                      </div>
                      <div class="models-id">{{ getLowerBaseModelName(models.id) }}</div>
                    </div>
                  </div>
                </ElOption>
              </ElSelect>
              <div class="flex-bc">
                <div class="text-[#999]">
                  <span>
                    {{ $t("settingModel.dialog.modelCount", { count: toDisplayCount(getModelOptions(item).length) }) }}
                  </span>
                  <span>
                    {{ $t("settingModel.dialog.selectedCount", { count: toDisplayCount(item?.collapse?.length) }) }}
                  </span>
                </div>
                <div>
                  <ElTooltip :content="$t('settingModel.dialog.refreshModels')" placement="top">
                    <ElIcon class="refresh flex-c" :size="15" @click="onRefresh">
                      <Refresh />
                    </ElIcon>
                  </ElTooltip>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="isRange(item.ID)" class="range">
            <ElSlider
              v-model="item.defaultValue"
              size="small"
              :step="item.step ?? 1"
              :min="item.min ?? 0"
              :max="item.max ?? 100"
              showInput
              @change="onModelDataChanged"
            />
          </div>
          <div v-else-if="isMaxTokensItem(item)" class="flex justify-end number">
            <ElSlider
              v-model="item.defaultValue"
              :min="item.min ?? 0"
              :max="item.max ?? 32000"
              size="small"
              showInput
              @change="onModelDataChanged"
            />
          </div>
          <!-- API Key 接口地址-->
          <div v-else-if="isCredentialItem(item)" class="input">
            <div class="gap-5 flex-bc">
              <ElTooltip :content="$t('settingModel.dialog.configGuide')" placement="top">
                <span v-if="item.doubt" class="flex cursor-pointer">
                  <ElIcon @click="openExternalUrl(item.doubt)">
                    <QuestionFilled />
                  </ElIcon>
                </span>
                <span v-else class="w-14"></span>
              </ElTooltip>
              <div class="w-full flex gap-4">
                <ElInput
                  v-if="item.ID === 'openaiUrl'"
                  v-model="item.defaultValue"
                  :placeholder="getItemPlaceholder(item)"
                  type="text"
                  clearable
                  @change="onModelDataChanged"
                />
                <ElInput
                  v-else-if="item.ID === 'token'"
                  ref="inputTokenRefs"
                  v-model="item.defaultValue"
                  :placeholder="getItemPlaceholder(item)"
                  type="password"
                  showPassword
                  clearable
                  @change="onModelDataChanged"
                />
              </div>
            </div>
          </div>
          <!-- 连通性检查 -->
          <div v-else-if="isCheckPointItem(item)">
            <div class="flex">
              <ElSelect
                v-model="item.defaultValue"
                :placeholder="$t('settingModel.dialog.selectTestModel')"
                class="w-300!"
                appendToBody
                @change="onModelDataChanged"
              >
                <ElOption
                  v-for="models in modelOptions"
                  :key="models.id"
                  :label="getBaseModelName(models.displayName || models.id)"
                  :value="models.id"
                >
                  <div class="bot-model-option">
                    <div class="bot-avatar flex-c h-full">
                      <ModelIcon :model="models.id" :size="26" type="avatar" />
                    </div>
                    <div class="flex flex-col h-full gap-4">
                      <div class="models-name">
                        <span>
                          {{ getBaseModelName(models.displayName || models.id) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </ElOption>
              </ElSelect>
              <ElButton class="check-token-btn" :loading="loading" @click="onCheckToken(item)">
                <template #loading>
                  <div class="iconify-icon svg-spinners mr-8"></div>
                </template>
                <span>{{ $t("settingModel.dialog.checkConnection") }}</span>
              </ElButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <ElButton v-if="IS_DEV" @click="clearRobotCache">
        {{ $t("settingModel.dialog.clearCache") }}
      </ElButton>
      <ElButton @click="handleReset">
        {{ $t("common.reset") }}
      </ElButton>
      <ElButton @click="handleCancel">{{ $t("common.cancel") }}</ElButton>
      <ElButton type="primary" @click="handleConfirm">
        {{ $t("common.confirm") }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { Atom, Eye, ToyBrick, CircleQuestionMark as QuestionFilled, RefreshCcw as Refresh } from "@lucide/vue"
import { ElSlider } from "element-plus"
import { cloneDeep, debounce } from "lodash-es"
import { storeToRefs } from "pinia"
import { ModelIcon } from "@pure/icons"
import { getLowerBaseModelName, getBaseModelName, openWindow } from "@pure/utils"
import { aiModelsConfig, aiModelsValue } from "model-bank"
import { useAccessStore } from "@/ai/utils"
import { useRobotStore } from "@/stores"
import { modelsService } from "@/service/models"

import { delay, useState } from "@pure/utils"
import emitter from "@/utils/mitt-bus"
import { Markdown } from "@pure/ui"
import DragPrompt from "./DragPrompt.vue"
import { chatService } from "@/service/chatService"
import { $t } from "@/locales"

import type { Model, ModelConfigItem, ModelDataType, RobotAccessConfig } from "@/stores/modules/robot/types"
import type { RobotBoxEventData } from "@/types"

defineOptions({
  name: "RobotOptions",
})

const modelData = ref<ModelDataType>({})
const configItems = computed(() => Object.values(modelData.value))
const modelOptions = computed(() => modelData.value.Model?.options?.chatModels ?? [])
const inputTokenRefs = useTemplateRef("inputTokenRefs")
const promptRef = useTemplateRef("promptRef")

const [dialog, setDialog] = useState(false)
const [loading, setLoading] = useState(false)

const robotStore = useRobotStore()
const { modelProvider, modelStore } = storeToRefs(robotStore)

const handleRemoveTag = (_id: string) => {
  onModelDataChanged()
}

function isRange(id: string) {
  return ["temperature", "top_p", "presence_penalty", "frequency_penalty", "historyCount"].includes(id)
}

function toDisplayCount(count?: number) {
  return count ?? 0
}

function getItemLabel(item: ModelConfigItem) {
  return item.labelKey ? $t(item.labelKey) : ""
}

function getItemDesc(item: ModelConfigItem) {
  return item.descKey ? $t(item.descKey, { provider: item.providerNameKey }) : ""
}

function getItemPlaceholder(item: ModelConfigItem) {
  if (item.placeholderKey) return $t(item.placeholderKey, { provider: item.providerNameKey })
  return item.Placeholder ?? ""
}

function isModelListItem(item: ModelConfigItem) {
  return Boolean(item.options)
}

function isApiKeyHelpVisible(item: ModelConfigItem) {
  return item.ID === "token" && Boolean(item.apiKey)
}

function isCredentialItem(item: ModelConfigItem) {
  return item.ID === "token" || item.ID === "openaiUrl"
}

function isCheckPointItem(item: ModelConfigItem) {
  return item.ID === "checkPoint"
}

function isMaxTokensItem(item: ModelConfigItem) {
  return item.ID === "max_tokens"
}

function isNumberConfigItem(item: ModelConfigItem) {
  return isRange(item.ID) || isMaxTokensItem(item)
}

function getModelOptions(item: ModelConfigItem): Model[] {
  return item.options?.chatModels ?? []
}

function ensureModelOptions(item: ModelConfigItem) {
  item.options = item.options || { id: "", chatModels: [] }
  item.options.chatModels = item.options.chatModels || []
  return item.options
}

function toAccessValue(item: ModelConfigItem) {
  if (isNumberConfigItem(item)) return Number(item.defaultValue)
  return item.defaultValue
}

function buildAccessConfig(data: ModelDataType): RobotAccessConfig {
  return Object.values(data).reduce<RobotAccessConfig>((config, item) => {
    config[item.ID] = toAccessValue(item)
    return config
  }, {})
}

function updateModelList(newModels: Model[]) {
  if (newModels.length === 0) return
  window.$message?.success($t("settingModel.dialog.updateSuccess"))
  if (modelData.value?.Model) {
    modelData.value.Model.collapse = []
    ensureModelOptions(modelData.value.Model).chatModels = newModels
  }
}

async function onRefresh() {
  const models = await modelsService.getModels(modelProvider.value)
  updateModelList(models || [])
}

function initializeModelOptions() {
  const provider = modelProvider.value
  const modelDataValue = cloneDeep(aiModelsValue[provider])
  const currentModelConfig = modelStore.value[provider]
  const accessConfig = useAccessStore(provider) as RobotAccessConfig

  Object.values(modelDataValue).forEach((configItem: ModelConfigItem) => {
    if (configItem.ID === "model" && currentModelConfig?.Model?.collapse) {
      configItem.collapse = currentModelConfig?.Model?.collapse || []
      ensureModelOptions(configItem).chatModels = currentModelConfig?.Model?.options?.chatModels || []
    }
    if (configItem.ID === "checkPoint") {
      configItem.defaultValue = currentModelConfig?.CheckPoint?.defaultValue || ""
    } else {
      configItem.defaultValue = accessConfig[configItem.ID] ?? ""
    }
  })
  modelData.value = modelDataValue
}

function persistRobotModel(model: RobotAccessConfig) {
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
  const model: RobotAccessConfig = {}
  const provider = modelProvider.value
  const modelDataValue = cloneDeep(aiModelsValue[provider])
  const accessConfig = useAccessStore(provider) as RobotAccessConfig
  const defaultConfig = aiModelsConfig[provider] as RobotAccessConfig

  Object.values(modelDataValue).forEach((configItem: ModelConfigItem) => {
    if (configItem.ID === "openaiUrl" || configItem.ID === "token" || configItem.ID === "model") {
      configItem.defaultValue = accessConfig[configItem.ID] ?? ""
    } else {
      configItem.defaultValue = defaultConfig[configItem.ID] ?? ""
    }
  })

  Object.values(modelDataValue).forEach((configItem: ModelConfigItem) => {
    model[configItem.ID] = toAccessValue(configItem)
  })

  modelData.value = modelDataValue
  robotStore.setModelStore(modelDataValue, provider)
  robotStore.setAccessStore(model, provider)
  robotStore.updateModelConfig()
}

const onCheckToken = debounce(handleCheckToken, 2000, { leading: true, trailing: false })

async function handleCheckToken(item: ModelConfigItem) {
  if (!modelData.value.Token?.defaultValue) {
    window.$message?.warning($t("settingModel.dialog.apiKeyRequired"))
    return
  }

  let isError = false
  setLoading(true)

  await chatService.fetchPresetTaskResult({
    params: {
      messages: [
        {
          content: "hello",
          role: "user",
        },
      ],
      model: String(item.defaultValue ?? ""),
      provider: modelProvider.value,
    },
    onError: (_, rawError) => {
      console.error(rawError)
      isError = true
    },
    onFinish: async (value) => {
      if (!isError && value) {
        window.$message?.success($t("settingModel.dialog.connectionSuccess"))
      } else {
        window.$message?.error($t("settingModel.dialog.connectionFailed"))
      }
    },
    onLoadingChange: (loading) => {
      setLoading(loading)
    },
  })
}

function handleCancel() {
  setDialog(false)
}

function handleReset() {
  resetRobotModelConfig()
  initializeModelOptions()
}

function onModelDataChanged() {
  persistRobotModel(buildAccessConfig(modelData.value))
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
  initializeModelOptions()

  if (apiKeyFocus) {
    await delay(100)
    nextTick(() => {
      const tokenRef = inputTokenRefs.value
      tokenRef?.[0]?.ref?.scrollIntoView({ behavior: "smooth" })
      tokenRef?.[0]?.focus()
    })
  } else if (promptFocus) {
    await delay(100)
    nextTick(() => {
      promptRef.value?.promptTitleFocus()
    })
  }
}

onMounted(() => {
  emitter.on("onRobotBox", handleRobotBoxEvent)
})

onUnmounted(() => {
  emitter.off("onRobotBox", handleRobotBoxEvent)
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
  padding: 0 8px 0 8px;
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

:deep(.show-input) {
  margin-right: 10px;
  min-width: 100px;
}

.number {
  border-radius: 10px;
  border: 1px solid #dedede;
  padding: 5px 10px;
  font-size: 12px;
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
