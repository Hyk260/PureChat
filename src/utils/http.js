import axios from 'axios'
import storeLocal from 'storejs'
const baseURL = 'http://localhost:8082/';

// 公共地址
const service = axios.create({
  baseURL,
  timeout: 15000, // 相应时间 2.5秒后报错
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = storeLocal.get('token')
    if(token) config.headers['authorization'] = token;
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data, config } = response
    const { code, msg } = data
    if (response.status === 200) {
      storeLocal.set('token',response.headers["x-token"])
      return data
    }
  },
  error => {
  
  })

export default service
