<template>
  <div class="menubar" v-if="showMenuList(item)">
    <div class="flex" :class="!isSelf(item) ? 'flex-row-reverse' : ''">
      <div
        class="menubar-item flex-c"
        v-for="item in flilterList"
        :key="item.id"
        @click="handleMenuEvent(item)"
      >
        <el-tooltip :content="item.title" placement="top">
          <FontIcon :class="item?.class" :iconName="item.icon" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useState } from "@/utils/hooks/useMapper";
import { isSelf, handleCopyMsg } from "../utils/utils";

defineOptions({
  name: "MenuList",
});

const emit = defineEmits(["handlSingleClick"]);

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  // unSend(未发送)fail(发送失败)success(发送成功)
  status: {
    type: String,
    default: "unSend",
  },
});

const list = [
  {
    id: "copy",
    title: "复制",
    icon: "CopyDocument",
    // <el-icon><CopyDocument /></el-icon>
  },
  {
    id: "edit",
    title: "编辑",
    hidden: !__LOCAL_MODE__,
    icon: "Edit",
    // <el-icon><Edit /></el-icon>
  },
  {
    id: "setup",
    title: "设置",
    hidden: true,
    icon: "MoreFilled",
    // <el-icon><MoreFilled /></el-icon>
  },
  {
    id: "delete",
    title: "删除",
    class: "text-[#f44336]",
    icon: "Delete",
    // <el-icon><Delete /></el-icon>
  },
];

const { commit } = useStore();
const { messageEdit, showCheckbox } = useState({
  messageEdit: (state) => state.conversation.messageEdit,
  showCheckbox: (state) => state.conversation.showCheckbox,
});

const flilterList = computed(() => {
  const _type = props.item.type;
  return list
    .filter((item) => {
      if (item.id === "edit") {
        return _type === "TIMTextElem";
      } else if (item.id === "copy") {
        return ["TIMTextElem", "TIMImageElem"].includes(_type);
      } else {
        return true;
      }
    })
    .filter((item) => !item?.hidden);
});

function showMenuList(item) {
  if (props.status !== 'success') return false;
  if (messageEdit.value?.ID === item?.ID) return false;
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
      commit("setMessageEdit", item) 
      break;
    case "setup": // 设置
      console.log("设置");
      break;
    case "delete": // 设置
      emit("handlSingleClick", { item, id: "delete" });
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
