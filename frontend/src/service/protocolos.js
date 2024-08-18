import request from 'src/service/request'

export function CriarProtocolo (data) {
  return request({
    url: '/ticketProtocols/',
    method: 'post',
    data
  })
}

export function ListarProtocolos () {
  return request({
    url: `/ticketProtocols/`,
    method: 'get'
  })
}

export function AlterarProtocolo (data) {
  return request({
    url: `/ticketProtocols/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarProtocolo (data) {
  return request({
    url: `/ticketProtocols/${data.id}`,
    method: 'delete'
  })
}

export function ConsultarLogsProtocolo(params) {
  return request({
    url: `/ticketProtocols/${params.ticketId}/logs`,
    method: 'get',
    params,
  })
}
