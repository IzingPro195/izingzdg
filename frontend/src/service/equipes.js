import request from 'src/service/request'

export function CriarGrupoPrivado(data) {
  return request({
    url: '/group-message/',
    method: 'post',
    data
  })
}

export function ListarGruposPrivados() {
  return request({
    url: '/group-message/',
    method: 'get'
  })
}

export function ListarGruposPrivadosPorUser() {
  return request({
    url: '/group-message/user',
    method: 'get'
  })
}

export function ListarUsersPrivadosPorGrupo(gruopId) {
  return request({
    url: `/group-message/${gruopId}`,
    method: 'get'
  })
}

export function AlterarGrupoPrivado(data) {
  return request({
    url: `/group-message/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarGrupoPrivado(data) {
  return request({
    url: `/group-message/${data.id}`,
    method: 'delete'
  })
}

export function AddUserGrupoPrivado(userId, groupId) {
  return request({
    url: '/group-message/user',
    method: 'post',
    data: { userId, groupId }
  })
}

export function RemoveUserGrupoPrivado(userId, grupoId) {
  return request({
    url: `/group-message/user/${userId}/${grupoId}`,
    method: 'delete'
  })
}
