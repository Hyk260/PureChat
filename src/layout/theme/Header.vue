<template>
  <div
    class="select-none"
    :class="['fixed-header', sidebar ? 'style-fixed' : '']"
  >
    <!-- :style="fnStyle(isActive)" -->
    <div class="navbar">
      <div
        :class="classes.container"
        :title="isActive ? '点击展开' : '点击折叠'"
        @click="toggleClick(isActive)"
      >
        <FontIcon class="icon-hover" :iconName="isActive ? 'Expand' : 'Fold'" />
      </div>
      <!-- 面包屑 :separator-icon="ArrowRight" > icon-->
      <el-breadcrumb>
        <el-breadcrumb-item
          :key="value.title"
          v-for="value in route.matched.map((t) => t.meta)"
        >
          {{ value.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>

      <div class="arrow-setup">
        <!-- 全屏 -->
        <screenfull />
        <!-- 个人中心 退出登录 -->
        <div class="user">
          <el-dropdown>
            <span class="el-dropdown-link">
              <Portrait :size="28" />
              <p>{{ userProfile.nick }}</p>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="topersonal">
                  <FontIcon iconName="user" />
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item @click="Logout">
                  <FontIcon iconName="switch-button" />
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 设置 -->
        <div class="setup" @click="opensetup(setswitch)">
          <FontIcon class="icon-hover" iconName="setting" />
        </div>
      </div>
    </div>
    <Tags />
    <el-drawer
      v-model="drawer"
      :direction="'ltr'"
      size="200px"
      :with-header="false"
    >
      <SideBar :vislbile="true" />
    </el-drawer>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import { computed, ref, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/utils/hooks/useMapper";
import FontIcon from "@/layout/FontIcon/indx.vue";
import screenfull from "../components/screenfull.vue";
import Tags from "../components/Tags.vue";
import SideBar from "../SideBar/index.vue";
const { state, dispatch, commit } = useStore();
const router = useRouter();
const route = useRoute();
const value = ref("");
const drawer = ref(false);

watch(
  () => router.currentRoute.value.path,
  () => {
    const Tag = router.currentRoute.value.meta?.title;
    if (!tags.value) {
      tags.value.push({
        title: Tag,
        path: router.currentRoute.value.path,
      });
    }
    const index = tags.value?.findIndex((t) => {
      return t?.title === Tag;
    });
    if (Tag === "首页") return;
    if (router.currentRoute.value.path === "/login") return;

    if (index < 0) {
      tags.value.push({
        title: Tag,
        path: router.currentRoute.value.path,
      });
      commit("updateData", {
        key: "elTag",
        value: tags.value,
      });
    }
  }
);

const { isActive, userProfile, tags, sidebar, setswitch, userInfo } = useState({
  userProfile: (state) => state.user.currentUserProfile,
  userInfo: (state) => state.data.user,
  tags: (state) => state.data.elTag,
  sidebar: (state) => !state.settings.sidebar,
  isActive: (state) => state.settings.isCollapse,
  setswitch: (state) => state.settings.setswitch,
});

const fnStyle = (off) => {
  return `width:calc(100% - ${off ? "65px" : "201px"})`;
};

const topersonal = () => {
  router.push({ name: "personal" });
};

const opensetup = (val) => {
  commit("updateSettings", {
    key: "setswitch",
    value: true,
  });
};
// 退出登录
const Logout = async () => {
  ElMessageBox.confirm("确定退出登录?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      dispatch("TIM_LOG_OUT");
      dispatch("LOG_OUT");
    })
    .catch((err) => {
      console.log(err);
    });
};
// 侧边栏 展开 折叠
const toggleClick = (val) => {
  if (sidebar.value) {
    drawer.value = true;
    commit("updateSettings", {
      key: "isCollapse",
      value: false,
    });
  } else {
    commit("updateSettings", {
      key: "isCollapse",
      value: !val,
    });
  }
};
</script>
<style module="classes" scoped>
.container {
  padding: 0 15px;
  line-height: 48px;
  height: 100%;
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.style-fixed {
  width: 100% !important;
}
.fixed-header {
  z-index: 10;
  // position: fixed;
  position: relative;
  // top: 0;
  // right: 0;
  transition: width 0.1s;
  // background: #fff;
  // box-shadow: 0 0 1px #888;
  background: var(--color-body-bg);
}
.cursor-w {
  cursor: w-resize;
}

.navbar {
  display: flex;
  height: 48px;

  .arrow-setup {
    flex: 1;
    color: #00000073;
    display: flex;
    justify-content: right;
    align-items: center;

    .setup {
      width: 40px;
      text-align: center;
      border-left: 1px solid #ccc;
    }
    .user :deep(.el-dropdown-link) {
      display: flex;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      .el-avatar {
        margin-right: 10px;
      }
    }
  }
}

.el-breadcrumb {
  font-size: 14px;
  line-height: 48px;
  height: 100%;
  overflow: hidden;
  min-width: 130px;
  .breadcrumb__item {
    display: flex;
    align-items: center;
  }
}
</style>
