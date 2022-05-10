import http from '@/utils/http'
import storage from 'storejs'
import { ACCESS_TOKEN } from '@/store/mutation-types'

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

/**
 * 退出登录
 */ 
export const logout = () => {
  storage.remove(ACCESS_TOKEN)
};

/**
 * 更新菜单
 * @param{ id,path,title,icon,component }
 */ 
export const updateMenu = (params) => {
  return http({
    url: '/menu/update',
    method: 'get',
    params
  });
};

