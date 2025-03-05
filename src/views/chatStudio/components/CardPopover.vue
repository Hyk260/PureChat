<template>
  <div class="card-popover fade-slide-lower" ref="cardRef" v-if="card">
    <div class="top">
      <UserAvatar type="self" :size="40" shape="square" @click="handlePictureCardPreview" />
      <div>
        <div class="nick">{{ profile.nick || "-" }}</div>
        <div class="userID">{{ profile.userID }}</div>
      </div>
    </div>
    <div class="card-item">
      <div v-for="(item, i) in dataStatistics" :key="item">
        <div>
          <div v-if="i === 'messages'">{{ chatStore.totalUnreadMsg }}</div>
          <div v-else-if="i === 'sessions'">{{ market.length || 0 }}</div>
          <div v-else>{{ conversationList?.length || 0 }}</div>
        </div>
        <div>{{ item }}</div>
      </div>
    </div>
    <div>
      <div class="menu-root" v-for="item in menuItems" :key="item.index">
        <div class="menu-item">
          <div @click="closeCard(item)">
            <svg-icon v-if="item.svg" :local-icon="item.svg" />
            <FontIcon v-else :iconName="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useBoolean } from "@/utils/hooks/index";
import { useState } from "@/utils/hooks/useMapper";
import { TIM_PROXY } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { useChatStore } from "@/stores/modules/chat";
import { useUserStore } from '@/stores/modules/user';
import emitter from "@/utils/mitt-bus";

const { homepage } = __APP_INFO__.pkg;
const cardRef = useTemplateRef("cardRef");

const profile = ref({});
const market = ref([]);
const chatStore = useChatStore();
const [card, setCard] = useBoolean();

const menuItems = [
  {
    index: "1",
    label: "应用设置",
    icon: "Operation",
    action: operation,
  },
  // {
  //   index: 2,
  //   label: "账户管理",
  //   icon: "User",
  //   action: () => {},
  // },
  {
    index: "3",
    label: "社区支持",
    icon: "PieChart",
    action: () => {
      open(`${homepage}`);
    },
  },
  // {
  //   index: "4",
  //   label: "",
  //   icon: "PieChart",
  //   action: () => {},
  // },
  {
    index: "5",
    label: "退出登录",
    icon: "CollectionTag",
    svg: "log-out",
    hide: __LOCAL_MODE__,
    action: () => {
      useUserStore().handleUserLogout()
    },
  },
].filter((item) => !item.hide);

const dataStatistics = ref({
  messages: "消息",
  sessions: "助手",
  topics: "话题",
});

const { conversationList } = useState({
  conversationList: (state) => state.conversation.conversationList,
});

function closeCard(item) {
  if (item) item.action?.();
  setCard(false);
}

onClickOutside(cardRef, () => {
  closeCard();
});

function operation() {
  emitter.emit("openSetup", true);
}
const openCard = (data) => {
  setCard(true);
  profile.value = localStg.get(TIM_PROXY)?.userProfile || {};
  market.value = localStg.get("marketJson")?.agents || [];
};

/** 大图预览 */
const handlePictureCardPreview = (item) => {
  emitter.emit("handleImageViewer", profile.value.avatar);
};

onMounted(() => {
  emitter.on("setPopover", (data) => {
    openCard(data);
  });
});

onBeforeUnmount(() => {
  emitter.off("setPopover");
});
</script>
<style lang="scss" scoped>
.svg-icon,
.el-icon {
  width: 24px;
}
.card-popover {
  --valid-offset-x: 12px;
  --arrow-y: -2.5px;
  left: 70px;
  top: 1px;
  width: 300px;
  overflow: hidden;
  position: absolute;
  z-index: 9;
  background-color: var(--color-body-bg);
  background-clip: padding-box;
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);

  transform-origin: var(--valid-offset-x, 50%) var(--arrow-y, 50%);
}
.menu-item {
  height: unset;
  min-height: 2rem;
  padding: 3px 4px;
  line-height: 2;
  cursor: pointer;
  & > div {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    width: 100%;
    border-radius: 4px;
  }
  & > div:hover {
    background-color: var(--icon-hover-color);
  }
}
.card-item {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  padding-inline: 8px;
  gap: 4px;
  margin-bottom: 8px;
  > div {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    gap: 2px;
    padding-block: 6px;
    padding-inline: 8px;
    background: var(--icon-hover-color);
    border-radius: 5px;
  }
}
.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px;
}
.nick {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
}
.userID {
  line-height: 1;
  color: #999999;
}
</style>
