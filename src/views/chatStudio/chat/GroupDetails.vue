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
    <div>
      <!-- info -->
      <div class="group-base-info">
        <UserAvatar
          @click="openAvatarPopup(groupProfile.avatar)"
          :url="groupProfile.avatar"
          :nickName="groupProfile.name"
        />
        <div class="group-base-info-text">
          <div>
            <span class="group-name">
              {{ groupProfile.name }}
            </span>
            <FontIcon
              v-show="isOwner"
              class="style-editPen icon-hover"
              iconName="EditPen"
              @click="openNamePopup"
            />
          </div>
          <span class="group-type">
            {{ GroupTypeMap[groupProfile.type] }}
          </span>
        </div>
      </div>
      <el-divider />
      <!-- 群公告 -->
      <div class="group-notice">
        <div>
          <span>{{ $t("group.GroupNotice") }}</span>
          <FontIcon
            v-show="isOwner"
            class="style-editPen icon-hover"
            iconName="EditPen"
            @click="openNoticePopup"
          />
        </div>
        <div class="group-notice--info">
          <AnalysisUrl :text="groupProfile.notification" />
        </div>
      </div>
      <el-divider />
      <!-- 群成员 -->
      <div class="group-member">
        <div class="group-member-title">
          <span> 群成员 </span>
          <span class="total">
            <span>{{ currentMemberList.length }}人 </span>
            <!-- <span><a @click="openDetails">查看</a></span> -->
          </span>
        </div>
        <el-scrollbar always>
          <div class="group-member-avatar">
            <span class="gala-add margin" @click="groupMemberAdd"></span>
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
              <!-- Admin Owner -->
              <div class="wrap-group" :class="`style-${item.role}`" v-if="item.role !== 'Member'">
                {{ item.role === "Owner" ? "群主" : "管理员" }}
              </div>
              <span class="nick">{{ item.nick || item.userID }}</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <el-divider />
      <!-- 免打扰 -->
      <div class="py-12">
        <div class="flex-bc">
          <span> 消息免打扰 </span>
          <el-switch
            v-model="notify"
            :loading="loading"
            :before-change="beforeChange"
            @change="setNotify"
          />
        </div>
      </div>
      <el-divider />
      <!-- 解散 退出 转让 -->
      <div class="group-operator flex-c" v-show="!isFullStaffGroup(currentConversation)">
        <el-button v-if="isOwner" type="danger" @click="handleDismissGroup"> 解散群组 </el-button>
        <el-button v-else type="danger" @click="handleQuitGroup"> 退出群组 </el-button>
        <div class="w-12"></div>
        <el-button type="primary" plain v-show="isOwner" @click="handleTransferGroup">
          转让群组
        </el-button>
      </div>
      <!-- 添加成员弹框 -->
      <AddMemberPopup @define="addGroupMemberBtn" ref="AddMemberRef" />
    </div>
  </el-drawer>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  addGroupMember,
  deleteGroupMember,
  updateGroupProfile,
  GroupTypeMap,
} from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/index";
import { useBoolean } from "@/utils/hooks/index";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import { showConfirmationBox } from "@/utils/message";
import { isFullStaffGroup } from "@/ai/utils";
import { useStore } from "vuex";
import AddMemberPopup from "../components/AddMemberPopup.vue";
import AnalysisUrl from "../components/AnalysisUrl.vue";
import emitter from "@/utils/mitt-bus";

const { groupProfile } = defineProps({
  groupProfile: {
    type: Object,
    default: () => {},
  },
});

const notify = ref(false);
const AddMemberRef = ref();

const [drawer, setDrawer] = useBoolean();
const [loading, setLoading] = useBoolean();

const { dispatch } = useStore();
const { isOwner, toAccount } = useGetters(["isOwner", "toAccount"]);

const { userProfile, currentMemberList, currentConversation } = useState({
  userProfile: (state) => state.user.userProfile,
  currentMemberList: (state) => state.groupinfo.currentMemberList,
  currentConversation: (state) => state.conversation.currentConversation,
});

const beforeChange = () => {
  setLoading(true);
  return new Promise((resolve) => {
    setTimeout(() => {
      setLoading(false);
      return resolve(true);
    }, 1000);
  });
};

const setNotify = () => {
  const { type, toAccount, messageRemindType: remindType } = currentConversation.value;
  dispatch("setMessageReminderType", { type, toAccount, remindType });
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

const openAvatarPopup = (url) => {
  emitter.emit("handleImageViewer", url);
};

const handleClose = (done) => {
  done();
};

const groupMemberAdd = () => {
  AddMemberRef.value.onenDialog();
};

const navigate = (item) => {
  dispatch("addConversation", { convId: `C2C${item.userID}` });
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
  const { conversationID: convId } = currentConversation.value;
  dispatch("dismissGroup", { convId, groupId: toAccount.value });
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
  const { conversationID: convId } = currentConversation.value;
  dispatch("handleQuitGroup", { convId, groupId: toAccount.value });
  setDrawer(false);
};

onMounted(() => {
  emitter.on("handleGroupDrawer", (val) => {
    setDrawer(val);
  });
});

onBeforeUnmount(() => {
  emitter.off("handleGroupDrawer");
});

watch(currentConversation, (data) => {
  const { messageRemindType } = data; // AcceptAndNotify AcceptNotNotify
  notify.value = messageRemindType === "AcceptNotNotify";
});
</script>

<style lang="scss" scoped>
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

  .group-notice--info {
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

  .group-base-info-text {
    display: flex;
    flex-direction: column;
    margin-left: 8px;

    .group-name {
      display: inline-block;
      vertical-align: bottom;
      max-width: 150px;
      font-size: 14px;
      font-weight: 400;
      color: var(--color-message-chat-name);
      margin-right: 8px;
      @include text-ellipsis;
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
