<template>
  <header v-if="chat" class="message-info-view-header flex-bc">
    <div class="message-info-views">
      <p v-if="currentType">
        <span v-if="chatType('C2C')" @click="openUser" class="single">
          <span class="nick">{{ chatNick("C2C", chat) }}</span>
          <Label :model="robotStore.model" :userID="chat?.conversationID" />
          <!-- ai-prompt -->
          <div
            v-if="isRobot(toAccount) && fnPromptConfig(robotStore.promptConfig)"
            class="ml-5 ai-prompt-title"
          >
            {{ fnPromptConfig(robotStore.promptConfig) }}
          </div>
          <!-- ai-tools -->
          <template v-if="isRobot(toAccount) && robotStore.botTools && isBotToolsFlag">
            <div v-for="item in robotStore.botTools" :key="item.id" class="ml-5 ai-prompt-title">
              <svg-icon class="function-call" local-icon="functionCall" />
              <span>{{ item.meta.title }}</span>
            </div>
          </template>
        </span>
        <span v-else-if="chatType('GROUP')" @click="openSetup" class="group">
          <span class="nick"> {{ chatNick("GROUP", chat) }}</span>
          <Label :item="chat" />
        </span>
        <span v-else-if="chatType('@TIM#SYSTEM')" class="system"> 系统通知 </span>
      </p>
    </div>
    <div class="flex gap-10">
      <!-- <div class="message-info-add" v-show="chat.type === 'GROUP' && false" title="添加成员">
        <svg-icon local-icon="tianjia" class="icon-hover" />
      </div> -->
      <div class="share" title="分享对话" @click="openShare">
        <svg-icon class="cursor-pointer icon-hover" local-icon="share" />
      </div>
      <div class="setup" v-show="isGroupChat" title="群详情" @click="openSetup">
        <FontIcon iconName="MoreFilled" class="cursor-pointer icon-hover" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, watch } from "vue";
import { isRobot } from "@/utils/chat/index";
import { getModelType, useAccessStore, usePromptStore } from "@/ai/utils";
import { useGetters } from "@/utils/hooks/useMapper";
import { cloneDeep } from "lodash-es";
import { modelValue, StoreKey } from "@/ai/constant";
import { useBoolean } from "@/utils/hooks/index";
import { localStg } from "@/utils/storage";
import { useRobotStore, useChatStore } from "@/stores/index";
import Label from "@/views/chatStudio/components/Label.vue";
import emitter from "@/utils/mitt-bus";
import store from "@/store/index";

const [isBotToolsFlag, setBotToolsFlag] = useBoolean();
const { currentType, toAccount, isGroupChat } = useGetters([
  "currentType",
  "toAccount",
  "isGroupChat",
]);

const chatStore = useChatStore();
const robotStore = useRobotStore();

const chat = computed(() => {
  return store.state.conversation.currentConversation;
});

const updataModel = () => {
  const value = getModelType(toAccount.value);
  if (!value) return;
  const model = useAccessStore(value)?.model;
  const data = cloneDeep(modelValue[value].Model.options.chatModels);
  const checkModel = data.find((item) => item.id === model);
  setBotToolsFlag(checkModel?.functionCall ? true : false);
  robotStore.setRobotModel(checkModel);
};

const updataPromptTitle = () => {
  const value = getModelType(toAccount.value);
  const prompt = localStg.get(StoreKey.Prompt);
  robotStore.setPromptConfig(prompt?.[value] || null);
};

const chatType = (type) => {
  return currentType.value === type;
};

const chatNick = (type, chat) => {
  if (type === "C2C") {
    return chat.userProfile.nick || chat.userProfile.userID || chat.remark;
  } else if (type === "GROUP") {
    const {
      groupProfile: { name, groupID, memberCount },
    } = chat;
    const count = memberCount ? `(${memberCount})` : "";
    return `${name || groupID} ${count}`;
  }
};

const openShare = () => {
  chatStore.$patch({ showCheckbox: true });
};

const openSetup = () => {
  emitter.emit("handleGroupDrawer", true);
};

const openUser = () => {};

const fnPromptConfig = (prompt) => {
  if (!prompt) return "";
  const { avatar, title } = prompt.meta || {};
  if (!avatar && !title) return "";
  return `${avatar} ${title}`;
};

watch(toAccount, () => {
  updataModel();
  updataPromptTitle();
});

emitter.on("updataBotToolsFlag", (val) => {
  setBotToolsFlag(val);
});
</script>

<style lang="scss" scoped>
.message-info-view-header {
  height: 60px;
  padding: 0 16px;
  width: 100%;
  position: relative;
  z-index: 2;
  background: var(--color-body-bg);
  border-bottom: 1px solid var(--color-border-default);
  .message-info-views {
    .group {
      cursor: pointer;
    }
    .single,
    .group {
      max-width: 500px;
      display: flex;
      align-items: center;
      @include text-ellipsis();
      .nick {
        margin-right: 5px;
      }
    }
  }
}
</style>
