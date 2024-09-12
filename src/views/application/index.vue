<template>
  <div>
    <el-button type="primary" @click="checkUpdate"> 检查更新</el-button>
    <el-button type="primary" @click="downUpdate"> 下载更新包</el-button>
    <el-button type="primary" @click="confirmUpdate"> 确定更新 </el-button>
    <el-button type="primary" @click="setShakeWindow"> 窗口抖动 </el-button>

    <el-button type="primary" @click="open"> 打开通知 </el-button>
    <el-button type="primary" @click="unopen"> 关闭通知 </el-button>
  </div>
</template>

<script>
import { notification } from "@m/main/notification/renderer";
const data = {
  ID: "144115243339126418-1722403025-65445737",
  conversationID: "GROUP@TGS#2P5E55UNV",
  conversationType: "GROUP",
  time: 1722403025,
  sequence: 473,
  clientSequence: 473,
  random: 65445737,
  priority: "Normal",
  nick: "张爱玲",
  avatar: "https://ljx-1307934606.cos.ap-beijing.myqcloud.com/zhangal.jpg",
  isPeerRead: false,
  nameCard: "",
  hasRiskContent: false,
  _elements: [
    {
      type: "TIMTextElem",
      content: {
        text: "@PureChat ",
      },
    },
  ],
  isPlaceMessage: 0,
  isRevoked: false,
  from: "zhangal",
  to: "@TGS#2P5E55UNV",
  flow: "in",
  isSystemMessage: false,
  protocol: "JSON",
  isResend: false,
  isRead: true,
  status: "success",
  _onlineOnlyFlag: false,
  _groupAtInfoList: [],
  _relayFlag: false,
  atUserList: ["huangyk"],
  cloudCustomData: "",
  isDeleted: false,
  isModified: false,
  _isExcludedFromUnreadCount: false,
  _isExcludedFromLastMessage: false,
  clientTime: 1722403025,
  senderTinyID: "144115243339126418",
  readReceiptInfo: {},
  needReadReceipt: false,
  version: 0,
  isBroadcastMessage: false,
  isSupportExtension: false,
  revoker: "",
  revokerInfo: {
    userID: "",
    nick: "",
    avatar: "",
  },
  revokeReason: "",
  payload: {
    text: "@PureChat ",
  },
  type: "TIMTextElem",
};
export default {
  name: "application",
  data() {
    return {};
  },
  methods: {
    open() {
      notification.show({
        title: `${data.nick}提到了你`,
        body: data,
      });
    },
    unopen() {
      notification.destroy();
    },
    setShakeWindow() {},
    checkUpdate() {},
    downUpdate() {},
    confirmUpdate() {},
  },
};
</script>

<style lang="scss" scoped></style>
