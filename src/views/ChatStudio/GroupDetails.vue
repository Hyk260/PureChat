<template>
  <div class="group-details">
    <!-- info -->
    <div class="group-base-info">
      <UserAvatar :nickName="groupProfile.groupID" />
      <div class="group-base-info--text">
        <div>
          <span class="group-base-info--text__name">
            {{ groupProfile.name }}
          </span>
          <span class="edit-icon"></span>
        </div>
        <span class="group-base-info--text__type">
          {{ groupProfile.type }}
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 群公告 -->
    <div class="group-accountecment">
      <div class="group-accountecment--title">
        <span>群公告</span>
        <span class="edit-icon"></span>
      </div>
      <div class="group-accountecment--info">
        {{ groupProfile.notification }}
      </div>
    </div>
    <div class="divider"></div>
    <!-- 群成员 -->
    <div class="group-member">
      <div class="group-member--title">
        <span> 群成员 </span>
        <span class="group-member--title__right">
          <span>{{ currentMemberList.length }}人 </span>
          <span><a @click="openDetails">查看</a></span>
        </span>
      </div>
      <div class="group-member--avatar">
        <div
          class="avatar"
          v-for="item in currentMemberList"
          :key="item.userID"
          @click="navigate(item)"
        >
          <el-icon
            class="style-close"
            v-show="isOwner"
            :class="{ isown: userProfile.userID == item.userID }"
            @click="RemovePeople(item)"
          >
            <CircleCloseFilled />
          </el-icon>
          <UserAvatar
            className="avatar-item"
            :url="item.avatar"
            :nickName="item.nick"
          />
        </div>
        <span class="group-member--add" @click="groupMemberAdd"> </span>
      </div>
    </div>
    <div class="divider"></div>
    <!-- 免打扰 -->
    <div class="group-flag-message">
      <div class="group-flag-message--title">
        <span class="group-flag-message--title__text"> 消息免打扰 </span>
        <el-switch v-model="value" />
      </div>
    </div>
    <div class="divider"></div>
    <!-- 退出 转让 -->
    <div class="group-operator">
      <el-button v-if="isOwner" type="danger" @click="dismissGroup">
        解散群组
      </el-button>
      <el-button v-else type="danger" @click="handleQuitGroup">
        退出群组
      </el-button>
      <div class="group-operator--divider"></div>
      <el-button type="primary" plain v-show="isOwner" @click="transferGroup">
        转让群组
      </el-button>
    </div>
    <!-- 人员详情 -->
    <Drawer
      title="人员详情"
      classModal="drawer-group"
      size="360px"
      ref="Refdrawerlist"
    >
      <template #center>
        <div
          class="member-list-drawer--item"
          v-for="item in currentMemberList"
          :key="item.userID"
        >
          <UserAvatar :url="item.avatar" :nickName="item.nick" />
          <span class="member-list-drawer--item__name">
            {{ item.nick }}
          </span>
          <span class="owner" v-if="groupProfile.ownerID == item.userID">
            群主
          </span>
          <span class="admin" v-if="userProfile.userID == item.userID && false">
            自己
          </span>
        </div>
      </template>
    </Drawer>
    <!-- 添加成员弹框 -->
    <el-dialog v-model="dialogVisible" title="添加成员" width="30%" draggable>
      <div>
        <el-input v-model="input" placeholder="请输入用户uid" clearable />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close"> 取消 </el-button>
          <el-button type="primary" @click="addGroupMemberBtn">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { UserFilled } from "@element-plus/icons-vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";
import {
  updateGroupProfile,
  addGroupMember,
  deleteGroupMember,
} from "@/api/im-sdk-api";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
const { state, commit, dispatch } = useStore();
const {
  user,
  userProfile,
  groupDrawer,
  showMsgBox,
  groupProfile,
  currentMemberList,
  currentConversation,
} = useState({
  user: (state) => state.data.user,
  userProfile: (state) => state.user.currentUserProfile,
  showMsgBox: (state) => state.conversation.showMsgBox,
  groupDrawer: (state) => state.groupinfo.groupDrawer,
  groupProfile: (state) => state.groupinfo.groupProfile,
  currentMemberList: (state) => state.groupinfo.currentMemberList,
  currentConversation: (state) => state.conversation.currentConversation,
});
const { isOwner, isAdmin, toAccount } = useGetters([
  "isOwner",
  "isAdmin",
  "toAccount",
]);
const input = ref("");
const value = ref(false);
const Refdrawerlist = ref();
const dialogVisible = ref(false);
const groupMember = ref([]);

