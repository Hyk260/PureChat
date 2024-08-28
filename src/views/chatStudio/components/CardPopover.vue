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
      <div v-for="(item,i) in dataStatistics" :key="item">
        <div>
          <div>15</div>
        </div>
        <div>{{ item }}</div>
      </div>
    </div>
    <el-divider />
    <el-menu class="el-menu-vertical-demo" :collapse="true">
      <el-menu-item index="1">
        <el-icon><Operation /></el-icon>
        <span>应用设置</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><User /></el-icon>
        <span>账户管理</span>
      </el-menu-item>
       <el-menu-item index="3">
       <el-icon><PieChart /></el-icon>
        <span>社区支持</span>
      </el-menu-item>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Help /></el-icon>
          <span>帮助中心</span>
          <el-icon class="!ml-auto"><ArrowRight /></el-icon>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">使用文档</el-menu-item>
          <el-menu-item index="2-2">反馈与意见</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="5">
        <el-icon><CollectionTag /></el-icon>
        <span>退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, computed, watch, nextTick } from "vue";
import { TIM_PROXY } from "@/constants/index";
import { localStg } from "@/utils/storage";

const  dataStatistics = ref({
  messages: "消息",
  sessions: "助手",
  topics: "话题",
});

const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

const { nick, userID, avatar } = localStg.get(TIM_PROXY)?.userProfile;
</script>
<style lang="scss" scoped>
.el-menu {
  --el-menu-item-height: 40px;
}
:deep(.el-menu-item) {
  height: 40px;
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
