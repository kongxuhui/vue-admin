import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/login/checkLogin',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({ ...data })
  })
}

export function getCaptcha(params) {
  return request({
    url: '/login/getCaptcha',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout(token) {
  return request({
    url: '/login/checkout',
    method: 'get',
    params: { token }
  })
}
