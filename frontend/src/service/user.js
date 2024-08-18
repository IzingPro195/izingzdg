import request from 'src/service/request'

export function ListarUsuarios (params) {
  return request({
    url: '/users/',
    method: 'get',
    params
  })
}

export function CriarUsuario (data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function UpdateUsuarios (userId, data) {
  return request({
    url: `/users/${userId}`,
    method: 'put',
    data
  })
}

export function UpdateIsOnlineUsuario (userId, data) {
  return request({
    url: `/usersIsOnline/${userId}`,
    method: 'put',
    data
  })
}

export function UpdateConfiguracoesUsuarios (userId, data) {
  return request({
    url: `/users/${userId}/configs`,
    method: 'put',
    data
  })
}

export function DadosUsuario (userId) {
  return request({
    url: `/users/${userId}`,
    method: 'get'
  })
}

export function DeleteUsuario (userId) {
  return request({
    url: `/users/${userId}`,
    method: 'delete'
  })
}

export function ListarUsuariosTenant (params) {
  return request({
    url: '/userTenants/',
    method: 'get',
    params
  })
}

export function CriarUsuarioTenant (data) {
  return request({
    url: '/userTenants',
    method: 'post',
    data
  })
}

export function UpdateUsuariosTenant (userId, data) {
  return request({
    url: `/userTenants/${userId}`,
    method: 'put',
    data
  })
}

export function UpdateConfiguracoesUsuariosTenant (userId, data) {
  return request({
    url: `/userTenants/${userId}/configs`,
    method: 'put',
    data
  })
}

export function DadosUsuarioTenant (userId) {
  return request({
    url: `/userTenants/${userId}`,
    method: 'get'
  })
}

export function DeleteUsuarioTenant (userId, tenantId) {
  return request({
    url: `/userTenants/${userId}`,
    method: 'delete',
    data: { tenantId }
  })
}

export function ListarUsuariosChatPrivado(params) {
  return request({
    url: '/users/chat-privado/',
    method: 'get',
    params
  })
}