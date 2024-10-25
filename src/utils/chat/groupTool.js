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
