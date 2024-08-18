import request from 'src/service/request'

export function CriarPalavra (data) {
  return request({
    url: '/wordList/',
    method: 'post',
    data
  })
}

export function ListarPalavras () {
  return request({
    url: `/wordList/`,
    method: 'get'
  })
}

export function AlterarPalavra (data) {
  return request({
    url: `/wordList/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarPalavra (data) {
  return request({
    url: `/wordList/${data.id}`,
    method: 'delete'
  })
}

export function DeletarTodasPalavra () {
  return request({
    url: `/wordListAll/`,
    method: 'delete'
  })
}

export function ConsultarLogsPalavra(params) {
  return request({
    url: `/wordList/${params.groupId}/logs`,
    method: 'get',
    params,
  })
}
