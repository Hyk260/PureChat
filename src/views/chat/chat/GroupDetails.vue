<template>
  <ElDrawer
    v-model="drawer"
    size="360px"
    modalClass="group-drawer-modal"
    :title="$t('group.groupDetails')"
    :modal="true"
    :closeOnPressEscape="true"
    :appendToBody="false"
    :showClose="false"
    :withHeader="true"
    @close="handleClose"
  >
    <div>
      <div class="group-info">
        <UserAvatar
          :url="groupProfile.avatar"
          :nickName="groupProfile.name"
          @click="openAvatarPopup(groupProfile.avatar)"
        />
        <div class="group-info-text">
          <div>
            <span class="group-name truncate">
              {{ groupProfile.name }}
            </span>
            <ElIcon v-if="isOwner" class="style-editPen icon-hover" @click="openNamePopup">
              <EditPen />
            </ElIcon>
          </div>
          <span class="group-type">
            {{ GroupTypeMap[groupProfile.type] }}
          </span>
        </div>
      </div>
      <ElDivider />
      <!-- 群公告 -->
      <div class="group-notice">
        <div class="pb-10">
          <span>{{ $t("group.groupNotice") }}</span>
          <ElIcon v-if="isOwner" class="style-editPen icon-hover" @click="openNoticePopup">
            <EditPen />
          </ElIcon>
        </div>
        <div class="group-notice-info multi-truncate-5">
          <Markdown :content="groupProfile.notification" />
        </div>
      </div>
      <ElDivider />
      <!-- 群成员 -->
      <div class="group-member">
        <div class="group-member-title">
          <span> 群成员 </span>
          <span class="total">
            <span>{{ currentMemberList.length }}人 </span>
            <!-- <span><a @click="openDetails">查看</a></span> -->
          </span>
        </div>
        <ElScrollbar always>
          <div class="group-member-avatar">
            <span class="iconify-icon gala-add margin" @click="groupMemberAdd"></span>
            <div v-for="item in currentMemberList" :key="item.userID" class="avatar margin" @click="navigate(item)">
              <ElIcon
                v-if="isOwner"
                class="style-close"
                :class="{ hidden: userStore.userProfile.userID === item.userID }"
                @click.stop="removeGroupMemberBtn(item)"
              >
                <CircleX />
              </ElIcon>
              <UserAvatar :url="item.avatar" :nickName="item.nick || item.userID" />
              <!-- Admin Owner -->
              <div v-if="item.role !== 'Member'" class="wrap-group" :class="`style-${item.role}`">
                {{ item.role === "Owner" ? "群主" : "管理员" }}
              </div>
              <div v-else-if="item.userID.includes('@RBT#')" class="wrap-group ai-center">机器人</div>
              <span class="nick">{{ item.nick || item.userID }}</span>
            </div>
          </div>
        </ElScrollbar>
      </div>
      <ElDivider />
      <!-- 免打扰 -->
      <div class="py-12">
        <div class="flex-bc">
          <span> 消息免打扰 </span>
          <ElSwitch v-model="notify" :loading="loading" :beforeChange="beforeChange" @change="setNotify" />
        </div>
      </div>
      <ElDivider />
      <!-- 解散 退出 转让 -->
      <div v-if="!isFullStaffGroup(currentConversation)" class="group-operator flex-c">
        <ElButton v-if="isOwner" type="danger" @click="handleDismissGroup"> 解散群组 </ElButton>
        <ElButton v-else type="danger" @click="handleQuitGroup"> 退出群组 </ElButton>
        <!-- <div class="w-12"></div> -->
        <!-- <ElButton type="primary" plain v-if="isOwner" @click="handleTransferGroup">
          转让群组
        </ElButton> -->
      </div>
      <!-- 添加成员弹框 -->
      <AddMemberPopup ref="AddMemberRef" @define="addGroupMemberBtn" />
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElDrawer } from "element-plus"
import { CircleX, SquarePen as EditPen } from "lucide-vue-next"
// import { EditPen } from "@element-plus/icons-vue"

