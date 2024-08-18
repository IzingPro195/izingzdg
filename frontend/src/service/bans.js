import request from 'src/service/request'

export function CriarBan (data) {
  return request({
    url: '/banList/',
    method: 'post',
    data
  })
}

export function ListarBans () {
  return request({
    url: `/banList/`,
    method: 'get'
  })
}

export function AlterarBan (data) {
  return request({
    url: `/banList/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarBan (data) {
  return request({
    url: `/banList/${data.id}`,
    method: 'delete'
  })
}

export function DeletarTodosBan () {
  return request({
    url: `/banListAll/`,
    method: 'delete'
  })
}

export function ConsultarLogsBan(params) {
  return request({
    url: `/banList/${params.groupId}/logs`,
    method: 'get',
    params,
  })
}
