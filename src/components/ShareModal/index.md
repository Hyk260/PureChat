我将从可读性、语义化、性能和复用性几个方面来优化这段代码。以下是重构后的版本：

```typescript
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
      <!-- 预览区域 -->
      <div class="segmented">
        <div id="preview" class="preview" :style="backgroundStyle">
          <div class="content">
            <ChatHeader />
            <h2 v-if="shouldShowRole" class="role">{{ roleText }}</h2>
            <div v-if="shouldShowPrompt" class="prompt">
              <Markdown :content="promptContent" />
            </div>
            <div class="item min-h-60">
              <div
                v-for="message in sortedMessages"
                :key="message.ID"
                class="message flex p-10"
                :class="getMessageAlignmentClass(message)"
              >
                <div class="avatar">
                  <UserAvatar
                    :size="32"
                    :url="getAvatarUrl(message)"
                    shape="square"
                    :type="isSelf(message) ? 'self' : 'single'"
                  />
                </div>
                <div class="item" :class="getMessageItemClass(message)">
                  <div :class="getMessageTypeClass(message.type)">
                    <component 
                      :is="getMessageComponent(message)" 
                      :key="message.ID" 
                      :message="message" 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isFooter" class="footer p-16" :class="{ 'opacity-0': !isFooter }">
              <div class="flex-c">
                <img class="size-22" loading="lazy" src="@/assets/images/log.png" alt="PureChat Logo" />
                <div class="title ml-8">PureChat</div>
              </div>
              <span class="link">{{ docsUrl }}</span>
              <QrCode v-show="showQrCode" class="qr-code" :text="docsUrl" />
            </div>
          </div>
        </div>
      </div>

      <!-- 配置选项 -->
      <div class="form-item-props">
        <el-scrollbar>
          <div class="px-10">
            <!-- 背景色选择 -->
            <BackgroundColorSelector
              :colors="backgroundColors"
              :get-style="getBackgroundStyle"
              @color-change="onColorChange"
            />
            
            <!-- 提示词开关 -->
            <ConfigSwitch
              v-if="hasPromptContent"
              label="包含助手提示词"
              v-model="isPrompt"
            />
            
            <!-- 页脚开关 -->
            <ConfigSwitch
              label="包含页脚"
              v-model="isFooter"
            />
            
            <!-- 图片格式选择 -->
            <ImageFormatSelector
              v-model="imageType"
              :options="imageTypeOptions"
            />
          </div>
        </el-scrollbar>
      </div>

      <!-- 下载按钮 -->
      <div>
        <el-button 
          class="w-full" 
          :loading="isLoading" 
          :disabled="isLoading" 
          @click="handleDownload"
        >
          {{ downloadButtonText }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { storeToRefs } from "pinia"

import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import ChatHeader from "@/components/Chat/ChatHeader.vue"
import { getMessageComponent } from "@/components/MessageRenderer/utils/getMessageComponent"
import { ImageType, imageTypeOptions, useScreenshot } from "@/hooks/useScreenshot"
import { useState } from "@/hooks/useState"
import { useChatStore, useRobotStore } from "@/stores"
import { getMessageItemClass, getMessageTypeClass, isSelf } from "@/utils/chat"
import emitter from "@/utils/mitt-bus"

// 导入组件
import BackgroundColorSelector from './components/BackgroundColorSelector.vue'
import ConfigSwitch from './components/ConfigSwitch.vue'
import ImageFormatSelector from './components/ImageFormatSelector.vue'

// 常量定义
const { pkg } = __APP_INFO__
const DOCS_URL = pkg.docs

// 响应式状态
const isFooter = ref(false)
const showQrCode = ref(true)
const isPrompt = ref(false)
const imageType = ref(ImageType.Blob)
const [dialogVisible, setDialogVisible] = useState(false)

// Store
const chatStore = useChatStore()
const robotStore = useRobotStore()
const { isAssistant, getSortedForwardData } = storeToRefs(chatStore)

// Hooks
const { loading: isLoading, onDownload } = useScreenshot()

// 背景相关
interface BackgroundColor {
  colorA: string
  colorB: string
  angle: string
}

const backgroundColors: BackgroundColor[] = [
  { colorA: "#6DD5C4", colorB: "#5697F9", angle: "45deg" },
  { colorA: "#622FC2", colorB: "#87FFAD", angle: "45deg" },
  { colorA: "#4A4FFF", colorB: "#87FFAD", angle: "45deg" },
  { colorA: "#BAA7E4", colorB: "#F59F9C", angle: "45deg" },
  { colorA: "#45A5D7", colorB: "#F59F9C", angle: "45deg" },
  { colorA: "#2CB0CE", colorB: "#CDCBFF", angle: "150deg" },
  { colorA: "#B0BDBF", colorB: "#CDCBFF", angle: "45deg" },
]

const backgroundStyle = ref(`
  background: linear-gradient(var(--houdini-angle), var(--houdini-colorA), var(--houdini-colorB));
  --houdini-colorA: #B0BDBF;
  --houdini-colorB: #CDCBFF;
  --houdini-angle: 120deg;
