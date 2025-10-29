<template>
  <el-dialog
    v-model="dialogVisible"
    :modal="true"
    :append-to-body="true"
    :lock-scroll="false"
    class="share-modal-dialog min-w-460"
    align-center
    title="截图分享"
    width="80%"
    @close="handleClose"
  >
    <div class="share-modal">
      <div class="segmented">
        <div id="preview" class="preview" :style="backgroundStyle">
          <div class="content">
            <ChatHeader />
            <h2 v-if="showRole" class="role">{{ roleText }}</h2>
            <div v-if="showPrompt" class="prompt">
              <Markdown :content="promptContent" />
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
                    :url="getAvatarUrl(item)"
                    shape="square"
                    :type="isSelf(item) ? 'self' : 'single'"
                  />
                </div>
                <div class="item" :class="getMessageItemClass(item)">
                  <div :class="getMessageTypeClass(item.type)">
                    <component :is="getMessageComponent(item)" :key="item.ID" :message="item"> </component>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="shareSettings.showFooter"
              class="footer p-16"
              :class="{ 'opacity-0': !shareSettings.showFooter }"
            >
              <div class="flex-c">
                <img class="size-22" loading="lazy" src="@/assets/images/log.png" alt="" />
                <div class="title ml-8">PureChat</div>
              </div>
              <span class="link">{{ docsUrl }}</span>
              <QrCode v-show="shareSettings.showQrCode && shareSettings.showFooter" class="qr-code" :text="docsUrl" />
            </div>
          </div>
        </div>
      </div>
      <div class="min-w-350">
        <div class="form-item-props">
          <el-scrollbar>
            <div class="px-10">
              <div class="flex-bc my-5 h-32">
                <div>背景色</div>
                <div class="flex grid grid-cols-7 gap-5">
                  <div
                    v-for="(item, i) in backgroundColors"
                    :key="i"
                    class="w-28 h-28 relative rounded-50% cursor-pointer"
                    :style="getBackgroundStyle(item)"
                    @click="changeBackgroundColor(item)"
                  ></div>
                </div>
              </div>
              <ElDivider />
              <div v-if="promptContent" class="flex-bc my-5 h-32">
                <div>包含助手提示词</div>
                <div><ElSwitch v-model="shareSettings.includePrompt" /></div>
              </div>
              <ElDivider v-if="promptContent" />
              <div class="flex-bc my-5 h-32">
                <div>包含页脚</div>
                <div><ElSwitch v-model="shareSettings.showFooter" /></div>
              </div>
              <ElDivider />
              <!-- 二维码选项暂时禁用 -->
              <div class="flex-bc my-5 h-32">
                <div>图片格式</div>
                <div>
                  <ElRadioGroup v-model="shareSettings.selectedImageType" size="small">
                    <ElRadioButton
                      v-for="item in imageTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </ElRadioGroup>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="form-footer">
          <ElButton class="w-full" :disabled="loading" @click="handleCopy"> 复制截图 </ElButton>
          <ElButton class="w-full" :disabled="loading" @click="handleDownload"> 下载截图 </ElButton>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from "vue"
import { ElRadioGroup, ElRadioButton } from "element-plus"
import { storeToRefs } from "pinia"

import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import ChatHeader from "@/components/Chat/ChatHeader.vue"
import { getMessageComponent } from "@/components/MessageRenderer/utils/getMessageComponent"
import { ImageType, imageTypeOptions, useScreenshot } from "@/hooks/useScreenshot"
import { useState } from "@/hooks/useState"
import { useChatStore, useRobotStore } from "@/stores"
import { getMessageItemClass, getMessageTypeClass, isSelf } from "@/utils/chat"
import emitter from "@/utils/mitt-bus"

import { backgroundColors, backgroundStyle, getBackgroundStyle, changeBackgroundColor } from "./utils"

import type { DB_Message } from "@/types"
import type { ShareOptions } from "./types"

const { pkg } = __APP_INFO__
const docsUrl = pkg.docs

const shareSettings = reactive<ShareOptions>({
  showFooter: false,
  showQrCode: true,
  includePrompt: false,
  selectedImageType: ImageType.JPG,
})

const chatStore = useChatStore()
const robotStore = useRobotStore()
const [dialogVisible, setDialogVisible] = useState(false)
const { isAssistant, getSortedForwardData } = storeToRefs(chatStore)
const { loading, onDownload } = useScreenshot()

/**
 * 获取助手提示词内容
 */
const promptContent = computed((): string => {
  if (!isAssistant.value) return ""
  return robotStore.currentProviderPrompt?.prompt[0]?.content || ""
})

/**
 * 是否显示助手提示词
 */
const showPrompt = computed((): boolean => isAssistant.value && shareSettings.includePrompt && promptContent.value)

/**
 * 获取助手角色文本
 */
const roleText = computed((): string => {
  try {
    const data = robotStore.currentProviderPrompt?.meta || {}
    if (!data.avatar || !data.title) return ""
    return `${data.avatar} ${data.title}`
  } catch (error) {
    console.error("获取角色文本失败:", error)
    return ""
  }
})

/**
 * 是否显示角色信息
 */
const showRole = computed((): boolean => roleText.value && shareSettings.includePrompt)

/**
 * 获取消息头像URL
 * @param item 消息对象
 * @returns 头像URL
 */
const getAvatarUrl = (item: DB_Message): string => {
  return item.avatar || getAiAvatarUrl(item.from)
}

/**
 * 处理截图操作的通用函数
 * @param imageType 图片类型
 */
const processScreenshot = async (imageType: ImageType): Promise<void> => {
  try {
    await onDownload(imageType, roleText.value, () => {
      setDialogVisible(false)
    })
  } catch (error) {
    console.error("截图操作失败:", error)
  }
}

/**
 * 复制截图到剪贴板
 */
const handleCopy = (): Promise<void> => {
  return processScreenshot(ImageType.Blob)
}

/**
 * 下载截图文件
 */
const handleDownload = (): Promise<void> => {
  return processScreenshot(shareSettings.selectedImageType)
}

const handleClose = (done?: () => void): void => {
  done?.()
}

onMounted(() => {
  emitter.on("handleShareModal", (val: boolean) => {
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
  gap: 16px;
  height: 75vh;

  /* 隐藏不需要在截图中显示的元素 */
  :deep(.history),
  :deep(.setup),
  :deep(.share) {
    display: none;
  }
}

.segmented {
  width: 100%;
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

.form-footer {
  margin-top: 10px;
  display: flex;
  gap: 5px;

  :deep(.el-button) {
    flex: 1;
    margin-left: 0;
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
    pointer-events: none;
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
