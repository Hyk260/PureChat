<template>
  <div v-if="shouldShowMenu" class="menubar">
    <div class="flex">
      <div
        v-for="t in availableMenuItems"
        :key="t.id"
        class="menubar-item flex-c"
        @click="handleMenuItemClick(t)"
      >
        <el-tooltip :content="t.title" placement="top">
          <component :is="t.icon" :class="t?.class" size="13" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, markRaw } from "vue";
import { Trash, SquarePen, Copy, SlidersHorizontal } from "lucide-vue-next";
import { useChatStore } from "@/stores/index";
import { handleCopyMsg } from "../utils/utils";

defineOptions({
  name: "MenuList",
});

const emit = defineEmits(["handleSingleClick"]);

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  status: {
    type: String,
    default: "unSend",
    // unSend(未发送)fail(发送失败)success(发送成功)
    validator: (value) => ["unSend", "fail", "success"].includes(value),
  },
});

const supportedMessageTypes = [
  "TIMImageElem",
  "TIMFileElem",
  "TIMTextElem",
  "TIMRelayElem",
  "TIMCustomElem",
];

const menuItemsConfig = [
  {
    id: "copy",
    title: "复制",
    icon: markRaw(Copy),
  },
  {
    id: "edit",
    title: "编辑",
    hidden: !__LOCAL_MODE__,
    icon: markRaw(SquarePen),
  },
  {
    id: "setup",
    title: "设置",
    hidden: true,
    icon: markRaw(SlidersHorizontal),
  },
  {
    id: "delete",
    title: "删除",
    class: "text-[#f44336]",
    icon: markRaw(Trash),
  },
];

const chatStore = useChatStore();

/**
 * 判断是否应该显示菜单
 */
const shouldShowMenu = computed(() => {
  const { item, status } = props;

  // 消息状态检查
  if (status !== "success") {
    return false;
  }

  // 编辑状态检查
  if (chatStore.msgEdit?.ID === item?.ID) {
    return false;
  }

  // 自定义消息加载状态检查
  if (item.type === "TIMCustomElem") {
    if (item?.payload?.description === "loading") {
      return false;
    }
  }

  return (
    supportedMessageTypes.includes(item.type) &&
    item.type !== "TIMGroupTipElem" &&
    !item.isRevoked &&
    !chatStore.isMultiSelectMode &&
    availableMenuItems.value.length > 0
  );
});

const availableMenuItems = computed(() => {
  const messageType = props.item.type;
  return menuItemsConfig
    .filter((menuItem) => {
      if (menuItem.id === "edit") {
        return messageType === "TIMTextElem";
      } else if (menuItem.id === "copy") {
        return ["TIMTextElem", "TIMImageElem"].includes(messageType);
      } else {
        return true;
      }
    })
    .filter((menuItem) => !menuItem?.hidden);
});

function handleMenuItemClick(data) {
  const { id } = data;
  const { item } = props;
  switch (id) {
    case "copy": // 复制
      handleCopyMsg(item);
      break;
    case "edit": // 编辑
      chatStore.setMsgEdit(item);
      break;
    case "setup": // 设置
      console.log("设置");
      break;
    case "delete": // 删除
      emit("handleSingleClick", { item, id: "delete" });
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
    svg {
      outline: none;
    }
    &:hover {
      color: #080808;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
