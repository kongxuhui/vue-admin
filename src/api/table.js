import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'get',
    params
  })
}

export function getTrainingRecord(token) {
  return request({
    url: '/event/myEvents',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    method: 'get',
    params: { token }
  })
}

export function getColumn(token) {
  return request({
    url: '/sysColumn/getColumn/',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    method: 'get',
    params: { token }
  })
}

export function getChapter(token, taskId, columnId) {
  return request({
    url: '/chapter/getChapter',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'get',
    params: { token, taskId, columnId }
  })
}

