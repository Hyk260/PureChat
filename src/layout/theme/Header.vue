<template>
  <div
    :class="['fixed-header', sidebar ? 'style-fixed' : '']"
    :style="fnStyle(isActive)"
  >
    <div class="navbar">
      <div
        :class="classes.container"
        :title="isActive ? '点击展开' : '点击折叠'"
        @click="toggleClick"
      >
        <FontIcon
          :class="{ active: true, rotate: isActive }"
          iconName="Expand"
        />
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
        <screenfull id="header-screenfull" />
        <!-- 个人中心 退出登录 -->
        <div class="user">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="24" :src="picture" />
              <p>ADMIN</p>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="Logout">
                  <FontIcon iconName="switch-button" />
                  退出登录
                </el-dropdown-item>
                <el-dropdown-item @click="topersonal">
                  <FontIcon iconName="user" />
                  个人中心
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 设置 -->
        <div class="setup" @click="drawer = true">
          <FontIcon iconName="setting" />
        </div>
      </div>
    </div>
    <div class="tags-view">
      <div>
        <div class="arrow-left">
          <FontIcon iconName="arrow-left" class="cursor-w" />
        </div>
        <div class="scroll-container">
          <el-tag
            :type="CurTitle === '首页' ? '' : 'info'"
            @click="tagClick('/home')"
            class="mx-1"
          >
            首页
          </el-tag>
          <el-tag
            v-show="tags"
            v-for="tag in tags"
            :key="tag.title"
            class="mx-1"
            closable
            :type="CurTitle === tag.title ? '' : 'info'"
            @click.native="tagClick(tag.path)"
            @close="handleClose(tag)"
          >
            {{ tag.title }}
          </el-tag>
        </div>
        <div class="arrow-right">
          <FontIcon iconName="arrow-right" class="cursor-w" />
        </div>
      </div>
      <div class="dropdown">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <FontIcon iconName="arrow-down" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                class="Left-rotation"
                :icon="Upload"
                @click="closing('left')"
                >关闭左侧</el-dropdown-item
              >
              <el-dropdown-item
                class="Right-rotation"
                :icon="Upload"
                @click="closing('right')"
                >关闭右侧</el-dropdown-item
              >
              <el-dropdown-item :icon="Minus" @click="closing('other')"
                >关闭其他</el-dropdown-item
              >
              <el-dropdown-item :icon="Close" @click="closing('all')"
                >全部关闭</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <ul class="setting">
      <li>
        <span>关闭侧边栏</span>
        <el-switch
          v-model="sidebar"
          inline-prompt
          inactive-color="#a6a6a6"
          active-text="开"
          inactive-text="关"
          @change="greyChange"
        />
      </li>
      <li>
        <span>侧边栏Logo</span>
        <el-switch
          v-model="logoVal"
          inline-prompt
          inactive-color="#a6a6a6"
          active-text="开"
          inactive-text="关"
          @change="LogoChange"
        />
      </li>
    </ul>
  </el-drawer>
</template>

<script setup>
import {
  Upload,
  Minus,
  Close,
  Plus,
  ArrowRight,
} from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, ref, watch, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import storage from "storejs";
import FontIcon from "@/layout/FontIcon/indx.vue";
import screenfull from "../components/screenfull.vue";
import { useState } from "@/utils/hooks/useMapper";

const { state, dispatch, commit } = useStore();
const router = useRouter();
const route = useRoute();
const drawer = ref(false);
const states = reactive({
  picture: require("../../assets/images/picture.jpg"),
});
const { picture } = toRefs(states);

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

const { isActive, tags, sidebar, logoVal } = useState({
  isActive: (state) => state.data.isCollapse,
  tags: (state) => state.data.elTag,
  sidebar: (state) => !state.settings.sidebar,
  logoVal: (state) => !state.settings.logoIcon,
});

const CurTitle = computed(() => {
  return router.currentRoute.value.meta?.title;
});

const fnStyle = (off) => {
  return `width:calc(100% - ${off ? "64px" : "200px"})`;
};

const handleClose = (tag) => {
  let data = tags.value.splice(tags.value.indexOf(tag), 1);
  commit("updateData", { elTag: data });
};
const topersonal = () => {
  router.push({ name: "personal" });
};

const LogoChange = (val) => {
  commit("updateSettings", {
    key: "logoIcon",
    value: !val,
  });
};
const greyChange = (val) => {
  commit("updateSettings", {
    key: "sidebar",
    value: !val,
  });
};
// 退出登录
const Logout = () => {
  ElMessageBox.confirm("确定退出登录?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      dispatch("logout");
    })
    .catch(() => {});
};

const closing = (tag) => {
  const find = tags.value.findIndex((t) => {
    return t?.title === CurTitle.value;
  });
  switch (tag) {
    case "left":
      tags.value.splice(0, find);
      break;
    case "right":
      tags.value.splice(find + 1, tags.value.length);
      break;
    case "other":
      tags.value.splice(0, tags.value.length);
      tags.value.push({
        title: CurTitle.value,
        path: router.currentRoute.value.path,
      });
      break;
    case "all":
      tags.value.splice(0, tags.value.length);
      break;
  }
  commit("updateData", {
    key: "elTag",
    value: tags.value,
  });
};

const tagClick = (path) => {
  router.push(path);
};

// 侧边栏 展开 折叠
const toggleClick = () => {
  commit("setCollapse", !isActive.value);
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
.setting {
  width: 100%;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px;
  }
}
.style-fixed {
  width: 100% !important;
}
.fixed-header {
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  transition: width 0.1s;
  background: var(--color-body-bg);
}
.cursor-w {
  cursor: w-resize;
}
::v-deep.el-dropdown-menu {
  .Left-rotation .el-icon {
    transform: rotate(-90deg);
  }
  .Right-rotation .el-icon {
    transform: rotate(90deg);
  }
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
    .user ::v-deep .el-dropdown-link {
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

.tags-view {
  width: 100%;
  height: 38px;
  box-shadow: 1px 0 1px #888;
  display: flex;
  justify-content: space-between;
  & > div {
    width: 100%;
    // width: calc(100% - 40px);
    display: flex;
  }
  .arrow-left {
    box-shadow: 5px 0 5px -6px #ccc;
    cursor: e-resize;
  }

  .arrow-right {
    box-shadow: -5px 0 5px -6px #ccc;
    border-right: 1px solid #ccc;
    cursor: e-resize;
  }

  .scroll-container {
    width: 100%;
    display: flex;
    align-items: center;
    // min-width: 500px;
    padding: 0 5px;
    overflow: hidden;
    span {
      cursor: pointer;
      margin-right: 3px;
    }
  }

  .arrow-left,
  .dropdown,
  .arrow-right {
    width: 40px;
    height: 38px;
    color: #00000073;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.active {
  &:hover {
    color: #409eff;
  }
}

.rotate {
  transform: rotate(180deg);
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
