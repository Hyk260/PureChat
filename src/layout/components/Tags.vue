<template>
  <div class="tags-view">
    <div>
      <div class="arrow-left">
        <FontIcon iconName="arrow-left" class="cursor-w" />
      </div>
      <div class="scroll-container">
        <el-tag
          :type="CurTitle === '首页' ? '' : 'info'"
          @click="tagClick('/home')"
        >
          首页
        </el-tag>
        <el-tag
          v-show="tags"
          v-for="tag in tags"
          :key="tag.title"
          closable
          :type="CurTitle === tag.title ? '' : 'info'"
          @click.native="tagClick(tag.path)"
          @close="handleClose(tag)"
          v-contextmenu:contextmenu
          @contextmenu.prevent="ContextMenuEvent($event, tag)"
        >
          {{ tag.title }}
        </el-tag>
      </div>
      <div class="arrow-right">
        <FontIcon iconName="arrow-right" class="cursor-w" />
      </div>
    </div>
    <div class="dropdown">
      <!-- trigger="click" -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <FontIcon iconName="arrow-down" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Back" @click="closing('left')">
              关闭左侧
            </el-dropdown-item>
            <el-dropdown-item :icon="Right" @click="closing('right')">
              关闭右侧
            </el-dropdown-item>
            <el-dropdown-item :icon="Minus" @click="closing('other')">
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item :icon="Close" @click="closing('all')">
              全部关闭
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 右键菜单 -->
    <contextmenu ref="contextmenu">
      <contextmenu-item
        v-for="item in RIGHT_CLICK_TAGS_LIST"
        :key="item.id"
        @click="ClickMenuItem(item)"
      >
        {{ item.text }}
      </contextmenu-item>
    </contextmenu>
  </div>
</template>

<script setup>
import {
  Back,
  Right,
  Minus,
  Plus,
  Close,
} from "@element-plus/icons-vue";
import { computed, ref, watch, toRefs } from "vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { useState } from "@/utils/hooks/useMapper";
import { useRoute, useRouter } from "vue-router";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import { useStore } from "vuex";
const { state, dispatch, commit } = useStore();

const router = useRouter();
const CurTitle = computed(() => {
  return router.currentRoute.value.meta?.title;
});

const { tags } = useState({
  tags: (state) => state.data.elTag,
});

const RIGHT_CLICK_TAGS_LIST = [
  {
    id: "left",
    text: "关闭左侧",
  },
  {
    id: "right",
    text: "关闭右侧",
  },
  {
    id: "other",
    text: "关闭其他",
  },
  {
    id: "all",
    text: "关闭全部",
  },
];
const ContextMenuEvent = (event, tag) => {
  console.log(tag);
};
const ClickMenuItem = (item) => {
  console.log(item);
};

const tagClick = (path) => {
  router.push(path);
};

const handleClose = (tag) => {
  let data = tags.value.splice(tags.value.indexOf(tag), 1);
  commit("updateData", { elTag: data });
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
</script>

<style lang="scss" scoped>
.v-contextmenu {
  width: 154px;
  .v-contextmenu-item {
    height: 32px;
    line-height: 32px;
    padding: 0px 16px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
  }
}

:deep(.Left-rotation .el-icon) {
  transform: rotate(-90deg);
}
:deep(.Right-rotation .el-icon) {
  transform: rotate(90deg);
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
</style>
