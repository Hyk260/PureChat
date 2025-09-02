<template>
  <div v-show="shouldShowMenu" class="menubar">
    <div class="flex">
      <div v-for="t in availableMenuItems" :key="t.id" class="menubar-item flex-c">
        <el-tooltip :content="t.title" :disabled="t.id === 'more'" placement="top">
          <!-- <el-dropdown v-if="t.id === 'more'">
            <span>
              <el-icon><Ellipsis :size="13" /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
          <component
            :is="t.icon"
            v-if="t.id !== 'delete'"
            :class="t?.class"
            :size="13"
            @click="handleMenuItemClick(t)"
          />
          <div v-else>
            <el-popover ref="popoverTrashRef" placement="top" trigger="click" width="190">
              <div class="flex-sc gap-5 mb-10">
                <el-icon class="text-[#F56C6C]"><Warning /></el-icon>
                <p>确定要删除此消息吗？</p>
              </div>
              <div class="flex">
                <el-button class="ml-auto" size="small" @click="handleCancel">
                  {{ $t("common.cancel") }}
                </el-button>
                <el-button size="small" type="primary" @click="handleDelete">
                  {{ $t("common.confirm") }}
                </el-button>
              </div>
              <template #reference>
                <Trash :class="t?.class" :size="13" />
              </template>
            </el-popover>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Warning } from "@element-plus/icons-vue"
import { ElPopover } from "element-plus"
import {
  Copy,
  Ellipsis,
  RefreshCw,
  SquarePen,
  Trash,
  // SlidersHorizontal
} from "lucide-vue-next"
import { computed, markRaw, ref } from "vue"
import { PropType } from "vue"

import { DB_Message, MessageStatus, MessageStatusSchema } from "@/database/schemas/message"
import { useChatStore } from "@/stores/modules/chat"

import { handleCopyMsg } from "../utils/utils"

defineOptions({
  name: "MenuList",
})

const emit = defineEmits(["handleSingleClick"])

const props = defineProps({
  item: {
    type: Object as PropType<DB_Message>,
    default: null,
  },
  status: {
    type: String as PropType<MessageStatus>,
    default: "unSend",
    validator: (value: string) => MessageStatusSchema.options.includes(value as MessageStatus),
  },
})

const supportedMessageTypes = ["TIMImageElem", "TIMFileElem", "TIMTextElem", "TIMRelayElem", "TIMCustomElem"]

const menuItemsConfig = [
  {
    id: "copy",
    title: "复制",
    icon: markRaw(Copy),
  },
  {
    id: "refresh",
    title: "重新生成",
    hidden: true,
    icon: markRaw(RefreshCw),
  },
  {
    id: "edit",
    title: "编辑",
    hidden: !__LOCAL_MODE__,
    icon: markRaw(SquarePen),
  },
  {
    id: "more",
    title: "更多",
    hidden: true,
    icon: markRaw(Ellipsis),
  },
  {
    id: "delete",
    title: "删除",
    class: "text-[#f44336]",
    icon: markRaw(Trash),
  },
]

const popoverTrashRef = ref<InstanceType<typeof ElPopover> | null>(null)

const chatStore = useChatStore()

function handleCancel() {
  popoverTrashRef?.value?.hide?.()
  popoverTrashRef?.value?.[0]?.hide?.()
}

const handleDelete = () => {
  emit("handleSingleClick", { item: props.item, id: "delete" })
}

/**
 * 判断是否应该显示菜单
 */
const shouldShowMenu = computed(() => {
  const { item, status } = props

  // 消息状态检查
  if (status !== "success") {
    return false
  }

  // 编辑状态检查
  if (chatStore.msgEdit?.ID === item?.ID) {
    return false
  }

  // 自定义消息加载状态检查
  if (item.type === "TIMCustomElem") {
    if (item?.payload?.description === "loading") {
      return false
    }
  }

  return (
    supportedMessageTypes.includes(item.type) &&
    item.type !== "TIMGroupTipElem" &&
    !item.isRevoked &&
    !chatStore.isMultiSelectMode &&
    availableMenuItems.value.length > 0
  )
})

const availableMenuItems = computed(() => {
  const messageType = props.item.type
  return menuItemsConfig
    .filter((menuItem) => {
      if (menuItem.id === "edit") {
        return messageType === "TIMTextElem"
      } else if (menuItem.id === "copy") {
        return ["TIMTextElem", "TIMImageElem"].includes(messageType)
      } else {
        return true
      }
    })
    .filter((menuItem) => !menuItem?.hidden)
})

function handleMenuItemClick(data: { id: string }) {
  const { id } = data
  const { item } = props
  switch (id) {
    case "refresh":
      emit("handleSingleClick", { item: props.item, id: "refresh" })
      break
    case "copy":
      handleCopyMsg(item)
      break
    case "edit":
      chatStore.setMsgEdit(item)
      break
    case "setup":
      console.log("设置")
      break
    case "delete":
      handleDelete()
      break
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
