<template>
  <div v-if="showMenuList(item)" class="menubar">
    <div class="flex">
      <div
        class="menubar-item flex-c"
        v-for="item in filterList"
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
import { computed } from "vue";
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

const chatStore = useChatStore();

const filterList = computed(() => {
  const _type = props.item.type;
  return list
    .filter((t) => {
      if (t.id === "edit") {
        return _type === "TIMTextElem";
      } else if (t.id === "copy") {
        return ["TIMTextElem", "TIMImageElem"].includes(_type);
      } else {
        return true;
      }
    })
    .filter((t) => !t?.hidden);
});

function showMenuList(item) {
  if (props.status !== "success") return false;
  if (chatStore.msgEdit?.ID === item?.ID) return false;
  if (["TIMCustomElem"].includes(item.type)) {
    if (props.item?.payload?.description === "loading") return false;
  }
  // 图片 文件 文本 合并
  const msg = ["TIMImageElem", "TIMFileElem", "TIMTextElem", "TIMRelayElem", "TIMCustomElem"];
  return (
    msg.includes(item.type) &&
    item.type !== "TIMGroupTipElem" &&
    !item.isRevoked &&
    !chatStore.isMultiSelectMode &&
    filterList.value.length
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
      chatStore.$patch({ msgEdit: item })
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
    &:hover {
      color: #080808;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
