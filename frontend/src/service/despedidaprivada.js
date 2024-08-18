import request from 'src/service/request'

export function CriarDespedidaPrivada (data) {
  return request({
    url: '/farewellPrivateMessage/',
    method: 'post',
    data
  })
}

export function ListarDespedidasPrivada () {
  return request({
    url: `/farewellPrivateMessage/`,
    method: 'get'
  })
}

export function AlterarDespedidaPrivada (data) {
  return request({
    url: `/farewellPrivateMessage/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarDespedidaPrivada (data) {
  return request({
    url: `/farewellPrivateMessage/${data.id}`,
    method: 'delete'
  })
}

export function DeletarTodasDespedidaPrivada () {
  return request({
    url: `/farewellPrivateMessageAll/`,
    method: 'delete'
  })
}

export function ConsultarLogsDespedidaPrivada(params) {
  return request({
    url: `/farewellPrivateMessage/${params.groupId}/logs`,
    method: 'get',
    params,
  })
}
