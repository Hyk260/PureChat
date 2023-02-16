import service from "@/utils/http/rest-api";
import store from "@/store/index";
import { randomNum } from "@/utils/index";

function parameter(url) {
  const appid = process.env.VUE_APP_SDK_APPID;
  const admin = store.state.user.userID
  const usersig = store.state.user.userSig;
  const random = randomNum(0, 4294967295);
  return `${url}?sdkappid=${appid}&identifier=${admin}&usersig=${usersig}&random=${random}&contenttype=json`;
}

// 查询帐号 只有管理员身份才能调用
export const accountCheck = async (params) => {
  const { userid } = params
  const url = "v4/im_open_login_svc/account_check";
  const result = await service({
    url: parameter(url),
    method: "post",
    data: {
      CheckItem: [
        {
          UserID: userid || "临江仙",
        },
      ],
    },
  });
  const { ErrorCode, ResultItem } = result;
  if (ErrorCode !== 0) return;
  // const { AccountStatus } = ResultItem[0]; // "Imported"
  return ResultItem
};
