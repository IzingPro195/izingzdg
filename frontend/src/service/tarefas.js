import request from 'src/service/request'

export function CriarTarefa (data) {
  return request({
    url: '/todoLists/',
    method: 'post',
    data
  })
}

export function ListarTarefas () {
  return request({
    url: `/todoLists/`,
    method: 'get'
  })
}

export function AlterarTarefa (data) {
  return request({
    url: `/todoLists/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarTarefa (data) {
  return request({
    url: `/todoLists/${data.id}`,
    method: 'delete'
  })
}

export function ConsultarLogsTarefa(params) {
  return request({
    url: `/todoLists/${params.userId}/logs`,
    method: 'get',
    params,
  })
}
