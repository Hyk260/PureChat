<template>
  <div class="menubar" v-if="showMenuList(item)">
    <div class="flex">
      <div
        class="menubar-item flex-c"
        v-for="item in flilterList"
        :key="item.id"
        :title="item.title"
      >
        <FontIcon @click="handleMenuEvent(item)" :iconName="item.icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import { isSelf, handleCopyMsg } from "../utils/utils";

defineOptions({
  name: "MenuList",
});

const emit = defineEmits(["finMenu"]);

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});

const { showCheckbox } = useState({
  showCheckbox: (state) => state.conversation.showCheckbox,
});

const list = [
  {
    id: "edit",
    title: "编辑",
    hidden: true,
    icon: "Edit",
    // <el-icon><Edit /></el-icon>
  },
  {
    id: "copy",
    title: "复制",
    icon: "CopyDocument",
    // <el-icon><CopyDocument /></el-icon>
  },
  {
    id: "setup",
    title: "设置",
    hidden: true,
    icon: "MoreFilled",
    // <el-icon><MoreFilled /></el-icon>
  },
];

const flilterList = computed(() => {
  return list
    .filter((item) => {
      if (item.id === "edit") {
        return props.item.type === "TIMTextElem";
      } else if (item.id === "copy") {
        return ["TIMTextElem", "TIMImageElem"].includes(props.item.type);
      }
    })
    .filter((item) => {
      return !item?.hidden;
    });
});

function showMenuList(item) {
  // 图片 文件 文本 合并
  const msg = ["TIMImageElem", "TIMFileElem", "TIMTextElem", "TIMRelayElem"];
  return (
    msg.includes(item.type) &&
    item.type !== "TIMGroupTipElem" &&
    !item.isRevoked &&
    !showCheckbox.value &&
    flilterList.value.length
  );
}

function handleMenuEvent(data) {
  const { id } = data;
  const { item } = props;
  switch (id) {
    case "copy": // 复制
      handleCopyMsg(item);
      break;
    case "edit": // 编辑
      console.log("编辑");
      break;
    case "setup": // 设置
      console.log("设置");
      break;
  }
}
</script>

<style lang="scss" scoped>
.menubar {
  font-size: 12px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  margin-top: auto;
  // pointer-events: none;
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  & > div {
    background-color: rgba(0, 0, 0, 0.015);
    border: 1px solid var(--color-border-default);
    border-radius: 5px;
    padding: 2px;
  }
  .menubar-item {
    cursor: pointer;
    color: #999999;
    border-radius: 5px;
    height: 22px;
    width: 22px;
    &:hover {
      color: #080808;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
