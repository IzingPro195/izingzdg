import request from 'src/service/request'

export function CriarDespedida (data) {
  return request({
    url: '/farewellMessage/',
    method: 'post',
    data
  })
}

export function ListarDespedidas () {
  return request({
    url: `/farewellMessage/`,
    method: 'get'
  })
}

export function AlterarDespedida (data) {
  return request({
    url: `/farewellMessage/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarDespedida (data) {
  return request({
    url: `/farewellMessage/${data.id}`,
    method: 'delete'
  })
}

export function DeletarTodasDespedida () {
  return request({
    url: `/farewellMessageAll/`,
    method: 'delete'
  })
}

export function ConsultarLogsDespedida(params) {
  return request({
    url: `/farewellMessage/${params.groupId}/logs`,
    method: 'get',
    params,
  })
}
