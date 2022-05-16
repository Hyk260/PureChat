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
 * 退出登录
 */ 
export const logout = () => {
  storage.remove(ACCESS_TOKEN)
};



