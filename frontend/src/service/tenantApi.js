import request from 'src/service/request'

export function CriarApiTenant (data) {
  return request({
    url: '/tenantApi/',
    method: 'post',
    data
  })
}

export function ListarApisTenant () {
  return request({
    url: `/tenantApi/`,
    method: 'get'
  })
}

export function AlterarApiTenant (data) {
  return request({
    url: `/tenantApi/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarApiTenant (data) {
  return request({
    url: `/tenantApi/${data.id}`,
    method: 'delete'
  })
}

export function DeletarTodasApiTenant () {
  return request({
    url: `/tenantApiAll/`,
    method: 'delete'
  })
}

export function ConsultarApiTenant(params) {
  return request({
    url: `/tenantApi/${params.tenantApiId}`,
    method: 'get',
    params,
  })
}
