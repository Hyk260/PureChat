<template>
  <header v-if="chat" class="message-info-view-header flex-bc">
    <div class="message-info-views">
      <p v-if="currentType">
        <span v-if="chatType('C2C')" @click="openUser" class="single">
          <span class="nick">{{ chatNick("C2C", chat) }}</span>
          <Label :model="model" :userID="chat?.conversationID" />
          <!-- ai-prompt -->
          <div v-if="isRobot(toAccount) && false" class="ml-5 ai-prompt-title">
            {{ fnPromptTitle(toAccount) }}
          </div>
          <!-- ai-tools -->
          <template v-if="isRobot(toAccount) && botTools">
            <div v-for="item in botTools" :key="item.id" class="ml-5 ai-prompt-title">
              <svg-icon class="function-call" iconClass="functionCall" />
              <span>{{ item.name }}</span>
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
        <svg-icon iconClass="tianjia" class="icon-hover" />
      </div> -->
      <div class="share" title="分享对话" @click="openShare">
        <svg-icon class="cursor-pointer icon-hover" iconClass="share" />
      </div>
      <div class="setup" v-show="isGroupChat" title="群详情" @click="openSetup">
        <FontIcon iconName="MoreFilled" class="cursor-pointer icon-hover" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { isRobot } from "@/utils/chat/index";
import { getModelType, useAccessStore, usePromptStore } from "@/ai/utils";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import Label from "@/views/chatStudio/components/Label.vue";
import { watch } from "vue";
import { useStore } from "vuex";

const { commit } = useStore();
const { currentType, toAccount, isGroupChat } = useGetters([
  "currentType",
  "toAccount",
  "isGroupChat",
]);
const { chat, model, promptTitle, botTools } = useState({
  chat: (state) => state.conversation.currentConversation,
  model: (state) => state.robot.model,
  promptTitle: (state) => state.robot.promptTitle,
  botTools: (state) => state.robot.botTools,
});

const updataModel = () => {
  const value = getModelType(toAccount.value);
  const model = useAccessStore(value)?.model;
  model && commit("setRobotModel", model);
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
  commit("setCheckboxState", true);
};

const openSetup = () => {
  emitter.emit("handleGroupDrawer", true);
};

const openUser = () => {};

const fnPromptTitle = (toAccount) => {
  const model = getModelType(toAccount);
  const promptMeta = usePromptStore(model);
  if (!promptMeta) return false;
  if (!promptMeta?.meta?.title) return false;
  if (!promptMeta?.prompt?.[0]?.content) return false;
  const { avatar, title } = promptMeta?.meta || {};
  return `${avatar} ${title}`
};

watch(toAccount, (data) => {
  updataModel();
});
</script>

<style lang="scss" scoped>
.message-info-view-header {
  height: 60px;
  padding: 0 16px;
  width: 100%;
  position: relative;
  background: var(--color-body-bg);
  border-bottom: 1px solid var(--color-border-default);
  .message-info-views {
    .group {
      cursor: pointer;
    }
    .single,
    .group {
      max-width: 400px;
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
