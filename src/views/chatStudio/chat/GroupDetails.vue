<template>
  <el-drawer
    ref="groupRef"
    v-model="drawer"
    :title="$t('group.GroupDetails')"
    size="360px"
    :modal="true"
    modal-class="drawer-group"
    :before-close="handleClose"
    :close-on-press-escape="true"
    :append-to-body="false"
    :show-close="true"
    :with-header="true"
  >
    <div class="group-details">
      <!-- info -->
      <div class="group-base-info">
        <UserAvatar :url="groupProfile.avatar" :nickName="groupProfile.name" />
        <div class="group-base-info--text">
          <div>
            <span class="group-base-info--text__name">
              {{ groupProfile.name }}
            </span>
            <FontIcon
              v-show="isOwner"
              class="style-editPen icon-hover"
              iconName="EditPen"
              @click="openNamePopup"
            />
          </div>
          <span class="group-base-info--text__type">
            {{ GROUP_TYPE_MAP[groupProfile.type] }}
          </span>
        </div>
      </div>
      <el-divider />
      <!-- 群公告 -->
      <div class="group-accountecment">
        <div class="group-accountecment--title">
          <span>{{ $t("group.GroupNotice") }}</span>
          <FontIcon
            v-show="isOwner"
            class="style-editPen icon-hover"
            iconName="EditPen"
            @click="openNoticePopup"
          />
        </div>
        <div class="group-accountecment--info">
          <AnalysisUrl :text="groupProfile.notification" />
        </div>
      </div>
      <el-divider />
      <!-- 群成员 -->
      <div class="group-member">
        <div class="group-member--title">
          <span> 群成员 </span>
          <span class="group-member--title__right">
            <span>{{ currentMemberList.length }}人 </span>
            <!-- <span><a @click="openDetails">查看</a></span> -->
          </span>
        </div>
        <el-scrollbar always>
          <div class="group-member--avatar">
            <span class="group-member--add margin" @click="groupMemberAdd">
              <svg-icon iconClass="add" />
            </span>
            <div
              class="avatar margin"
              v-for="item in currentMemberList"
              :key="item.userID"
              @click="navigate(item)"
            >
              <FontIcon
                iconName="CircleCloseFilled"
                class="style-close"
                v-show="isOwner"
                :class="{ hidden: userProfile.userID === item.userID }"
                @click.stop="removeGroupMemberBtn(item)"
              />
              <UserAvatar :url="item.avatar" :nickName="item.nick || item.userID" />
              <div class="admin" :class="item.role" v-if="item.role !== 'Member'">
                {{ item.role === "Owner" ? "群主" : "管理员" }}
              </div>
              <span class="nick">{{ item.nick || item.userID }}</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <el-divider />
      <!-- 免打扰 -->
      <div class="group-flag-message">
        <div class="group-flag-message--title">
          <span class="group-flag-message--title__text"> 消息免打扰 </span>
          <el-switch v-model="isNotify" @change="notify" />
        </div>
      </div>
      <el-divider />
      <!-- 解散 退出 转让 -->
      <div class="group-operator" v-show="!staff">
        <el-button v-if="isOwner" type="danger" @click="handleDismissGroup"> 解散群组 </el-button>
        <el-button v-else type="danger" @click="handleQuitGroup"> 退出群组 </el-button>
        <div class="group-operator--divider"></div>
        <el-button type="primary" plain v-show="isOwner && false" @click="handleTransferGroup">
          转让群组
        </el-button>
      </div>
      <!-- 添加成员弹框 -->
      <AddMemberPopup @define="addGroupMemberBtn" ref="AddMemberRef" />
    </div>
  </el-drawer>
</template>

<script setup>
import { addGroupMember, deleteGroupMember, updateGroupProfile } from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/index";
import { useBoolean } from "@/utils/hooks/index";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import { showConfirmationBox } from "@/utils/message";
import emitter from "@/utils/mitt-bus";
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import AddMemberPopup from "../components/AddMemberPopup.vue";
import AnalysisUrl from "../components/AnalysisUrl.vue";

const { groupProfile } = defineProps({
  groupProfile: {
    type: Object,
    default: () => {},
  },
  staff: {
    type: Boolean,
    default: false,
  },
});

const GROUP_TYPE_MAP = {
  Public: "陌生人社交群(Public)",
  Private: "好友工作群(Work)",
  ChatRoom: "临时会议群(Meeting)",
  AVChatRoom: "直播群(AVChatRoom)",
};
const isNotify = ref(false);
const AddMemberRef = ref();
const { dispatch } = useStore();
const [drawer, setDrawer] = useBoolean();
const { userProfile, currentMemberList, currentConversation } = useState({
  userProfile: (state) => state.user.userProfile,
  currentMemberList: (state) => state.groupinfo.currentMemberList,
  currentConversation: (state) => state.conversation.currentConversation,
});
const { isOwner, isAdmin, toAccount } = useGetters(["isOwner", "isAdmin", "toAccount"]);

const notify = (val) => {
  const { type, toAccount, messageRemindType: remindType } = currentConversation.value;
  dispatch("SET_MESSAGE_REMIND_TYPE", { type, toAccount, remindType });
};