`)

// 计算属性
const sortedMessages = computed(() => getSortedForwardData.value)
const docsUrl = computed(() => DOCS_URL)

const promptContent = computed(() => {
  if (!isAssistant.value) return ""
  return robotStore.currentProviderPrompt?.prompt?.[0]?.content || ""
})

const hasPromptContent = computed(() => !!promptContent.value)

const roleText = computed(() => {
  const meta = robotStore.currentProviderPrompt?.meta
  return meta?.avatar && meta?.title ? `${meta.avatar} ${meta.title}` : ""
})

const shouldShowPrompt = computed(() => 
  isAssistant.value && isPrompt.value && hasPromptContent.value
)

const shouldShowRole = computed(() => 
  roleText.value && isPrompt.value
)

const downloadButtonText = computed(() => 
  imageType.value === ImageType.Blob ? "复制截图" : "下载截图"
)

// 方法
const getAvatarUrl = (message: any): string => 
  message.avatar || getAiAvatarUrl(message.from)

const getMessageAlignmentClass = (message: any): string => 
  isSelf(message) ? 'is-self' : 'is-other'

const getBackgroundStyle = (color: BackgroundColor): string => 
  `background-image: linear-gradient(${color.angle}, ${color.colorA}, ${color.colorB});`

const onColorChange = (color: BackgroundColor): void => {
  const preview = document.querySelector("#preview")
  if (!preview) return
  
  preview.style.setProperty("--houdini-colorA", color.colorA)
  preview.style.setProperty("--houdini-colorB", color.colorB)
  preview.style.setProperty("--houdini-angle", color.angle)
}

const handleDownload = async (): Promise<void> => {
  await onDownload(imageType.value, roleText.value, () => {
    setDialogVisible(false)
  })
}

const handleClose = (done?: () => void): void => {
  done?.()
}

// 生命周期
const handleShareModal = (val: boolean): void => {
  setDialogVisible(val)
}

onMounted(() => {
  emitter.on("handleShareModal", handleShareModal)
})

onUnmounted(() => {
  emitter.off("handleShareModal", handleShareModal)
})
</script>

<style lang="scss" scoped>
// 样式保持不变，但建议提取到独立的样式文件中
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

  :deep(.history),
  :deep(.setup),
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
      font: bold 130% Consolas, Monaco, monospace;
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
```

## 新增的组件文件：

### `components/BackgroundColorSelector.vue`
```vue
<template>
  <div class="flex-bc my-5 h-32">
    <div>背景色</div>
    <div class="grid grid-cols-7 gap-5">
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="w-28 h-28 relative rounded-50% cursor-pointer"
        :style="getStyle(color)"
        @click="$emit('color-change', color)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BackgroundColor {
  colorA: string
  colorB: string
  angle: string
}

interface Props {
  colors: BackgroundColor[]
  getStyle: (color: BackgroundColor) => string
}

defineProps<Props>()
defineEmits<{
  'color-change': [color: BackgroundColor]
}>()
</script>
```

### `components/ConfigSwitch.vue`
```vue
<template>
  <div class="flex-bc my-5 h-32">
    <div>{{ label }}</div>
    <div><el-switch v-model="modelValue" /></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  modelValue: boolean
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
```

### `components/ImageFormatSelector.vue`
```vue
<template>
  <div class="flex-bc my-5 h-32">
    <div>图片格式</div>
    <div>
      <el-radio-group v-model="modelValue" size="small">
        <el-radio-button
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ImageTypeOption {
  label: string
  value: string
}

interface Props {
  modelValue: string
  options: ImageTypeOption[]
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
```

## 主要优化点：

1. **语义化命名**：
   - 将变量名改为更具描述性的名称（如 `isQrCode` → `showQrCode`）
   - 方法名更加语义化（如 `fnAvatar` → `getAvatarUrl`）

2. **组件拆分**：
   - 将配置选项拆分为独立组件，提高复用性
   - 每个组件职责单一，便于维护

3. **类型安全**：
   - 添加 TypeScript 接口定义
   - 明确组件 props 和 emits 类型

4. **性能优化**：
   - 使用计算属性缓存计算结果
   - 避免不必要的响应式依赖

5. **代码组织**：
   - 按功能模块分组代码
   - 提取常量定义
   - 清晰的注释和文档

6. **错误处理**：
   - 在 DOM 操作前添加空值检查
   - 使用可选链操作符避免运行时错误

这样的重构使得代码更加模块化、可维护，并且具有良好的类型安全性。