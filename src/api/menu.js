import http from "@/utils/http/index";

/**
 * 获取菜单列表
 */
export const getMenu = () => {
  return http({
    url: "/menu/query",
    method: "get",
  });
};

/**
 * 更新菜单
 * @param{ path,title,icon,component }
 */
export const updateMenu = (params) => {
  return http({
    url: "/menu/update",
    method: "get",
    params,
  });
};

/**
 * 添加菜单
 * @param{ path,title,icon,component }
 */
export const AddMenu = (params) => {
  return http({
    url: "/menu/add",
    method: "get",
    params,
  });
};

/**
 * 删除菜单
 * @param{ ids [...] }
 */
export const DeleteMenu = (params) => {
  return http({
    url: "/menu/delete",
    method: "get",
    params,
  });
};
