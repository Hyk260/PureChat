<template>
  <div class="toolbar">
    <!-- 表情包 -->
    <el-tooltip :content="$t('chat.emoji')" placement="top">
      <el-button v-show="!isFullscreenInputActive && !isAssistant" @click="sendEmojiClick">
        <SvgIcon local-icon="iconxiaolian" />
      </el-button>
    </el-tooltip>
    <!-- 选模型 -->
    <el-tooltip :content="$t('button.select_model')" placement="top">
      <el-button v-show="isAssistant" @click="selectModel">
        <SvgIcon local-icon="model" />
      </el-button>
    </el-tooltip>
    <!-- 图片 -->
    <el-tooltip :content="$t('chat.picture')" placement="top">
      <el-button v-show="isShowImage()" :class="isVision ? '' : 'prohibit'" @click="sendImageClick">
        <SvgIcon local-icon="icontupian" />
      </el-button>
    </el-tooltip>
    <!-- 联网 -->
    <el-tooltip v-if="false" :content="$t('chat.web_search')" placement="top">
      <el-button v-show="isAssistant" @click="onEnableWebSearch">
        <SvgIcon local-icon="internet" />
      </el-button>
    </el-tooltip>
    <!-- 附件 -->
    <el-tooltip v-if="false" :content="$t('chat.upload_document')" placement="top">
      <el-button @click="sendAnnexClick">
        <SvgIcon local-icon="paperClip" />
      </el-button>
    </el-tooltip>
    <!-- 文件 -->
    <el-tooltip :content="$t('chat.file')" placement="top">
      <el-button v-show="!isAssistant" @click="sendFileClick">
        <SvgIcon local-icon="iconwenjianjia" />
      </el-button>
    </el-tooltip>
    <!-- 截图 -->
    <el-tooltip :content="$t('chat.screenshot')" placement="top">
      <el-button v-show="!isAssistant && isElectron" @click="clickCscreenshot">
        <SvgIcon local-icon="iconjietu" />
      </el-button>
    </el-tooltip>
    <!-- 机器人配置 -->
    <el-tooltip :content="$t('chat.configuration')" placement="top">
      <el-button v-show="isAssistant" @click="openRobotBox">
        <SvgIcon local-icon="robot" />
      </el-button>
    </el-tooltip>
    <!-- 清空消息 -->
    <el-tooltip content="清空消息" placement="top">
      <span>
        <el-popover placement="top" trigger="click" width="250" :visible="visible">
          <div class="flex-c gap-5 mb-10">
            <el-icon class="text-[#F56C6C]"><Warning /></el-icon>
            <p>确定要清除当前会话所有消息吗?</p>
          </div>
          <div class="flex">
            <el-button class="ml-auto" size="small" @click="setVisible(false)">取消</el-button>
            <el-button size="small" type="primary" @click="cleanTopicShortcut">确认</el-button>
          </div>
          <template #reference>
            <el-icon class="cursor-pointer" @click="setVisible(true)"><Delete /></el-icon>
          </template>
        </el-popover>
      </span>
    </el-tooltip>
    <!-- 插件 -->
    <el-tooltip v-if="false" content="选择插件" placement="top">
      <el-button v-show="isFunctionCall && isShowPlugins()" @click="openPluginBox">
        <SvgIcon local-icon="plugin" />
      </el-button>
    </el-tooltip>
    <!-- 滚动到底部 -->
    <el-tooltip :content="$t('chat.scrollToTheBottom')" placement="top">
      <el-button
        v-show="showBottomBtn"
        class="chat-top animate-chat-slide-in"
        @click="scrollToBottomBtn"
      >
        <el-icon class="svg-left"><DArrowLeft /></el-icon>
      </el-button>
    </el-tooltip>
    <!-- 自定义消息 -->
    <el-button v-if="false" @click="customMessage">
      <el-icon><Sunny /></el-icon>
    </el-button>
    <!-- 全屏 -->
    <el-tooltip
      :content="isFullscreenInputActive ? $t('chat.recover') : $t('chat.launch')"
      placement="top"
    >
      <el-button class="!ml-auto" @click="toggleFullScreenInput">
        <SvgIcon :local-icon="isFullscreenInputActive ? 'narrow' : 'enlarge'" />
      </el-button>
    </el-tooltip>
    <input type="file" ref="imagePicker" :accept="imageExts" @change="sendImage" hidden />
    <input type="file" ref="annexPicker" :accept="supportExts" @change="sendFile" hidden />
    <input type="file" ref="filePicker" :accept="fileExts" @change="sendFile" hidden />
    <template v-if="isAssistant">
      <RobotModel />
      <RobotPlugin />
      <RobotOptions />
    </template>
    <EmotionPackBox v-if="!isAssistant && flag" @onClose="setFlag(false)" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { createCustomMessage } from "@/api/im-sdk-api/index";
import { isElectron } from "@/utils/common";
import { storeToRefs } from "pinia";
import { useState } from "@/utils/hooks/index";
import { useChatStore, useRobotStore } from "@/stores/index";
import { imageExts, textExts, documentExts, audioExts, videoExts } from "@/constants/index";
import EmotionPackBox from "./EmotionPackBox.vue";
import RobotOptions from "./RobotOptions.vue";
import RobotModel from "./RobotModel.vue";
import RobotPlugin from "./RobotPlugin.vue";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "Inputbar",
});

const annexPicker = ref();
const imagePicker = ref();
const filePicker = ref();

const supportExts = [...textExts, ...documentExts];
const fileExts = [...textExts, ...documentExts, ...imageExts, ...audioExts, ...videoExts];

const [visible, setVisible] = useState(false);
const [flag, setFlag] = useState();
const [showBottomBtn, setShowBottomBtn] = useState(false);
const robotStore = useRobotStore();
const chatStore = useChatStore();
const { toAccount, isAssistant, currentType, isFullscreenInputActive } = storeToRefs(chatStore);

const isVision = computed(() => {
  if (isAssistant.value) {
    return robotStore.model?.vision;
  } else {
    return true;
  }
});

const isFunctionCall = computed(() => {
  if (isAssistant.value) {
    return robotStore.model?.functionCall;
  } else {
    return false;
  }
});

const cleanTopicShortcut = () => {
  setVisible(false);
  chatStore.deleteHistoryMessage()
};

const onEnableWebSearch = () => {
  // enableWebSearch
};

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
const clickCscreenshot = () => {};

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
  chatStore.sendSessionMessage({ message });
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

function isShowPlugins() {
  return false;
  if (__LOCAL_MODE__) {
    return true;
  } else {
    return false;
  }
}

function isShowImage() {
  if (__LOCAL_MODE__) {
    return false;
  } else {
    return !isAssistant.value;
  }
}

const scrollToBottomBtn = () => {
  emitter.emit("updataScroll");
};

onMounted(() => {
  emitter.on("handleToBottom", (state) => {
    setShowBottomBtn(!state);
  });
});

onUnmounted(() => {
  emitter.off("handleToBottom");
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
  :deep(.el-button) {
    font-size: 16px;
    width: 40px;
    height: 40px;
    padding: 4px;
    border-radius: 50%;
    border: none;
    background-color: unset;
    margin-left: 0;
  }

  & > span {
    width: 40px;
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
