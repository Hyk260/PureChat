<template>
  <div class="card-popover">
    <div class="top">
      <UserAvatar type="self" :size="40" shape="circle" />
      <div>
        <div class="nick">{{ nick || "-" }}</div>
        <div class="userID">{{ userID }}</div>
      </div>
    </div>
    <div class="card-item">
      <div v-for="(item, i) in dataStatistics" :key="item">
        <div>
          <div v-if="i === 'messages'">{{ unreadMsg }}</div>
          <div v-else>14</div>
        </div>
        <div>{{ item }}</div>
      </div>
    </div>
    <el-divider />

    <el-menu class="el-menu-vertical" :collapse="true">
      <template v-for="item in menuItems" :key="item.index">
        <el-menu-item v-if="item.index !== '4'" :index="item.index" @click="fnAction()">
          <FontIcon :iconName="item.icon" />
          <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="item.index">
          <template #title>
            <el-icon><Help /></el-icon>
            <span>帮助中心</span>
            <el-icon class="!ml-auto"><ArrowRight /></el-icon>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="help in helpItems" :key="help" @click="fnAction()">
              {{ help.label }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { useStore } from "vuex";
import emitter from "@/utils/mitt-bus";
import { useState } from "@/utils/hooks/useMapper";
import { TIM_PROXY } from "@/constants/index";
import { localStg } from "@/utils/storage";

const { bugs, docs, homepage } = __APP_INFO__.pkg;
// const emit = defineEmits(["hide"]);
const { commit, dispatch } = useStore();

const helpItems = ref([
  {
    // docs
    label: "使用文档",
    // action: () => {
    //    open(`${docs}`);
    // },
  },
  {
    // feedback
    label: "反馈与意见",
    // action: () => {
    //    open(`${bugs.url}`);
    // },
  },
]);

const menuItems = ref([
  {
    index: '1',
    label: "应用设置",
    icon: "Operation",
    // action: operation,
  },
  // {
  //   index: 2,
  //   label: "账户管理",
  //   icon: "User",
  //   action: () => {},
  // },
  {
    index: '3',
    label: "社区支持",
    icon: "PieChart",
    // action: () => {
    //   // emit("hide");
    //   open(`${homepage}`);
    // },
  },
  {
    index: '4',
    label: "",
    icon: "PieChart",
    // action: () => {},
  },
  {
    index: '5',
    label: "退出登录",
    icon: "CollectionTag",
    // action: () => {
    //   // emit("hide");
    //   // dispatch("LOG_OUT");
    // },
  },
]);

function fnAction() {
  
}

const dataStatistics = ref({
  messages: "消息",
  sessions: "助手",
  topics: "话题",
});

const { unreadMsg } = useState({
  unreadMsg: (state) => state.conversation.totalUnreadMsg,
});

const { nick, userID, avatar } = localStg.get(TIM_PROXY)?.userProfile;

function operation() {
  emitter.emit("openSetup", true);
  // nextTick(() => {
  //   // emit("hide");
  // });
}
</script>
<style lang="scss" scoped>
.el-menu {
  --el-menu-item-height: 40px;
  border-right: none;
}
.el-menu-item.is-active {
  color: unset;
}
:deep(.el-menu-item) {
  height: 40px;
}
:deep(.el-menu-item-group__title) {
  display: none;
}
.el-menu--collapse > .el-menu-item > span {
  width: auto;
  height: auto;
  visibility: visible;
}
.el-menu--collapse > .el-sub-menu > .el-sub-menu__title > span {
  width: auto;
  height: auto;
  visibility: visible;
}
.el-menu--collapse {
  width: auto;
}
.el-divider {
  margin: 2px 0;
}
</style>
<style lang="scss" scoped>
// .card-popover {
// }
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
    background: rgba(0, 0, 0, 0.03);
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