import Markdown from "@/components/Markdown/index.vue"
import { isFullStaffGroup } from "@/ai/utils"
import AddMemberPopup from "@/components/Popups/AddMemberPopup.vue"
import { useState } from "@/hooks/useState"
import { restApi } from "@/service/api"
import {
  addGroupMember,
  deleteGroupMember,
  GroupTypeMap,
  setMessageRemindType,
  updateGroupProfile,
} from "@/service/im-sdk-api"
import { useChatStore, useGroupStore, useUserStore } from "@/stores"
import { isByteLengthExceedingLimit } from "@/utils/chat"
import { showConfirmationBox } from "@/utils/message"
import emitter from "@/utils/mitt-bus"

const { groupProfile } = defineProps({
  groupProfile: {
    type: Object,
    default: () => {},
  },
})

const notify = ref(false)
const AddMemberRef = ref()

const groupStore = useGroupStore()
const userStore = useUserStore()
const chatStore = useChatStore()
const [drawer, setDrawer] = useState(false)
const [loading, setLoading] = useState(false)

const { currentMemberList, isOwner } = storeToRefs(groupStore)
const { toAccount, currentSessionId, currentConversation } = storeToRefs(chatStore)

const beforeChange = () => {
  setLoading(true)
  return new Promise((resolve) => {
    setTimeout(() => {
      setLoading(false)
      return resolve(true)
    }, 1000)
  })
}

const setNotify = () => {
  setMessageRemindType(currentConversation.value)
}

const openNamePopup = async () => {
  const { name } = groupProfile
  const data = { message: "输入群名", inputValue: name }
  const result = await showConfirmationBox(data, "prompt")
  if (result === "cancel") return
  const isByteLeng = isByteLengthExceedingLimit(result.value, "name")
  if (isByteLeng) {
    // const long = GroupModifyType['name']
    window.$message?.warning("名称太长")
    return
  }
  modifyGroupInfo(result.value)
}

const openNoticePopup = async () => {
  const { notification } = groupProfile
  const data = { message: "输入群公告", inputValue: notification }
  const result = await showConfirmationBox(data, "prompt")
  if (result === "cancel") return
  const isByteLeng = isByteLengthExceedingLimit(result.value, "notification")
  if (isByteLeng) {
    // const long = GroupModifyType['notification']
    window.$message?.warning("公告太长")
    return
  }
  modifyGroupInfo(result.value, "notification")
}

const openDetails = () => {}

const openAvatarPopup = (url: string) => {
  emitter.emit("handleImageViewer", url)
}

const handleClose = () => {
  setDrawer(false)
}

const groupMemberAdd = () => {
  AddMemberRef.value.openDialog()
}

