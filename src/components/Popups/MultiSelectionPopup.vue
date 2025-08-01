<template>
  <div v-if="chatStore.isMultiSelectMode" class="check-box">
    <el-icon class="close" @click="onClose"><CircleCloseFilled /></el-icon>
    <div v-for="item in buttonList" :key="item.icon" class="flex-c flex-col">
      <div class="icon flex-c" :class="isForwardDataEmpty ? 'disabled' : ''" @click="onClock(item)">
        <SvgIcon :class="item.class" :local-icon="item.icon" />
      </div>
      <span class="text">
        {{ item.value }}
      </span>
    </div>
  </div>
  <!-- 截图分享 -->
  <ShareModal @on-close="onClose" />
  <MessageForwardingPopup ref="wardingRef" @confirm="confirm" />
</template>

<script setup>
import { ref } from "vue";
import { useChatStore, useUserStore } from "@/stores/index";
import { createForwardMessage, createMergerMessage, sendMessage } from "@/service/im-sdk-api/index";
import MessageForwardingPopup from "@/components/Popups/MessageForwardingPopup.vue";
import ShareModal from "@/components/ShareModal/index.vue";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "MultiSelectionPopup",
});

const buttonList = [
  {
    type: "share",
    value: "截图分享",
    icon: "share",
    class: "",
  },
  {
    type: "MergeForward",
    value: "合并转发",
    icon: "mergeForward",
    class: "",
    hide: __LOCAL_MODE__,
  },
  {
    type: "ForwardItemByItem",
    value: "逐条转发",
    icon: "aQuickForward",
    class: "",
    hide: __LOCAL_MODE__,
  },
  {
    type: "removalMsg",
    value: "删除消息",
    icon: "delete",
    class: "",
  },
].filter((item) => !item.hide);

const chatStore = useChatStore();
const userStore = useUserStore();
const wardingRef = ref(null);
const multipleValue = ref(null);

const { currentSessionId, isGroupChat, currentConversation, isForwardDataEmpty } =
  storeToRefs(chatStore);

const onClock = (item) => {
  switch (item.type) {
    case "share": // 截图分享
      emitter.emit("handleShareModal", true);
      break;
    case "MergeForward": // 合并转发
      setDialogVisible(item.type);
      break;
    case "ForwardItemByItem": // 逐条转发
      setDialogVisible(item.type);
      break;
    case "removalMsg":
      deleteMsg(); // 删除消息
      break;
  }
};

const handleConfirm = (type) => {
  switch (type) {
    case "MergeForward": // 合并转发
      mergeForward();
      break;
    case "ForwardItemByItem": // 逐条转发
      aQuickForward();
      break;
  }
};

const confirm = ({ value, type }) => {
  setMultipleValue(value);
  handleConfirm(type);
};

const onClose = () => {
  shutdown();
};

// 多选删除
const deleteMsg = async () => {
  const data = chatStore.getSortedForwardData;
  chatStore.deleteMessage({
    sessionId: currentSessionId.value,
    messageIdArray: [...data.map((item) => item.ID)],
    message: data,
  });
  shutdown();
};

const transformData = (data) => {
  return data.map((item) => {
    if (item.type === "TIMTextElem") {
      return `${item.nick}: ${item.payload.text}`;
    } else if (item.type === "TIMImageElem") {
      return `${item.nick}: [图片]`;
    } else if (item.type === "TIMFileElem") {
      return `${item.nick}: [文件]`;
    } else if (item.type === "TIMRelayElem") {
      return `${item.nick}: [合并消息]`;
    } else if (item.type === "TIMCustomElem") {
      return `${item.nick}: [自定义消息]`;
    } else {
      return `${item.nick}: [待开发]`;
    }
  });
};

const mergeTitle = () => {
  const otherProfile = currentConversation.value.userProfile || {};
  const self = userStore.userProfile.nick || userStore.userProfile.userID;
  return isGroupChat.value ? "群聊的聊天记录" : `${otherProfile?.nick}和${self}的聊天记录`;
};

const sendAndHandleMessage = async (message) => {
  const { code, message: data } = await sendMessage(message);
  if (code === 0) {
    chatStore.sendSessionMessage({ message: data });
  }
};

const mergeForward = async () => {
  if (!multipleValue.value) return;
  const { toAccount, type } = multipleValue.value;
  const forwardData = chatStore.getSortedForwardData;
  const forwardMsg = await createMergerMessage({
    to: toAccount,
    type,
    title: mergeTitle(),
    abstractList: transformData(forwardData),
    messageList: forwardData,
  });
  await sendAndHandleMessage(forwardMsg);
  shutdown();
};

// 逐条转发
const aQuickForward = async () => {
  if (!multipleValue.value) return;
  const forwardData = chatStore.getSortedForwardData;
  const { toAccount, type } = multipleValue.value;

  await Promise.all(
    forwardData.map(async (t) => {
      const forwardMsg = await createForwardMessage({
        to: toAccount,
        type,
        message: t,
      });
      await sendAndHandleMessage(forwardMsg);
    })
  );
  shutdown();
};

const shutdown = () => {
  chatStore.setForwardData({ type: "clear" });
  chatStore.toggleMultiSelectMode(false);
  setMultipleValue();
};

const setDialogVisible = (type = "") => {
  wardingRef.value.openPopup(type);
};

const setMultipleValue = (value = null) => {
  multipleValue.value = value;
};

defineExpose({ onClose, confirm });
</script>

<style lang="scss" scoped>
.check-box {
  position: relative;
  z-index: 1;
  height: 206px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid var(--color-border-default);
  .close {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 22px;
    color: rgb(140, 140, 140);
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  svg {
    color: rgb(128, 128, 128);
  }
}
.icon {
  width: 56px;
  height: 56px;
  background: #e5e6eb;
  border-radius: 50%;
  cursor: pointer;
  .svg-icon {
    font-size: 22px;
  }
}
.disabled {
  cursor: not-allowed !important;
  opacity: 0.25;
  pointer-events: none;
}
.text {
  user-select: none;
  margin-top: 8px;
}
</style>
