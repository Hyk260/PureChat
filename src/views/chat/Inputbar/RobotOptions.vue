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
        <div v-for="item in modelData" :key="item.ID" class="container-item">
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 title">
              <span>{{ $t(`${item.labelKey}`) }}</span>
              <ElTooltip
                v-if="item.apiKey && ['token'].includes(item.ID)"
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
          <div v-if="item.options">
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
                  v-for="models in item.options.chatModels"
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
                  <span>{{
                    $t("settingModel.dialog.modelCount", {
                      count: toDisplayCount(item?.options?.chatModels?.length),
                    })
                  }}</span>
                  <span>{{
                    $t("settingModel.dialog.selectedCount", { count: toDisplayCount(item?.collapse?.length) })
                  }}</span>
                </div>
                <div>
                  <!-- v-if="['openai', 'deepseek', 'qwen', 'zeroone', 'zhipu', 'ollama'].includes(item?.options?.id)" -->
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
          <div v-else-if="['max_tokens'].includes(item.ID)" class="flex justify-end number">
            <!-- <ElSwitch /> -->
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
          <div v-else-if="['token', 'openaiUrl'].includes(item.ID)" class="input">
            <div class="gap-5 flex-bc">
              <ElTooltip :content="$t('settingModel.dialog.configGuide')" placement="top">
                <!-- ollama -->
                <span v-if="item.doubt && isOllama" class="flex cursor-pointer">
                  <ElIcon @click="openExternalUrl(item.doubt)">
                    <QuestionFilled />
                  </ElIcon>
                </span>
                <span v-else-if="item.doubt" class="flex cursor-pointer">
                  <ElIcon @click="openExternalUrl(item.doubt)">
                    <QuestionFilled />
                  </ElIcon>
                </span>
                <span v-else class="w-14"></span>
              </ElTooltip>
              <div class="w-full flex gap-4">
                <ElInput
                  v-if="item.ID === 'openaiUrl'"
                  ref="inputUrlRefs"
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
            <!-- <div v-if="item?.apiHost" class="text-[#999] pt-8 ml-20 max-w-400">
              {{ item?.defaultValue ? hostPreview(item?.defaultValue) : item?.apiHost }}
            </div>
            <div v-if="item?.apiHost" class="text-[#999] pt-8 ml-20">/ 结尾忽略 v1 版本，# 结尾强制使用输入地址</div> -->
          </div>
          <!-- 连通性检查 -->
          <div v-else-if="['checkPoint'].includes(item.ID)">
            <div class="flex">
              <ElSelect
                v-model="item.defaultValue"
                :placeholder="$t('settingModel.dialog.selectTestModel')"
                class="w-300!"
                appendToBody
                @change="onModelDataChanged"
              >
                <ElOption
                  v-for="models in modelData['Model']?.options?.chatModels"
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
                <span>检查</span>
              </ElButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <ElButton v-if="IS_DEV" @click="clearRobotCache"> 清除缓存 </ElButton>
      <ElButton @click="handleReset"> 重置 </ElButton>
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
import { useChatStore, useRobotStore } from "@/stores"
// import { hostPreview } from "@pure/utils"
import { modelsService } from "@/service/models"

import { delay, useState } from "@pure/utils"
import { isRange } from "./utils"
import emitter from "@/utils/mitt-bus"
import { Markdown } from "@pure/ui"
import DragPrompt from "./DragPrompt.vue"
import { chatService } from "@/service/chatService"
import { $t } from "@/locales"

import type { Model, ModelConfigItem, ModelDataType } from "@/stores/modules/robot/types"
import type { RobotBoxEventData } from "@/types"
import type { CSSProperties } from "vue"

defineOptions({
  name: "RobotOptions",
})

interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const marks = reactive<Marks>({
  1: "1",
})

const modelData = ref<ModelDataType>({})
const inputTokenRefs = useTemplateRef("inputTokenRefs")
const promptRef = useTemplateRef("promptRef")

// const instance = getCurrentInstance()

const [dialog, setDialog] = useState(false)
const [loading, setLoading] = useState(false)

// const chatStore = useChatStore()
const robotStore = useRobotStore()
// const { toAccount } = storeToRefs(chatStore)
const { isOllama, modelProvider, modelStore } = storeToRefs(robotStore)

const handleRemoveTag = (_id: string) => {
  onModelDataChanged()
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
  return ''
  // return $t(item.placeholderKey, { provider: item.providerNameKey })
}

function updateModelList(newModels: Model[]) {
  if (newModels.length === 0) return
  window.$message?.success($t("settingModel.dialog.updateSuccess"))
  if (modelData.value?.Model) {
    modelData.value.Model.collapse = []
  }
  if (modelData.value?.Model) {
    modelData.value.Model.options = modelData.value.Model.options || { id: "", chatModels: [] }
    modelData.value.Model.options.chatModels = newModels
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
  const modelDataValue = cloneDeep(aiModelsValue[provider])

  Object.values(modelDataValue).forEach((configItem: ModelConfigItem) => {
    if (configItem.ID === "openaiUrl" || configItem.ID === "token" || configItem.ID === "model") {
      configItem.defaultValue = useAccessStore(provider)[configItem.ID]
    } else {
      configItem.defaultValue = aiModelsConfig[provider][configItem.ID]
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
    let isError = false

    await chatService.fetchPresetTaskResult({
      params: {
        messages: [
          {
            content: "hello",
            role: "user",
          },
        ],
        model: item?.defaultValue ?? "",
        provider: modelProvider.value,
      },
      onError: (_, rawError) => {
        console.error(rawError)
        isError = true
      },
      onFinish: async (value) => {
        console.log(value)
        if (!isError && value) {
          window.$message?.success("连接成功")
        } else {
          window.$message?.error("连接失败")
        }
      },
      onLoadingChange: (loading) => {
        setLoading(loading)
      },
    })
  } else {
    window.$message?.warning("请输入API密钥")
  }
}

function handleCancel() {
  setDialog(false)
}

function getMarks() {
  return null
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
  // margin-left: auto;
  // margin-right: 5px;
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

// input[type="range"] {
//   appearance: none;
//   background-color: var(--color-range);
//   color: #303030;
//   margin: 2px;
// }

// input[type="number"],
// input[type="text"],
// input[type="password"] {
//   appearance: none;
//   border-radius: 10px;
//   border: 1px solid #dedede;
//   min-height: 36px;
//   box-sizing: border-box;
//   background: #fff;
//   color: #303030;
//   padding: 0 10px;
//   max-width: 100%;
//   font-family: inherit;
// }

// @mixin thumb() {
//   appearance: none;
//   height: 8px;
//   width: 20px;
//   background-color: rgb(29, 147, 171);
//   border-radius: 10px;
//   cursor: pointer;
//   transition: all ease 0.3s;
//   margin-left: 5px;
//   border: none;
// }

// @mixin thumbHover() {
//   transform: scaleY(1.2);
//   width: 24px;
// }

// input[type="range"]::-webkit-slider-thumb {
//   @include thumb();
// }

// input[type="range"]::-moz-range-thumb {
//   @include thumb();
// }

// input[type="range"]::-ms-thumb {
//   @include thumb();
// }

// input[type="range"]::-webkit-slider-thumb:hover {
//   @include thumbHover();
// }

// input[type="range"]::-moz-range-thumb:hover {
//   @include thumbHover();
// }

// input[type="range"]::-ms-thumb:hover {
//   @include thumbHover();
// }

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