const openDetails = () => {
  Refdrawerlist.value.handleOpen();
};

const close = () => {
  input.value = "";
  dialogVisible.value = false;
};
const RemovePeople = (item) => {
  ElMessageBox.confirm(`确定将 ${item.nick} 移出群聊?`, "提示", {
    confirmButtonText: `${t("el.datepicker.confirm")}`,
    cancelButtonText: `${t("el.datepicker.cancel")}`,
    type: "warning",
  })
    .then(() => {
      deleteGroupMember({
        groupID: toAccount.value,
        user: item.userID,
      });
      updataGroup();
    })
    .catch((err) => {
      console.log(err);
    });
};
const addGroupMemberBtn = () => {
  const { groupID } = groupProfile.value;
  addGroupMember({ groupID, user: input.value });
  updataGroup();
  close();
};
const updataGroup = () => {
  setTimeout(() => {
    dispatch("getGroupMemberList");
  }, 500);
};
const onclick = () => {
  const { groupID } = groupProfile.value;
  // updateGroupProfile({
  //   convId: groupID,
  //   modify: "notification",
  //   text: "公告12",
  // });
};
const navigate = (item) => {
  dispatch("CHEC_OUT_CONVERSATION", { convId: `C2C${item.userID}` });
};
const groupMemberAdd = () => {
  dialogVisible.value = true;
};
const dismissGroup = () => {
  ElMessageBox.confirm("确定解散群聊?", "提示", {
    confirmButtonText: `${t("el.datepicker.confirm")}`,
    cancelButtonText: `${t("el.datepicker.cancel")}`,
    type: "warning",
  })
    .then(() => {
      const { conversationID } = currentConversation.value;
      dispatch("DISMISS_GROUP", {
        convId: conversationID,
        groupId: toAccount.value,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const transferGroup = () => {
  console.log();
};

const handleQuitGroup = () => {
  ElMessageBox.confirm("确定退出群聊?", "提示", {
    confirmButtonText: `${t("el.datepicker.confirm")}`,
    cancelButtonText: `${t("el.datepicker.cancel")}`,
    type: "warning",
  })
    .then(() => {
      const { conversationID } = currentConversation.value;
      dispatch("QUIT_GROUP", {
        convId: conversationID,
        groupId: toAccount.value,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log(groupProfile.value);
    });
};
</script>

<style lang="scss" scoped>
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
  // .group-accountecment--title {
  // }
  .group-accountecment--info {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 16px;
    min-height: 12px;
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
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      margin-right: 8px;
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
    color: #333333;
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
    .avatar {
      position: relative;
      margin-right: 12px;
      margin-bottom: 12px;
      .isown {
        display: none;
      }
    }
    .group-member--add {
      width: 38px;
      height: 38px;
      margin-right: 12px;
      margin-bottom: 12px;
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzhweCIgaGVpZ2h0PSIzOHB4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5L2N5Zu+5aSH5Lu9IDY8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPGNpcmNsZSBpZD0icGF0aC0xIiBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiPjwvY2lyY2xlPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMDQt576k6IGKLeaJqeWxleWKn+iDvS3nvqTorr7nva4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MDEuMDAwMDAwLCAtMzIxLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i5L2N5Zu+5aSH5Lu9LTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwMi4wMDAwMDAsIDMyMi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgPHVzZSBpZD0i6JKZ54mIIiBzdHJva2U9IiM5OTk5OTkiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTksMTEgTDE5LDE2Ljc3NyBMMjUsMTYuNzc3Nzc3OCBMMjUsMTguNzc3Nzc3OCBMMTguOTk5LDE4Ljc3NyBMMTksMjUgTDE3LDI1IEwxNi45OTksMTguNzc3IEwxMSwxOC43Nzc3Nzc4IEwxMSwxNi43Nzc3Nzc4IEwxNywxNi43NzcgTDE3LDExIEwxOSwxMSBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjOTk5OTk5Ij48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);
    }
  }
}
.group-flag-message {
  padding: 12px 0;
}
.group-operator {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .group-operator--divider {
    width: 12px;
  }
}

.divider {
  width: 100%;
  height: 1px;
  background: #eeeeee;
}
</style>
