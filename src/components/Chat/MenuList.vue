<template>
  <div v-if="shouldShowMenu" class="menubar">
    <div class="flex">
      <div
        v-for="t in availableMenuItems"
        :key="t.key"
        class="menubar-item flex-c"
        @click="handleMenuItemClick($event, t)"
      >
        <!-- :disabled="t.id === 'more'" -->
        <el-tooltip :content="t.label" placement="top">
          <component :is="t.icon" :class="t?.class" :size="13" />
          <!-- <div v-else>
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
          </div> -->
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Warning } from "@element-plus/icons-vue"
import {
  Copy,
  Ellipsis,
  RefreshCw,
  SquarePen,
  Trash,
  // SlidersHorizontal
} from "lucide-vue-next"

import { ElPopover } from "element-plus"

import { useChatStore } from "@/stores/modules/chat"
import { DB_Message, MessageStatus, MessageStatusSchema } from "@/types"
import { handleCopyMsg, scrollToMessage } from "@/utils/chat"

defineOptions({
  name: "MenuList",
})

const emit = defineEmits(["handleSingleClick", "handleContextMenu"])

const props = defineProps({
  item: {
    type: Object as PropType<DB_Message>,
    required: true,
  },
  status: {
    type: String as PropType<MessageStatus>,
    default: "unSend",
    validator: (value: MessageStatus) => MessageStatusSchema.options.includes(value),
  },
})

const supportedMessageTypes = ["TIMImageElem", "TIMFileElem", "TIMTextElem", "TIMRelayElem", "TIMCustomElem"]

const menuItemsConfig = [
  {
    key: "copy",
    label: "复制",
    icon: markRaw(Copy),
  },
  {
    key: "refresh",
    label: "重新生成",
    hide: !__LOCAL_MODE__,
    icon: markRaw(RefreshCw),
  },
  {
    key: "edit",
    label: "编辑",
    hide: !__LOCAL_MODE__,
    icon: markRaw(SquarePen),
  },
  {
    key: "delete",
    label: "删除",
    class: "text-[#f44336]",
    icon: markRaw(Trash),
  },
  {
    key: "more",
    label: "更多",
    // hide: true,
    icon: markRaw(Ellipsis),
  },
]

const popoverTrashRef = ref<InstanceType<typeof ElPopover> | null>(null)

const chatStore = useChatStore()

function handleCancel() {
  popoverTrashRef?.value?.hide?.()
  popoverTrashRef?.value?.[0]?.hide?.()
}

const handleDelete = () => {
  emit("handleSingleClick", { item: props.item, key: "delete" })
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
    .filter((t) => {
      if (t.key === "edit") {
        return messageType === "TIMTextElem"
      } else if (t.key === "copy") {
        return ["TIMTextElem", "TIMImageElem"].includes(messageType)
      } else if (t.key === "refresh") {
        return props.item.flow === "in" && messageType === "TIMTextElem"
      } else {
        return true
      }
    })
    .filter((t) => !t?.hide)
})

function handleMenuItemClick(event: MouseEvent, data: { key: string }) {
  const { key } = data
  const { item } = props
  switch (key) {
    case "refresh":
      emit("handleSingleClick", { item, key: "refresh" })
      break
    case "copy":
      handleCopyMsg(item)
      break
    case "edit":
      scrollToMessage(item.ID)
      chatStore.setMsgEdit(item)
      break
    case "more":
      emit("handleContextMenu", event, item)
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
