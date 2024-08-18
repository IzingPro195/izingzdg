import request from 'src/service/request'

export function CriarAvaliacao (data) {
  return request({
    url: '/ticketEvaluations/',
    method: 'post',
    data
  })
}

export function ListarAvaliacoes () {
  return request({
    url: `/ticketEvaluations/`,
    method: 'get'
  })
}

export function AlterarAvaliacao (data) {
  return request({
    url: `/ticketEvaluations/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarAvaliacao (data) {
  return request({
    url: `/ticketEvaluations/${data.id}`,
    method: 'delete'
  })
}

export function ConsultarLogsAvaliacao(params) {
  return request({
    url: `/ticketEvaluations/${params.ticketId}/logs`,
    method: 'get',
    params,
  })
}
