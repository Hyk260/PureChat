import axios from 'axios'

// const baseURL = 'http://localhost:3030/';
const baseURL = 'https://netease-cloud-music-ruby.vercel.app/';

// 公共地址
const service = axios.create({
  baseURL,
  timeout: 15000, // 相应时间 2.5秒后报错
})

// 请求拦截器
service.interceptors.request.use(
  config => {
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
      return data
    }
  },
  error => {
  
  })

export default service
