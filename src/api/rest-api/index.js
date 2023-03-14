import service from "@/utils/http/rest-api";
import store from "@/store/index";
import { randomNum } from "@/utils/index";

function parameter(url) {
  const appid = process.env.VUE_APP_SDK_APPID;
  const admin = store.state.user.userID;
  const usersig = store.state.user.userSig;
  const random = randomNum(0, 4294967295);
  return `${url}?sdkappid=${appid}&identifier=${admin}&usersig=${usersig}&random=${random}&contenttype=json`;
}

function buildURL(baseURL) {
  const params = {
    sdkappid: process.env.VUE_APP_SDK_APPID,
    identifier: store.state.user.userID,
    usersig: store.state.user.userSig,
    random: randomNum(0, 4294967295),
    contenttype: "json",
  };
  const searchParams = new URLSearchParams(params);
  return `${baseURL}?${searchParams.toString()}`;
}

// 查询帐号 只有管理员身份才能调用
export const accountCheck = async (params) => {
  const { userid } = params;
  const url = "v4/im_open_login_svc/account_check";
  const result = await service({
    url: buildURL(url),
    method: "post",
    data: {
      CheckItem: [
        {
          UserID: userid,
        },
      ],
    },
  });
  const { ErrorCode, ErrorInfo, ResultItem } = result;
  if (ErrorCode !== 0) return ErrorInfo;
  // const { AccountStatus } = ResultItem[0]; // "Imported"
  return ResultItem;
};
// 单发单聊消息
export const restSendMsg = async (params) => {
  const { From, To, content } = params;
  if (To !== "R00001") return;
  const url = "v4/openim/sendmsg";
  const result = await service({
    url: buildURL(url),
    method: "post",
    data: {
      SyncOtherMachine: 1, // 消息同步1 不同步 2
      From_Account: To || store.state.user.userID,
      To_Account: From,
      MsgSeq: 93847636,
      MsgRandom: 1287657,
      MsgBody: [
        {
          MsgType: "TIMTextElem",
          MsgContent: {
            Text: "hi, beauty",
          },
        },
      ],
      CloudCustomData: "your cloud custom data",
    },
  });
  console.log(result);
};
