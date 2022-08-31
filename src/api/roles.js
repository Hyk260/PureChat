import http from "@/utils/http/index";
/**
 * 获取角色列表
 */
export const getRoles = () => {
  return http({
    url: "/role/query",
    method: "get",
  });
};

/**
 * 添加角色
 * @param{  }
 */
export const addRoles = (params) => {
  return http({
    url: "/role/add",
    method: "get",
    params,
  });
};

/**
 * 更新角色
 * @param{  }
 */
export const updateRoles = (params) => {
  return http({
    url: "/role/update",
    method: "get",
    params,
  });
};

/**
 * 删除角色
 * @param{ Array }
 */
export const deleteRoles = (params) => {
  return http({
    url: "/role/delete",
    method: "get",
    params,
  });
};
