import request from 'src/service/request'

export function Terminal (data) {
  return request({
    url: '/command/',
    method: 'post',
    data
  })
}