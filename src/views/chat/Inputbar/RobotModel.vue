<template>
  <div v-show="flag" v-click-outside="onClickOutside" class="robot-model-box">
    <el-scrollbar>
      <div v-if="model" class="robot-model">
        <div class="item-group-title">
          <SvgIcon :local-icon="model?.icon || robotIcon" />
          <span>{{ model?.name || "" }}</span>
        </div>
        <div
          v-for="item in model?.chatModels"
          :key="item.id"
          class="model flex"
          :class="item.id === robotStore.model?.id ? 'active' : ''"
          @click="storeRobotModel(item)"
        >
          <div v-if="['ollama', 'github'].includes(model.id)" class="icon align-icon" :class="[item.icon]">
            <span v-if="item.icon">
              <SvgIcon class="align-text-bottom" :local-icon="item.icon" />
            </span>
            <span v-else class="icon" :class="[robotIcon]">
              <SvgIcon class="align-text-bottom" :local-icon="robotIcon" />
            </span>
          </div>
          <div v-else class="icon" :class="[robotIcon]">
            <SvgIcon class="align-text-bottom" :local-icon="robotIcon" />
          </div>
          <div class="list flex-bc w-full">
            <span>{{ item.displayName || item.id }}</span>
            <span class="box">
              <el-tooltip v-if="item.vision" :content="ModelSelect.vision" placement="top">
                <Eye :size="16" color="#55b467" />
              </el-tooltip>
              <el-tooltip v-if="item.functionCall" :content="ModelSelect.functionCall" placement="top">
                <ToyBrick :size="16" color="#369eff" />
              </el-tooltip>
              <el-tooltip v-if="item.reasoning" :content="ModelSelect.reasoning" placement="top">
                <Atom :size="16" color="#bd54c6" />
              </el-tooltip>
              <el-tooltip v-if="item.tokens" :content="formatTokenTip(item)" placement="top">
                <span class="tokens flex-c">
                  {{ formatTokenNumber(item.tokens) }}
                </span>
              </el-tooltip>
            </span>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { Atom, Eye, ToyBrick } from "lucide-vue-next"

import { ClickOutside as vClickOutside } from "element-plus"
import { cloneDeep, isEmpty } from "lodash-es"
import { storeToRefs } from "pinia"

import { modelValue } from "@/ai/constant"
import { ModelSelect } from "@/ai/resources"
import { getModelSvg, useAccessStore } from "@/ai/utils"
import { useState } from "@/hooks/useState"
import { useChatStore, useRobotStore } from "@/stores"
import { Model, ModelConfigItem } from "@/stores/modules/robot/types"
import { formatTokenNumber, formatTokenTip } from "@/utils/format"
import emitter from "@/utils/mitt-bus"

defineOptions({
  name: "RobotModel",
})

const robotIcon = ref<string>("")
const model = ref<ModelConfigItem["options"] | null>(null)
const [flag, setFlag] = useState(false)

const chatStore = useChatStore()
const robotStore = useRobotStore()
const { toAccount } = storeToRefs(chatStore)
const { modelStore, modelProvider } = storeToRefs(robotStore)

function onClickOutside() {
  setFlag(false)
}

function storeRobotModel(data: Model) {
  const provider = modelProvider.value
  const config = useAccessStore(provider)
  robotStore.setModel(data)
  robotStore.setAccessStore({ ...config, model: data.id }, provider)
  robotStore.updataBotToolsFlag(data)
  setFlag(false)
}

function initModel() {
  const provider = modelProvider.value
  const selectModel = modelStore.value[provider] || {}
  robotIcon.value = getModelSvg(toAccount.value)
  const providerValue = modelValue[provider]
  if (!providerValue?.Model?.options) {
    setFlag(true)
    return
  }
  model.value = cloneDeep(providerValue.Model.options)
  if (!isEmpty(selectModel) && model.value) {
    const chatModels =
      selectModel?.Model?.options?.chatModels || cloneDeep(providerValue.Model.options.chatModels || [])
    const collapse = selectModel?.Model?.collapse || []
    const filteredData = chatModels.filter((item: Model) => collapse.includes(item.id))
    model.value.chatModels = filteredData
  }
  setFlag(true)
}

emitter.on("openModeList", () => {
  initModel()
})
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
  .align-icon {
  }
  .list {
    .tokens {
      width: 36px;
      height: 18px;
      font-size: 11px;
      color: #666666;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 4px;
    }
    .box {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 4px;
      margin-left: 15px;
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