const navigate = (item) => {
  chatStore.addConversation({ sessionId: `C2C${item.userID}` })
  setDrawer(false)
  setTimeout(() => {
    const dom = document.getElementById(`message_C2C${item.userID}`)
    dom?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, 200)
}

const removeGroupMemberBtn = async (item) => {
  const data = { message: `确定将 ${item.nick || item.userID} 移出群聊?`, iconType: "warning" }
  const result = await showConfirmationBox(data)
  if (result === "cancel") return
  const params = { groupID: toAccount.value, user: item.userID }
  const { code } = await deleteGroupMember(params)
  if (code !== 0) return
  updataGroup()
}

const addGroupMemberBtn = async (value) => {
  const { groupID, type } = groupProfile
  const { toAccount } = value
  if (type === "Public") {
    const { ErrorCode } = await restApi({
      params: { groupId: groupID, member: toAccount },
      funName: "addGroupMember",
    })
    if (ErrorCode !== 0) return
    updataGroup()
  } else {
    const { code, data } = await addGroupMember({ groupID, user: toAccount })
    if (code === 0) {
      updataGroup()
    } else {
      console.log(data)
    }
  }
}

const updataGroup = () => {
  setTimeout(() => {
    groupStore.handleGroupMemberList({ groupID: groupProfile.groupID })
  }, 200)
}
// 修改群资料
const modifyGroupInfo = async (value: string, modify: string) => {
  const { groupID } = groupProfile
  const { code, group } = await updateGroupProfile({ groupID, value, modify })
  if (code !== 0) {
    window.$message?.warning("修改失败")
  } else {
    console.log("modifyGroupInfo:", group)
  }
}

const handleDismissGroup = async () => {
  const data = { message: "确定解散群聊?", iconType: "warning" }
  const result = await showConfirmationBox(data)
  if (result === "cancel") return
  groupStore.handleDismissGroup({ sessionId: currentSessionId.value, groupId: toAccount.value })
  setDrawer(false)
}

const handleTransferGroup = async () => {
  const data = { message: "确定转让群聊?", iconType: "warning" }
  const result = await showConfirmationBox(data)
  if (result === "cancel") return
}

const handleQuitGroup = async () => {
  const data = { message: "确定退出群聊?", iconType: "warning" }
  const result = await showConfirmationBox(data)
  if (result === "cancel") return
  groupStore.handleQuitGroup({ sessionId: currentSessionId.value, groupId: toAccount.value })
  setDrawer(false)
}

onMounted(() => {
  emitter.on("handleGroupDrawer", (val: boolean) => {
    setDrawer(val)
  })
})

onBeforeUnmount(() => {
  emitter.off("handleGroupDrawer")
})

watch(currentConversation, (data) => {
  if (!data) return
  // AcceptAndNotify AcceptNotNotify
  notify.value = data.messageRemindType === "AcceptNotNotify"
})
</script>

<style lang="scss" scoped>
:global(.group-drawer-modal) {
  background-color: rgba(255, 255, 255, 0) !important;
}
:deep(.el-divider) {
  margin: 0;
}

.wrap-group {
  width: 40px;
  height: 14px;
  text-align: center;
  line-height: 14px;
  font-size: 8.64px;
  position: absolute;
  top: 30px;
  border-radius: 2px;
  background: #fffbe6;
}

.ai-center {
  color: #fa1414;
  border: 0.64px solid rgba(255, 229, 143, 1);
}

.style-Admin {
  color: #4ab017b3;
  border: 0.64px solid rgb(191, 232, 158);
}

.style-Owner {
  color: #faad14;
  border: 0.64px solid rgba(255, 229, 143, 1);
}

.style-editPen {
  cursor: pointer;
  vertical-align: bottom;
  margin-left: 5px;
}

.avatar:hover .style-close {
  visibility: visible;
}

.style-close {
  visibility: hidden;
  position: absolute;
  right: -5px;
  top: -5px;
  color: #f44336 !important;
  cursor: pointer;
}

.group-notice {
  padding: 12px 0;

  .group-notice-info {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 16px;
    min-height: 12px;
  }
}

.group-info {
  padding-bottom: 20px;
  display: flex;
  align-items: center;

  .group-info-text {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    gap: 4px;
    .group-name {
      display: inline-block;
      vertical-align: bottom;
      max-width: 150px;
      font-size: 14px;
      font-weight: 400;
      color: var(--color-message-chat-name);
      // margin-right: 8px;
    }

    .group-type {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}

.group-member {
  padding: 12px 0;

  .group-member-title {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-time-divider);
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;

    .total {
      font-size: 12px;
      font-weight: 400;
      color: #999999;

      span a {
        background-color: transparent;
        text-decoration: none;
        color: #006eff;
        cursor: pointer;
      }
    }
  }

  .group-member-avatar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-height: 180px;
    margin-top: 10px;

    .avatar {
      position: relative;

      .nick {
        font-size: 12px;
        width: 40px;
        display: inline-block;
        overflow: hidden;
        position: absolute;
        bottom: -18px;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
        color: var(--color-time-divider);
      }

      .isown {
        display: none;
      }
    }

    .margin {
      margin: 0 12px 20px 0;
    }
  }
}

.group-operator {
  padding-top: 20px;
}
</style>
