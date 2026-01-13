<template>
  <ElDialog
    v-model="dialogVisible"
    :appendToBody="true"
    :modal="true"
    :showClose="false"
    :closeOnClickModal="true"
    :closeOnPressEscape="true"
    width="400px"
    alignCenter
    class="group-qrcode-popup"
    @close="handleClose"
  >
    <div class="group-qrcode-content">
      <div class="close-btn" @click="handleClose">
        <X :size="20" />
      </div>

      <div class="group-header">
        <div class="group-info-row">
          <div class="group-name-with-icon">
            <div class="group-icon">群</div>
            <div class="group-name-text">{{ groupProfile.name }}</div>
          </div>
        </div>
        <div class="group-number-row">
          <span class="group-number-label">群号: {{ groupID }}</span>
          <div class="copy-icon" @click="copyGroupNumber">
            <Copy :size="16" />
          </div>
        </div>
      </div>

      <div class="qrcode-wrapper">
        <QrCode :text="qrcodeText" />
        <div class="qrcode-tip">扫一扫二维码,加入群聊</div>
      </div>
      <div class="action-buttons">
        <div class="action-btn" @click="handleForward">
          <Forward :size="20" />
          <span>转发</span>
        </div>
        <div class="action-btn" @click="handleWechat">
          <MessageCircle :size="20" />
          <span>微信</span>
        </div>
        <div class="action-btn" @click="handleCopyLink">
          <Link :size="20" />
          <span>复制链接</span>
        </div>
        <div class="action-btn" @click="handleSaveImage">
          <Download :size="20" />
          <span>保存图片</span>
        </div>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { X, Copy, Forward, MessageCircle, Link, Download } from "lucide-vue-next"
import { ElDialog } from "element-plus"

import { useState } from "@/hooks/useState"
import { openWindow } from "@/utils/common"
import { formatGroupID } from "@/utils/chat"
import QrCode from "@/components/QrCode/index.vue"

import type { GroupProfileSchemaType } from "@pure/database/schemas"

defineOptions({
  name: "GroupQrCodePopup",
})

interface Props {
  groupProfile: GroupProfileSchemaType
}

const props = withDefaults(defineProps<Props>(), {})

const [dialogVisible, setDialogVisible] = useState(false)

const groupID = computed(() => formatGroupID(props.groupProfile.groupID))

const generateQrCodeText = (groupID: string) => {
  return `${window.location.origin}?joinGroup=${groupID}`
}

const qrcodeText = computed(() => {
  return `group:${generateQrCodeText(groupID.value)}:`
})

const handleClose = () => {
  setDialogVisible(false)
}

const copyGroupNumber = async () => {
  try {
    window.copyToClipboard(groupID.value)
  } catch (error) {
    console.error("复制群号失败:", error)
    window.$message?.error("复制失败")
  }
}

const handleForward = () => {
  window.$message?.info("转发功能开发中")
}

const handleWechat = () => {
  // window.$message?.info("微信分享功能开发中")
  // TODO: 实现微信分享功能
  openWindow("weixin://dl/chat/")
}

const handleCopyLink = async () => {
  try {
    const link = generateQrCodeText(groupID.value)
    window.copyToClipboard(link)
  } catch (error) {
    console.error("复制链接失败:", error)
    window.$message?.error("复制失败")
  }
}

const handleSaveImage = async () => {
  try {
    const qrcodeElement = document.querySelector(".group-qrcode-content .qrcode-wrapper img") as HTMLImageElement
    if (!qrcodeElement) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 380

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const qrSize = 240
      const qrX = (canvas.width - qrSize) / 2
      const qrY = 40
      ctx.drawImage(img, qrX, qrY, qrSize, qrSize)

      ctx.fillStyle = "#333333"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText("扫一扫二维码,加入群聊", canvas.width / 2, qrY + qrSize + 30)

      canvas.toBlob((blob) => {
        if (!blob) {
          window.$message?.error("保存图片失败")
          return
        }
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `群二维码_${props.groupProfile.name}_${groupID.value}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        window.$message?.success("图片保存成功")
      }, "image/png")
    }
    img.onerror = () => {
      window.$message?.error("加载二维码图片失败")
    }
    img.src = qrcodeElement.src
  } catch (error) {
    console.error("保存图片失败:", error)
    window.$message?.error("保存图片失败")
  }
}

const openDialog = () => {
  setDialogVisible(true)
}

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
.group-qrcode-content {
  position: relative;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
}

.group-header {
  margin-bottom: 24px;
  padding-top: 8px;

  .group-info-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .group-name-with-icon {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .group-icon {
    width: 32px;
    height: 32px;
    background: #ff4d4f;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    flex-shrink: 0;
  }

  .group-name-text {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .group-number-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 40px;
  }

  .group-number-label {
    font-size: 14px;
    color: #666;
  }

  .copy-icon {
    cursor: pointer;
    color: #666;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: #1890ff;
    }
  }
}

.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;

  :deep(.flex.justify-center) {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  :deep(img) {
    width: 240px;
    height: 240px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }

  .qrcode-tip {
    margin-top: 16px;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    span {
      font-size: 12px;
      color: #666;
    }

    svg {
      color: #666;
      transition: color 0.2s;
    }

    &:hover svg {
      color: #1890ff;
    }

    &:hover span {
      color: #1890ff;
    }
  }
}

:deep(.group-qrcode-popup) {
  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
  }
}
</style>
