import request from 'src/service/request'

export function RealizarLogin (user) {
  return request({
    url: '/auth/login/',
    method: 'post',
    data: user
  })
}

export function RealizarLogout (user) {
  return request({
    url: '/auth/logout/',
    method: 'post',
    data: user
  })
}

export function RefreshToken () {
  return request({
    url: '/auth/refresh_token',
    method: 'post'
  })
}

export function ResetarPassword (data) {
  return request({
    url: '/password-reset',
    method: 'post',
    data
  })
}

export function RedefinirSenha (data) {
  return request({
    url: '/reset-password',
    method: 'post',
    data
  })
}