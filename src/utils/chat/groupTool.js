import store from "@/store";
import { nextTick } from "vue";
/**
 * 按角色对成员列表进行排序。
 *
 * @param {Array} list - 要排序的成员对象数组。
 * 每个成员对象应具有一个对应于定义角色的 'role' 属性。
 * 示例成员对象: { name: 'Alice', role: 'Member' }
 *
 * @returns {Array} 排序后的成员对象数组，按照角色排序。
 */
export function sortMembersByRole(list) {
  const roles = { Owner: 1, Admin: 2, Member: 3 };

  return list.sort((a, b) => {
    return roles[a.role] - roles[b.role];
  });
}
/**
 * 机器人排在首位
 * 比较用户ID，确保带有@RBT#的用户排在前面
 * @param {Object} a - 第一个用户对象，期待有userID属性
 * @param {Object} b - 第二个用户对象，期待有userID属性
 * @returns {number} - 返回-1如果a在b前面，1如果b在a前面，0如果相等
 */
export const prioritizeRBTUserID = (list) => {
  return list.sort((a, b) => {
    const isAHasRBT = a.userID.includes("@RBT#");
    const isBHasRBT = b.userID.includes("@RBT#");
    if (isAHasRBT && !isBHasRBT) return -1; // a在前
    if (isBHasRBT && !isAHasRBT) return 1; // b在前
    return 0; // 两者相等
  });
};

export function findGroupChat(group) {
  const { groupID } = group || {};
  nextTick(() => {
    setTimeout(() => {
      const dom = document.getElementById(`message_GROUP${groupID}`);
      if (dom) {
        store.dispatch("addConversation", { convId: `GROUP${groupID}` });
        dom.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        console.warn("定位到群聊失败");
      }
    }, 1350);
  });
}
