<template>
  <el-dialog
    ref="editRef"
    :modal="true"
    v-model="dialogVisible"
    :append-to-body="true"
    @close="onClose"
    title="截图分享"
    width="60%"
  >
    <div class="share-modal">
      <div class="segmented w-full">
        <div id="preview" class="preview">
          <div class="content">
            <Header />
            <div class="item">
              <div
                class="message flex p-10"
                v-for="item in fnForwardData"
                :key="item.ID"
                :class="ISown(item) ? 'is-self' : 'is-other'"
              >
                <div class="avatar">
                  <img decoding="async" :src="item.avatar" />
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
                      :self="ISown(item)"
                    >
                    </component>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="isFooter" class="footer p-16">
              <div class="flex justify-center items-center">
                <img class="size-22" src="@/assets/images/log.png" alt="" />
                <div class="title ml-8">{{ $config.Title }}</div>
              </div>
              <span class="link"> {{ homepage }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item-props px-5">
        <div class="flex justify-between items-center my-5 h-32">
          <div>包含页脚</div>
          <div><el-switch v-model="isFooter" /></div>
        </div>
        <el-divider class="my-10" />
        <div class="image-type flex justify-between items-center my-5 h-32">
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
        <el-button class="w-full" @click="onDownload(fieldType)"> 
          {{  fieldType === ImageType.Blob ? '复制截图' : '下载截图' }}
         </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import emitter from "@/utils/mitt-bus";
import Header from "@/views/chatStudio/components/Header.vue";
import { useBoolean } from "@/utils/hooks/index";
import { useScreenshot, ImageType, imageTypeOptions } from "@/utils/hooks/useScreenshot";
import { useState } from "@/utils/hooks/useMapper";
import { loadMsgModule, msgOne, msgType } from "@/views/chatStudio/utils/utils";

const { pkg } = __APP_INFO__;
const homepage = pkg.homepage;
const isFooter = ref(false);
const fieldType = ref(ImageType.Blob);
const [dialogVisible, setDialogVisible] = useBoolean();
const { loading, onDownload, title } = useScreenshot();
const { forwardData, userProfile } = useState({
  userProfile: (state) => state.user.userProfile,
  forwardData: (state) => state.conversation.forwardData,
});

const fnForwardData = computed(() => {
  let myObj = Object.fromEntries(forwardData.value);
  const obj = Object.values(myObj).map((item) => item);
  return obj.sort((a, b) => a.clientTime - b.clientTime);
});

const ISown = (item) => {
  return item.from == userProfile.value.userID;
};

function onClose() {
  setDialogVisible(false);
}

emitter.on("onShareModal", (val) => {
  setDialogVisible(true);
});
</script>

<style lang="scss" scoped>
.share-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  :deep(.message-info-setup) {
    display: none;
  }
}
.segmented {
  overflow: hidden scroll;
  width: 100%;
  max-height: 50vh;
  background: #f8f8f8;
  border: 1px solid #dddddd;
  border-radius: 8px;
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
