export function compareByRole(a, b) {
  const roles = { Owner: 1, Admin: 2, Member: 3 };
  return roles[a.role] - roles[b.role];
}
