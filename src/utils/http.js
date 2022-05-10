import axios from 'axios'
import storage from 'storejs'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '@/router'
const baseURL = 'http://localhost:8082/';

// 公共地址
const service = axios.create({
  baseURL,
  timeout: 6000, // 请求超时时间
})
// 异常拦截处理器
const errorHandler = (error) => {
  console.log(error)
  if (error.response) {
    const { data, status } = error.response
    // 登录过期
    if (status === 401) {
      storage.remove(ACCESS_TOKEN)
      router.replace('/login')
    }
    if (status === 500) {

    }
  }
  return Promise.reject(error)
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = storage.get(ACCESS_TOKEN)
    if(token) config.headers['authorization'] = token;
    return config
  },
  errorHandler)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data, config, status } = response
    const { code, msg } = data
    // console.log(response)
    if (status === 200) {
      const ToKen = response.headers["x-token"]
      ToKen && storage.set(ACCESS_TOKEN,ToKen) 
      return data
    }
    // if(status === 401){
    //   storage.remove(ACCESS_TOKEN)
    //   router.replace('/login')
    // }
  },errorHandler)


export default service
