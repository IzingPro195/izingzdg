import request from 'src/service/request'

export function CriarSaudacao (data) {
  return request({
    url: '/greetingMessage/',
    method: 'post',
    data
  })
}

export function ListarSaudacoes () {
  return request({
    url: `/greetingMessage/`,
    method: 'get'
  })
}

export function AlterarSaudacao (data) {
  return request({
    url: `/greetingMessage/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarSaudacao (data) {
  return request({
    url: `/greetingMessage/${data.id}`,
    method: 'delete'
  })
}

export function DeletarTodasSaudacao () {
  return request({
    url: `/greetingMessageAll/`,
    method: 'delete'
  })
}

export function ConsultarLogsSaudacao(params) {
  return request({
    url: `/greetingMessage/${params.groupId}/logs`,
    method: 'get',
    params,
  })
}
