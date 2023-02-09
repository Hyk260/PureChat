import service from "@/utils/http/rest-api";
import store from "@/store/index";
import { randomNum } from "@/utils/index";

function parameter(url) {
  const appid = process.env.VUE_APP_SDK_APPID;
  const admin = process.env.VUE_APP_IDENTIFIER;
  const usersig = store.state.user.userSig;
  const random = randomNum(0, 4294967295);
  return `${url}?sdkappid=${appid}&identifier=${admin}&usersig=${usersig}&random=${random}&contenttype=json`;
}

// 查询帐号
export const accountCheck = async (params) => {
  // const { url='' } = params
  const url = "v4/im_open_login_svc/account_check";
  const result = await service({
    url: parameter(url),
    method: "post",
    data: {
      CheckItem: [
        {
          UserID: "临江仙12",
        },
      ],
    },
  });
  if (ErrorCode !== 0) return false;
  const { ErrorCode, ResultItem } = result;
  const { AccountStatus } = ResultItem[0];
  console.log(result);
  return AccountStatus == "Imported";
};
