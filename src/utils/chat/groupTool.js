/**
 * 比较两个用户对象的角色，以确定它们的排序顺序。
 *
 * @param a - 第一个用户对象，必须包含一个 `role` 属性，角色可以是：
 *            - "Owner"（群主）
 *            - "Admin"（管理员）
 *            - "Member"（普通成员）
 * @param b - 第二个用户对象，必须包含一个 `role` 属性，角色可以是：
 *            - "Owner"（群主）
 *            - "Admin"（管理员）
 *            - "Member"（普通成员）
 * @returns 返回一个数字，表示两个用户角色的比较结果：
 *          - 小于0：`a` 的角色在 `b` 之前
 *          - 等于0：`a` 和 `b` 的角色相同
 *          - 大于0：`a` 的角色在 `b` 之后
 */
export function compareByRole(a, b) {
  const roles = { Owner: 1, Admin: 2, Member: 3 };
  return roles[a.role] - roles[b.role];
}
