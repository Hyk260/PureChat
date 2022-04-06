import https from '@/utils/https'

export function Login (params) {
  const data = https({
    url: '/login',
    method: 'get',
    params
  })
  return data
}