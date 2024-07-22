<template>
  <el-dialog
    ref="editRef"
    :modal="true"
    v-model="dialogVisible"
    :append-to-body="true"
    @close="onClose"
    title="截图分享"
    width="700px"
  >
    <div class="flex">
      <div id="preview" class="segmented w-full">
        <div class="preview p-20">
          <div class="h-70"></div>
          <div class="item">
            <div
              class="flex py-10"
              v-for="item in fnForwardData"
              :key="item.ID"
              :class="ISown(item) ? 'is-self' : 'is-other'"
            >
              <div class="avatar">
                <el-avatar :size="36" shape="square" :src="item.avatar" @error="() => true">
                  <!-- <img :src="circleUrl" /> -->
                </el-avatar>
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
        </div>
        <el-button @click="onDownload()"> 下载截图 </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed } from "vue";
import emitter from "@/utils/mitt-bus";
import { useBoolean } from "@/utils/hooks/index";
import { useScreenshot } from "@/utils/hooks/useScreenshot";
import { useState } from "@/utils/hooks/useMapper";
import { loadMsgModule, msgOne, msgType } from "@/views/chatStudio/utils/utils";
const [dialogVisible, setDialogVisible] = useBoolean();

const { forwardData, userProfile } = useState({
  userProfile: (state) => state.user.userProfile,
  forwardData: (state) => state.conversation.forwardData,
});

const { loading, onDownload, title } = useScreenshot();

const fnForwardData = computed(() => {
  let myObj = Object.fromEntries(forwardData.value);
  const obj = Object.values(myObj).map((item) => item);
  return obj;
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
.segmented {
  overflow: hidden scroll;
  width: 100%;
  max-height: 40dvh;
  background: #f8f8f8;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

.preview {
  // min-height: 300px;
  background: url("@/assets/images/screenshot_background.webp") no-repeat;
  background-size: 100% 100%;
  & > .item {
    padding: 20px 0;
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
