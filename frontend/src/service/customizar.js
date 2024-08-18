import request from 'src/service/request'

export function UpdateName (data) {
  return request({
    url: '/custom/updateName',
    method: 'post',
    data
  })
}

export function UploadLogo (data) {
  return request({
    url: '/custom/uploadLogo',
    method: 'post',
    data
  })
}

export function UploadIcon (data) {
  return request({
    url: '/custom/uploadIcon',
    method: 'post',
    data
  })
}

export function Build (data) {
  return request({
    url: '/custom/build',
    method: 'post',
    data
  })
}