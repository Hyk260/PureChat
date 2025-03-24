<template>
  <div class="toolbar">
    <!-- 表情包 -->
    <span
      v-show="!isFullscreenInputActive && !isRobot(toAccount)"
      :title="$t('chat.emoji')"
      @click="sendEmojiClick"
    >
      <SvgIcon local-icon="iconxiaolian" />
    </span>
    <!-- 选模型 -->
    <span title="模型" v-show="isRobot(toAccount)" @click="selectModel">
      <SvgIcon local-icon="model" />
    </span>
    <!-- 图片 -->
    <span
      v-if="isShowImage(toAccount)"
      :class="isVision ? '' : 'prohibit'"
      :title="$t('chat.picture')"
      @click="sendImageClick"
    >
      <SvgIcon local-icon="icontupian" />
    </span>
    <!-- 附件 -->
    <span v-if="false" title="上传文档" @click="sendAnnexClick">
      <SvgIcon local-icon="paperClip" />
    </span>
    <!-- 文件 -->
    <span v-show="!isRobot(toAccount)" :title="$t('chat.file')" @click="sendFileClick">
      <SvgIcon local-icon="iconwenjianjia" />
    </span>
    <!-- 截图 -->
    <span
      v-show="!isRobot(toAccount) && isElectron"
      :title="$t('chat.screenshot')"
      @click="clickCscreenshot"
    >
      <SvgIcon local-icon="iconjietu" />
    </span>
    <!-- 机器人配置 -->
    <span v-if="isRobot(toAccount)" :title="$t('chat.configuration')" @click="openRobotBox">
      <SvgIcon local-icon="robot" />
    </span>
    <!-- 插件 -->
    <span
      v-if="isFunctionCall && isShowPlugins(toAccount)"
      :class="isFunctionCall ? '' : 'prohibit'"
      @click="openPluginBox"
    >
      <SvgIcon local-icon="plugin" />
    </span>
    <!-- 窗口抖动 -->
    <span
      v-show="currentType === 'C2C' && isElectron"
      :title="$t('chat.windowJitter')"
      @click="onShake"
    >
      <el-icon><Iphone /></el-icon>
    </span>
    <!-- 自定义消息 -->
    <span v-if="false" @click="customMessage">
      <el-icon><Sunny /></el-icon>
    </span>
    <!-- 滚动到底部 -->
    <span
      :title="$t('chat.scrollToTheBottom')"
      class="chat-top animate-chat-slide-in"
      @click="onTobBottom"
      v-show="tobottom"
    >
      <el-icon class="svg-left"><DArrowLeft /></el-icon>
    </span>
    <span
      :title="isFullscreenInputActive ? $t('chat.recover') : $t('chat.launch')"
      class="ml-auto"
      @click="toggleFullScreenInput"
    >
      <SvgIcon :local-icon="isFullscreenInputActive ? 'narrow' : 'enlarge'" />
    </span>
    <input type="file" ref="imagePicker" :accept="imageExts" @change="sendImage" hidden />
    <input type="file" ref="annexPicker" :accept="supportExts" @change="sendFile" hidden />
    <input type="file" ref="filePicker" :accept="imageExts" @change="sendFile" hidden />
    <template v-if="isRobot(toAccount)">
      <RobotModel />
      <RobotPlugin />
      <RobotOptions />
    </template>
    <EmotionPackBox v-if="!isRobot(toAccount) && flag" @onClose="setFlag(false)" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { createCustomMessage } from "@/api/im-sdk-api/index";
import { isRobot, screenshot } from "@/utils/chat/index";
import { isElectron } from "@/utils/common";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import { storeToRefs } from "pinia";
import { useBoolean } from "@/utils/hooks/index";
import { useChatStore, useRobotStore } from "@/stores/index";
import { imageExts, textExts, documentExts } from "@/constants/index";
import EmotionPackBox from "./EmotionPackBox.vue";
import RobotOptions from "./RobotOptions.vue";
import RobotModel from "./RobotModel.vue";
import RobotPlugin from "./RobotPlugin.vue";
import emitter from "@/utils/mitt-bus";
import store from "@/store/index";

defineOptions({
  name: "Inputbar",
});

const tobottom = ref();
const annexPicker = ref();
const imagePicker = ref();
const filePicker = ref();

const supportExts = [...textExts, ...documentExts];

const [flag, setFlag] = useBoolean();
const robotStore = useRobotStore();
const chatStore = useChatStore();
const { isFullscreenInputActive } = storeToRefs(chatStore);
const { toAccount, currentType } = useGetters(["toAccount", "currentType"]);
const { currentConversation } = useState({
  currentConversation: (state) => state.conversation.currentConversation,
});

const isVision = computed(() => {
  if (isRobot(toAccount.value)) {
    return robotStore.model?.vision;
  } else {
    return true;
  }
});

const isFunctionCall = computed(() => {
  if (isRobot(toAccount.value)) {
    return robotStore.model?.functionCall;
  } else {
    return false;
  }
});

const sendEmojiClick = () => {
  setFlag(true);
};
function openRobotBox() {
  emitter.emit("onRobotBox");
}
function openPluginBox() {
  emitter.emit("onPluginBox");
}
function selectModel() {
  emitter.emit("openModeList", true);
}
const sendAnnexClick = () => {
  let $el = annexPicker.value;
  $el.value = null;
  $el.click();
};
const sendImageClick = () => {
  let $el = imagePicker.value;
  $el.value = null;
  $el.click();
};
const sendFileClick = () => {
  let $el = filePicker.value;
  $el.value = null;
  $el.click();
};
// 截图
const clickCscreenshot = () => {
  screenshot(() => {});
};

const onShake = () => {};

const toggleFullScreenInput = () => {
  chatStore.$patch((state) => {
    state.isFullscreenInputActive = !state.isFullscreenInputActive;
  });
};

function customMessage() {
  const message = createCustomMessage({
    convId: toAccount.value,
    convType: currentType.value,
    customType: "loading",
  });
  store.dispatch("sendSessionMessage", {
    payload: {
      convId: currentConversation.value.conversationID,
      message,
    },
  });
}

function sendImage(e) {
  emitter.emit("handleToolbar", {
    key: "setPicture",
    data: { files: e.target.files[0] },
  });
}

function sendFile(e) {
  emitter.emit("handleToolbar", {
    key: "setParsefile",
    data: { files: e.target.files[0] },
  });
}

function isShowPlugins(val) {
  return false;
  if (__LOCAL_MODE__) {
    return true;
  } else {
    return false;
  }
}

function isShowImage(val) {
  if (__LOCAL_MODE__) {
    return false;
  } else {
    return !isRobot(val);
  }
}

const onTobBottom = () => {
  emitter.emit("updataScroll");
};

emitter.on("onisbot", (state) => {
  tobottom.value = !state;
});
</script>

<style lang="scss" scoped>
.toolbar {
  height: 40px;
  padding: 0 5px;
  display: flex;
  position: relative;

  .prohibit {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  & > span {
    width: 42px;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 40px;
    padding: 4px;
    position: relative;
    text-align: center;
    color: #808080;
  }
  .svg-icon {
    cursor: pointer;
    // &:hover {
    //   color: var(--color-icon-hover) !important;
    // }
  }
  .chat-top {
    .svg-left {
      transform: rotate(-90deg);
    }

    .el-icon {
      cursor: pointer;
    }
  }
}
</style>
