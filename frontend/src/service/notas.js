import request from 'src/service/request'

export function CriarNota (data) {
  return request({
    url: '/ticketNotes/',
    method: 'post',
    data
  })
}

export function ListarNotas () {
  return request({
    url: `/ticketNotes/`,
    method: 'get'
  })
}

export function AlterarNota (data) {
  return request({
    url: `/ticketNotes/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarNota (data) {
  return request({
    url: `/ticketNotes/${data.id}`,
    method: 'delete'
  })
}

export function ConsultarLogsNota(params) {
  return request({
    url: `/ticketNotes/${params.ticketId}/logs`,
    method: 'get',
    params,
  })
}
