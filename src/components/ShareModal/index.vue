<template>
  <el-dialog
    v-model="dialogVisible"
    :modal="true"
    :append-to-body="true"
    :lock-scroll="false"
    class="share-modal-dialog min-w-460"
    align-center
    title="截图分享"
    width="60%"
    @close="handleClose"
  >
    <div class="share-modal">
      <div class="segmented">
        <div id="preview" class="preview" :style="back">
          <div class="content">
            <Header />
            <h2 v-if="showRole" class="role">{{ roleText }}</h2>
            <div v-if="showPrompt" class="prompt">
              <Markdown :marked="promptContent" />
            </div>
            <div class="item min-h-60">
              <div
                v-for="item in getSortedForwardData"
                :key="item.ID"
                class="message flex p-10"
                :class="isSelf(item) ? 'is-self' : 'is-other'"
              >
                <div class="avatar">
                  <UserAvatar
                    :size="32"
                    :url="fnAvatar(item)"
                    shape="square"
                    :type="isSelf(item) ? 'self' : 'single'"
                  />
                </div>
                <div class="item" :class="getMessageItemClass(item.type)">
                  <div :class="getMessageTypeClass(item.type)">
                    <component :is="getMessageComponent(item)" :key="item.ID" :message="item"> </component>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isFooter" class="footer p-16" :class="{ 'opacity-0': !isFooter }">
              <div class="flex-c">
                <img class="size-22" src="@/assets/images/log.png" alt="" />
                <div class="title ml-8">PureChat</div>
              </div>
              <span class="link"> {{ docsUrl }}</span>
              <QrCode v-show="isQrCode" class="qr-code" :text="docsUrl" />
            </div>
          </div>
        </div>
      </div>
      <div class="form-item-props">
        <el-scrollbar>
          <div class="px-10">
            <div class="flex-bc my-5 h-32">
              <div>背景色</div>
              <div class="grid grid-cols-7 gap-5">
                <div
                  v-for="(item, i) in backgColor"
                  :key="i"
                  class="w-28 h-28 relative rounded-50% cursor-pointer"
                  :style="getBackgroundStyle(item)"
                  @click="onColor(item)"
                ></div>
              </div>
            </div>
            <el-divider />
            <div v-if="promptContent" class="flex-bc my-5 h-32">
              <div>包含助手提示词</div>
              <div><el-switch v-model="isPrompt" /></div>
            </div>
            <el-divider v-if="promptContent" />
            <div class="flex-bc my-5 h-32">
              <div>包含页脚</div>
              <div><el-switch v-model="isFooter" /></div>
            </div>
            <el-divider />
            <div v-if="false" class="flex-bc my-5 h-32">
              <div>包含二维码</div>
              <div><el-switch v-model="isQrCode" :disabled="!isFooter" /></div>
            </div>
            <!-- <el-divider /> -->
            <div class="flex-bc my-5 h-32">
              <div>图片格式</div>
              <div>
                <el-radio-group v-model="imageType" size="small">
                  <el-radio-button
                    v-for="item in imageTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-radio-group>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div>
        <el-button class="w-full" :loading="loading" :disabled="loading" @click="handleDownload">
          <template #loading>
            <div class="iconify-icon svg-spinners mr-8"></div>
          </template>
          {{ downloadButtonText }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"

import { getAiAvatarUrl } from "@/ai/utils"
import { getMessageComponent } from "@/components/MessageRenderer/utils/getMessageComponent"
import { ImageType, imageTypeOptions, useScreenshot } from "@/hooks/useScreenshot"
import { useState } from "@/hooks/useState"
import { useChatStore, useRobotStore } from "@/stores"
import { getMessageItemClass, getMessageTypeClass, isSelf } from "@/utils/chat"
import emitter from "@/utils/mitt-bus"
import Header from "@/views/chat/components/Header.vue"

import { back, backgColor, getBackgroundStyle, onColor } from "./utils"

const { pkg } = __APP_INFO__
const docsUrl = pkg.docs
const isFooter = ref(false)
const isQrCode = ref(true)
const isPrompt = ref(false)
const imageType = ref(ImageType.Blob)
const chatStore = useChatStore()
const robotStore = useRobotStore()

const emit = defineEmits(["onClose"])

const [dialogVisible, setDialogVisible] = useState(false)
const { isAssistant, getSortedForwardData } = storeToRefs(chatStore)
const { loading, onDownload } = useScreenshot()

const promptContent = computed(() => {
  if (!isAssistant.value) return ""
  return robotStore.currentProviderPrompt?.prompt[0]?.content || ""
})
const showPrompt = computed(() => isAssistant.value && isPrompt.value && promptContent.value)
const roleText = computed(() => {
  try {
    const data = robotStore.currentProviderPrompt?.meta || {}
    if (!data.avatar || !data.title) return ""
    return data ? `${data.avatar} ${data.title}` : ""
  } catch {
    return ""
  }
})
const showRole = computed(() => roleText.value && isPrompt.value)
const downloadButtonText = computed(() => (imageType.value === ImageType.Blob ? "复制截图" : "下载截图"))

const fnAvatar = (item) => {
  return item.avatar || getAiAvatarUrl(item.from)
}

const handleDownload = async () => {
  onDownload(imageType.value, roleText.value, () => {
    setDialogVisible(false)
  })
}

const handleClose = (done: () => void) => {
  done?.()
}

onMounted(() => {
  emitter.on("handleShareModal", (val) => {
    setDialogVisible(val)
  })
})

onUnmounted(() => {
  emitter.off("handleShareModal")
})
</script>

<style lang="scss" scoped>
.prompt {
  padding: 16px;
  border-bottom: 1px solid var(--color-border-default);
}

.qr-code {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 13px;
  top: 22px;
}

.role {
  padding-left: 16px;
  padding-right: 16px;
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.share-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;

  :deep(.history) {
    display: none;
  }
  :deep(.setup) {
    display: none;
  }
  :deep(.share) {
    display: none;
  }
}

.segmented {
  width: 100%;
  max-height: 42vh;
  background: #f8f8f8;
  border: 1px solid #dddddd;
  border-radius: 8px;
  overflow: auto;
}

.form-item-props {
  overflow: hidden;
  background: rgba(0, 0, 0, 0.015);
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  :deep(.el-divider) {
    margin: 10px 0;
  }
}

.preview {
  padding: 10px;
  background-position: center;
  background-color: #f8f8f8;
  background-size: 100% 100%;

  .content {
    overflow: hidden;
    border: 2px solid #dddddd;
    border-radius: 8px;
    background: var(--color-body-bg);
    // pointer-events: none;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 16px;
    border-block-start: 1px solid #dddddd;
    position: relative;

    .title {
      font:
        bold 130% Consolas,
        Monaco,
        monospace;
    }

    .link {
      font-size: 14px;
      line-height: 1.5;
      color: #999999;
    }
  }
}

.is-self {
  flex-direction: row-reverse;
  display: flex;

  .nick {
    flex-direction: row-reverse !important;
  }

  .avatar {
    padding: 0 0 0 12px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

.is-other {
  .avatar {
    padding: 0 12px 0 0;
  }

  .item {
    .nick {
      display: flex;
      gap: 0 5px;
      font-size: 12px;
      color: var(--color-time-divider);
    }
  }
}
</style>
