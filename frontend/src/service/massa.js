import request from 'src/service/request'

export function Texto(data) {
  return request({
    url: '/bulk/',
    method: 'post',
    data
  })
}

export function TextoFechar(data) {
  return request({
    url: '/bulkClose/',
    method: 'post',
    data
  })
}

export function TextoVariavel(data) {
  return request({
    url: '/bulkVariable/',
    method: 'post',
    data
  })
}

export function TextoIndividual(data) {
  return request({
    url: '/individual/',
    method: 'post',
    data
  })
}