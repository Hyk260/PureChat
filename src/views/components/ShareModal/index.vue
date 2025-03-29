<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onClose"
    :modal="true"
    :append-to-body="true"
    class="share-modal-dialog min-w-460"
    align-center
    title="截图分享"
    width="60%"
  >
    <div class="share-modal">
      <div class="segmented">
        <div id="preview" class="preview" :style="back">
          <div class="content">
            <Header />
            <h2 class="role" v-if="robotRole() && isPrompt">
              {{ robotRole() }}
            </h2>
            <div v-if="isRobot(toAccount) && isPrompt" class="prompt">
              <Markdown :marked="robotPrompt()" />
            </div>
            <div class="item min-h-60">
              <div
                class="message flex p-10"
                v-for="item in getSortedForwardData"
                :key="item.ID"
                :class="isSelf(item) ? 'is-self' : 'is-other'"
              >
                <div class="avatar">
                  <img
                    class="w-32 h-32 rounded-6"
                    v-if="!isSelf(item)"
                    :src="getAiAvatarUrl(toAccount) || item.avatar"
                  />
                  <img class="w-32 h-32 rounded-6" v-else :src="item.avatar" />
                </div>
                <div class="item" :class="msgOne(item.type)">
                  <div :class="msgType(item.type)">
                    <component
                      :key="item.ID"
                      :is="loadMsgModule(item)"
                      :msgType="item.conversationType"
                      :message="item"
                      :self="isSelf(item)"
                    >
                    </component>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer p-16" :class="{ 'opacity-0': !isFooter }">
              <div class="flex-c">
                <img class="size-22" src="@/assets/images/log.png" alt="" />
                <div class="title ml-8">{{ VITE_APP_NAME }}</div>
              </div>
              <span class="link"> {{ homepage }}</span>
              <QrCode v-show="isQrCode" class="qr-code" :text="homepage" />
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
                  @click="onColor(item)"
                  class="w-28 h-28 relative rounded-50% cursor-pointer"
                  :style="fnStyleBack(item)"
                ></div>
              </div>
            </div>
            <el-divider />
            <div class="flex-bc my-5 h-32" v-if="robotPrompt()">
              <div>包含助手提示词</div>
              <div><el-switch v-model="isPrompt" /></div>
            </div>
            <el-divider v-if="robotPrompt()" />
            <div class="flex-bc my-5 h-32">
              <div>包含页脚</div>
              <div><el-switch v-model="isFooter" /></div>
            </div>
            <el-divider />
            <div class="flex-bc my-5 h-32">
              <div>包含二维码</div>
              <div><el-switch :disabled="!isFooter" v-model="isQrCode" /></div>
            </div>
            <el-divider />
            <div class="flex-bc my-5 h-32">
              <div>图片格式</div>
              <div>
                <el-radio-group v-model="fieldType" size="small">
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
        <el-button
          class="w-full"
          @click="onDownload(fieldType, robotRole(), cb)"
          :loading="loading"
        >
          <template #loading>
            <loadingSvg />
          </template>
          {{ fieldType === ImageType.Blob ? "复制截图" : "下载截图" }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { isRobot } from "@/utils/chat/index";
import { Markdown } from "@/utils/markdown/index";
import { useState } from "@/utils/hooks/index";
import {
  useScreenshot,
  ImageType,
  imageTypeOptions,
  VITE_APP_NAME,
} from "@/utils/hooks/useScreenshot";
import { loadMsgModule, msgOne, msgType, isSelf } from "@/views/chatStudio/utils/utils";
import { getModelType, usePromptStore, getAiAvatarUrl } from "@/ai/utils";
import { fnStyleBack, onColor, back, backgColor } from "./utils";
import { useChatStore } from "@/stores/index";
import loadingSvg from "@/views/login/components/loadingSvg.vue";
import Header from "@/views/chatStudio/components/Header.vue";
import emitter from "@/utils/mitt-bus";

const { pkg } = __APP_INFO__;
const homepage = pkg.homepage;
const isFooter = ref(false);
const isQrCode = ref(false);
const isPrompt = ref(false);
const fieldType = ref(ImageType.Blob);
const chatStore = useChatStore();
const emit = defineEmits(["onClose"]);

const {
  toAccount,
  getSortedForwardData,
} = storeToRefs(chatStore);

const [dialogVisible, setDialogVisible] = useState();
const { loading, onDownload } = useScreenshot();

function robotRole() {
  const model = getModelType(toAccount.value);
  try {
    const { title, avatar } = usePromptStore(model)?.meta || {};
    return `${avatar}  ${title}`;
  } catch (e) {
    return "";
  }
}

function onClose() {
  setDialogVisible(false);
}

function cb() {
  nextTick(() => {
    onClose();
    emit("onClose");
  });
}

function robotPrompt() {
  const model = getModelType(toAccount.value);
  return usePromptStore(model).prompt[0].content || "";
}

emitter.on("handleShareModal", (val) => {
  setDialogVisible(val);
});
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