const openNamePopup = async () => {
  const { name } = groupProfile;
  const data = { message: "输入群名", inputValue: name };
  const result = await showConfirmationBox(data, "prompt");
  if (result === "cancel") return;
  modifyGroupInfo(result.value);
};

const openNoticePopup = async () => {
  const { notification } = groupProfile;
  const data = { message: "输入群公告", inputValue: notification };
  const result = await showConfirmationBox(data, "prompt");
  if (result === "cancel") return;
  modifyGroupInfo(result.value, "notification");
};

const openDetails = () => {};

const handleClose = (done) => {
  done();
};

const groupMemberAdd = () => {
  AddMemberRef.value.onenDialog();
};

const navigate = (item) => {
  dispatch("CHEC_OUT_CONVERSATION", { convId: `C2C${item.userID}` });
  setDrawer(false);
};

const removeGroupMemberBtn = async (item) => {
  const data = { message: `确定将 ${item.nick} 移出群聊?`, iconType: "warning" };
  const result = await showConfirmationBox(data);
  if (result === "cancel") return;
  const params = { groupID: toAccount.value, user: item.userID };
  const { code } = await deleteGroupMember(params);
  if (code !== 0) return;
  updataGroup();
};

const addGroupMemberBtn = async (value) => {
  const { groupID, type } = groupProfile;
  const { toAccount } = value;
  if (type === "Public") {
    const { ErrorCode } = await restApi({
      params: { groupId: groupID, member: toAccount },
      funName: "addGroupMember",
    });
    if (ErrorCode !== 0) return;
    updataGroup();
  } else {
    const { code, data } = await addGroupMember({ groupID, user: toAccount });
    if (code === 0) {
      updataGroup();
    } else {
      console.log(data);
    }
  }
};

const updataGroup = () => {
  setTimeout(() => {
    dispatch("getGroupMemberList");
  }, 250);
};
// 修改群资料
const modifyGroupInfo = async (value, modify) => {
  const { groupID } = groupProfile;
  await updateGroupProfile({ convId: groupID, modify, value });
};

const handleDismissGroup = async () => {
  const data = { message: "确定解散群聊?", iconType: "warning" };
  const result = await showConfirmationBox(data);
  if (result === "cancel") return;
  const { conversationID } = currentConversation.value;
  dispatch("DISMISS_GROUP", {
    convId: conversationID,
    groupId: toAccount.value,
  });
  setDrawer(false);
};

const handleTransferGroup = async () => {
  const data = { message: "确定转让群聊?", iconType: "warning" };
  const result = await showConfirmationBox(data);
  if (result === "cancel") return;
};

const handleQuitGroup = async () => {
  const data = { message: "确定退出群聊?", iconType: "warning" };
  const result = await showConfirmationBox(data);
  if (result === "cancel") return;
  const { conversationID } = currentConversation.value;
  dispatch("QUIT_GROUP", {
    convId: conversationID,
    groupId: toAccount.value,
  });
  setDrawer(false);
};

watchEffect(() => {
  isNotify.value = currentConversation.value.messageRemindType === "AcceptNotNotify";
});

onMounted(() => {
  emitter.on("onGroupDrawer", (val) => {
    setDrawer(val);
  });
});

onBeforeUnmount(() => {
  emitter.off("onGroupDrawer");
});
</script>

<style lang="scss" scoped>
.admin {
  width: 40px;
  height: 14px;
  text-align: center;
  line-height: 14px;
  font-size: 8.64px;
  position: absolute;
  top: 30px;
  border-radius: 2px;
  background: #fffbe6;
  color: #4ab017b3;
  border: 0.64px solid rgb(191, 232, 158);
}
.Owner {
  color: #faad14;
  border: 0.64px solid rgba(255, 229, 143, 1);
}

:deep(.el-divider) {
  margin: 0;
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
  right: -7px;
  top: -7px;
  color: #f44336 !important;
  cursor: pointer;
}
.member-list-drawer--item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  .member-list-drawer--item__name {
    margin-left: 8px;
  }
}
.group-accountecment {
  padding: 12px 0;
  .group-accountecment--info {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 16px;
    min-height: 12px;
    @include ellipsisBasic(5);
  }
}
.group-base-info {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  .group-base-info--text {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    .group-base-info--text__name {
      display: inline-block;
      vertical-align: bottom;
      max-width: 150px;
      font-size: 14px;
      font-weight: 400;
      color: var(--color-message-chat-name);
      margin-right: 8px;
      @include text-ellipsis;
    }
    .group-base-info--text__type {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}
.group-member {
  padding: 12px 0;
  .group-member--title {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-time-divider);
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    .group-member--title__right {
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
  .group-member--avatar {
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
    .group-member--add {
      .svg-icon {
        height: 40px;
        width: 40px;
      }
    }
    .margin {
      margin: 0 12px 20px 0;
    }
  }
}
.group-flag-message {
  padding: 12px 0;
  .group-flag-message--title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.group-operator {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .group-operator--divider {
    width: 12px;
  }
}
</style>
