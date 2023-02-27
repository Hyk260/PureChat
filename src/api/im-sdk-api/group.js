import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";

// 解散群组
export const dismissGroup = async (groupId) => {
  let promise = tim.dismissGroup(groupId);
  promise.then(function (imResponse) { // 解散成功
    console.log(imResponse.data.groupID); // 被解散的群组 ID
  }).catch(function (imError) {
    console.warn('dismissGroup error:', imError); // 解散群组失败的相关信息
  });
};