import http from '@/utils/http'

/**
 * 登录接口
 */ 
export const Login = (params) => {
  return http({
    url: '/login',
    method: 'get',
    params
  });
};

/**
 * 获取菜单列表
 */ 
 export const getMenu = () => {
  return http({
    url: '/menu/query',
    method: 'get',
  });
};