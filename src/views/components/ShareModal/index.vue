<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onClose"
    :modal="true"
    :append-to-body="true"
    align-center
    title="截图分享"
    width="60%"
  >
    <div class="share-modal">
      <div class="segmented w-full">
        <div id="preview" class="preview" :style="back">
          <div class="content">
            <Header />
            <h2 class="role px-16" v-if="robotRole() && isPrompt">
              {{ robotRole() }}
            </h2>
            <div v-if="isRobot(toAccount) && isPrompt" class="prompt p-16">
              <Markdown :marked="robotPrompt()" />
            </div>
            <div class="min-h-60 item">
              <div
                class="message flex p-10"
                v-for="item in fnForwardData"
                :key="item.ID"
                :class="isSelf(item) ? 'is-self' : 'is-other'"
              >
                <div class="avatar">
                  <img v-if="!isSelf(item)" :src="fnAvatar(toAccount) || item.avatar" />
                  <img v-else :src="item.avatar" />
                </div>
                <div class="item" :class="msgOne(item.type)">
                  <p class="nick">
                    <!-- <span>{{ item.nick }}</span> -->
                  </p>
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
            <div v-show="isFooter" class="footer p-16">
              <div class="flex justify-center items-center">
                <img class="size-22" src="@/assets/images/log.png" alt="" />
                <div class="title ml-8">{{ title_app }}</div>
              </div>
              <span class="link"> {{ homepage }}</span>
              <QrCode v-show="isQrCode" class="qr-code" :text="homepage" />
            </div>
          </div>
        </div>
      </div>
      <div class="form-item-props px-5">
        <div class="flex-bc my-5 h-32">
          <div>背景色</div>
          <div class="grid grid-cols-7 gap-5">
            <div
              v-for="(item, i) in backgColor"
              :key="i"
              @click="onColor(item)"
              class="w-28 h-28 relative rounded-[50%] cursor-pointer"
              :style="fnStyleBack(item)"
            ></div>
          </div>
        </div>
        <el-divider class="my-10" />
        <div class="flex-bc my-5 h-32" v-if="robotPrompt()">
          <div>包含助手提示词</div>
          <div><el-switch v-model="isPrompt" /></div>
        </div>
        <el-divider v-if="robotPrompt()" class="my-10" />
        <div class="flex-bc my-5 h-32">
          <div>包含页脚</div>
          <div><el-switch v-model="isFooter" /></div>
        </div>
        <el-divider class="my-10" />
        <div v-show="isFooter" class="flex-bc my-5 h-32">
          <div>包含二维码</div>
          <div><el-switch v-model="isQrCode" /></div>
        </div>
        <el-divider v-show="isFooter" class="my-10" />
        <div class="image-type flex-bc my-5 h-32">
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
      <div>
        <el-button class="w-full" @click="onDownload(fieldType, robotRole(), cb)" :loading="loading">
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
import loadingSvg from "@/views/login/components/loadingSvg.vue";
import { isRobot } from "@/utils/chat/index";
import { Markdown } from "@/utils/markdown/index";
import emitter from "@/utils/mitt-bus";
import Header from "@/views/chatStudio/components/Header.vue";
import { useBoolean } from "@/utils/hooks/index";
import { useScreenshot, ImageType, imageTypeOptions } from "@/utils/hooks/useScreenshot";
import { useState } from "@/utils/hooks/useMapper";
import { loadMsgModule, msgOne, msgType, isSelf } from "@/views/chatStudio/utils/utils";
import { useGetters } from "@/utils/hooks/useMapper";
import { getModelType, usePromptStore, fnAvatar } from "@/ai/utils";

const title_app = import.meta.env.VITE_APP_NAME;
const { pkg } = __APP_INFO__;
const homepage = pkg.homepage;
const isFooter = ref(false);
const isQrCode = ref(false);
const isPrompt = ref(false);
const fieldType = ref(ImageType.Blob);

const emit = defineEmits(["onClose"]);

const backgColor = ref([
  {
    colorA: "#6DD5C4",
    colorB: "#5697F9",
    angle: "45deg",
  },
  {
    colorA: "#622FC2",
    colorB: "#87FFAD",
    angle: "45deg",
  },
  {
    colorA: "#4A4FFF",
    colorB: "#87FFAD",
    angle: "45deg",
  },
  {
    colorA: "#BAA7E4",
    colorB: "#F59F9C",
    angle: "45deg",
  },
  {
    colorA: "#45A5D7",
    colorB: "#F59F9C",
    angle: "45deg",
  },
  {
    colorA: "#2CB0CE",
    colorB: "#CDCBFF",
    angle: "150deg",
  },
  {
    colorA: "#B0BDBF",
    colorB: "#CDCBFF",
    angle: "45deg",
  },
]);

const back = ref(`
  background: linear-gradient(var(--houdini-angle), var(--houdini-colorA), var(--houdini-colorB));
  --houdini-colorA: #B0BDBF;
  --houdini-colorB: #CDCBFF;
  --houdini-angle: 120deg;
`);

function robotRole() {
  const model = getModelType(toAccount.value);
  try {
    const { title, avatar } = usePromptStore(model)?.meta || {};
    return `${avatar}  ${title}`;
  } catch (e) {
    return "";
  }
}

const { toAccount } = useGetters(["toAccount"]);
const [dialogVisible, setDialogVisible] = useBoolean();
const { loading, onDownload } = useScreenshot();
const { forwardData } = useState({
  forwardData: (state) => state.conversation.forwardData,
});

function onClose() {
  setDialogVisible(false);
}

function cb() {
  nextTick(()=>{
    onClose()
    emit("onClose")
  })
}
function robotPrompt() {
  const model = getModelType(toAccount.value);
  return usePromptStore(model).prompt[0].content || "";
}

const fnForwardData = computed(() => {
  let myObj = Object.fromEntries(forwardData.value);
  const obj = Object.values(myObj).map((item) => item);
  return obj.sort((a, b) => a.clientTime - b.clientTime);
});

function fnStyleBack({ angle, colorA, colorB }) {
  return `background-image: linear-gradient(${angle}, ${colorA}, ${colorB});`;
}

function onColor(item) {
  const preview = document.querySelector("#preview");
  preview.style.setProperty("--houdini-colorA", item.colorA);
  preview.style.setProperty("--houdini-colorB", item.colorB);
  preview.style.setProperty("--houdini-angle", item.angle);
}

emitter.on("onShareModal", (val) => {
  setDialogVisible(true);
});
</script>

<style lang="scss" scoped>
.prompt {
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
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.share-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;

  :deep(.message-info-setup) {
    display: none;
  }
}

.segmented {
  width: 100%;
  max-height: 50vh;
  background: #f8f8f8;
  border: 1px solid #dddddd;
  border-radius: 8px;
  overflow: auto;

  .scrollbar {
    // height: 50vh;
  }
}

.form-item-props {
  overflow: hidden;
  padding-inline: 16px;
  background: rgba(0, 0, 0, 0.015);
  border: 1px solid #e3e3e3;
  border-radius: 8px;
}

.preview {
  padding: 24px;
  background-image: url("@/assets/images/screenshot_background.webp");
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

.message {
  .message-view__item--text {
    max-width: 500px;
  }

  .avatar {
    img {
      width: 32px;
      height: 32px;
      border-radius: 6px;
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
