<template>
  <div v-show="flag" v-click-outside="onClickOutside" class="robot-model-box fade-slide-fade-in">
    <ElScrollbar>
      <div v-if="model" class="robot-model">
        <div class="item-group-title">
          <ProviderIcon :provider="model.id" :size="22" type="combine" />
        </div>
        <div
          v-for="item in model?.chatModels"
          :key="item.id"
          class="model flex"
          :class="item.id === robotStore.model?.id ? 'active' : ''"
          @click="storeRobotModel(item)"
        >
          <ModelIcon :model="item.id" :size="24" type="avatar" />
          <div class="list flex-bc w-full">
            <span>{{ getBaseModelName(item.displayName || item.id) }}</span>
            <span class="box">
              <ElTooltip
                v-if="item.vision"
                :enterable="false"
                :showArrow="false"
                :content="$t('ModelSelect.featureTag.vision')"
                placement="right"
              >
                <Eye :size="16" color="#55b467" />
              </ElTooltip>
              <ElTooltip
                v-if="item.functionCall"
                :enterable="false"
                :showArrow="false"
                :content="$t('ModelSelect.featureTag.functionCall')"
                placement="right"
              >
                <ToyBrick :size="16" color="#369eff" />
              </ElTooltip>
              <ElTooltip
                v-if="item.reasoning"
                :enterable="false"
                :showArrow="false"
                :content="$t('ModelSelect.featureTag.reasoning')"
                placement="right"
              >
                <Atom :size="16" color="#bd54c6" />
              </ElTooltip>
              <ElTooltip
                v-if="item.tokens"
                :enterable="false"
                :showArrow="false"
                :content="$t('ModelSelect.featureTag.tokens', { tokens: formatToken(item) })"
                placement="right"
              >
                <span class="tokens flex-c">
                  {{ formatTokenNumber(item.tokens) }}
                </span>
              </ElTooltip>
            </span>
          </div>
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import { Atom, Eye, ToyBrick } from "@lucide/vue"
import { ClickOutside as vClickOutside } from "element-plus"
import { cloneDeep, isEmpty } from "lodash-es"
import { storeToRefs } from "pinia"
import { aiModelsValue } from "model-bank"
import { ModelIcon, ProviderIcon } from "@pure/icons"
import { getBaseModelName } from "@pure/utils"

import {
  // useChatStore,
  useRobotStore,
} from "@/stores"
import { Model, ModelConfigItem, RobotAccessConfig } from "@/stores/modules/robot/types"
import { formatTokenNumber, formatToken, useState } from "@pure/utils"
import emitter from "@/utils/mitt-bus"

defineOptions({
  name: "RobotModel",
})

const model = ref<ModelConfigItem["options"] | null>(null)
const [flag, setFlag] = useState(false)

// const chatStore = useChatStore()
const robotStore = useRobotStore()
// const { toAccount } = storeToRefs(chatStore)
const { modelProvider } = storeToRefs(robotStore)

function onClickOutside() {
  setFlag(false)
}

function storeRobotModel(data: Model) {
  const provider = modelProvider.value
  const config = robotStore.getAccessStore(provider)
  robotStore.setModel(data)
  robotStore.setAccessStore({ ...config, model: data.id }, provider)
  setFlag(false)
}

function initModel() {
  const provider = modelProvider.value
  const accessConfig = robotStore.getAccessStore(provider) as RobotAccessConfig
  const providerValue = aiModelsValue[provider]
  if (!providerValue?.Model?.options) {
    setFlag(true)
    return
  }
  model.value = cloneDeep(providerValue.Model.options)
  if (!isEmpty(accessConfig) && model.value) {
    const chatModels = accessConfig.chatModels || model.value.chatModels || []
    const collapse = accessConfig.collapse
    // 仅当 collapse 有值时做过滤，否则保留全部模型
    if (collapse?.length) {
      model.value.chatModels = chatModels.filter((item) => collapse.includes(item.id))
    }
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
